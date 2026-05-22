import {NextResponse} from "next/server";
import {createServiceClient} from "@/lib/supabase/service";

const TOPICS = ["general","support","press","partnership","other"] as const;
type Topic = (typeof TOPICS)[number];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  topic?: unknown;
  message?: unknown;
  website?: unknown;
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

    return NextResponse.json({ok: true});
  } catch (err) {
    console.error("[contact] unexpected error:", err);
    return NextResponse.json(
      {error: "Something went wrong on our side. Please email hello@finpersona.com instead."},
      {status: 500}
    );
  }
}
