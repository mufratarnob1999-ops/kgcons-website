# Kishoreganj Consultancy — kgcons.org

Next.js 15 + TypeScript + Tailwind CSS v4.

## Running the site on your computer

1. Install Node.js 20 or newer from nodejs.org
2. Open a terminal in this folder
3. Run `npm install` (only needed the first time)
4. Run `npm run dev`
5. Open http://localhost:3000 in your browser

Visit http://localhost:3000/style-guide to review the design system.

## Commands

- `npm run dev` — run the site locally while you work
- `npm run build` — produce the production build
- `npm run typecheck` — check for TypeScript errors

## Where things live

    src/app/globals.css     All design tokens. Colours and type sizes live here.
    src/app/layout.tsx      Wraps every page: fonts, header, footer, SEO.
    src/components/ui/      Reusable building blocks (Button, Section, etc.)
    src/components/layout/  Header, Footer, Wordmark
    src/content/            Site text and navigation links. Edit copy here.
    src/lib/                Helpers, including SEO metadata

## Not built yet

Homepage sections, services, packages and pricing, payments, consultation
booking. These are planned but deliberately not implemented.
