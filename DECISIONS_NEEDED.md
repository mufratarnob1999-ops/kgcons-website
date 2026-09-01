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

8. **Booking system email delivery (Resend)** — done. Account created,
   `kgcons.org` verified as a sending domain, API key set as a Wrangler
   secret (`RESEND_API_KEY`, not in the repo) and in `.dev.vars` for local
   dev. Verified with a real test send to mufrat@kgcons.org — delivered
   successfully. Booking and cancellation confirmation emails are fully
   live.
9. **Phone-based signup** — decided against. Email stays the only way to
   create an account; no Twilio/SMS integration. Not revisiting unless
   asked.
10. **AI assistant model** — running on Cloudflare Workers AI (Llama 3.3
    70B, free tier) rather than a paid Claude API key, to avoid a
    per-question bill. Trade-off: a smaller open model is somewhat more
    prone to imprecise answers than a top-tier one, so it's worth an
    occasional spot-check of what it's telling visitors.

## Worth knowing: account deletion vs. the reviewed Privacy Policy

Clients can now permanently delete their own account and appointment
history at any time from `/account` — immediately, no delay. This is
genuinely good for clients, but it sits in a bit of tension with two
things the attorney already reviewed and signed off on:

- The Privacy Policy says data isn't kept past **six months**, "unless
  we're required to keep it longer for a legal or tax reason." Self-service
  deletion can now happen well before that six months, and before any
  legal/tax retention need would normally kick in. Not a contradiction
  exactly — the policy describes a maximum, not a minimum — but worth
  knowing this exists now.
- The Refund Policy gives clients **30 days** after delivery to flag a
  problem. If a client deletes their account inside that window, the
  business loses its own record of what was delivered and when — which
  could matter if a payment dispute comes up later with no booking record
  to point to.

Not blocking anything, and I'm not second-guessing the "delete means
delete" request — just flagging it since it wasn't part of what the
attorney reviewed. If it's worth a note to them, or a small addition to
the Privacy Policy mentioning this self-service right explicitly, that's
your call — I didn't touch the legal pages themselves since they're
already signed off.
