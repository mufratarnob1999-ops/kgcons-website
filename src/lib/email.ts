import type { Track } from "./availability";

const TRACK_LABEL: Record<Track, string> = {
  online: "Online",
  in_person: "In person",
};

function formatSlot(date: string, time: string, track: Track): string {
  const [y, m, d] = date.split("-").map(Number);
  const dateLabel = new Date(Date.UTC(y, m - 1, d)).toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  });
  const [h] = time.split(":").map(Number);
  const hour12 = h % 12 === 0 ? 12 : h % 12;
  const ampm = h < 12 ? "AM" : "PM";
  return `${dateLabel} at ${hour12}:00 ${ampm} Eastern Time — ${TRACK_LABEL[track]}`;
}

function wrapEmail(bodyHtml: string): string {
  return `<div style="font-family: -apple-system, Helvetica, Arial, sans-serif; max-width: 480px; margin: 0 auto; color: #111111; line-height: 1.6;">
    <p style="font-weight: 700; font-size: 18px; margin-bottom: 24px;">Kishoreganj Consultancy</p>
    ${bodyHtml}
    <p style="margin-top: 32px; font-size: 13px; color: #666666;">Questions? Reply to this email or reach us at mufrat@kgcons.org.</p>
  </div>`;
}

async function sendEmail(
  env: CloudflareEnv,
  args: { to: string; subject: string; html: string },
): Promise<void> {
  if (!env.RESEND_API_KEY) {
    console.warn("RESEND_API_KEY not set — skipping email:", args.subject);
    return;
  }
  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${env.RESEND_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Kishoreganj Consultancy <bookings@kgcons.org>",
      to: [args.to],
      subject: args.subject,
      html: args.html,
    }),
  });
  if (!res.ok) {
    console.error("Resend email failed:", res.status, await res.text());
  }
}

type AppointmentEmailArgs = {
  to: string;
  name: string;
  date: string;
  time: string;
  track: Track;
};

export async function sendBookingConfirmation(
  env: CloudflareEnv,
  args: AppointmentEmailArgs,
): Promise<void> {
  await sendEmail(env, {
    to: args.to,
    subject: "Your consultation is booked",
    html: wrapEmail(`
      <p>Hi ${args.name},</p>
      <p>You're booked for:</p>
      <p style="font-weight: 600;">${formatSlot(args.date, args.time, args.track)}</p>
      <p>Payment is handled after the call, via Zelle Business, Venmo Business or PayPal Business — see the consultation page for details.</p>
      <p>Need to cancel? Sign in and cancel from your account at kgcons.org/account.</p>
    `),
  });
}

export async function sendCancellationConfirmation(
  env: CloudflareEnv,
  args: AppointmentEmailArgs,
): Promise<void> {
  await sendEmail(env, {
    to: args.to,
    subject: "Your consultation has been cancelled",
    html: wrapEmail(`
      <p>Hi ${args.name},</p>
      <p>This appointment has been cancelled and the slot is open again:</p>
      <p style="font-weight: 600;">${formatSlot(args.date, args.time, args.track)}</p>
      <p>You can book a new time any time at kgcons.org/schedule.</p>
    `),
  });
}
