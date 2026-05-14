import type {Metadata} from "next";
import Link from "next/link";
import {Lock, Shield, Server, Eye, Key, FileCheck, AlertTriangle, Mail} from "lucide-react";

export const metadata: Metadata = {
  title: "Security",
  description: "How Finpersona secures your financial data — TLS 1.3, AES-256 encryption, PDPA compliance, Malaysia data residency, and responsible disclosure.",
  alternates: {canonical: "https://finpersona.com/security"},
  openGraph: {
    title: "Security | Finpersona",
    description: "Learn how Finpersona protects your financial data with bank-grade encryption, PDPA compliance, and Malaysia data residency.",
    url: "https://finpersona.com/security",
  },
};

const securityCards = [
  {
    title: "Encryption in Transit",
    desc: "All communication between the Finpersona app, your browser, and our servers is encrypted using TLS 1.3 — the same standard used by major banks. Older TLS versions are not accepted.",
    Icon: Lock,
    dark: false,
  },
  {
    title: "Encryption at Rest",
    desc: "Sensitive financial data — including bank connections, transaction records, and tax information — is encrypted using AES-256 at rest. Data keys are managed through a dedicated key management service.",
    Icon: Key,
    dark: false,
  },
  {
    title: "Malaysia Data Residency",
    desc: "Your data is stored and processed on infrastructure located in Malaysia and Singapore. We do not transfer personal financial data outside the ASEAN region without your explicit consent.",
    Icon: Server,
    dark: false,
  },
  {
    title: "Access Controls",
    desc: "Strict role-based access controls (RBAC) govern who within our team can access user data. Access to production systems is logged, monitored, and reviewed. Engineers access production data only for support purposes with audit trails.",
    Icon: Eye,
    dark: false,
  },
  {
    title: "PDPA Compliance",
    desc: "Finpersona is designed to comply with Malaysia's Personal Data Protection Act 2010 (PDPA). We collect only the data necessary to provide the Service, obtain consent before processing, and honour your rights to access, correct, and delete your data.",
    Icon: FileCheck,
    dark: true,
  },
  {
    title: "Password Security",
    desc: "Passwords are never stored in plain text. We use bcrypt with a strong work factor to hash passwords. We strongly recommend enabling two-factor authentication (2FA) in your account settings for additional protection.",
    Icon: Shield,
    dark: true,
  },
];

const practices = [
  {title:"Regular Security Audits",desc:"We conduct internal security reviews quarterly and engage external penetration testing firms annually. Findings are prioritized and remediated with defined SLAs."},
  {title:"Vulnerability Management",desc:"Dependencies are monitored continuously for known vulnerabilities using automated scanning. Critical patches are applied within 24 hours of public disclosure."},
  {title:"Incident Response",desc:"We maintain a documented incident response plan. In the event of a data breach, affected users will be notified within 72 hours in accordance with PDPA requirements."},
  {title:"No Sharing with Advertisers",desc:"Your financial data is never sold, rented, or shared with advertising networks or data brokers. Full stop. See our Privacy Policy for details."},
  {title:"Secure Development",desc:"Our engineers follow secure development practices including threat modelling, code review with security checklists, and mandatory security training. We follow OWASP Top 10 guidelines."},
  {title:"Bank Account Security",desc:"If you connect a bank account, we use read-only API access through certified open banking partners. We never store your banking credentials. You can revoke access at any time from within the app."},
];

export default function SecurityPage() {
  return (
    <div>
      {/* Hero */}
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="eyebrow" style={{color:"var(--lavender)",background:"rgba(255,255,255,0.08)",borderColor:"rgba(255,255,255,0.15)"}}>PDPA Compliant · Malaysia</span>
          <h1>Security</h1>
          <p>How we protect your financial data — from your phone to our servers.</p>
        </div>
      </div>

      <div className="legal-body" style={{maxWidth:1000}}>

        {/* Intro */}
        <div style={{marginBottom:48}}>
          <p style={{fontSize:16,color:"var(--ink2)",lineHeight:1.7,margin:"0 0 16px"}}>
            Financial data is among the most sensitive personal information you can share. We treat it that way. This page explains the technical and organisational measures Finpersona takes to keep your data secure.
          </p>
          <div className="cert-row">
            <span className="cert-badge"><Shield size={14} />PDPA 2010 Compliant</span>
            <span className="cert-badge"><Lock size={14} />TLS 1.3</span>
            <span className="cert-badge"><Key size={14} />AES-256 at Rest</span>
            <span className="cert-badge"><Server size={14} />Malaysia / Singapore Infrastructure</span>
          </div>
        </div>

        {/* Security cards grid */}
        <h2 style={{fontFamily:"var(--serif)",fontWeight:500,fontSize:"clamp(28px,3.5vw,36px)",letterSpacing:"-1px",margin:"0 0 24px"}}>Core security measures</h2>
        <div className="security-grid">
          {securityCards.map((c) => (
            <div key={c.title} className={`security-card${c.dark?" dark":""}`}>
              <div className="s-icon"><c.Icon size={20} /></div>
              <h3>{c.title}</h3>
              <p>{c.desc}</p>
            </div>
          ))}
        </div>

        {/* Additional practices */}
        <div style={{marginTop:64}}>
          <h2 style={{fontFamily:"var(--serif)",fontWeight:500,fontSize:"clamp(28px,3.5vw,36px)",letterSpacing:"-1px",margin:"0 0 8px"}}>Operational practices</h2>
          <p style={{fontSize:15,color:"var(--muted)",margin:"0 0 32px"}}>Security is a continuous process, not a checkbox. Here is how we operate day-to-day.</p>
          <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:20}}>
            {practices.map(p => (
              <div key={p.title} style={{padding:24,borderRadius:"var(--r-lg)",background:"var(--mist)",border:"0.5px solid var(--hairline)"}}>
                <h3 style={{fontSize:15,fontWeight:700,letterSpacing:"-0.2px",margin:"0 0 8px",color:"var(--ink)"}}>{p.title}</h3>
                <p style={{fontSize:13.5,color:"var(--ink2)",margin:0,lineHeight:1.6}}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Your responsibility */}
        <div style={{marginTop:56,padding:"24px 28px",borderRadius:"var(--r-xl)",background:"linear-gradient(135deg,#FFF9EE,#FFF3D0)",border:"0.5px solid rgba(232,155,42,0.25)"}}>
          <div style={{display:"flex",gap:14,alignItems:"flex-start"}}>
            <div style={{width:36,height:36,borderRadius:10,background:"rgba(232,155,42,0.15)",color:"var(--amber)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <AlertTriangle size={18} />
            </div>
            <div>
              <h3 style={{fontSize:16,fontWeight:700,margin:"0 0 8px",color:"var(--ink)"}}>Your role in keeping your account secure</h3>
              <p style={{fontSize:14,color:"var(--ink2)",margin:0,lineHeight:1.6}}>
                Security is a shared responsibility. We strongly recommend: using a strong, unique password for your Finpersona account; enabling two-factor authentication (Settings → Security); never sharing your login credentials with anyone; and logging out of devices you no longer use. If you suspect unauthorized access to your account, contact us immediately at <a href="mailto:security@finpersona.com" style={{color:"var(--purple)",fontWeight:600}}>security@finpersona.com</a>.
              </p>
            </div>
          </div>
        </div>

        {/* Responsible disclosure */}
        <div style={{marginTop:48,padding:"28px 32px",borderRadius:"var(--r-xl)",background:"linear-gradient(135deg,#1A1530 0%,#2D2548 100%)",color:"#fff"}}>
          <div style={{display:"flex",gap:16,alignItems:"flex-start"}}>
            <div style={{width:40,height:40,borderRadius:12,background:"rgba(110,76,230,0.30)",color:"var(--lavender)",display:"flex",alignItems:"center",justifyContent:"center",flexShrink:0}}>
              <Mail size={20} />
            </div>
            <div>
              <h3 style={{fontSize:18,fontWeight:700,margin:"0 0 10px",fontFamily:"var(--serif)",letterSpacing:"-0.4px"}}>Responsible Disclosure</h3>
              <p style={{fontSize:14,color:"rgba(255,255,255,0.78)",margin:"0 0 16px",lineHeight:1.6}}>
                If you discover a security vulnerability in Finpersona, we ask that you disclose it to us responsibly before making any public disclosure. We commit to acknowledging your report within 24 hours, investigating and resolving valid vulnerabilities within 30 days, and providing credit if you wish to be acknowledged.
              </p>
              <a href="mailto:security@finpersona.com" style={{display:"inline-flex",alignItems:"center",gap:8,height:38,padding:"0 18px",borderRadius:"var(--r-pill)",background:"rgba(255,255,255,0.12)",color:"#fff",fontSize:13,fontWeight:600,border:"0.5px solid rgba(255,255,255,0.20)"}}>
                <Mail size={14} />
                security@finpersona.com
              </a>
            </div>
          </div>
        </div>

        {/* Footer links */}
        <div style={{marginTop:48,paddingTop:24,borderTop:"0.5px solid var(--divider)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <Link href="/privacy-policy" style={{fontSize:13,color:"var(--purple)",fontWeight:600}}>Read our Privacy Policy →</Link>
          <Link href="/" style={{fontSize:13,color:"var(--muted)"}}>← Back to Finpersona</Link>
        </div>
      </div>
    </div>
  );
}
