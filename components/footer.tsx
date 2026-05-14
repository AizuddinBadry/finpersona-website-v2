import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-col">
            <div className="nav-brand" style={{marginBottom: 14}}>
              <div className="nav-brand-mark">
                <Image src="/logo-mark.svg" alt="" width={20} height={20} />
              </div>
              <span>Finpersona</span>
            </div>
            <p style={{fontSize:13,color:"var(--muted)",maxWidth:280,margin:0,lineHeight:1.5}}>
              AI-native personal finance platform. Built in Kuala Lumpur for Malaysians.
            </p>
          </div>
          <div className="footer-col">
            <h4>Product</h4>
            <Link href="/#tax">Tax savings</Link>
            <Link href="/#marketplace">Marketplace</Link>
            <Link href="/events">Events</Link>
            <Link href="/#features">All features</Link>
            <Link href="/advisors">For advisors</Link>
          </div>
          <div className="footer-col">
            <h4>Company</h4>
            <Link href="/blog">Blog</Link>
            <a href="#">Careers</a>
          </div>
          <div className="footer-col">
            <h4>Legal</h4>
            <Link href="/privacy-policy">Privacy</Link>
            <Link href="/terms">Terms</Link>
            <Link href="/security">Security</Link>
            <a href="#">Contact</a>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 Finpersona · Built by <strong style={{color:"var(--ink2)",fontWeight:600}}>Aexlora Sdn Bhd</strong> · Kuala Lumpur</span>
          <span>Not affiliated with any tax authority. Always verify with LHDN directly.</span>
        </div>
      </div>
    </footer>
  );
}
