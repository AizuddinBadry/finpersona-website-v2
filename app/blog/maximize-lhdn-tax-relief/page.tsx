import type {Metadata} from "next";
import Link from "next/link";
import {getPost, formatDate, posts} from "@/lib/blog";
import {ArrowLeft, Clock, ArrowRight} from "lucide-react";

const slug = "maximize-lhdn-tax-relief";

export const metadata: Metadata = {
  title: "How to Maximize Your LHDN Tax Relief in 2026",
  description: "A complete guide to every major LHDN tax relief category for Malaysians — Lifestyle, Medical, Sports, Skills, SSPN, EPF, and more. Caps, what qualifies, and how to keep receipts organised.",
  alternates: {canonical: `https://finpersona.com/blog/${slug}`},
  keywords: ["LHDN tax relief 2026","Malaysia income tax","Borang BE","lifestyle relief","medical relief","EPF tax","SSPN relief","individual tax Malaysia"],
  openGraph: {
    title: "How to Maximize Your LHDN Tax Relief in 2026: A Complete Guide",
    description: "Every LHDN tax relief category explained — what qualifies, caps, and how to claim without missing anything.",
    url: `https://finpersona.com/blog/${slug}`,
    type: "article",
    publishedTime: "2026-04-15",
    authors: ["Finpersona Team"],
    tags: ["LHDN","tax relief","Malaysia tax","Borang BE"],
  },
  twitter: {
    card: "summary_large_image",
    title: "How to Maximize Your LHDN Tax Relief in 2026",
    description: "Every LHDN tax relief category explained — caps, what qualifies, how to claim.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "How to Maximize Your LHDN Tax Relief in 2026: A Complete Guide for Malaysians",
  description: "A practical walkthrough of every major LHDN tax relief category available to Malaysian residents.",
  author: {"@type": "Organization", name: "Finpersona", url: "https://finpersona.com"},
  publisher: {"@type": "Organization", name: "Finpersona", url: "https://finpersona.com"},
  datePublished: "2026-04-15",
  dateModified: "2026-04-15",
  url: `https://finpersona.com/blog/${slug}`,
  mainEntityOfPage: `https://finpersona.com/blog/${slug}`,
  keywords: "LHDN tax relief, Malaysia income tax, Borang BE, lifestyle relief, EPF, SSPN",
};

export default function TaxReliefPost() {
  const post = getPost(slug)!;
  const related = posts.filter(p => p.slug !== slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <article>
        {/* Article hero */}
        <div className="article-hero" style={{background: post.coverGradient}}>
          <div className="article-hero-pattern" />
          <div className="container article-hero-inner">
            <Link href="/blog" className="article-back"><ArrowLeft size={14} />Blog</Link>
            <div className="article-meta-row">
              <span className="blog-cat-pill" style={{background:"rgba(255,255,255,0.15)",color:"#fff"}}>{post.category}</span>
              <span className="article-meta-item"><Clock size={12} />{post.readingTime}</span>
              <span className="article-meta-item">{formatDate(post.publishedAt)}</span>
            </div>
            <h1 className="article-title">{post.title}</h1>
            <p className="article-lead">{post.description}</p>
          </div>
        </div>

        {/* Article body */}
        <div className="article-body">
          <div className="article-toc">
            <p className="toc-label">In this article</p>
            <ol className="toc-list">
              <li><a href="#why-it-matters">Why most Malaysians under-claim</a></li>
              <li><a href="#lifestyle">Lifestyle Relief (RM 2,500)</a></li>
              <li><a href="#medical">Medical & Health Relief (up to RM 10,000)</a></li>
              <li><a href="#sports">Sports Equipment Relief (RM 1,000)</a></li>
              <li><a href="#skills">Skills & Education Relief (RM 7,000)</a></li>
              <li><a href="#sspn">SSPN Savings Relief (RM 8,000)</a></li>
              <li><a href="#epf">EPF Contributions Relief</a></li>
              <li><a href="#life-insurance">Life Insurance & Takaful Relief</a></li>
              <li><a href="#parenting">Parenting & Childcare Reliefs</a></li>
              <li><a href="#receipts">Keeping receipts organised</a></li>
              <li><a href="#checklist">Quick checklist before filing</a></li>
            </ol>
          </div>

          <div className="prose">
            <section id="why-it-matters">
              <h2>Why most Malaysians under-claim</h2>
              <p>LHDN data consistently shows that a large share of Malaysian taxpayers claim only a fraction of the reliefs they are legally entitled to. The two main reasons are poor receipt organisation (they've spent the money but can't prove it) and simply not knowing which expenses qualify.</p>
              <p>The result? Paying more tax than necessary — sometimes by hundreds or even thousands of ringgit. The average Finpersona user recovers an additional <strong>RM 1,840</strong> in annual tax savings after properly tagging their expenses.</p>
              <div className="article-callout">
                <div className="callout-icon">💡</div>
                <div><strong>Quick maths:</strong> If you're in the 13% income tax bracket and you miss RM 3,000 of valid reliefs, you're overpaying LHDN by RM 390. That's a nice dinner for four — every year.</div>
              </div>
            </section>

            <section id="lifestyle">
              <h2>Lifestyle Relief — RM 2,500</h2>
              <p>This is the biggest catch-all relief for everyday Malaysians. It covers purchases of <strong>books, journals, magazines, and other printed materials</strong>, <strong>personal computers, smartphones, and tablets</strong> (not for business use), <strong>sports equipment and gym memberships</strong> (see also the dedicated sports relief below), and <strong>internet subscription fees</strong>.</p>
              <p>The annual cap is <strong>RM 2,500</strong>. The key is keeping original receipts — either a physical receipt or an e-receipt showing merchant name, date, and item description.</p>
              <div className="article-tip">
                <strong>Tip:</strong> Your internet bill qualifies. Set a reminder to save your monthly Unifi or Maxis bill as a PDF — 12 months at RM 120/month is RM 1,440 already claimed without buying anything extra.
              </div>
            </section>

            <section id="medical">
              <h2>Medical &amp; Health Relief — up to RM 10,000</h2>
              <p>Medical relief is generous but split across several sub-categories:</p>
              <ul>
                <li><strong>Medical expenses for self, spouse, and children</strong> (including dental, optical, and mental health treatment) — up to <strong>RM 10,000</strong>. Note: cosmetic procedures do not qualify.</li>
                <li><strong>Serious disease treatment</strong> (cancer, kidney dialysis, heart disease, etc.) — up to <strong>RM 10,000</strong> (shared with the cap above).</li>
                <li><strong>Medical check-up</strong> — up to <strong>RM 1,000</strong> (within the RM 10,000 cap).</li>
                <li><strong>COVID-19 vaccination</strong> — up to <strong>RM 1,000</strong>.</li>
                <li><strong>Mental health treatment and consultation</strong> — covered under the RM 10,000 cap since YA 2022.</li>
              </ul>
              <p>Always obtain an official receipt from your clinic or hospital. Private hospital receipts typically include all necessary detail automatically.</p>
            </section>

            <section id="sports">
              <h2>Sports Equipment Relief — RM 1,000</h2>
              <p>A separate relief (on top of Lifestyle) for <strong>sports equipment</strong> (badminton rackets, running shoes, cycling gear, etc.), <strong>gym/sports club membership fees</strong>, and <strong>entry fees for competitive sports events</strong> (marathons, triathlons, etc.).</p>
              <p>The annual cap is <strong>RM 1,000</strong>. This is separate from the Lifestyle cap, so you can claim both. A single pair of decent running shoes can get you a third of the way there.</p>
              <div className="article-tip">
                <strong>Tip:</strong> Buying sports equipment through the Finpersona Marketplace auto-files the receipt under this category, so you don't need to do anything extra at tax time.
              </div>
            </section>

            <section id="skills">
              <h2>Skills &amp; Education Relief — RM 7,000</h2>
              <p>Course fees paid to <strong>approved institutions for skills upgrading or professional development</strong> qualify for up to <strong>RM 7,000</strong>. This includes MOOC platforms like Coursera, edX, and Udemy (for approved courses), Malaysian polytechnic and TVET programmes, and professional certifications (ACCA, CFA, HRDF-claimable courses, etc.).</p>
              <p>The institution or platform must be registered with the Malaysian Qualifications Agency (MQA) or an equivalent approved body. Always download your official certificate of completion or enrollment letter alongside the receipt.</p>
            </section>

            <section id="sspn">
              <h2>SSPN Savings Relief — RM 8,000</h2>
              <p>Net savings deposited into a <strong>Skim Simpanan Pendidikan Nasional (SSPN)</strong> account in a given year qualify for relief up to <strong>RM 8,000</strong>. This means if you deposit RM 10,000 but withdraw RM 3,000, only RM 7,000 is claimable.</p>
              <p>SSPN is specifically for children's education savings. The account must be in the name of your child, and you must be the guardian/contributor claiming the relief.</p>
              <div className="article-callout">
                <div className="callout-icon">📌</div>
                <div>SSPN has one of the best effective returns of any savings vehicle for Malaysian parents — the 8% dividend (2025 declared rate) combined with the tax relief can make the effective return significantly higher than a fixed deposit.</div>
              </div>
            </section>

            <section id="epf">
              <h2>EPF Contributions Relief</h2>
              <p>Mandatory and voluntary EPF contributions are claimable up to <strong>RM 4,000</strong> per year. This is almost automatic for salaried employees, as your EPF statement confirms the total contributed. Self-employed individuals who contribute voluntarily to EPF (i-Saraan) can also claim this relief.</p>
              <p>Note that the EPF relief is separate from the Life Insurance relief below. Both can be claimed simultaneously up to their individual caps.</p>
            </section>

            <section id="life-insurance">
              <h2>Life Insurance &amp; Takaful Relief — RM 3,000</h2>
              <p>Premiums paid for <strong>life insurance or family takaful policies</strong> qualify for up to <strong>RM 3,000</strong> per year. Annuity premiums also qualify. Medical and education rider premiums are excluded (they fall under the medical relief instead).</p>
              <p>Combined with EPF, the total relief for this category is capped at <strong>RM 7,000</strong> (RM 4,000 EPF + RM 3,000 insurance).</p>
            </section>

            <section id="parenting">
              <h2>Parenting &amp; Childcare Reliefs</h2>
              <p>Families with children have access to several additional reliefs:</p>
              <ul>
                <li><strong>Child (under 18)</strong> — RM 2,000 per child.</li>
                <li><strong>Child in higher education (18+)</strong> — RM 8,000 per child (degree level or above at approved institutions).</li>
                <li><strong>Disabled child</strong> — RM 6,000 per child (additional RM 8,000 if in full-time education).</li>
                <li><strong>Childcare fees</strong> — Up to RM 3,000 at a registered childcare centre or kindergarten.</li>
                <li><strong>Breastfeeding equipment</strong> — RM 1,000 for mothers with children under 2 years.</li>
              </ul>
            </section>

            <section id="receipts">
              <h2>Keeping receipts organised all year</h2>
              <p>The most common reason LHDN disallows a claim is the absence of a valid receipt. Here are the practical habits that make tax season painless:</p>
              <ol>
                <li><strong>Snap immediately.</strong> Receipt apps like Finpersona let you scan any paper receipt in under 5 seconds. Do it at the counter, not later at home (where it will get lost).</li>
                <li><strong>Keep digital AND physical for large claims.</strong> For medical expenses over RM 500, hold onto the original receipt for 7 years. LHDN can audit up to 5 years back.</li>
                <li><strong>Tag as you go.</strong> Categorise receipts throughout the year. Doing it all in March is exhausting and error-prone.</li>
                <li><strong>Check caps monthly.</strong> Once you hit a cap (e.g., RM 2,500 Lifestyle), additional spending in that category won't reduce your tax — redirect that money elsewhere.</li>
              </ol>
              <div className="article-tip">
                <strong>Finpersona tip:</strong> Every receipt you scan is automatically categorised and tracked against your relief caps. You get a notification before you hit each cap so you can plan strategically.
              </div>
            </section>

            <section id="checklist">
              <h2>Quick checklist before filing</h2>
              <ul className="checklist">
                <li>Lifestyle — books, internet, devices (cap RM 2,500)</li>
                <li>Medical — clinics, hospital, dental, optical, mental health (cap RM 10,000)</li>
                <li>Sports — equipment, gym, race entries (cap RM 1,000)</li>
                <li>Skills — course fees from approved institutions (cap RM 7,000)</li>
                <li>SSPN — net contribution to child education savings (cap RM 8,000)</li>
                <li>EPF — mandatory + voluntary contributions (cap RM 4,000)</li>
                <li>Life insurance / Takaful premiums (cap RM 3,000)</li>
                <li>Child reliefs — age, education level, disability status</li>
                <li>Childcare fees at registered centres (cap RM 3,000)</li>
                <li>All receipts saved and categorised in your app</li>
              </ul>
            </section>

            <div className="article-cta-block">
              <h3>Track every relief automatically</h3>
              <p>Finpersona auto-tags receipts to the right LHDN relief category the moment you scan them — and shows exactly how much headroom remains in each cap.</p>
              <a href="#" className="btn btn-primary" style={{display:"inline-flex",marginTop:4}}><span>Start tracking free</span><span>→</span></a>
            </div>
          </div>
        </div>

        {/* Related posts */}
        <div className="container" style={{paddingBottom:80}}>
          <h2 style={{fontFamily:"var(--serif)",fontWeight:500,fontSize:"clamp(22px,2.8vw,28px)",letterSpacing:"-0.6px",margin:"0 0 24px"}}>Related articles</h2>
          <div className="blog-grid">
            {related.map(p => (
              <Link key={p.slug} href={`/blog/${p.slug}`} className="blog-card">
                <div className="blog-card-banner" style={{background:p.coverGradient}}>
                  <div className="blog-featured-pattern" />
                  <span className="blog-featured-cat">{p.category}</span>
                </div>
                <div className="blog-card-body">
                  <div className="blog-meta-row">
                    <span className="blog-cat-pill">{p.category}</span>
                    <span className="blog-meta-item"><Clock size={11} />{p.readingTime}</span>
                  </div>
                  <h3 className="blog-card-title">{p.title}</h3>
                  <div className="blog-card-footer">
                    <span style={{fontSize:12,color:"var(--muted)"}}>{formatDate(p.publishedAt)}</span>
                    <span className="blog-read-more" style={{fontSize:13}}>Read <ArrowRight size={12} /></span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </article>
    </>
  );
}
