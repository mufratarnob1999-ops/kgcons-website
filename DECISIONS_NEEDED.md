# Decisions needed from the owner

Plain-English list of things to review before the site goes live. Nothing
here is blocking — the site works and builds clean — but each of these is a
real decision only you can make.

## 1. The guarantee wording

The build brief asked for a "30-day return with a warranty of at least 70%
of estimated results." That wasn't published. Instead the site says:

> If we don't deliver what we agreed to deliver, you get your money back.
> Tell us within 30 days of the work being delivered.

This appears on the homepage FAQ, `/consultation`, `/legal/terms` and
`/legal/refund`. The reasoning: a percentage-of-results guarantee promises
something outside the company's control (platform algorithms, the client's
own execution), and results guarantees in marketing services are an area
regulators pay attention to in the US. **If you want the original wording,
or something in between, tell me and I'll change all four places.**

## 2. The client-consent clause on the Privacy page

You said "selected projects will be used as benchmark." The privacy page
adds a condition that wasn't in your original instruction: this only
happens **with the client's written consent**, and the project is
anonymised unless they agree otherwise. This was added because publishing
"we use your projects as benchmarks" right next to "we never share client
data" is a contradiction without a consent qualifier. **Confirm this is
what you meant, or tell me how you'd rather word it.**

## 3. Legal review

`/legal/privacy`, `/legal/terms` and `/legal/refund` are drafts written in
plain English, not by a lawyer. Each file has a hidden note at the top (a
code comment, not visible on the page) saying so. **Have a US attorney
review all three before the site goes live** — you operate two entities
across two jurisdictions and the site collects personal data (contact
forms, booking details).

## 4. Whether to publish exact rates

The site publishes real numbers: $5–50 for detailed live-session answers,
$50–100/hour for consultations. This was in the brief, so it's live. But
it's worth a second look now that it's on the page next to a premium
design — **decide if you're comfortable with exact numbers being public,
or if you'd rather move to "quoted on request" everywhere.**

## 5. The logo

The site currently uses a text wordmark ("Kishoreganj Consultancy") instead
of a logo image, per the brief — the turbocharger logo you have doesn't fit
a consultancy and won't scale down to header size. **This is still an open
question.** `Wordmark.tsx` was left untouched, as instructed.

## 6. Card payments (Stripe)

Not built, per the brief. The site currently lists Zelle Business, Venmo
Business and PayPal as the only payment methods, with a note that card
payment is "coming soon." No action needed now — just confirming this
matches your expectations for launch.
