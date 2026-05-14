"use client";
import Link from "next/link";
import Image from "next/image";
import {usePathname} from "next/navigation";

export default function Nav() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  return (
    <nav className="nav">
      <div className="nav-inner">
        <Link href="/" className="nav-brand">
          <div className="nav-brand-mark">
            <Image src="/logo-mark.svg" alt="" width={22} height={22} />
          </div>
          <span>Finpersona</span>
        </Link>
        <div className="nav-links">
          <Link href="/#features" className={isActive("/#features") ? "active" : ""}>Features</Link>
          <Link href="/#tax">Tax savings</Link>
          {/* <Link href="/marketplace" className={isActive("/marketplace") ? "active" : ""}>Marketplace</Link> */}
          <Link href="/events" className={isActive("/events") ? "active" : ""}>Events</Link>
          <Link href="/advisors" className={isActive("/advisors") ? "active" : ""}>For advisors</Link>
          <Link href="/blog" className={isActive("/blog") ? "active" : ""}>Blog</Link>
        </div>
        <div className="nav-spacer" />
        <a href="https://app.finpersona.com" className="btn-ghost">Sign in</a>
        {/* <a href="#" className="nav-cta">Get the app →</a> */}
      </div>
    </nav>
  );
}
