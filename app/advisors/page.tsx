import type {Metadata} from "next";
import WaitlistForm from "@/components/waitlist-form";

export const metadata: Metadata = {
  title: "For Advisors",
  description: "Finpersona for Financial Advisors — connect client records, record meetings offline, get instant transcripts and action items. Built for Malaysian advisors.",
  alternates: {canonical: "https://finpersona.com/advisors"},
  openGraph: {
    title: "Finpersona for Advisors",
    description: "Less prep. More advice. Connect client records, record meetings, get instant transcripts. Built for Malaysian financial advisors.",
    url: "https://finpersona.com/advisors",
  },
};

export default function AdvisorsPage() {
  return (
    <div>
      <HeroSection />
      <WhySection />
      <RecordingSection />
      <WorkflowSection />
      <FaqSection />
      <FinalCTASection />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="adv-hero">
      <div className="hero-bg" />
      <div className="container adv-hero-grid">
        <div>
          <div className="coming-soon-badge"><span className="pulse" />Coming soon · Limited beta cohort</div>
          <h1 className="h1 hero-h1">
            Less prep.<br />
            More <em>advice</em>.
          </h1>
          <p className="lede">
            Finpersona for Advisors plugs into your clients&apos; financial records — so when they walk in, you already know the numbers. Record the meeting on your phone, get an instant transcript, send the action plan before you&apos;re back at your desk.
          </p>
          <WaitlistForm />
          <p style={{fontSize:12,color:"var(--muted)",margin:"14px 0 0"}}>Free during beta. Built with Malaysian advisors. No commitment.</p>
        </div>
        <div>
          <DeskMockup />
        </div>
      </div>
    </section>
  );
}

function DeskMockup() {
  return (
    <div className="desk-card">
      <div className="desk-header">
        <div className="desk-dot" style={{background:"#E5484D"}} />
        <div className="desk-dot" style={{background:"#E89B2A"}} />
        <div className="desk-dot" style={{background:"#1FB573"}} />
        <div className="desk-title">Finpersona Advisor · Kavitha Menon</div>
      </div>
      <div className="desk-body">
        <div className="desk-side">
          <div style={{fontSize:9,fontWeight:700,color:"var(--muted)",letterSpacing:"0.5px",textTransform:"uppercase",padding:"0 6px 4px"}}>Today · 4 clients</div>
          {[
            {init:"AT",name:"Aisha Tan",colors:"linear-gradient(135deg,#FFD7C2,#E8B4D9)",active:true},
            {init:"RK",name:"Raj Kumar",colors:"linear-gradient(135deg,#A8D8EA,#7BB7E0)",active:false},
            {init:"SL",name:"Sarah Lim",colors:"linear-gradient(135deg,#C9E5C2,#88C97D)",active:false},
            {init:"MA",name:"Mohd Adli",colors:"linear-gradient(135deg,#F5C7B8,#E89B7A)",active:false},
          ].map(c => (
            <div key={c.init} className={`client-row${c.active?" active":""}`}>
              <div className="client-avatar" style={{background:c.colors}}>{c.init}</div>
              {c.name}
            </div>
          ))}
        </div>
        <div className="desk-main">
          <div className="client-header">
            <div className="client-h-avatar">AT</div>
            <div style={{flex:1}}>
              <div className="client-h-name">Aisha Tan</div>
              <div className="client-h-meta">Connected since Jan 2026 · Last review 47 days ago</div>
            </div>
            <div style={{fontSize:10,padding:"4px 8px",background:"rgba(31,181,115,0.12)",color:"var(--green)",borderRadius:6,fontWeight:700,letterSpacing:"0.3px"}}>SYNCED</div>
          </div>
          <div className="stat-row">
            <div className="stat"><div className="stat-l">Net worth</div><div className="stat-v">RM 184k</div></div>
            <div className="stat"><div className="stat-l">Mthly savings</div><div className="stat-v green">RM 2,140</div></div>
            <div className="stat"><div className="stat-l">LHDN proj</div><div className="stat-v purple">RM 1,840</div></div>
          </div>
          <div className="timeline">
            <div style={{fontSize:10,fontWeight:700,color:"var(--muted)",letterSpacing:"0.5px",textTransform:"uppercase",marginBottom:8}}>Prep notes · auto-generated</div>
            {[
              <>Dining spend up <strong>23%</strong> in last 60 days — possible budget conversation.</>,
              <>Travel goal at <strong>76%</strong>, on track for July booking window.</>,
              <>Hasn&apos;t tagged any <strong>SSPN contributions</strong> — RM 8,000 cap untouched.</>,
            ].map((t,i) => (
              <div key={i} className="timeline-row">
                <span className="timeline-dot" />
                <div>{t}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function WhySection() {
  const cards = [
    {
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 10l9-6 9 6v2H3zM5 12v6M9 12v6M15 12v6M19 12v6M3 19h18"/></svg>,
      title:"Connect, don't chase.",
      desc:"Your client opens the app, taps 'Share with my advisor', picks you, done. Bank balances, recurring bills, tagged LHDN reliefs — all in your dashboard, refreshed live. No PDF statements emailed at 11pm.",
    },
    {
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3v4M12 17v4M3 12h4M17 12h4M5.6 5.6l2.8 2.8M15.6 15.6l2.8 2.8"/></svg>,
      title:"Briefed before you sit down.",
      desc:"Auto-generated prep notes flag the conversations worth having: spending shifts, untouched reliefs, drift from goals. Walk in with three sharp questions instead of a fact-finding form.",
    },
    {
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 00.4 1.9l.1.1a2 2 0 01-2.8 2.8l-.1-.1a1.7 1.7 0 00-1.9-.4 1.7 1.7 0 00-1 1.5V21a2 2 0 01-4 0v-.1a1.7 1.7 0 00-1.1-1.5"/></svg>,
      title:"One source of truth.",
      desc:"No more reconciling four broker PDFs and a Maybank statement. LHDN reliefs, EPF, insurance, investments — everything the client touches in Finpersona shows up in your view, normalised.",
    },
    {
      icon:<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3l8 3v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V6l8-3z"/><path d="M9 12l2 2 4-4"/></svg>,
      title:"Compliant by default.",
      desc:"Client-granted access, audit log, revoke anytime. Records stay in Malaysia. PDPA-aligned. SC and FIMM advisor flows respected — Finpersona is the tool, you remain the licensed adviser.",
    },
  ];
  return (
    <section className="section">
      <div className="container">
        <div style={{maxWidth:720}}>
          <div className="eyebrow" style={{marginBottom:20}}><span className="eyebrow-dot" />Built for Malaysian advisors</div>
          <h2 className="h2">The prep work, <em>handled</em>.</h2>
          <p className="lede" style={{marginTop:16}}>Most of an advisor&apos;s job is gathering numbers, not giving advice. Finpersona flips that — clients share their finances in one tap, you arrive at the meeting already briefed.</p>
        </div>
        <div className="adv-why">
          {cards.map((c,i) => (
            <div key={i} className="why-card">
              <div className="feat-icon">{c.icon}</div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RecordingSection() {
  const features = [
    {title:"Works offline. Records everywhere.",desc:"Coffee shops, airport lounges, client's living room. Audio stored encrypted on-device, transcribed when back online."},
    {title:"Pair both phones in one tap.",desc:"Two-channel capture — your voice on yours, theirs on theirs — merged with perfect speaker labels. No clip-on mics, no awkward laptop on the table."},
    {title:"Action items, lifted automatically.",desc:"Finpersona pulls out follow-ups, decisions, numbers — and drops them into a draft email to the client before you reach the car."},
  ];
  const waveHeights = [8,16,24,12,20,32,28,18,10,22,30,18,8,14,26,34,22,12,20,28,16,8,12,22,30,16,10,20,26,14];
  return (
    <section className="section adv-record-section">
      <div className="container">
        <div className="adv-record-grid">
          <div>
            <div className="eyebrow" style={{marginBottom:20}}><span className="eyebrow-dot" />Phone-to-phone recording</div>
            <h2 className="h2">The whole meeting,<br /><em>typed up</em> for you.</h2>
            <p className="lede" style={{marginTop:16}}>Sit down with a client at a kopitiam in Ipoh with no Wi-Fi? Finpersona records on-device — both phones, two-channel, speaker-tagged. You get a clean transcript the moment you reconnect.</p>
            <div style={{marginTop:28,display:"grid",gap:14}}>
              {features.map((f,i) => (
                <div key={i} style={{display:"flex",gap:12,alignItems:"flex-start"}}>
                  <div style={{width:28,height:28,borderRadius:8,background:"var(--mist-deep)",color:"var(--purple-deep)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
                  </div>
                  <div>
                    <div style={{fontSize:15,fontWeight:600,color:"var(--ink)",letterSpacing:"-0.2px"}}>{f.title}</div>
                    <div style={{fontSize:13.5,color:"var(--ink2)",marginTop:2,lineHeight:1.5}}>{f.desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="phone-pair">
            <div className="mini-phone">
              <div className="mini-phone-screen">
                <div className="mini-island" />
                <div className="rec-label">Live · 1 of 2</div>
                <div className="rec-status">
                  <div style={{fontSize:10,opacity:0.7,letterSpacing:"0.4px",textTransform:"uppercase",fontWeight:600}}><span className="rec-dot" />Recording</div>
                  <div className="rec-time">12:47</div>
                  <div className="rec-meta">Aisha Tan · Q2 Review</div>
                </div>
                <div className="wave">
                  {waveHeights.map((h,i) => (
                    <i key={i} style={{height:h,opacity:i<18?1:0.3}} />
                  ))}
                </div>
                <div style={{textAlign:"center"}}>
                  <div className="offline-pill">
                    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l5 5L20 7"/></svg>
                    Offline · saved on device
                  </div>
                </div>
                <div style={{margin:"14px 6px 0",padding:"10px 12px",borderRadius:10,background:"var(--mist)",border:"0.5px solid var(--hairline)"}}>
                  <div style={{fontSize:9,fontWeight:700,color:"var(--purple-deep)",letterSpacing:"0.5px",textTransform:"uppercase"}}>Paired</div>
                  <div style={{fontSize:10.5,color:"var(--ink)",marginTop:2}}>Aisha&apos;s iPhone · channel 2</div>
                </div>
              </div>
            </div>
            <div className="mini-phone" style={{transform:"translateY(20px)"}}>
              <div className="mini-phone-screen" style={{padding:"36px 8px 14px"}}>
                <div className="mini-island" />
                <div style={{padding:"0 8px",display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                  <div>
                    <div style={{fontSize:14,fontWeight:700,letterSpacing:"-0.3px"}}>Transcript</div>
                    <div style={{fontSize:9.5,color:"var(--muted)",marginTop:1}}>Q2 Review · 47 min · ready</div>
                  </div>
                  <div style={{fontSize:9,padding:"3px 7px",background:"rgba(31,181,115,0.15)",color:"var(--green)",borderRadius:4,fontWeight:700,letterSpacing:"0.3px"}}>SYNCED</div>
                </div>
                <div className="transcript-list" style={{marginTop:10,flex:1,overflow:"hidden"}}>
                  {[
                    {spk:"Kavitha",cls:"advisor",t:"00:42",text:<>So Aisha, I noticed your dining is up — about <span className="t-highlight">RM 612 this cycle</span>. What&apos;s been driving that?</>},
                    {spk:"Aisha",cls:"client",t:"00:58",text:"Honestly, lots of work lunches this month. Should I be worried?"},
                    {spk:"Kavitha",cls:"advisor",t:"01:11",text:<>Not yet — but let&apos;s <span className="t-highlight">cap it at RM 700</span> and revisit in 30 days.</>},
                    {spk:"Aisha",cls:"client",t:"01:24",text:"Sounds fair. What about the Bali trip?"},
                  ].map((line,i) => (
                    <div key={i} className="t-line">
                      <div><span className={`t-speaker ${line.cls}`}>{line.spk}</span><span className="t-time">{line.t}</span></div>
                      <div className="t-text">{line.text}</div>
                    </div>
                  ))}
                </div>
                <div style={{margin:"8px 6px 0",padding:"9px 10px",borderRadius:10,background:"var(--mist-deep)",border:"0.5px solid var(--purple-light)"}}>
                  <div style={{fontSize:9,fontWeight:700,color:"var(--purple-deep)",letterSpacing:"0.5px",textTransform:"uppercase"}}>3 actions extracted</div>
                  <div style={{fontSize:10,color:"var(--ink2)",marginTop:3,lineHeight:1.4}}>Cap dining · Travel pot review · SSPN suggestion</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function WorkflowSection() {
  const steps = [
    {num:"i.",title:"Invite client",desc:"Send a one-tap invite. They install Finpersona, connect their accounts, you're linked."},
    {num:"ii.",title:"Prep, briefed",desc:"Open the dashboard the morning of. Auto-notes flag what's worth discussing."},
    {num:"iii.",title:"Meet & record",desc:"Pair both phones, hit record. Works offline. Two-channel, speaker-tagged."},
    {num:"iv.",title:"Send the plan",desc:"Transcript and action items land in your draft folder. Review, send, done."},
  ];
  return (
    <section className="section">
      <div className="container">
        <div style={{maxWidth:640}}>
          <div className="eyebrow" style={{marginBottom:20}}><span className="eyebrow-dot" />The workflow</div>
          <h2 className="h2">From <em>fact-find</em> to follow-up, in one app.</h2>
        </div>
        <div className="adv-workflow">
          {steps.map(s => (
            <div key={s.num} className="step">
              <div className="step-num">{s.num}</div>
              <h4>{s.title}</h4>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FaqSection() {
  const faqs = [
    {q:"Who owns the client's data?",a:"The client. They grant you read access to specific buckets — transactions, balances, reliefs — and can revoke at any time. You see what they've shared, nothing more. All audit logged."},
    {q:"Where are recordings stored?",a:"Captured on-device, encrypted at rest. Transcripts processed in Malaysia-based infrastructure. Audio is auto-purged 30 days after transcript review (configurable). PDPA-compliant."},
    {q:"Will Finpersona give my client advice directly?",a:"The consumer app offers educational AI insights — not licensed advice. When you're connected as their adviser, the app routes goal-planning and product-specific questions to you instead. You stay the regulated touchpoint."},
    {q:"When is the advisor product launching?",a:"Closed beta starts Q3 2026 with a small KL-based cohort. Public launch in Q1 2027. Waitlist signups get early access and locked-in beta pricing."},
    {q:"How much will it cost?",a:"Free during beta. At launch, advisor seats start at RM 89/month, scaling with active client connections. Consumer app stays free for your clients — always."},
  ];
  return (
    <section className="section">
      <div className="container">
        <div style={{maxWidth:640,margin:"0 auto 48px"}}>
          <div className="eyebrow" style={{marginBottom:20}}><span className="eyebrow-dot" />FAQ</div>
          <h2 className="h2">A few <em>questions</em> we hear.</h2>
        </div>
        <div className="adv-faq">
          {faqs.map((f,i) => (
            <div key={i} className="adv-faq-item">
              <h3 className="adv-faq-q">{f.q}</h3>
              <p className="adv-faq-a">{f.a}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function FinalCTASection() {
  return (
    <section className="section">
      <div className="container">
        <div className="adv-final-cta">
          <h2>Be one of the first <em>fifty</em>.</h2>
          <p>We&apos;re keeping the beta tight — fifty Malaysian advisors, three months of co-building. If you&apos;d rather spend more time advising and less time gathering, we&apos;d love to talk.</p>
          <WaitlistForm dark />
        </div>
      </div>
    </section>
  );
}
