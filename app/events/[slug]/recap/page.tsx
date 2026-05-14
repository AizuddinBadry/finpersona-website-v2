"use client";

import {useEffect, useState} from "react";
import {useParams} from "next/navigation";
import {createClient} from "@/lib/supabase/client";
import {Calendar, Trophy, ArrowLeft, Medal} from "lucide-react";
import Link from "next/link";

interface Prize {
  place: number;
  amount: number;
  currency: string;
}

interface FpEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  image_url?: string;
  start_date: string;
  end_date: string;
  prizes?: Prize[];
  event_type?: string;
  ranking_method?: string;
}

interface LeaderboardEntry {
  rank: number;
  user_id: string;
  display_name: string;
  event_points: number;
  qualified_receipt_count: number;
  qualified_receipt_value: number;
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-MY", {day: "numeric", month: "short", year: "numeric"});
}

function slugToBannerClass(slug: string): string {
  if (slug.includes("cny") || slug.includes("chinese-new-year")) return "cny";
  if (slug.includes("raya") || slug.includes("ramadan")) return "ramadan";
  if (slug.includes("merdeka")) return "merdeka";
  if (slug.includes("deepavali") || slug.includes("diwali")) return "deepavali";
  if (slug.includes("budget") || slug.includes("tax")) return "budget";
  return "default";
}

function fmtPrize(n: number): string {
  if (n >= 1000) return "RM " + (n / 1000).toFixed(0) + "K";
  return "RM " + n;
}

export default function RecapPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [event, setEvent] = useState<FpEvent | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);
  const [participantCount, setParticipantCount] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    if (!slug) return;
    async function load() {
      try {
        const sb = createClient();
        const {data: evData} = await sb
          .from("events")
          .select("*")
          .eq("slug", slug)
          .single();
        if (!evData) {setNotFound(true); return;}
        setEvent(evData as FpEvent);
        const [{data: lb}, countRes] = await Promise.all([
          sb.rpc("get_event_leaderboard", {p_event_id: evData.id}),
          fetch(`/api/event-participants/${evData.id}`).then(r => r.json()).catch(() => ({count: 0})),
        ]);
        setLeaderboard((lb ?? []) as LeaderboardEntry[]);
        setParticipantCount(countRes.count ?? null);
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [slug]);

  if (loading) {
    return (
      <div className="recap-loading">
        <div className="recap-spinner" />
      </div>
    );
  }

  if (notFound || !event) {
    return (
      <div style={{textAlign:"center",padding:"100px 24px"}}>
        <Trophy size={48} style={{color:"var(--muted)",margin:"0 auto 16px"}} />
        <h2 style={{fontSize:20,margin:"0 0 8px"}}>Event not found</h2>
        <p style={{color:"var(--muted)",margin:"0 0 24px"}}>This event doesn&apos;t exist or has been removed.</p>
        <Link href="/events" className="btn btn-secondary">Back to events</Link>
      </div>
    );
  }

  const top3 = leaderboard.slice(0, 3);
  const rest = leaderboard.slice(3);
  const bannerClass = slugToBannerClass(event.slug);
  const totalPrize = event.prizes?.reduce((s, p) => s + p.amount, 0) ?? 0;
  const totalReceipts = leaderboard.reduce((s, r) => s + r.qualified_receipt_count, 0);
  const totalValue = leaderboard.reduce((s, r) => s + r.qualified_receipt_value, 0);
  const displayParticipants = participantCount ?? leaderboard.length;

  return (
    <div className="recap-page">
      {/* HERO BANNER */}
      <div
        className={`recap-hero event-banner ${bannerClass}`}
        style={event.image_url ? {backgroundImage:`url(${event.image_url})`,backgroundSize:"cover",backgroundPosition:"center"} : undefined}
      >
        {event.image_url && <div className="event-banner-img-overlay" />}
        <div className="event-banner-pattern" />
        <div className="recap-hero-inner container">
          <Link href="/events" className="recap-back">
            <ArrowLeft size={15} />
            All events
          </Link>
          <div style={{flex:1}} />
          <span className="event-banner-tag ended">Ended</span>
        </div>
        <div className="container recap-hero-content">
          <h1 className="recap-title">{event.title}</h1>
          <p className="recap-dates">
            <Calendar size={13} style={{display:"inline",verticalAlign:"middle",marginRight:6}} />
            {formatDate(event.start_date)} – {formatDate(event.end_date)}
          </p>
        </div>
      </div>

      {/* STATS STRIP */}
      <div className="recap-stats-strip">
        <div className="container recap-stats-inner">
          {totalPrize > 0 && (
            <div className="recap-stat">
              <span className="recap-stat-val">RM {totalPrize.toLocaleString()}</span>
              <span className="recap-stat-label">Total prize pool</span>
            </div>
          )}
          <div className="recap-stat">
            <span className="recap-stat-val">{displayParticipants.toLocaleString()}</span>
            <span className="recap-stat-label">Participants</span>
          </div>
          <div className="recap-stat">
            <span className="recap-stat-val">{totalReceipts.toLocaleString()}</span>
            <span className="recap-stat-label">Receipts scanned</span>
          </div>
          {totalValue > 0 && (
            <div className="recap-stat">
              <span className="recap-stat-val">RM {Math.round(totalValue).toLocaleString()}</span>
              <span className="recap-stat-label">Qualified spend</span>
            </div>
          )}
        </div>
      </div>

      <div className="container recap-body">
        {leaderboard.length === 0 ? (
          <div className="recap-empty">
            <Trophy size={48} style={{color:"var(--muted)",margin:"0 auto 16px"}} />
            <h3>No entries recorded</h3>
            <p>This event had no qualifying participants.</p>
          </div>
        ) : (
          <>
            {/* PODIUM */}
            {top3.length > 0 && (
              <div className="recap-section">
                <div className="section-head">
                  <span className="section-eyebrow">Final standings</span>
                  <h2 className="section-h2">The <em>winners.</em></h2>
                  <p className="section-sub">Congratulations to everyone who participated.</p>
                </div>
                <RecapPodium top3={top3} prizes={event.prizes ?? []} />
              </div>
            )}

            {/* FULL LEADERBOARD */}
            <div className="recap-section" style={{marginTop: top3.length > 0 ? 56 : 0}}>
              {rest.length > 0 && (
                <>
                  <div className="section-head">
                    <span className="section-eyebrow">Full rankings</span>
                    <h2 className="section-h2">All <em>participants.</em></h2>
                  </div>
                  <div className="lb-card" style={{marginTop:24}}>
                    <div className="lb-head">
                      <div className="lb-head-l">
                        <div>
                          <div className="lb-title">{event.title} — Final Leaderboard</div>
                          <div className="lb-sub">{leaderboard.length} participants · Ended {formatDate(event.end_date)}</div>
                        </div>
                      </div>
                      <span className="lb-live" style={{background:"rgba(0,0,0,0.06)",color:"var(--ink2)"}}>
                        Final
                      </span>
                    </div>
                    <div className="lb-rows">
                      {rest.map(r => <RecapRow key={r.user_id} entry={r} prizes={event.prizes ?? []} />)}
                    </div>
                    <div className="lb-foot">
                      <small>Rankings are final and based on total qualified submissions.</small>
                    </div>
                  </div>
                </>
              )}
            </div>
          </>
        )}

        {/* PRIZES BREAKDOWN */}
        {(event.prizes ?? []).length > 0 && (
          <div className="recap-prizes-section">
            <div className="section-head">
              <span className="section-eyebrow">Prize breakdown</span>
              <h2 className="section-h2">What was <em>on the line.</em></h2>
            </div>
            <div className="recap-prizes-grid">
              {(event.prizes ?? []).sort((a,b)=>a.place-b.place).map(p => {
                const winner = leaderboard.find(r => r.rank === p.place);
                return (
                  <div key={p.place} className={`recap-prize-card place-${p.place}`}>
                    <div className="recap-prize-place">
                      {p.place === 1 ? "🥇" : p.place === 2 ? "🥈" : p.place === 3 ? "🥉" : `#${p.place}`}
                    </div>
                    <div className="recap-prize-amount">{fmtPrize(p.amount)}</div>
                    <div className="recap-prize-place-label">
                      {p.place === 1 ? "Grand Prize" : p.place === 2 ? "2nd Place" : p.place === 3 ? "3rd Place" : `Place ${p.place}`}
                    </div>
                    {winner && (
                      <div className="recap-prize-winner">{winner.display_name}</div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* CTA */}
        <div className="recap-cta">
          <Medal size={28} style={{color:"var(--purple)",marginBottom:12}} />
          <h3>Ready for the next one?</h3>
          <p>New events launch regularly. Stay on the app to be the first to know.</p>
          <Link href="/events" className="btn btn-primary" style={{marginTop:16,display:"inline-flex",gap:8,alignItems:"center"}}>
            <span>View all events</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}

function RecapPodium({top3, prizes}: {top3: LeaderboardEntry[]; prizes: Prize[]}) {
  const order = top3.length === 1
    ? [top3[0]]
    : top3.length === 2
    ? [top3[1], top3[0]]
    : [top3[1], top3[0], top3[2]];

  return (
    <div className="recap-podium">
      {order.map((entry) => {
        const pos = top3.indexOf(entry);
        const prize = prizes.find(p => p.place === entry.rank);
        const posClass = pos === 0 ? "first" : pos === 1 ? "second" : "third";
        return (
          <div key={entry.user_id} className={`podium-cell ${posClass}`}>
            <div className="podium-avatar">{entry.display_name.charAt(0).toUpperCase()}</div>
            <div className="podium-name">{entry.display_name}</div>
            <div className="podium-score">
              {entry.event_points.toLocaleString()}
              <span className="unit">pts</span>
            </div>
            {prize && (
              <div className="recap-podium-prize">{fmtPrize(prize.amount)}</div>
            )}
            <div className="podium-bar">
              {entry.rank === 1 ? "1st" : entry.rank === 2 ? "2nd" : "3rd"}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function RecapRow({entry, prizes}: {entry: LeaderboardEntry; prizes: Prize[]}) {
  const prize = prizes.find(p => p.place === entry.rank);
  return (
    <div className="lb-row">
      <span className="lb-rank">{entry.rank}</span>
      <span className="lb-avatar">{entry.display_name.charAt(0).toUpperCase()}</span>
      <span className="lb-name-wrap">
        <span className="lb-name">{entry.display_name}</span>
      </span>
      <span className="lb-receipts">{entry.qualified_receipt_count} receipts</span>
      <span className="lb-score">
        {prize
          ? <span style={{fontSize:13,fontWeight:700,color:"var(--green)",fontFamily:"var(--sans)"}}>{fmtPrize(prize.amount)}</span>
          : <>{entry.event_points.toLocaleString()}<span className="unit" style={{fontSize:11,color:"var(--muted)",fontWeight:600,marginLeft:2,fontFamily:"var(--sans)"}}>pts</span></>
        }
      </span>
    </div>
  );
}
