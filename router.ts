import { z } from "zod";
import { TRPCError } from "@trpc/server";
import { createRouter, publicQuery } from "./middleware";
import { insertEnquiry } from "./queries/enquiries";
import { SERVICE_OPTIONS, BUDGET_OPTIONS } from "@contracts/enquiry";
import type { EnquirySubmitResult } from "@contracts/enquiry";

// Keep in sync with contracts/enquiry.ts option values.
const serviceValues = [
  "mobile-app-development",
  "game-development",
  "white-label-development",
  "other",
] as const;
const budgetValues = ["under-5k", "5k-15k", "15k-50k", "over-50k", "custom"] as const;

// Fail fast at boot if the shared contract drifts from the server enum.
for (const s of SERVICE_OPTIONS) {
  if (!(serviceValues as readonly string[]).includes(s.value)) {
    throw new Error(`Service option "${s.value}" missing from server enum`);
  }
}
for (const b of BUDGET_OPTIONS) {
  if (!(budgetValues as readonly string[]).includes(b.value)) {
    throw new Error(`Budget option "${b.value}" missing from server enum`);
  }
}

/** Basic per-IP throttle: max 5 enquiries per 10 minutes. */
const hits = new Map<string, number[]>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const list = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  if (list.length >= MAX_HITS) {
    hits.set(ip, list);
    return false;
  }
  list.push(now);
  hits.set(ip, list);
  return true;
}

const enquiryInput = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  companyName: z.string().trim().max(160).optional().or(z.literal("")),
  email: z
    .string()
    .trim()
    .email("Please enter a valid business email address.")
    .max(190),
  country: z.string().trim().min(2, "Please enter your country.").max(90),
  whatsapp: z
    .string()
    .trim()
    .max(40)
    .regex(/^[+\d\s()-]*$/, "Please enter a valid WhatsApp number.")
    .optional()
    .or(z.literal("")),
  service: z.enum(serviceValues),
  budget: z.enum(budgetValues),
  description: z
    .string()
    .trim()
    .min(20, "Please describe your project in at least 20 characters.")
    .max(5000),
  /** Honeypot — must stay empty. Real users never see this field. */
  website: z.string().max(0).optional().or(z.literal("")),
});

export const appRouter = createRouter({
  ping: publicQuery.query(() => ({ ok: true, ts: Date.now() })),

  enquiry: createRouter({
    submit: publicQuery
      .input(enquiryInput)
      .mutation(async ({ input, ctx }): Promise<EnquirySubmitResult> => {
        // Honeypot filled → silently accept without storing (bot).
        if (input.website) {
          return {
            ok: true,
            reference: "DNX-000000",
            message: "Thank you.",
          };
        }

        const fwd = ctx.req.headers.get("x-forwarded-for") ?? "";
        const ip =
          fwd.split(",")[0]?.trim() ||
          ctx.req.headers.get("x-real-ip") ||
          "unknown";
        if (!checkRateLimit(ip)) {
          throw new TRPCError({
            code: "TOO_MANY_REQUESTS",
            message:
              "Too many enquiries from your network. Please wait a few minutes or reach us directly on WhatsApp.",
          });
        }

        const id = await insertEnquiry({
          fullName: input.fullName,
          companyName: input.companyName || null,
          email: input.email,
          country: input.country,
          whatsapp: input.whatsapp || null,
          service: input.service,
          budget: input.budget,
          description: input.description,
        });

        return {
          ok: true,
          reference: `DNX-${String(id).padStart(6, "0")}`,
          message:
            "Your enquiry has been received. Our team will get back to you shortly.",
        };
      }),
  }),
});

export type AppRouter = typeof appRouter;
