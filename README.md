# Devnexa Technologies — Website

Complete full-stack website for Devnexa Technologies, a software development
agency (Ahmedabad, Gujarat, India) focused on:

1. Mobile Application Development
2. Game Development
3. White-Label Development

## Tech stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19 + TypeScript + Vite + Tailwind CSS + shadcn/ui |
| Backend  | Hono + tRPC (type-safe API) |
| Database | MySQL via Drizzle ORM (`enquiries` table) |
| Fonts    | Archivo (display), Inter (body), IBM Plex Mono (labels) |

## Pages

- `/` — Homepage (hero, about, services, why-us, process, demo projects, CTA)
- `/mobile-app-development` — Mobile app services
- `/game-development` — Game development services + genre categories
- `/white-label-development` — White-label offerings, benefits, partnerships
- `/portfolio` — Filterable demo projects (clearly labeled "Concept Demo")
- `/process` — Six-stage development process timeline
- `/about` — Company intro, values, mission, vision
- `/contact` — Enquiry form (validated, stored in the database)

## Configuration

All brand/contact settings live in **`src/config/site.ts`** — one file:

```ts
email: "business@devnexa.example.com",   // ← replace with the real business email
emailConfigured: false,                  // ← set true once the email is live
whatsappNumberRaw: "916354853148",       // ← change here if the number ever changes
siteUrl: "https://devnexa-technologies.example.com", // ← set to the real domain later
```

Also update the host inside `public/sitemap.xml` and `public/robots.txt` once
a domain is connected.

## How the enquiry form works

The contact form posts to a real tRPC endpoint (`api/router.ts` →
`enquiry.submit`), validates input with Zod on the server, stores each enquiry
in the MySQL `enquiries` table, and returns a reference number (e.g.
`DNX-000042`). No fake success messages: the success screen only appears after
the database write succeeds. A honeypot field and per-IP rate limiting
(5 submissions / 10 minutes) guard against spam.

## Running locally

```bash
npm install
npm run db:push   # sync the database schema
npm run dev       # http://localhost:3000 (frontend + API with HMR)
```

Production: `npm run build && npm start`

## Publishing (no domain purchase needed)

**On this platform (easiest):** click the「publish」button on the version card —
the site (frontend + backend + database) goes live on a free public URL such as
`<name>.ok.kimi.link`. A custom domain can be connected later without code
changes.

**Self-hosting on Vercel / Cloudflare Pages:** those free tiers serve *static*
sites only. The enquiry form's backend (Hono + MySQL) needs a Node.js host and a
MySQL database, so for a fully free static deploy you would export the frontend
(`dist/public` after `npm run build`) and point the form at a hosted form
service instead. Note: the platform database does not travel with exported
code — a self-deployed copy needs its own MySQL (`DATABASE_URL` in `.env`).

## Replacing demo portfolio projects

Demo projects are plain data in `src/pages/Portfolio.tsx` (the `projects`
array) and `src/pages/Home.tsx` (the `featured` array). Replace entries with
real projects and swap the generated `ProjectArt` cover for real screenshots.

## Adding a Chinese language version later

Shared strings (brand, contacts, navigation, service names, form options) are
centralized in `src/config/site.ts` and `contracts/enquiry.ts`. Introduce a
locale module (e.g. `src/content/en.ts` + `src/content/zh.ts`) and a language
switch without restructuring the pages. The font stack already includes
PingFang SC / Microsoft YaHei fallbacks for Chinese text.

## SEO

Per-page titles/descriptions (`src/hooks/useSeo.ts`), Open Graph + Twitter
metadata, `og-image.png`, `sitemap.xml`, `robots.txt`, semantic heading
structure and descriptive alt text are included.
