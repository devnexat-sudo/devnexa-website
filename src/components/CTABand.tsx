import { Link } from "react-router";
import { ArrowRight } from "lucide-react";
import { Reveal } from "./Reveal";
import { WhatsAppIcon } from "./WhatsApp";
import { whatsappLink } from "@/config/site";

/** "Let's Build Together" band, reused across pages. */
export function CTABand({
  title = "Let's Build Together",
  lead = "Tell us about your idea — we'll help you shape it into a mobile app, a game or your own branded digital product.",
  primaryLabel = "Start Your Project",
}: {
  title?: string;
  lead?: string;
  primaryLabel?: string;
}) {
  return (
    <section className="relative overflow-hidden border-t border-white/10 py-20 md:py-28">
      <div
        className="pointer-events-none absolute inset-0"
        aria-hidden="true"
        style={{
          background:
            "radial-gradient(55% 60% at 50% 110%, rgba(79,90,240,0.22) 0%, transparent 70%)",
        }}
      />
      <div className="container-x relative">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-3xl font-extrabold tracking-tight text-white uppercase md:text-5xl md:leading-[1.05]">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-[hsl(230,14%,72%)] md:text-lg">
            {lead}
          </p>
          <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <a href="mailto:devnexat@gmail.com" className="btn btn-primary w-full sm:w-auto">Send an Enquiry<ArrowRight className="h-4 w-4" /></a>
            <a
              href={whatsappLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-whatsapp w-full sm:w-auto"
            >
              <WhatsAppIcon className="h-4 w-4" />
              Chat on WhatsApp
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
