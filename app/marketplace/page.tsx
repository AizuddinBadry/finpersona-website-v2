import type {Metadata} from "next";
import {BookOpen, Dumbbell, HeartPulse, GraduationCap, Check, ChevronRight} from "lucide-react";
import CategoryFilter from "@/components/category-filter";

export const metadata: Metadata = {
  title: "Marketplace",
  description: "Browse tax-claimable products from verified Malaysian businesses. Books, courses, sports, medical, lifestyle and more. Receipts filed automatically.",
  alternates: {canonical: "https://finpersona.com/marketplace"},
  openGraph: {
    title: "Finpersona Marketplace — Shop Claimables",
    description: "Curated products from verified Malaysian businesses. Buy and auto-claim LHDN tax reliefs in one step.",
    url: "https://finpersona.com/marketplace",
  },
};


const products = [
  {id:1,merchant:"MPH Bookstores",name:"Atomic Habits — James Clear",price:"58.90",relief:"Lifestyle",reliefAmt:"+RM 58.90",bg:"cat-bg-1",icon:<BookOpen size={28} strokeWidth={1.5}/>},
  {id:2,merchant:"Decathlon MY",name:"Kipsta Football Training Set",price:"148.00",relief:"Sports",reliefAmt:"+RM 148.00",bg:"cat-bg-2",icon:<Dumbbell size={28} strokeWidth={1.5}/>},
  {id:3,merchant:"KPJ Healthcare",name:"Full Medical Screening (Basic)",price:"288.00",relief:"Medical",reliefAmt:"+RM 288.00",bg:"cat-bg-3",icon:<HeartPulse size={28} strokeWidth={1.5}/>},
  {id:4,merchant:"Coursera MY",name:"Google Data Analytics Certificate",price:"349.00",relief:"Skills",reliefAmt:"+RM 349.00",bg:"cat-bg-5",icon:<GraduationCap size={28} strokeWidth={1.5}/>},
  {id:5,merchant:"Popular Bookshop",name:"Oxford Advanced Learner's Dict.",price:"72.50",relief:"Lifestyle",reliefAmt:"+RM 72.50",bg:"cat-bg-1",icon:<BookOpen size={28} strokeWidth={1.5}/>},
  {id:6,merchant:"Speedo Malaysia",name:"Competition Training Swimsuit",price:"189.00",relief:"Sports",reliefAmt:"+RM 189.00",bg:"cat-bg-2",icon:<Dumbbell size={28} strokeWidth={1.5}/>},
  {id:7,merchant:"Klinik Utama",name:"Annual Dental Checkup",price:"120.00",relief:"Medical",reliefAmt:"+RM 120.00",bg:"cat-bg-4",icon:<HeartPulse size={28} strokeWidth={1.5}/>},
  {id:8,merchant:"Udemy MY",name:"Complete Web Dev Bootcamp 2026",price:"79.00",relief:"Skills",reliefAmt:"+RM 79.00",bg:"cat-bg-6",icon:<GraduationCap size={28} strokeWidth={1.5}/>},
];

const reliefCategories = [
  {label:"Lifestyle",cap:"RM 2,500",Icon:BookOpen},
  {label:"Sports",cap:"RM 1,000",Icon:Dumbbell},
  {label:"Medical",cap:"RM 10,000",Icon:HeartPulse},
  {label:"Skills",cap:"RM 7,000",Icon:GraduationCap},
];

const howSteps = [
  {num:"1",title:"Browse & choose",desc:"Filter by LHDN relief category, price, or merchant. Every item is verified eligible."},
  {num:"2",title:"Buy through Finpersona",desc:"Checkout with your usual payment method. Your account is tagged automatically."},
  {num:"3",title:"Receipt filed instantly",desc:"An LHDN-ready receipt is generated and stored in your tax tracker the moment payment clears."},
];

const bizPerks = [
  {num:1,title:"Verified badge",desc:"Stand out with a green claimable tag — buyers trust it more than any star rating."},
  {num:2,title:"Zero listing fees",desc:"4.5% per sale. Free until you make your first RM 5,000."},
  {num:3,title:"Receipt automation",desc:"We generate LHDN-ready receipts the moment payment clears."},
  {num:4,title:"Built-in audience",desc:"38,000+ active Malaysians using the app weekly."},
];

export default function MarketplacePage() {
  return (
    <div>
      {/* HERO */}
      <section className="mkt-hero">
        <div className="mkt-hero-bg" />
        <div className="container mkt-hero-inner">
          <span className="eyebrow"><span className="eyebrow-dot" />Marketplace</span>
          <h1>Things worth buying.<br /><em>Some of them claimable.</em></h1>
          <p className="lead">Curated products and services from verified Malaysian businesses. Eligible items auto-categorized for your LHDN claim — no spreadsheet, no chasing receipts.</p>
          <div className="mkt-hero-row">
            <a href="#grid" className="btn btn-primary"><span>Browse the catalog</span><span>→</span></a>
            <a href="#apply" className="btn btn-secondary"><span>Apply as a business</span></a>
          </div>
        </div>
      </section>

      {/* CATEGORY BAR */}
      <CategoryFilter />

      {/* PRODUCT GRID */}
      <section className="mkt-grid-section" id="grid">
        <div className="container">

          {/* Featured banner */}
          <div className="mkt-featured-banner">
            <div className="fb-content">
              <span className="fb-tag">Tax season picks</span>
              <h2>Top up your relief before <em>Apr 30</em>.</h2>
              <p>Curated bundles that round out your tax reliefs. Lifestyle, sports gear, parenting books — claimable categories, ranked by remaining headroom in your relief tracker.</p>
              <div className="fb-meta">
                <div className="fb-meta-cell"><div className="label">Avg saved</div><div className="val">RM 1,840</div></div>
                <div className="fb-meta-cell"><div className="label">Verified merchants</div><div className="val">142</div></div>
                <div className="fb-meta-cell"><div className="label">Auto-claim rate</div><div className="val">98.4%</div></div>
              </div>
            </div>
            <div className="fb-visual">
              <div className="fb-stack">
                {reliefCategories.map(r => (
                  <div key={r.label} className="fb-tile">
                    <div className="fb-tile-icon"><r.Icon size={16} /></div>
                    <div>
                      <div className="fb-tile-name">{r.label}</div>
                      <div className="fb-tile-price">{r.cap}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="mkt-section-head">
            <div>
              <h3 className="mkt-section-title">Trending this <em>week</em>.</h3>
              <p className="mkt-section-sub">Most browsed by Finpersona users. Updated daily.</p>
            </div>
            <a href="#" className="mkt-section-link">See all 248 <ChevronRight size={13} /></a>
          </div>

          <div className="mkt-grid">
            {products.map(p => (
              <div key={p.id} className="product-card">
                <div className={`product-img ${p.bg}`}>
                  <div className="product-img-inner" style={{color:"var(--purple-deep)"}}>{p.icon}</div>
                  <span className="product-claimable">
                    <Check size={11} />
                    {p.relief} relief
                  </span>
                  <button className="product-save" aria-label="Save">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--ink2)" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M20.84 4.61a5.5 5.5 0 00-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 00-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 000-7.78z"/></svg>
                  </button>
                </div>
                <div className="product-body">
                  <div className="product-merchant">
                    {p.merchant}
                    <span className="product-verified">✓</span>
                  </div>
                  <div className="product-name">{p.name}</div>
                  <div className="product-meta-row">
                    <div>
                      <div className="product-price"><span className="currency">RM</span>{p.price}</div>
                      <div className="product-relief">{p.reliefAmt} claimable</div>
                    </div>
                    <a href="#" className="btn" style={{height:36,padding:"0 14px",fontSize:13,background:"var(--ink)",color:"#fff",borderRadius:"var(--r-pill)"}}>Add</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* How it works */}
          <div style={{marginTop:64,marginBottom:0}}>
            <h3 className="mkt-section-title">How it <em>works</em>.</h3>
          </div>
          <div className="mkt-how-grid" style={{marginTop:24}}>
            {howSteps.map(s => (
              <div key={s.num} className="mkt-how-step">
                <div className="mkt-how-num">{s.num}</div>
                <h4>{s.title}</h4>
                <p>{s.desc}</p>
              </div>
            ))}
          </div>

          {/* Apply as business */}
          <div className="biz-banner" id="apply">
            <div className="biz-banner-content">
              <span className="eyebrow"><span className="eyebrow-dot" />For businesses</span>
              <h2>Sell to people who <em>actually claim it</em>.</h2>
              <p>List your LHDN-eligible products on Finpersona. Customers buy with confidence knowing it&apos;s claimable. You get paid faster — and we handle the auto-categorization so they never argue about a missing receipt again.</p>
              <div className="biz-perks">
                {bizPerks.map(bp => (
                  <div key={bp.num} className="biz-perk">
                    <div className="biz-perk-num">{bp.num}</div>
                    <div className="biz-perk-text"><strong>{bp.title}</strong>{bp.desc}</div>
                  </div>
                ))}
              </div>
              <div className="biz-cta-row">
                <a href="#" className="btn btn-primary"><span>Apply as a merchant →</span></a>
                <a href="#" className="btn btn-secondary">Learn more</a>
              </div>
            </div>
            <div className="biz-visual">
              <div className="biz-dash">
                <div className="biz-dash-head">
                  <div className="biz-dash-title">Merchant Dashboard</div>
                  <div className="biz-dash-pill">
                    <span style={{width:6,height:6,borderRadius:"50%",background:"var(--green)",display:"inline-block"}} />
                    Live
                  </div>
                </div>
                <div className="biz-stat-row">
                  <div className="biz-stat"><div className="label">This month</div><div className="val">RM 8,420 <span className="delta">↑24%</span></div></div>
                  <div className="biz-stat"><div className="label">Orders</div><div className="val">143</div></div>
                </div>
                <div className="biz-spark">
                  {[30,45,38,60,52,70,48,64,72,55,80,90].map((h,i) => (
                    <div key={i} className="biz-spark-bar" style={{height:h*0.6}} />
                  ))}
                </div>
                <div className="biz-dash-foot">
                  <div className="biz-foot-cell"><div className="label">Auto-receipts</div><div className="val">143 / 143</div></div>
                  <div className="biz-foot-cell"><div className="label">Claim rate</div><div className="val">98.4%</div></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <div className="mkt-trust">
        <div className="container">
          <div className="trust-grid">
            {[
              {num:"248",lab:"Claimable products listed"},
              {num:"142",lab:"Verified Malaysian merchants"},
              {num:"98.4%",lab:"Auto-claim success rate"},
              {num:"RM 8.2M",lab:"LHDN reliefs claimed via Marketplace"},
            ].map((t,i) => (
              <div key={i} className="trust-cell">
                <div className="num">{t.num}</div>
                <div className="lab">{t.lab}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
