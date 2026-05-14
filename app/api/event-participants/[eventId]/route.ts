import {NextResponse} from "next/server";
import {createServiceClient} from "@/lib/supabase/service";

export async function GET(
  _req: Request,
  {params}: {params: {eventId: string}}
) {
  try {
    const sb = createServiceClient();
    const {count, error} = await sb
      .from("event_participants")
      .select("id", {count: "exact", head: true})
      .eq("event_id", params.eventId);
    if (error) throw error;
    return NextResponse.json({count: count ?? 0});
  } catch {
    return NextResponse.json({count: 0});
  }
}
