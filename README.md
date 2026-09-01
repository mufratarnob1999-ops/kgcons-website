# Kishoreganj Consultancy — kgcons.org

Next.js 16.3.3 + TypeScript + Tailwind CSS v4, deployed on Cloudflare
Workers (via the OpenNext adapter) with a Cloudflare D1 database for the
booking system.

## Running the site on your computer

1. Install Node.js 20 or newer from nodejs.org
2. Open a terminal in this folder
3. Run `npm install` (only needed the first time)
4. Run `npm run dev`
5. Open http://localhost:3200 in your browser

Visit http://localhost:3200/style-guide to review the design system.

## Commands

- `npm run dev` — run the site locally while you work
- `npm run build` — produce the production build
- `npm run typecheck` — check for TypeScript errors
- `npm run preview` — build and run the real Worker locally via Wrangler
  (needed to test booking/auth behaviour against the real Workers runtime,
  not just `next dev`)
- `npm run deploy` — build and deploy live to Cloudflare
- `npm run cf-typegen` — regenerate `cloudflare-env.d.ts` after changing
  `wrangler.jsonc` bindings

## Where things live

    src/app/globals.css     All design tokens. Colours and type sizes live here.
    src/app/layout.tsx      Wraps every page: fonts, header, footer, SEO.
    src/components/ui/      Reusable building blocks (Button, Section, Input, etc.)
    src/components/layout/  Header, Footer, Wordmark
    src/components/forms/   Login/signup/logout forms
    src/components/booking/ The scheduling calendar and appointment list
    src/content/            Site text and navigation links. Edit copy here.
    src/lib/                Helpers: SEO metadata, auth, availability/holidays, email, D1 access
    src/app/api/            Auth and appointment API routes
    migrations/             D1 database schema

## The booking system

`/schedule` shows real availability (online and in-person, 9am–5pm
Eastern, weekdays, excluding US federal holidays) and lets a logged-in
client reserve a slot. `/account` is a client's own dashboard to view and
cancel their appointments. `/admin/appointments` (visible only to the
email in `ADMIN_EMAIL`, set in `wrangler.jsonc`) lists every booking.

Confirmation/cancellation emails need a Resend account and API key — see
`DECISIONS_NEEDED.md` for the setup steps. Until that's done, booking and
cancellation still work correctly; clients just won't get an email.

## Not built yet

Payments (Stripe) and the Student Consultancy division (`/student`) are
deliberately not implemented. Password reset and rate limiting on the
auth endpoints are also out of scope for now. See `DECISIONS_NEEDED.md`
for what the owner should review.
