import type {Metadata} from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms and conditions for using Finpersona — Malaysia's AI-native personal finance platform. Governing law: Malaysia.",
  alternates: {canonical: "https://finpersona.com/terms"},
  openGraph: {
    title: "Terms of Service | Finpersona",
    description: "Terms and conditions for using Finpersona personal finance and tax compliance platform.",
    url: "https://finpersona.com/terms",
  },
  robots: {index:true, follow:false},
};

const sections = [
  {id:"acceptance",title:"1. Acceptance of Terms",content:"By accessing or using Finpersona (the \"Service\"), operated by Aexlora Sdn Bhd (\"Company\", \"we\", \"us\", \"our\"), you agree to be bound by these Terms of Service (\"Terms\"). If you do not agree to these Terms, do not use the Service.\n\nThese Terms apply to all users of the Service, including visitors, registered users, and anyone who accesses any part of the Service. We reserve the right to update these Terms at any time. We will notify you of material changes via email or in-app notification at least 14 days before they take effect."},
  {id:"eligibility",title:"2. Eligibility",content:"To use Finpersona, you must be at least 18 years of age, be a legal resident of Malaysia or have Malaysian tax obligations, have the legal capacity to enter into a binding agreement, and not have been previously suspended or removed from the Service."},
  {id:"account",title:"3. Account Registration and Security",content:"Registration — You must create an account to access most features. You agree to provide accurate, current, and complete information during registration and to keep it updated.\n\nAccount Security — You are responsible for maintaining the confidentiality of your password and for all activities that occur under your account. Notify us at support@finpersona.com if you suspect unauthorized access.\n\nOne Account Per Person — You may not create multiple accounts for fraudulent purposes.\n\nAccount Termination — You may delete your account at any time from within the app. We may suspend or terminate accounts that violate these Terms."},
  {id:"service-description",title:"4. Description of Service",content:"Finpersona provides the following features:\n\n• Expense Tracking — Manual and receipt-based expense logging with automatic categorization\n• Split Bill — Tools to split and track shared expenses\n• Budgeting — Monthly budget planning and overspend alerts\n• Tax Relief Tracking — Automatic identification and tracking of LHDN tax relief categories\n• Tax Estimation — Real-time estimates of Malaysian income tax liability\n• AI Financial Insights — AI-powered analysis of spending patterns and savings recommendations\n• Income & EPF Tracking — Monitoring of salary, freelance income, and EPF contributions\n\nWe reserve the right to modify, suspend, or discontinue any part of the Service at any time with reasonable notice."},
  {id:"tax-disclaimer",title:"5. Tax Information Disclaimer",content:"IMPORTANT: PLEASE READ THIS SECTION CAREFULLY.\n\nNot Professional Tax Advice — Finpersona is a technology tool designed to help you organize financial data and estimate tax relief based on publicly available LHDN guidelines. The information, calculations, and suggestions provided by Finpersona do NOT constitute professional tax advice, legal advice, or accounting advice.\n\nAccuracy Not Guaranteed — While we strive to keep our tax calculations current and accurate, tax laws in Malaysia change regularly. We cannot guarantee that the information is always complete, accurate, or up to date. Do not rely solely on Finpersona for your official tax filing obligations.\n\nConsult a Professional — For complex tax situations, we strongly recommend consulting a licensed tax agent, accountant, or LHDN directly.\n\nNo Liability for Tax Matters — The Company is not liable for any tax penalties, underpayments, audit results, or other tax-related consequences arising from your reliance on information provided by the Service."},
  {id:"acceptable-use",title:"6. Acceptable Use",content:"You agree to use the Service only for lawful purposes. You must NOT:\n\n• Upload false, fraudulent, or misleading financial data\n• Attempt to gain unauthorized access to other users' accounts or our systems\n• Reverse engineer, decompile, or extract source code from the app\n• Use the Service to engage in money laundering, tax fraud, or any other illegal financial activity\n• Sell, resell, or commercialize access to the Service without written permission\n• Interfere with or disrupt the integrity or performance of the Service\n• Use automated scripts or bots to access the Service\n\nViolation of this section may result in immediate account termination."},
  {id:"intellectual-property",title:"7. Intellectual Property",content:"Our IP — The Service, including its design, code, features, logos, and content, is owned by Aexlora Sdn Bhd and protected by Malaysian and international intellectual property laws.\n\nYour Data — You retain ownership of all personal financial data you input into the Service. By using the Service, you grant us a limited, non-exclusive license to process your data solely to provide the Service to you.\n\nFeedback — If you submit suggestions or feedback about the Service, you grant us the right to use them without obligation or compensation."},
  {id:"privacy",title:"8. Privacy",content:"Your use of the Service is governed by our Privacy Policy, which is incorporated into these Terms by reference. By using the Service, you consent to the collection, use, and disclosure of your information as described in our Privacy Policy.\n\nPlease review our Privacy Policy at finpersona.com/privacy-policy to understand our practices."},
  {id:"third-party",title:"9. Third-Party Services",content:"The Service may integrate with or link to third-party services, including bank account connectivity services, LHDN e-Filing portal (ezHASiL), and cloud infrastructure providers (Supabase).\n\nYour use of third-party services is governed by their respective terms and privacy policies. We are not responsible for the content, privacy practices, or availability of third-party services."},
  {id:"limitation",title:"10. Limitation of Liability",content:"TO THE MAXIMUM EXTENT PERMITTED BY MALAYSIAN LAW:\n\nThe Service is provided \"AS IS\" and \"AS AVAILABLE\" without any warranties of any kind, either express or implied.\n\nIn no event shall Aexlora Sdn Bhd, its directors, employees, or agents be liable for any indirect, incidental, special, consequential, or punitive damages; any loss of profits, data, goodwill, or other intangible losses; any tax penalties, filing errors, or financial losses arising from reliance on our tax calculations; or any unauthorized access to or alteration of your data.\n\nOur total liability to you shall not exceed the amount you paid us in the 12 months preceding the claim (or RM 100 if you have not made any payments)."},
  {id:"indemnification",title:"11. Indemnification",content:"You agree to indemnify, defend, and hold harmless Aexlora Sdn Bhd and its officers, directors, employees, agents, and partners from any claims, damages, losses, liabilities, costs, and expenses (including legal fees) arising from your use of or inability to use the Service, your violation of these Terms, or any financial data you provide that is false, inaccurate, or misleading."},
  {id:"governing-law",title:"12. Governing Law and Dispute Resolution",content:"These Terms are governed by and construed in accordance with the laws of Malaysia, without regard to conflict of law principles.\n\nDispute Resolution — Any disputes shall first be attempted to be resolved through good-faith negotiation. If not resolved within 30 days, disputes shall be submitted to the exclusive jurisdiction of the courts of Malaysia in Kuala Lumpur.\n\nConsumer Rights — Nothing in these Terms limits your rights under the Consumer Protection Act 1999 (Malaysia)."},
  {id:"changes",title:"13. Changes to Terms",content:"We may revise these Terms at any time. For material changes, we will provide at least 14 days' notice via email and in-app notification.\n\nYour continued use of the Service after the effective date of revised Terms constitutes your acceptance of the changes."},
  {id:"contact",title:"14. Contact",content:"For questions about these Terms:\n\nEmail: legal@finpersona.com\nSupport: support@finpersona.com\nCompany: Aexlora Sdn Bhd, Malaysia\n\nResponse time: We aim to respond to all legal inquiries within 5 business days."},
];

export default function TermsPage() {
  return (
    <div>
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="eyebrow" style={{color:"var(--lavender)",background:"rgba(255,255,255,0.08)",borderColor:"rgba(255,255,255,0.15)"}}>Governing Law: Malaysia</span>
          <h1>Terms of Service</h1>
          <p>Last updated: 1 March 2026</p>
        </div>
      </div>
      <div className="legal-body">
        <div className="legal-notice">
          <p><strong>Important Notice:</strong> Finpersona provides financial organization tools and tax estimation features. It does <strong>not</strong> provide professional tax advice. Always consult a licensed tax agent for complex tax situations. See Section 5 for full tax disclaimer.</p>
        </div>
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
          <Link href="/privacy-policy" style={{fontSize:13,color:"var(--purple)",fontWeight:600}}>View Privacy Policy →</Link>
          <Link href="/" style={{fontSize:13,color:"var(--muted)"}}>← Back to Finpersona</Link>
        </div>
      </div>
    </div>
  );
}
