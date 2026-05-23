import {NextResponse} from "next/server";
import {Resend} from "resend";
import {createServiceClient} from "@/lib/supabase/service";

const TOPICS = ["general","support","press","partnership","other"] as const;
type Topic = (typeof TOPICS)[number];

const TOPIC_LABELS: Record<Topic, string> = {
  general: "General inquiry",
  support: "Product support",
  press: "Press & media",
  partnership: "Partnership",
  other: "Other",
};

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown;
}

function escapeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

async function sendNotificationEmail(args: {
  name: string;
  email: string;
  topic: Topic;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.CONTACT_EMAIL_FROM;
  const toList = (process.env.CONTACT_EMAIL_TO ?? "")
    .split(",")
    .map(s => s.trim())
    .filter(Boolean);

  if (!apiKey || !from || toList.length === 0) {
    console.warn("[contact] email not sent: missing RESEND_API_KEY / CONTACT_EMAIL_FROM / CONTACT_EMAIL_TO");
    return;
  }

  const resend = new Resend(apiKey);
  const topicLabel = TOPIC_LABELS[args.topic];

  const safeName = escapeHtml(args.name);
  const safeEmail = escapeHtml(args.email);
  const safeMessage = escapeHtml(args.message).replace(/\n/g, "<br/>");

  const html = `<!doctype html>
<html><body style="margin:0;padding:0;background:#FAF8FF;font-family:-apple-system,'SF Pro Text','Inter',system-ui,sans-serif;color:#1A1530;">
  <div style="max-width:560px;margin:0 auto;padding:32px 20px;">
    <div style="background:#fff;border-radius:16px;border:1px solid rgba(91,71,168,0.10);overflow:hidden;">
      <div style="background:linear-gradient(135deg,#6E4CE6 0%,#9B7BF1 100%);padding:20px 24px;">
        <div style="font-size:11px;font-weight:600;letter-spacing:0.8px;text-transform:uppercase;color:rgba(255,255,255,0.75);">Finpersona contact form</div>
        <div style="font-size:18px;font-weight:600;color:#fff;margin-top:4px;">${escapeHtml(topicLabel)}</div>
      </div>
      <div style="padding:24px;">
        <table cellpadding="0" cellspacing="0" style="width:100%;font-size:14px;line-height:1.5;">
          <tr><td style="padding:6px 0;color:#7A7392;width:90px;">From</td><td style="padding:6px 0;color:#1A1530;font-weight:600;">${safeName}</td></tr>
          <tr><td style="padding:6px 0;color:#7A7392;">Email</td><td style="padding:6px 0;"><a href="mailto:${safeEmail}" style="color:#6E4CE6;text-decoration:none;font-weight:600;">${safeEmail}</a></td></tr>
          <tr><td style="padding:6px 0;color:#7A7392;">Topic</td><td style="padding:6px 0;color:#1A1530;">${escapeHtml(topicLabel)}</td></tr>
        </table>
        <div style="margin-top:18px;padding-top:18px;border-top:1px solid rgba(91,71,168,0.10);">
          <div style="font-size:11px;font-weight:600;letter-spacing:0.5px;text-transform:uppercase;color:#7A7392;margin-bottom:8px;">Message</div>
          <div style="font-size:14px;color:#3A3458;line-height:1.6;white-space:pre-wrap;">${safeMessage}</div>
        </div>
        <div style="margin-top:24px;">
          <a href="mailto:${safeEmail}?subject=Re:%20${encodeURIComponent(topicLabel)}" style="display:inline-block;background:#1A1530;color:#fff;font-size:13px;font-weight:600;padding:10px 18px;border-radius:999px;text-decoration:none;">Reply to ${safeName}</a>
        </div>
      </div>
    </div>
    <div style="text-align:center;font-size:11px;color:#A8A2BD;margin-top:16px;">Submitted via finpersona.com/contact</div>
  </div>
</body></html>`;

  const text = `New contact form submission — ${topicLabel}

From: ${args.name}
Email: ${args.email}
Topic: ${topicLabel}

Message:
${args.message}

— Submitted via finpersona.com/contact`;

  const {error} = await resend.emails.send({
    from,
    to: toList,
    replyTo: args.email,
    subject: `[Finpersona] ${topicLabel} — ${args.name}`,
    html,
    text,
  });

  if (error) {
    console.error("[contact] resend send failed:", error);
  }
}

export async function POST(req: Request) {
  let body: ContactPayload;
  try {
    body = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({error: "Invalid JSON."}, {status: 400});
  }

  if (typeof body.website === "string" && body.website.length > 0) {
    return NextResponse.json({ok: true});
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  const topic = typeof body.topic === "string" ? body.topic.trim() : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (name.length < 1 || name.length > 120) {
    return NextResponse.json({error: "Please enter your name."}, {status: 400});
  }
  if (!EMAIL_RE.test(email) || email.length > 254) {
    return NextResponse.json({error: "Please enter a valid email address."}, {status: 400});
  }
  if (!TOPICS.includes(topic as Topic)) {
    return NextResponse.json({error: "Please choose a topic."}, {status: 400});
  }
  if (message.length < 10 || message.length > 5000) {
    return NextResponse.json({error: "Message should be between 10 and 5000 characters."}, {status: 400});
  }

  try {
    const fwd = req.headers.get("x-forwarded-for") ?? "";
    const ip = fwd.split(",")[0]?.trim() || null;
    const userAgent = req.headers.get("user-agent")?.slice(0, 500) ?? null;

    const sb = createServiceClient();
    const {error} = await sb.from("contact_messages").insert({
      name,
      email,
      topic,
      message,
      user_agent: userAgent,
      ip_address: ip,
    });
    if (error) {
      console.error("[contact] supabase insert failed:", error);
      const isMissingTable = error.code === "42P01" || /relation .* does not exist/i.test(error.message ?? "");
      return NextResponse.json(
        {
          error: isMissingTable
            ? "Contact table not set up yet. Please run the SQL migration in Supabase, then try again."
            : "Something went wrong on our side. Please email hello@finpersona.com instead.",
        },
        {status: 500}
      );
    }

    sendNotificationEmail({name, email, topic: topic as Topic, message}).catch(err => {
      console.error("[contact] notification email threw:", err);
    });

    return NextResponse.json({ok: true});
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      {error: "Something went wrong on our side. Please email hello@finpersona.com instead."},
      {status: 500}
    );
  }
}
