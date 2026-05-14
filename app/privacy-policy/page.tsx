import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "How Finpersona collects, uses, and protects your personal financial data. Compliant with the Personal Data Protection Act 2010 (PDPA) of Malaysia.",
  alternates: {canonical: "https://finpersona.com/privacy-policy"},
  openGraph: {
    title: "Privacy Policy | Finpersona",
    description: "How Finpersona collects, uses, and protects your personal financial data. PDPA (Malaysia) compliant.",
    url: "https://finpersona.com/privacy-policy",
  },
  robots: {index:true, follow:false},
};

const sections = [
  {id:"introduction",title:"1. Introduction",content:"Finpersona (\"we\", \"us\", or \"our\") is operated by Aexlora Sdn Bhd, a company incorporated in Malaysia. We are committed to protecting your personal data in accordance with the Personal Data Protection Act 2010 (PDPA) of Malaysia.\n\nThis Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use the Finpersona mobile application and website (collectively, the \"Service\"). By using our Service, you agree to the collection and use of information in accordance with this policy."},
  {id:"data-collected",title:"2. Information We Collect",content:"We collect the following categories of personal data:\n\n2.1 Account Information — When you register, we collect your name, email address, and password (stored as a secure hash). You may optionally provide your phone number and profile photo.\n\n2.2 Financial Information — Income details you enter, expense data from receipts you scan, bank transaction data if you connect a bank account, EPF and insurance contribution information, and LHDN tax relief category data.\n\n2.3 Usage Data — Device information, app usage logs, IP address and approximate location, and crash reports.\n\n2.4 Receipt Images — When you scan receipts, we temporarily process images using OCR to extract merchant name, date, amount, and items. Images are not permanently stored after extraction unless you explicitly save them."},
  {id:"how-we-use",title:"3. How We Use Your Information",content:"We use your personal data for the following purposes:\n\nCore Service Delivery — To provide expense tracking, tax relief calculation, split bill functionality, and budgeting features. To calculate your estimated LHDN tax liability and identify eligible tax relief.\n\nService Improvement — To analyze usage patterns, debug errors, and develop new features.\n\nCommunications — To send important service notifications and respond to support inquiries. With your consent, to send product updates.\n\nLegal Compliance — To comply with applicable Malaysian laws and respond to lawful requests from government authorities.\n\nWe do NOT sell, rent, or trade your personal data to third parties for marketing purposes. We do NOT use your financial data for advertising profiling."},
  {id:"data-sharing",title:"4. Data Sharing and Disclosure",content:"We share your data only in the following limited circumstances:\n\nService Providers — Trusted third-party providers to operate our infrastructure (cloud hosting, OCR processing, analytics). These providers are contractually bound to protect your data.\n\nLegal Requirements — We may disclose your data if required by Malaysian law, court order, or government authority, including LHDN if legally compelled.\n\nBusiness Transfer — If Finpersona is acquired or merged, your data may be transferred. We will notify you before your data becomes subject to a different privacy policy.\n\nWith Your Consent — We may share data with third parties when you explicitly authorize us to do so.\n\nWe never share your data with advertisers or data brokers."},
  {id:"data-security",title:"5. Data Security",content:"We implement industry-standard security measures to protect your personal data:\n\n• Encryption in Transit — All data transmitted between the app and our servers uses TLS 1.3 encryption.\n• Encryption at Rest — Sensitive financial data is encrypted using AES-256.\n• Access Controls — Strict role-based access controls limit who within our team can access user data.\n• Security Audits — We conduct regular security assessments and vulnerability testing.\n• No Plain-Text Passwords — Passwords are hashed using bcrypt and never stored in readable form.\n\nNo method of electronic transmission or storage is 100% secure. We encourage you to use a strong password and enable two-factor authentication."},
  {id:"data-retention",title:"6. Data Retention",content:"We retain your personal data for as long as your account is active or as needed to provide the Service.\n\nIf you delete your account, we will delete or anonymize your personal data within 30 days, except where retention is required by Malaysian law (financial records may be retained for up to 7 years for tax compliance purposes).\n\nReceipt images are processed in memory and not retained beyond the OCR extraction session unless you explicitly save a receipt to your account."},
  {id:"your-rights",title:"7. Your Rights Under PDPA",content:"Under the Personal Data Protection Act 2010 (Malaysia), you have the following rights:\n\nRight of Access — You may request a copy of the personal data we hold about you.\n\nRight of Correction — You may request that we correct inaccurate or incomplete personal data.\n\nRight to Withdraw Consent — Where processing is based on consent, you may withdraw consent at any time.\n\nRight to Limit Processing — You may request that we limit how we use your data in certain circumstances.\n\nRight to Data Portability — You may request an export of your data in CSV/JSON format.\n\nRight to Erasure — You may request deletion of your account and associated personal data, subject to legal retention obligations.\n\nTo exercise any of these rights, contact us at privacy@finpersona.com. We will respond within 21 days."},
  {id:"cookies",title:"8. Cookies and Tracking",content:"Our website uses cookies and similar technologies to maintain your login session, remember your preferences, analyze website traffic using anonymized analytics, and detect fraudulent activity.\n\nYou can control cookies through your browser settings. Disabling cookies may affect certain features. We do not use third-party advertising cookies."},
  {id:"children",title:"9. Children's Privacy",content:"Finpersona is not directed at individuals under 18 years of age. We do not knowingly collect personal data from minors. If you believe a minor has provided us with personal data, contact us at privacy@finpersona.com immediately."},
  {id:"third-party",title:"10. Third-Party Links",content:"Our Service may contain links to third-party websites (such as LHDN's e-Filing portal or bank websites). We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies before providing any personal information."},
  {id:"changes",title:"11. Changes to This Policy",content:"We may update this Privacy Policy from time to time. We will notify you of material changes via email (at least 14 days before the change takes effect) and an in-app notification.\n\nYour continued use of the Service after the effective date constitutes acceptance of the revised policy."},
  {id:"contact",title:"12. Contact Us",content:"For questions, concerns, or requests regarding this Privacy Policy or your personal data:\n\nEmail: privacy@finpersona.com\nCompany: Aexlora Sdn Bhd, Malaysia\n\nFor PDPA complaints we cannot resolve, you may lodge a complaint with the Personal Data Protection Department (JPDP) of Malaysia."},
];

export default function PrivacyPolicyPage() {
  return (
    <div>
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="eyebrow" style={{color:"var(--lavender)",background:"rgba(255,255,255,0.08)",borderColor:"rgba(255,255,255,0.15)"}}>PDPA Compliant · Malaysia</span>
          <h1>Privacy Policy</h1>
          <p>Last updated: 1 March 2026</p>
        </div>
      </div>
      <div className="legal-body">
        <div className="legal-toc">
          <h2>Contents</h2>
          <ul>
            {sections.map(s => (
              <li key={s.id}><a href={`#${s.id}`}>{s.title}</a></li>
            ))}
          </ul>
        </div>
        <div>
          {sections.map(s => (
            <div key={s.id} id={s.id} className="legal-section">
              <h2>{s.title}</h2>
              {s.content.split("\n\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          ))}
        </div>
        <div style={{marginTop:48,paddingTop:24,borderTop:"0.5px solid var(--divider)",display:"flex",justifyContent:"space-between",alignItems:"center",flexWrap:"wrap",gap:16}}>
          <Link href="/terms" style={{fontSize:13,color:"var(--purple)",fontWeight:600}}>View Terms of Service →</Link>
          <Link href="/" style={{fontSize:13,color:"var(--muted)"}}>← Back to Finpersona</Link>
        </div>
      </div>
    </div>
  );
}
