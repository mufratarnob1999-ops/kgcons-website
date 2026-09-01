# Decisions needed from the owner

All resolved as of this pass. Kept here as a record of what was decided and
why, in case it needs revisiting.

1. **Guarantee wording** — confirmed. Keeping the scope guarantee ("if we
   don't deliver what we agreed to deliver, you get your money back"), not
   the original 70%-of-results wording.
2. **Client-consent clause on the Privacy page** — confirmed as written.
3. **Legal review** — done. A US attorney reviewed `/legal/privacy`,
   `/legal/terms` and `/legal/refund` as drafted and approved them without
   changes, including the three flagged questions (benchmarking consent,
   the scope-guarantee wording, and cross-border data handling). The
   pending-review comment in each file's code has been replaced with a
   dated review note.
4. **Consultation rates** — updated site-wide to the real rate card: $150/hr
   in person (NYC or Wyoming), $120/hr online with a US-based consultant,
   $10–150/hr online with an offshore consultant. Live-session pricing
   ($5–50 for detailed answers) is unchanged — that's a separate product,
   not addressed by this update.
5. **The logo** — remade as a vector mark (`LogoMark.tsx`): a simplified
   five-blade turbine, an eight-tooth gear ring, the inlet horn, and a
   lime-accent hub, redrawn from the original artwork. Being vector, it
   stays crisp at any size instead of the fine printed detail of the
   original blurring out at header height. Now live in the header and
   footer, replacing the text-only wordmark. If the original artwork
   should also appear somewhere at full detail (e.g. the About page), say
   so.
6. **Payment methods** — confirmed: Zelle Business, Venmo Business, PayPal
   Business. Copy updated to say "PayPal Business" specifically.
7. **Theme direction (humaan.com)** — confirmed: borrow structural moves,
   not the visual style. The dark palette, near-square corners and
   restrained motion stay as built; no light-mode pivot, no new animation
   dependency. This is standing guidance for how new sections get designed
   going forward, not a retrofit of what's already built.
