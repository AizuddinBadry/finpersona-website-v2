import type {Metadata} from "next";
import Link from "next/link";
import {getPost, formatDate, posts} from "@/lib/blog";
import {ArrowLeft, Clock, ArrowRight} from "lucide-react";

const slug = "emergency-fund-malaysia";

export const metadata: Metadata = {
  title: "Building an Emergency Fund in Malaysia: How Much Is Enough",
  description: "Most Malaysians carry less than 3 months of expenses in liquid savings. This guide covers the right target, where to keep it — ASNB, high-yield accounts, Money Market funds — and a simple monthly plan.",
  alternates: {canonical: `https://finpersona.com/blog/${slug}`},
  keywords: ["emergency fund Malaysia","savings account Malaysia","ASNB","money market fund","financial planning Malaysia","liquid savings"],
  openGraph: {
    title: "Building an Emergency Fund in Malaysia: How Much Is Enough?",
    description: "The right emergency fund target, where to park it, and a month-by-month plan to build it without disrupting your lifestyle.",
    url: `https://finpersona.com/blog/${slug}`,
    type: "article",
    publishedTime: "2026-05-02",
    authors: ["Finpersona Team"],
    tags: ["emergency fund","savings","ASNB","personal finance Malaysia"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Building an Emergency Fund in Malaysia",
    description: "Right target, where to keep it, and how to build it — for Malaysians.",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Article",
  headline: "Building an Emergency Fund in Malaysia: How Much Is Enough and Where to Keep It",
  description: "Most Malaysians carry less than 3 months of expenses in liquid savings. This guide covers the right target and where to park it.",
  author: {"@type": "Organization", name: "Finpersona", url: "https://finpersona.com"},
  publisher: {"@type": "Organization", name: "Finpersona", url: "https://finpersona.com"},
  datePublished: "2026-05-02",
  dateModified: "2026-05-02",
  url: `https://finpersona.com/blog/${slug}`,
  mainEntityOfPage: `https://finpersona.com/blog/${slug}`,
  keywords: "emergency fund Malaysia, ASNB, savings, money market fund, personal finance",
};

export default function EmergencyFundPost() {
  const post = getPost(slug)!;
  const related = posts.filter(p => p.slug !== slug);
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html: JSON.stringify(jsonLd)}} />
      <article>
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

        <div className="article-body">
          <div className="article-toc">
            <p className="toc-label">In this article</p>
            <ol className="toc-list">
              <li><a href="#why">Why an emergency fund matters more than investments</a></li>
              <li><a href="#how-much">How many months of expenses?</a></li>
              <li><a href="#calculate">Calculating your exact target</a></li>
              <li><a href="#where">Where to keep your emergency fund in Malaysia</a></li>
              <li><a href="#plan">A month-by-month plan to build it</a></li>
              <li><a href="#mistakes">Common mistakes to avoid</a></li>
            </ol>
          </div>

          <div className="prose">
            <section id="why">
              <h2>Why an emergency fund matters more than investments</h2>
              <p>Financial advice is often dominated by where to invest. But investments are illiquid, can lose value in the short term, and come with withdrawal friction. The first and most important financial buffer is liquid cash you can access within 24 hours without fees or penalties.</p>
              <p>A Bank Negara Malaysia study found that nearly 75% of Malaysians would struggle to come up with RM 1,000 for an unexpected expense without borrowing. Medical bills, sudden job loss, or a car breakdown have derailed countless otherwise well-laid financial plans simply because there was no liquid cushion.</p>
              <div className="article-callout">
                <div className="callout-icon">⚠️</div>
                <div><strong>Without an emergency fund</strong>, a RM 5,000 medical bill means drawing down investments at possibly the worst time, or taking a personal loan at 7–12% interest. With one, it&apos;s just an inconvenience.</div>
              </div>
            </section>

            <section id="how-much">
              <h2>How many months of expenses?</h2>
              <p>The classic rule is 3–6 months of <em>essential expenses</em>. But the right target depends on your situation:</p>
              <ul>
                <li><strong>Stable salaried employee, single income, no dependants:</strong> 3 months is a reasonable floor.</li>
                <li><strong>Single income household with dependants:</strong> 6 months. Losing income with a family to support is a high-stakes scenario.</li>
                <li><strong>Self-employed or freelancer:</strong> 6–9 months. Income variability and the absence of EPF contributions (unless voluntary) make a larger buffer essential.</li>
                <li><strong>Commission-based sales or gig economy:</strong> 9–12 months. Revenue can dry up for extended periods in downturns.</li>
              </ul>
              <p>If your industry is cyclical or your company is in a precarious position, lean toward the higher end.</p>
            </section>

            <section id="calculate">
              <h2>Calculating your exact target</h2>
              <p>Essential expenses are not your full lifestyle spend. They are the bare minimum you need each month to keep the lights on:</p>
              <ul>
                <li>Rent or mortgage (cannot skip)</li>
                <li>Utilities — electricity, water, internet</li>
                <li>Food (groceries, not restaurants)</li>
                <li>Transportation — commuting cost or car loan + fuel</li>
                <li>Insurance premiums</li>
                <li>Minimum debt payments (credit card minimum, car loan)</li>
                <li>Childcare or school fees if applicable</li>
              </ul>
              <p>For most Malaysian households in Klang Valley, essential expenses run between <strong>RM 2,500 to RM 5,000</strong> per month depending on housing. A target of 6 months therefore means <strong>RM 15,000 to RM 30,000</strong>.</p>
              <div className="article-tip">
                <strong>Finpersona tip:</strong> The app calculates your average essential spend automatically from your categorised expenses. Check the Budgeting tab to see your real number.
              </div>
            </section>

            <section id="where">
              <h2>Where to keep your emergency fund in Malaysia</h2>
              <p>The criteria: liquid within 24–48 hours, principal protected, minimal fees. Here are the best options:</p>

              <h3>1. High-yield savings account</h3>
              <p>Accounts like CIMB FastSaver, Maybank SaveUp, RHB High Yield, and GXBank (digital bank) offer 2.5–4.0% interest on savings with full liquidity. These are the easiest starting point. No lock-in, instant transfer, PIDM-insured up to RM 250,000.</p>

              <h3>2. ASNB — Amanah Saham Nasional Berhad</h3>
              <p>ASB (for Bumiputera) and ASN Equity 3 (for all Malaysians) are money-market-adjacent funds with strong historical dividend rates (6–6.5% for ASB in recent years). You can withdraw within 1–3 business days. ASB is capital-guaranteed. Note: ASB is limited to Bumiputera Malaysians.</p>

              <h3>3. Money Market Funds (MMF)</h3>
              <p>Unit trust money market funds like Kenanga Money Market Fund, Affin Hwang Enhanced Deposit Fund, or Public Mutual offer 3.5–4.5% annualised returns with same-day or next-day redemption. They are not capital guaranteed but principal loss is extremely rare. Available through platforms like Wahed, StashAway Simple, and Versa.</p>

              <h3>4. Fixed Deposit — with caution</h3>
              <p>Fixed deposits offer 3.5–4.0% but come with early withdrawal penalties and a few days&apos; processing lag. Suitable for the portion of your fund beyond the first month — the &quot;deeper reserve&quot; you&apos;d only need after you&apos;ve burned through your more liquid savings first.</p>
            </section>

            <section id="plan">
              <h2>A month-by-month plan to build it</h2>
              <p>Assume a target of RM 18,000 (6 months × RM 3,000 essential spend) and starting from zero:</p>
              <div className="article-table-wrap">
                <table className="article-table">
                  <thead>
                    <tr><th>Months</th><th>Monthly contribution</th><th>Balance</th><th>Milestone</th></tr>
                  </thead>
                  <tbody>
                    <tr><td>1–3</td><td>RM 1,000</td><td>RM 3,000</td><td>1 month cover</td></tr>
                    <tr><td>4–9</td><td>RM 1,500</td><td>RM 12,000</td><td>4 months cover</td></tr>
                    <tr><td>10–12</td><td>RM 2,000</td><td>RM 18,000</td><td>Full 6 months</td></tr>
                  </tbody>
                </table>
              </div>
              <p>Once fully funded, divert contributions to investments. The emergency fund doesn&apos;t need to grow beyond your target — it&apos;s insurance, not wealth building.</p>
            </section>

            <section id="mistakes">
              <h2>Common mistakes to avoid</h2>
              <ol>
                <li><strong>Keeping it in your main transaction account.</strong> Too easy to spend. Park it somewhere that takes a tiny bit of friction to access.</li>
                <li><strong>Treating it as an investment.</strong> Don&apos;t put your emergency fund in equities or crypto. If a market crash hits at the same moment you lose your job, you&apos;re in trouble.</li>
                <li><strong>Not replenishing after use.</strong> If you dip in for a genuine emergency, rebuilding the fund is your top financial priority before resuming other goals.</li>
                <li><strong>Setting too low a target.</strong> Three months feels like a lot until you have a genuinely scary few weeks.</li>
                <li><strong>Never reviewing the target.</strong> If your expenses rise significantly — new child, new mortgage — update your target accordingly.</li>
              </ol>
            </section>

            <div className="article-cta-block">
              <h3>Know exactly how much emergency fund you need</h3>
              <p>Finpersona calculates your real essential monthly spend and tracks your progress toward your fund target automatically.</p>
              <a href="#" className="btn btn-primary" style={{display:"inline-flex",marginTop:4}}><span>Build your fund with Finpersona</span><span>→</span></a>
            </div>
          </div>
        </div>

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
