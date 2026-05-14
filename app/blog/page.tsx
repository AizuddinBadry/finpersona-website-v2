import type {Metadata} from "next";
import Link from "next/link";
import {posts, formatDate} from "@/lib/blog";
import {ArrowRight, Clock, Tag} from "lucide-react";

export const metadata: Metadata = {
  title: "Blog — Tax Tips & Personal Finance for Malaysians",
  description: "Practical guides on LHDN tax reliefs, expense tracking, budgeting, and personal finance for Malaysians. Written by the Finpersona team.",
  alternates: {canonical: "https://finpersona.com/blog"},
  openGraph: {
    title: "Finpersona Blog — Tax Tips & Personal Finance for Malaysians",
    description: "Practical guides on LHDN tax reliefs, expense tracking, budgeting, and personal finance for Malaysians.",
    url: "https://finpersona.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Finpersona Blog",
    description: "Practical guides on LHDN tax reliefs, expense tracking, and personal finance for Malaysians.",
  },
};

export default function BlogPage() {
  const featured = posts[0];
  const rest = posts.slice(1);
  return (
    <div>
      {/* Hero */}
      <section className="blog-hero">
        <div className="blog-hero-bg" />
        <div className="container blog-hero-inner">
          <span className="eyebrow"><span className="eyebrow-dot" />Finpersona Blog</span>
          <h1 className="h1" style={{marginTop:20,marginBottom:16}}>
            Money smarts,<br /><em>explained simply</em>.
          </h1>
          <p className="lede">
            Practical guides on LHDN tax reliefs, budgeting, and building wealth — written for Malaysians who want to spend less time on admin and more on living.
          </p>
        </div>
      </section>

      <div className="container" style={{padding:"56px 32px 96px"}}>
        {/* Featured post */}
        <Link href={`/blog/${featured.slug}`} className="blog-featured">
          <div className="blog-featured-banner" style={{background:featured.coverGradient}}>
            <div className="blog-featured-pattern" />
            <span className="blog-featured-cat">{featured.category}</span>
            <CoverIllustration type={featured.coverIcon} />
          </div>
          <div className="blog-featured-body">
            <div className="blog-meta-row">
              <span className="blog-cat-pill">{featured.category}</span>
              <span className="blog-meta-item"><Clock size={12} />{featured.readingTime}</span>
              <span className="blog-meta-item">{formatDate(featured.publishedAt)}</span>
            </div>
            <h2 className="blog-featured-title">{featured.title}</h2>
            <p className="blog-featured-desc">{featured.description}</p>
            <div className="blog-read-more">
              Read article <ArrowRight size={14} />
            </div>
          </div>
        </Link>

        {/* More posts */}
        <div style={{marginTop:48}}>
          <h2 style={{fontFamily:"var(--serif)",fontWeight:500,fontSize:"clamp(22px,2.8vw,28px)",letterSpacing:"-0.6px",margin:"0 0 24px"}}>
            More articles
          </h2>
          <div className="blog-grid">
            {rest.map(post => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="blog-card">
                <div className="blog-card-banner" style={{background:post.coverGradient}}>
                  <div className="blog-featured-pattern" />
                  <span className="blog-featured-cat">{post.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <span className="blog-cat-pill">{post.category}</span>
                    <span className="blog-meta-item"><Clock size={11} />{post.readingTime}</span>
                  </div>
                  <h3 className="blog-card-title">{post.title}</h3>
                  <p className="blog-card-desc">{post.description}</p>
                  <div className="blog-card-footer">
                    <span style={{fontSize:12,color:"var(--muted)"}}>{formatDate(post.publishedAt)}</span>
                    <span className="blog-read-more" style={{fontSize:13}}>Read <ArrowRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Tags */}
        <div style={{marginTop:56,paddingTop:32,borderTop:"0.5px solid var(--divider)"}}>
          <p style={{fontSize:11,fontWeight:700,letterSpacing:"0.6px",textTransform:"uppercase",color:"var(--muted)",margin:"0 0 14px"}}>Topics covered</p>
          <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
            {Array.from(new Set(posts.flatMap(p => p.tags))).map(tag => (
              <span key={tag} className="blog-tag"><Tag size={11} />{tag}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function CoverIllustration({type}: {type: string}) {
  if (type === "tax") return (
    <div className="blog-cover-illust">
      <div style={{padding:"16px 20px",borderRadius:14,background:"rgba(255,255,255,0.10)",backdropFilter:"blur(10px)",border:"0.5px solid rgba(255,255,255,0.15)",minWidth:180}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.6px",textTransform:"uppercase",color:"rgba(255,216,155,0.85)",marginBottom:6}}>Est. tax savings</div>
        <div style={{fontFamily:"var(--serif)",fontSize:36,fontWeight:500,letterSpacing:"-1px",color:"#fff"}}>RM 1,840</div>
        <div style={{marginTop:10,display:"flex",flexDirection:"column",gap:5}}>
          {[["Lifestyle","RM 1,842 / 2,500"],["Medical","RM 2,108 / 10,000"],["Sports","RM 480 / 1,000"]].map(([l,v]) => (
            <div key={l} style={{display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.75)"}}>
              <span>{l}</span><span style={{fontVariantNumeric:"tabular-nums"}}>{v}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
  if (type === "savings") return (
    <div className="blog-cover-illust">
      <div style={{padding:"16px 20px",borderRadius:14,background:"rgba(255,255,255,0.10)",backdropFilter:"blur(10px)",border:"0.5px solid rgba(255,255,255,0.15)",minWidth:180}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.6px",textTransform:"uppercase",color:"rgba(200,255,220,0.85)",marginBottom:6}}>Emergency fund goal</div>
        <div style={{fontFamily:"var(--serif)",fontSize:36,fontWeight:500,letterSpacing:"-1px",color:"#fff"}}>6 months</div>
        <div style={{marginTop:10,height:8,borderRadius:4,background:"rgba(255,255,255,0.15)",overflow:"hidden"}}>
          <div style={{width:"68%",height:"100%",borderRadius:4,background:"rgba(52,211,153,0.90)"}} />
        </div>
        <div style={{marginTop:6,display:"flex",justifyContent:"space-between",fontSize:11,color:"rgba(255,255,255,0.75)"}}>
          <span>RM 8,400 saved</span><span>68%</span>
        </div>
      </div>
    </div>
  );
  return (
    <div className="blog-cover-illust">
      <div style={{padding:"16px 20px",borderRadius:14,background:"rgba(255,255,255,0.10)",backdropFilter:"blur(10px)",border:"0.5px solid rgba(255,255,255,0.15)",minWidth:180}}>
        <div style={{fontSize:10,fontWeight:700,letterSpacing:"0.6px",textTransform:"uppercase",color:"rgba(201,186,251,0.9)",marginBottom:6}}>AI insight</div>
        <div style={{fontSize:13,color:"rgba(255,255,255,0.90)",lineHeight:1.45}}>You&apos;re <strong style={{color:"#fff"}}>RM 384 ahead</strong> vs last month. Tag your bookstore receipt to claim Lifestyle relief.</div>
        <div style={{marginTop:10,padding:"8px 10px",borderRadius:8,background:"rgba(110,76,230,0.30)",fontSize:11,color:"rgba(255,255,255,0.85)"}}>3 receipts untagged · tap to review</div>
      </div>
    </div>
  );
}
