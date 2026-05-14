import type {Metadata} from "next";
import {getPlatformStats, fmtCount, fmtCurrency} from "@/lib/stats";

export const metadata: Metadata = {
  title: "Finpersona - AI-native personal finance platform",
  description: "Track expenses, split bills, plan trips, shop claimables, and maximize LHDN reliefs — all with an AI advisor that knows your finances. Built for Malaysia.",
  alternates: {canonical: "https://finpersona.com"},
  openGraph: {
    title: "Finpersona - AI-native personal finance platform",
    description: "Track expenses, split bills, plan trips, shop claimables, and maximize LHDN reliefs. Built for Malaysia.",
    url: "https://finpersona.com",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SoftwareApplication",
  name: "Finpersona",
  applicationCategory: "FinanceApplication",
  operatingSystem: "iOS, Android",
  description: "AI-native personal finance platform for Malaysians. Track expenses, maximize LHDN tax reliefs, split bills.",
  offers: {"@type": "Offer", price: "0", priceCurrency: "MYR"},
  publisher: {"@type": "Organization", name: "Aexlora Sdn Bhd", url: "https://finpersona.com"},
};

export default function HomePage() { 
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <FinalCTASection />
    </>
  );
}

function HeroSection() {
  return (
    <section className="hero">
      <div className="hero-bg" />
      <div className="container hero-grid">
        <div>
          <div className="eyebrow">
            <span className="eyebrow-dot" />
            Built for Malaysia · LHDN-aware
          </div>
          <h1 className="h1 hero-h1">
            Your money,<br />
            with a <em>personality</em>.
          </h1>
          <p className="lede">
            Track expenses, split bills, plan trips, shop claimables, and maximize LHDN reliefs — all with an AI advisor that actually knows your finances.
          </p>
          <div className="hero-cta">
            <a className="btn btn-primary" href="https://app.finpersona.com">
              <span>Start tracking — it&apos;s free</span>
              <span>→</span>
            </a>
            <a className="btn btn-secondary" href="#features">See features</a>
          </div>
        </div>
        <div className="phone-wrap">
          <PhoneMockup />
        </div>
      </div>
      <div className="container">
        <LiveCounters />
      </div>
    </section>
  );
}

function PhoneMockup() {
  return (
    <div className="phone">
      <div className="phone-screen">
        <div className="phone-island" />
        <div className="app-status"><span>9:41</span><span>·····</span></div>
        <div className="app-greeting">
          <div className="s">Tuesday, 4 May</div>
          <div className="h">Hey, Aisha</div>
        </div>
        <div className="balance-card">
          <div className="balance-label">Total balance</div>
          <div className="balance-amount">RM 12,486.40</div>
          <div style={{fontSize:11,opacity:0.85,marginTop:4,position:"relative"}}>3 accounts · MYR · SGD</div>
        </div>
        <div className="quick-grid">
          {[
            {label:"Capture",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M4 8h3l2-2h6l2 2h3a1 1 0 011 1v9a1 1 0 01-1 1H4a1 1 0 01-1-1V9a1 1 0 011-1z"/><circle cx="12" cy="13" r="3"/></svg>},
            {label:"Split",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="9" cy="8" r="3"/><circle cx="17" cy="8" r="3"/><path d="M3 20c0-3 3-5 6-5s6 2 6 5M21 20c0-3-3-5-6-5"/></svg>},
            {label:"Shop",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 8l9-5 9 5v8l-9 5-9-5V8z"/><path d="M3 8l9 5M21 8l-9 5M12 13v9"/></svg>},
            {label:"Travel",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l5-9 4 5 4-3 5 7"/><path d="M3 19h18"/></svg>},
          ].map(q=>(
            <div key={q.label} className="quick-tile">
              <div className="ico">{q.icon}</div>
              <div className="lab">{q.label}</div>
            </div>
          ))}
        </div>
        <div className="ai-chip">
          <div className="l">✦ Advisor insight</div>
          <div className="t">You&apos;re <strong>RM 384 ahead</strong> of last month. Tag your bookstore receipt to claim under Lifestyle.</div>
        </div>
        <div className="ai-chip" style={{marginTop:8}}>
          <div className="l" style={{color:"var(--green)"}}>↗ Marketplace</div>
          <div className="t">Sports gear sale ends today — RM 580 of relief left.</div>
        </div>
      </div>
    </div>
  );
}

async function LiveCounters() {
  const stats = await getPlatformStats();
  const counters = [
    {
      label: "Receipts captured",
      value: fmtCount(stats.receiptsTotal),
      trend: stats.receiptsToday > 0 ? `+${stats.receiptsToday} today` : "updated live",
    },
    {
      label: "Tracked spend",
      prefix: "RM",
      value: fmtCurrency(stats.trackedSpendMyr),
      trend: stats.spendThisWeek > 0 ? `+RM ${fmtCurrency(stats.spendThisWeek)} this week` : "across all users",
    },
    {
      label: "LHDN reliefs claimed",
      prefix: "RM",
      value: fmtCurrency(stats.lhdnReliefsMyr),
      trend: stats.lhdnAvgPerUser > 0 ? `RM ${fmtCurrency(stats.lhdnAvgPerUser)} avg / user` : "from claimable receipts",
    },
    {
      label: "Active Malaysians",
      value: fmtCount(stats.activeUsers),
      trend: "and growing",
    },
  ];
  return (
    <div className="counters">
      {counters.map((c,i)=>(
        <div key={i} className="counter-cell">
          <div className="counter-label">
            <span className="counter-live" />
            {c.label}
          </div>
          <div className="counter-value">
            {c.prefix && <span className="counter-prefix">{c.prefix}</span>}
            <span className="tabular">{c.value}</span>
          </div>
          <div className="counter-trend">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
            <span>{c.trend}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

function FeaturesSection() {
  return (
    <section className="pillars-section" id="features">
      <div className="container">
        <div className="section-head" style={{textAlign:"left",margin:"0 0 40px"}}>
          <div className="eyebrow" style={{marginBottom:16}}><span className="eyebrow-dot" />Six features. One app.</div>
          <h2 className="h2">Everything you do with money — <em>without</em> the busywork.</h2>
        </div>
        <div className="bento">
          <TaxCard />
          <MarketplaceCard />
          <SplitBillCard />
          <TravelCard />
          <ExpenseCard />
          <AdvisorCard />
          <RemindersCard />
        </div>
      </div>
    </section>
  );
}

function TaxCard() {
  return (
    <div className="bento-card b-tax" id="tax">
      <div className="bento-tag"><span className="dot" />LHDN Reliefs · Auto-tagged</div>
      <h3>Stop leaving <em>tax savings</em> on the table.</h3>
      <p>Every receipt is matched to the right LHDN relief category — Lifestyle, Medical, Sports, Skills, SSPN — and tracked against the cap. No spreadsheet, no rummaging in March.</p>
      <div className="bento-visual">
        <div className="tax-savings-card">
          <div className="tax-savings-label">Estimated savings this year</div>
          <div className="tax-savings-amount">RM 1,840</div>
          <div style={{fontSize:13,opacity:0.85,marginTop:6}}>From 47 tagged receipts · 11% bracket</div>
          <div className="tax-relief-row">
            <span className="tax-pill">Lifestyle · RM 1,842 / 2,500</span>
            <span className="tax-pill">Medical · RM 2,108 / 10,000</span>
            <span className="tax-pill">Sports · RM 480 / 1,000</span>
            <span className="tax-pill">Skills · RM 920 / 7,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function MarketplaceCard() {
  return (
    <div className="bento-card b-marketplace" id="marketplace">
      <div className="bento-tag"><span className="dot" />Marketplace · NEW</div>
      <h3>Shop <em>claimables</em>. Receipts, automatic.</h3>
      <p>Curated products that count toward LHDN reliefs. Buy through Finpersona — the receipt files itself.</p>
      <div className="bento-visual">
        <div className="mp-product">
          <div className="mp-product-img">
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#6E4CE6" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h7v16H6a2 2 0 01-2-2V4zM20 4h-7v16h5a2 2 0 002-2V4z"/></svg>
          </div>
          <div className="mp-product-tag">Lifestyle relief</div>
          <div className="mp-product-name">Atomic Habits — James Clear</div>
          <div className="mp-product-price">RM 58.90</div>
          <div className="mp-auto-receipt">
            <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12l5 5L20 7"/></svg>
            Receipt auto-stored on purchase
          </div>
        </div>
      </div>
    </div>
  );
}

function SplitBillCard() {
  return (
    <div className="bento-card b-split">
      <div className="bento-tag"><span className="dot" />Split bill</div>
      <h3>Dinner for six,<br /><em>settled</em> by dessert.</h3>
      <p>Snap the receipt, tag who ate what, send DuitNow links — no spreadsheets, no IOUs.</p>
      <div className="bento-visual">
        <div className="split-card">
          <div className="split-total">
            <div style={{fontSize:11,color:"var(--muted)",fontWeight:600,letterSpacing:"0.4px",textTransform:"uppercase"}}>Mama&apos;s Kitchen</div>
            <div className="split-total-amt">RM 248</div>
          </div>
          <div className="split-people">
            {["A","R","S","M"].map((l,i)=>(
              <div key={i} className="p" style={{background:["linear-gradient(135deg,#FFD7C2,#E8B4D9)","linear-gradient(135deg,#A8D8EA,#7BB7E0)","linear-gradient(135deg,#C9E5C2,#88C97D)","linear-gradient(135deg,#F5C7B8,#E89B7A)"][i]}}>{l}</div>
            ))}
            <div className="p" style={{background:"var(--mist-deep)",color:"var(--purple-deep)"}}>+2</div>
          </div>
          <div className="split-rows">
            <div className="split-row paid"><span className="name">Aisha</span><span className="amt">RM 41.30 ✓</span></div>
            <div className="split-row paid"><span className="name">Raj</span><span className="amt">RM 38.60 ✓</span></div>
            <div className="split-row"><span className="name">Sarah</span><span className="amt">RM 52.10</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function TravelCard() {
  return (
    <div className="bento-card b-travel">
      <div className="bento-tag"><span className="dot" />Travel Assist</div>
      <h3>Trip math,<br /><em>handled</em>.</h3>
      <p>Multi-currency, live FX, daily budget pacing. Tag work travel for separate reporting.</p>
      <div className="bento-visual">
        <div className="travel-card">
          <div className="travel-route">Trip · 12 — 16 May</div>
          <div className="travel-cities">Kuala Lumpur → Tokyo</div>
          <div className="travel-stats">
            <div><span className="l">Spent</span><span className="v">¥48,200</span></div>
            <div><span className="l">In MYR</span><span className="v">RM 1,420</span></div>
            <div><span className="l">Daily pace</span><span className="v">−18%</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

function ExpenseCard() {
  const cats = [
    {label:"Dining",pct:"78%",color:"linear-gradient(90deg,#D97636,#E89B7A)",amt:"RM 612",cls:"food",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 11h18l-2 9H5l-2-9z"/><path d="M3 11l1-3h16l1 3"/></svg>},
    {label:"Transport",pct:"52%",color:"linear-gradient(90deg,#1E80B5,#7BB7E0)",amt:"RM 408",cls:"transport",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 17h14l-1.5-7H6.5L5 17z"/><circle cx="8" cy="17" r="2"/><circle cx="16" cy="17" r="2"/></svg>},
    {label:"Shopping",pct:"38%",color:"linear-gradient(90deg,#6E4CE6,#B8A6F5)",amt:"RM 296",cls:"shop",icon:<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 13H6L5 8z"/><path d="M9 8V5a3 3 0 016 0v3"/></svg>},
  ];
  return (
    <div className="bento-card b-expense">
      <div className="bento-tag"><span className="dot" />Expense tracking</div>
      <h3>Every ringgit,<br /><em>categorised</em>.</h3>
      <p>Auto-categorised from your bank feed and receipts. Spot patterns before they hurt.</p>
      <div className="bento-visual">
        <div className="exp-cats">
          {cats.map(c=>(
            <div key={c.label} className="exp-cat">
              <div className={`exp-cat-i ${c.cls}`}>{c.icon}</div>
              <span className="exp-cat-name">{c.label}</span>
              <div className="exp-cat-bar"><i style={{width:c.pct,background:c.color}} /></div>
              <span className="exp-cat-amt">{c.amt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function AdvisorCard() {
  return (
    <div className="bento-card b-advisor">
      <div className="bento-tag"><span className="dot" />AI Financial Advisor</div>
      <h3>An advisor that <em>actually</em> knows your money.</h3>
      <p>Plan goals, stress-test purchases, set reminders. Trained on your real spending — not generic advice.</p>
      <div className="bento-visual">
        <div className="advisor-bubble">
          <div className="advisor-q">Can I afford a 4-day Bali trip in July?</div>
          <div className="advisor-a">Yes — comfortably. You have <strong>RM 2,140</strong> buffer. A typical trip runs <strong>RM 1,650</strong>. Move RM 400/wk to your Travel pot.</div>
        </div>
      </div>
    </div>
  );
}

function RemindersCard() {
  return (
    <div className="bento-card b-reminders">
      <div className="bento-tag"><span className="dot" />Goals &amp; reminders</div>
      <h3>Never miss a relief or deadline.</h3>
      <p>Finpersona warns you before you drift.</p>
      <div className="bento-visual">
        <div className="reminder-list">
          <div className="reminder-row">
            <div className="reminder-i amber">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/></svg>
            </div>
            <div>
              <div className="t">Borang BE deadline</div>
              <div className="s">RM 1,840 projected reliefs</div>
            </div>
            <span className="when">Apr 30</span>
          </div>
          <div className="reminder-row">
            <div className="reminder-i green">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M3 12l5-9 4 5 4-3 5 7"/></svg>
            </div>
            <div>
              <div className="t">Bali goal · 76%</div>
              <div className="s">RM 1,254 of RM 1,650</div>
            </div>
            <span className="when">15 days</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function HowItWorksSection() {
  const steps = [
    {num:"i.",title:"Connect or capture",desc:"Link your bank, snap a receipt, or shop in the Marketplace. Finpersona pulls everything into one feed — categorised and LHDN-tagged."},
    {num:"ii.",title:"Live tracking",desc:"Split bills, track trip spend, watch monthly categories, hit savings goals. Reminders fire when caps approach or deadlines loom."},
    {num:"iii.",title:"Ask the advisor",desc:"Plan a goal. Stress-test a purchase. File your taxes with everything pre-tagged. The advisor knows your money."},
  ];
  return (
    <section className="how">
      <div className="container">
        <div style={{maxWidth:640}}>
          <div className="eyebrow" style={{marginBottom:20}}><span className="eyebrow-dot" />How it works</div>
          <h2 className="h2">Three steps. <em>Forever</em> sorted.</h2>
        </div>
        <div className="how-grid">
          {steps.map(s=>(
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

function FinalCTASection() {
  return (
    <section className="section">
      <div className="container">
        <div className="final-cta">
          <h2>Ready to keep more of <em>your</em> ringgit?</h2>
          <p>Join 1,000+ Malaysians already tracking smarter, claiming more, and stressing less about money.</p>
          <div style={{display:"inline-flex",gap:12,flexWrap:"wrap",justifyContent:"center"}}>
            <a className="btn btn-light" href="#"><span>Get the app — free</span><span>→</span></a>
            <a className="btn" style={{background:"rgba(255,255,255,0.15)",color:"#fff",border:"0.5px solid rgba(255,255,255,0.3)"}} href="/advisors">For financial advisors</a>
          </div>
        </div>
      </div>
    </section>
  );
}
