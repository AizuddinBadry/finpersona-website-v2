"use client";

import {useEffect, useState} from "react";
import {createClient} from "@/lib/supabase/client";
import {Calendar, Trophy, ChevronRight} from "lucide-react";

// NOTE: metadata can't be exported from "use client" — set in parent or via generateMetadata.
// Title is handled by layout template.

interface FpEvent {
  id: string;
  slug: string;
  title: string;
  description: string;
  tagline?: string;
  image_url?: string;
  start_date: string;
  end_date: string;
  is_active: boolean;
  is_featured: boolean;
  prize_pool?: number;
  event_type?: string;
  banner_color?: string;
}

interface LeaderboardRow {
  id: string;
  event_id: string;
  display_name: string;
  initials: string;
  location?: string;
  score: number;
  receipts_count: number;
  rank: number;
  is_current_user?: boolean;
}

function eventStatus(start: string, end: string) {
  const now = Date.now();
  const s = new Date(start).getTime();
  const e = new Date(end).getTime();
  if (now < s) return "upcoming";
  if (now > e) return "ended";
  return "live";
}

function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-MY", {day:"numeric",month:"short"});
}

function useCountdown(endDate: string | null) {
  const [text, setText] = useState("");
  useEffect(() => {
    if (!endDate) return;
    const tick = () => {
      const diff = Math.max(0, new Date(endDate).getTime() - Date.now());
      const d = Math.floor(diff / 86400000);
      const h = Math.floor((diff / 3600000) % 24);
      const m = Math.floor((diff / 60000) % 60);
      setText(`${d}d ${String(h).padStart(2,"0")}h ${String(m).padStart(2,"0")}m`);
    };
    tick();
    const id = setInterval(tick, 30000);
    return () => clearInterval(id);
  }, [endDate]);
  return text;
}

export default function EventsPage() {
  const [events, setEvents] = useState<FpEvent[]>([]);
  const [featured, setFeatured] = useState<FpEvent | null>(null);
  const [leaderboard, setLeaderboard] = useState<LeaderboardRow[]>([]);
  const [participantCount, setParticipantCount] = useState<number>(0);
  const [activeTab, setActiveTab] = useState<"all"|"week"|"day">("all");
  const [loading, setLoading] = useState(true);
  const countdown = useCountdown(featured?.end_date ?? null);

  useEffect(() => {
    async function load() {
      try {
        const sb = createClient();
        const {data: eventsData} = await sb
          .from("events")
          .select("*")
          .order("start_date", {ascending: false});
        const list: FpEvent[] = eventsData ?? [];
        setEvents(list);

        // Only feature a live or upcoming event — never a past one
        const feat =
          list.find(e => e.is_featured && eventStatus(e.start_date, e.end_date) !== "ended") ??
          list.find(e => eventStatus(e.start_date, e.end_date) === "live") ??
          null;
        setFeatured(feat);

        if (feat) {
          const [{data: lb}, {count}] = await Promise.all([
            sb.from("event_leaderboard")
              .select("*")
              .eq("event_id", feat.id)
              .order("rank", {ascending: true})
              .limit(50),
            sb.from("event_participants")
              .select("*", {count: "exact", head: true})
              .eq("event_id", feat.id),
          ]);
          setLeaderboard((lb ?? []) as LeaderboardRow[]);
          setParticipantCount(count ?? 0);
        }
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const topThree = leaderboard.slice(0, 3);
  const restRows = leaderboard.slice(3, 10);
  const youRow = leaderboard.find(r => r.is_current_user);
  const hasActiveLeaderboard =
    featured !== null &&
    eventStatus(featured.start_date, featured.end_date) === "live" &&
    leaderboard.length > 0;

  return (
    <div>
      {/* HERO */}
      <section className="events-hero">
        <div className="events-hero-bg" />
        <div className="container events-hero-inner">
          <span className="pill-tag">
            <span className="dot" />
            {loading ? "Loading..." : `${events.filter(e => eventStatus(e.start_date, e.end_date) === "live").length} contest${events.filter(e => eventStatus(e.start_date, e.end_date) === "live").length !== 1 ? "s" : ""} running`}
          </span>
          <h1>Scan receipts.<br /><em>Win prizes.</em></h1>
          <p className="lead">Finpersona Events turn your everyday receipts into entries. Join from the app, climb the live leaderboard, take home cash and credits.</p>
        </div>
      </section>

      {/* FEATURED CONTEST */}
      {!loading && featured && (
        <section className="featured-wrap">
          <div className="container">
            <div className="featured">
              <div className="featured-grid">
                <div className="featured-left">
                  <div>
                    <span className="featured-eyebrow">
                      <span className="live-dot" />
                      {eventStatus(featured.start_date, featured.end_date) === "live" ? "Live · Featured contest" : "Featured contest"}
                    </span>
                    <h2>{featured.title.includes("<em>") ? <span dangerouslySetInnerHTML={{__html: featured.title}} /> : featured.title}</h2>
                    <p className="featured-tagline">{featured.tagline ?? featured.description}</p>
                  </div>
                  <div className="featured-meta">
                    {featured.prize_pool && (
                      <div className="meta-cell">
                        <span className="meta-label">Total prize pool</span>
                        <span className="meta-value">RM {featured.prize_pool.toLocaleString()}</span>
                      </div>
                    )}
                    {participantCount > 0 && (
                      <div className="meta-cell">
                        <span className="meta-label">Players joined</span>
                        <span className="meta-value">{participantCount.toLocaleString()}</span>
                      </div>
                    )}
                    {eventStatus(featured.start_date, featured.end_date) === "live" && countdown && (
                      <div className="meta-cell">
                        <span className="meta-label">Ends in</span>
                        <span className="meta-value">{countdown}</span>
                      </div>
                    )}
                    {eventStatus(featured.start_date, featured.end_date) === "upcoming" && (
                      <div className="meta-cell">
                        <span className="meta-label">Opens</span>
                        <span className="meta-value">{formatDate(featured.start_date)}</span>
                      </div>
                    )}
                  </div>
                  <div className="featured-cta">
                    <a href="#join" className="btn-prize">Join the contest →</a>
                    <a href="#how" className="btn-link-light">How it works</a>
                  </div>
                </div>
                <div className="featured-right">
                  <PrizeStack />
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* HOW IT WORKS */}
      <section className="how-section" id="how">
        <div className="container">
          <div className="section-head">
            <span className="section-eyebrow">How it works</span>
            <h2 className="section-h2">Four taps from receipt to <em>leaderboard</em>.</h2>
            <p className="section-sub">Already using Finpersona to log expenses? Every eligible receipt auto-enters. No extra paperwork.</p>
          </div>
          <div className="how-grid">
            {howSteps.map((s,i) => (
              <div key={i} className="how-step">
                <div className="num">{i+1}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
                <div className="icon-illust">{s.icon}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LIVE LEADERBOARD — hidden if no active event with data */}
      {hasActiveLeaderboard && (
        <section className="leaderboard-section">
          <div className="container">
            <div style={{display:"flex",justifyContent:"space-between",alignItems:"flex-end",gap:24,flexWrap:"wrap"}}>
              <div className="section-head">
                <span className="section-eyebrow">Live leaderboard</span>
                <h2 className="section-h2">Right now on the <em>top spots.</em></h2>
                <p className="section-sub">Updates in real-time while the contest is running.</p>
              </div>
              <div className="lb-tabs">
                {(["all","week","day"] as const).map(tab => (
                  <button key={tab} className={`lb-tab${activeTab===tab?" active":""}`} onClick={()=>setActiveTab(tab)}>
                    {tab === "all" ? "All time" : tab === "week" ? "This week" : "Today"}
                  </button>
                ))}
              </div>
            </div>
            <div className="lb-grid">
              <div className="lb-card">
                <div className="lb-head">
                  <div className="lb-head-l">
                    <div>
                      <div className="lb-title">{featured!.title}</div>
                      <div className="lb-sub">{participantCount.toLocaleString()} players · Live</div>
                    </div>
                  </div>
                  <span className="lb-live">
                    <span style={{width:6,height:6,borderRadius:"50%",background:"var(--green)",display:"inline-block"}} />
                    Live
                  </span>
                </div>

                {/* Podium */}
                {topThree.length >= 3 && (
                  <div className="podium">
                    <PodiumCell row={topThree[1]} pos="second" />
                    <PodiumCell row={topThree[0]} pos="first" />
                    <PodiumCell row={topThree[2]} pos="third" />
                  </div>
                )}

                <div className="lb-rows">
                  {restRows.map(r => <LbRow key={r.id} row={r} />)}
                  {youRow && youRow.rank > 10 && (
                    <>
                      <div style={{padding:"8px 24px",fontSize:11,color:"var(--faint)",textAlign:"center",letterSpacing:"0.4px",textTransform:"uppercase",fontWeight:600,borderTop:"0.5px solid var(--divider)"}}>
                        ··· {youRow.rank - 10 - 1} more ···
                      </div>
                      <LbRow row={youRow} />
                    </>
                  )}
                </div>

                <div className="lb-foot">
                  <small>Ranks 4–50 share prizes in app credits.</small>
                  <a href="#">View full board →</a>
                </div>
              </div>

              <div className="lb-side">
                <div className="join-card" id="join">
                  <div className="join-card-inner">
                    <h3>Join from your phone in 30 seconds</h3>
                    <p>Download Finpersona. Auto-enrolled after your first receipt.</p>
                    <div className="qr-row">
                      <QrPlaceholder />
                      <div className="qr-text">
                        <small>Available on</small>
                        <div className="stores">App Store · Google Play</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* EVENTS GRID */}
      {!loading && (() => {
        const active = events.filter(e => eventStatus(e.start_date, e.end_date) !== "ended");
        const past = events.filter(e => eventStatus(e.start_date, e.end_date) === "ended");
        return (
          <section className="more-section">
            <div className="container">
              {active.length > 0 && (
                <>
                  <div className="section-head">
                    <span className="section-eyebrow">Active &amp; upcoming</span>
                    <h2 className="section-h2">Current <em>campaigns.</em></h2>
                    <p className="section-sub">Live contests and those opening soon.</p>
                  </div>
                  <div className="more-grid" style={{marginBottom: past.length > 0 ? 64 : 0}}>
                    {active.map(e => <EventCard key={e.id} event={e} />)}
                  </div>
                </>
              )}
              {active.length === 0 && (
                <div style={{textAlign:"center",padding:"48px 0 32px"}}>
                  <Trophy size={40} style={{color:"var(--purple-light)",margin:"0 auto 14px"}} />
                  <h3 style={{fontSize:18,margin:"0 0 8px"}}>No live contests right now</h3>
                  <p style={{color:"var(--muted)",fontSize:14,margin:0}}>Check back soon — new campaigns are on the way.</p>
                </div>
              )}
              {past.length > 0 && (
                <>
                  <div className="section-head" style={{marginTop: active.length > 0 ? 0 : 48}}>
                    <span className="section-eyebrow">Past campaigns</span>
                    <h2 className="section-h2">Previous <em>contests.</em></h2>
                    <p className="section-sub">Past events and their winners.</p>
                  </div>
                  <div className="more-grid">
                    {past.map(e => <EventCard key={e.id} event={e} />)}
                  </div>
                </>
              )}
            </div>
          </section>
        );
      })()}

      {/* RULES & FAQ */}
      <RulesFaqSection />
    </div>
  );
}

function PodiumCell({row, pos}: {row: LeaderboardRow; pos: "first"|"second"|"third"}) {
  return (
    <div className={`podium-cell ${pos}`}>
      <div className="podium-avatar">
        {row.initials}
        <span className="podium-rank">{row.rank}</span>
      </div>
      <div className="podium-name">{row.display_name}</div>
      <div className="podium-score">{row.score.toLocaleString()}<span className="unit">pts</span></div>
      <div className="podium-bar">{pos === "first" ? "1st" : pos === "second" ? "2nd" : "3rd"}</div>
    </div>
  );
}

function LbRow({row}: {row: LeaderboardRow}) {
  return (
    <div className={`lb-row${row.is_current_user ? " you" : ""}`}>
      <span className="lb-rank">{row.rank}</span>
      <span className="lb-avatar">{row.initials}</span>
      <span className="lb-name-wrap">
        <span className="lb-name">{row.display_name}</span>
        {row.location && <span className="lb-loc">{row.location}</span>}
      </span>
      <span className="lb-receipts">{row.receipts_count} receipts</span>
      <span className="lb-score">{row.score.toLocaleString()}<span className="unit" style={{fontSize:11,color:"var(--muted)",fontWeight:600,marginLeft:2,fontFamily:"var(--sans)"}}>pts</span></span>
    </div>
  );
}

function EventCard({event}: {event: FpEvent}) {
  const status = eventStatus(event.start_date, event.end_date);
  const bannerClass = event.banner_color ?? "tax";
  return (
    <a href="#" className="event-card">
      <div className={`event-banner ${bannerClass}`}>
        <div className="event-banner-pattern" />
        <span className={`event-banner-tag ${status}`}>
          {status === "live" && <span style={{width:5,height:5,borderRadius:"50%",background:"#fff",display:"inline-block"}} />}
          {status === "live" ? "Live" : status === "upcoming" ? "Upcoming" : "Ended"}
        </span>
        <h3 className="event-banner-title">{event.title}</h3>
      </div>
      <div className="event-body">
        <div className="event-meta">
          <span><Calendar size={12} /> {formatDate(event.start_date)} – {formatDate(event.end_date)}</span>
        </div>
        {event.prize_pool && (
          <div className="event-prize"><span className="currency">RM</span>{event.prize_pool.toLocaleString()} pool</div>
        )}
        <p className="event-desc">{event.description}</p>
        <div className="event-foot">
          <small>
            {status === "live" ? "Running now" : status === "upcoming" ? `Opens ${formatDate(event.start_date)}` : "Ended"}
          </small>
          <span className="event-cta-mini">
            {status === "ended" ? "Recap" : status === "live" ? "Join" : "Remind me"} <ChevronRight size={12} />
          </span>
        </div>
      </div>
    </a>
  );
}

function PrizeStack() {
  return (
    <div className="prize-stack">
      <div className="prize-confetti" style={{top:"4%",left:"60%",transform:"rotate(35deg)",background:"#FFD89B"}} />
      <div className="prize-confetti" style={{top:"24%",left:"8%",transform:"rotate(-15deg)",background:"#FFE3A8"}} />
      <div className="prize-confetti" style={{bottom:"18%",right:"30%",transform:"rotate(60deg)",background:"#FFFFFF"}} />
      <div className="prize-confetti" style={{bottom:"36%",left:"20%",transform:"rotate(-40deg)",background:"#C9BAFB"}} />
      <div className="prize-coin c2"><span className="amount">5K</span><span className="label">2nd place</span></div>
      <div className="prize-coin c1"><span className="amount">15K</span><span className="label">Grand prize</span></div>
      <div className="prize-coin c3"><span className="amount">2K</span><span className="label">3rd place</span></div>
    </div>
  );
}

function QrPlaceholder() {
  return (
    <div style={{width:78,height:78,borderRadius:12,background:"#fff",padding:8,display:"flex",alignItems:"center",justifyContent:"center"}}>
      <svg width="62" height="62" viewBox="0 0 62 62" fill="none">
        <rect x="2" y="2" width="24" height="24" rx="3" stroke="#1A1530" strokeWidth="2"/>
        <rect x="8" y="8" width="12" height="12" fill="#1A1530"/>
        <rect x="36" y="2" width="24" height="24" rx="3" stroke="#1A1530" strokeWidth="2"/>
        <rect x="42" y="8" width="12" height="12" fill="#1A1530"/>
        <rect x="2" y="36" width="24" height="24" rx="3" stroke="#1A1530" strokeWidth="2"/>
        <rect x="8" y="42" width="12" height="12" fill="#1A1530"/>
        <rect x="36" y="36" width="6" height="6" fill="#1A1530"/>
        <rect x="44" y="36" width="6" height="6" fill="#1A1530"/>
        <rect x="52" y="36" width="8" height="8" fill="#1A1530"/>
        <rect x="36" y="44" width="6" height="6" fill="#1A1530"/>
        <rect x="44" y="52" width="6" height="8" fill="#1A1530"/>
        <rect x="52" y="52" width="8" height="8" fill="#1A1530"/>
      </svg>
    </div>
  );
}

const howSteps = [
  {title:"Open the app",desc:"Tap Events on the home tab. Pick a contest. Read the rules in 30 seconds and join with one tap.",icon:<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="14" y="6" width="28" height="44" rx="6" stroke="#5837C9" strokeWidth="1.5"/><rect x="20" y="14" width="16" height="22" rx="3" fill="#EDE7FB"/><circle cx="28" cy="42" r="2" fill="#5837C9"/></svg>},
  {title:"Scan receipts",desc:"Snap any receipt that matches the contest theme. Our OCR extracts merchant, items and total in 2 seconds.",icon:<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="10" y="6" width="22" height="44" rx="2" fill="#EDE7FB" stroke="#5837C9" strokeWidth="1.5"/><line x1="14" y1="14" x2="28" y2="14" stroke="#5837C9" strokeWidth="1.2"/><line x1="14" y1="20" x2="28" y2="20" stroke="#5837C9" strokeWidth="1.2"/><line x1="14" y1="26" x2="24" y2="26" stroke="#5837C9" strokeWidth="1.2"/><circle cx="42" cy="40" r="10" fill="#FFD89B" stroke="#E89B2A" strokeWidth="1.5"/><path d="M37 40l3 3 6-6" stroke="#2A1758" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>},
  {title:"Climb the board",desc:"Each receipt earns points. Score updates within seconds. Watch your rank rise on the live leaderboard.",icon:<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><rect x="6" y="34" width="12" height="18" rx="2" fill="#C9BAFB"/><rect x="22" y="22" width="12" height="30" rx="2" fill="#8E73F0"/><rect x="38" y="12" width="12" height="40" rx="2" fill="#5837C9"/></svg>},
  {title:"Win and cash out",desc:"Top 50 win cash, vouchers or app credits. Prizes drop straight into your Finpersona wallet.",icon:<svg width="56" height="56" viewBox="0 0 56 56" fill="none"><circle cx="28" cy="28" r="20" fill="url(#gld)"/><text x="28" y="34" textAnchor="middle" fontFamily="serif" fontSize="18" fill="#2A1758" fontWeight="500">$</text><defs><linearGradient id="gld" x1="0" y1="0" x2="56" y2="56"><stop offset="0" stopColor="#FFE3A8"/><stop offset="1" stopColor="#E89B2A"/></linearGradient></defs></svg>},
];

function RulesFaqSection() {
  const rules = [
    {text:<><strong>One account, one entry.</strong> Verified phone numbers only. Duplicate accounts disqualified.</>},
    {text:<><strong>Receipts must be original.</strong> Photo or e-receipt accepted. Same receipt scanned twice — both rejected.</>},
    {text:<><strong>Theme matters.</strong> Each contest has eligible categories. Off-theme receipts still count for tax tracking but not contest points.</>},
    {text:<><strong>Daily caps apply.</strong> Max 20 receipts per day to discourage farming. Quality over quantity.</>},
    {text:<><strong>Open to Malaysian residents</strong> 18 and over. Prizes paid in 5 working days after contest close.</>},
  ];
  const faqs = [
    {q:"Do I need to pay to join?",a:"No. Every contest is free. You just need a Finpersona account and at least one valid receipt."},
    {q:"How are receipts verified?",a:"Our OCR pulls merchant name, date, total and line items. Suspicious entries get flagged automatically and reviewed within 24 hours."},
    {q:"When do prizes pay out?",a:"Cash prizes hit your linked bank within 5 working days after the contest ends. App credits are instant. Vouchers arrive via email."},
    {q:"Can my receipts also count for tax?",a:"Yes — anything you scan gets categorized for both the contest and your tax tracker. Two birds, one snap."},
    {q:"What if I don't want to be on the leaderboard?",a:"In Settings → Privacy, toggle 'Anonymous on leaderboard'. You'll show as a generated handle. You still win normally."},
  ];
  return (
    <section className="rules-section">
      <div className="container">
        <div className="rules-grid">
          <div>
            <div className="section-head" style={{marginBottom:28}}>
              <span className="section-eyebrow">Ground rules</span>
              <h2 className="section-h2">How we keep it <em>fair.</em></h2>
            </div>
            <div className="rules-list">
              {rules.map((r,i) => (
                <div key={i} className="rule-item">
                  <div className="rule-num">{i+1}</div>
                  <div className="rule-text">{r.text}</div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="section-head" style={{marginBottom:28}}>
              <span className="section-eyebrow">FAQ</span>
              <h2 className="section-h2">Common <em>questions.</em></h2>
            </div>
            {faqs.map((f,i) => (
              <div key={i} className="faq-item">
                <div className="faq-q">{f.q} <span style={{color:"var(--muted)",fontWeight:500}}>+</span></div>
                <div className="faq-a">{f.a}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
