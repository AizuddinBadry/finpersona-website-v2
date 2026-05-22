import type {Metadata} from "next";
import Link from "next/link";
import {Mail, Clock, Building2} from "lucide-react";
import ContactForm from "@/components/contact-form";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with the Finpersona team — send us a message or email hello@finpersona.com.",
  alternates: {canonical: "https://finpersona.com/contact"},
  openGraph: {
    title: "Contact | Finpersona",
    description: "Send the Finpersona team a message.",
    url: "https://finpersona.com/contact",
  },
};

export default function ContactPage() {
  return (
    <div>
      <div className="legal-hero">
        <div className="legal-hero-inner">
          <span className="eyebrow" style={{color:"var(--lavender)",background:"rgba(255,255,255,0.08)",borderColor:"rgba(255,255,255,0.15)"}}>We&apos;re here to help</span>
          <h1>Get in touch</h1>
          <p>Questions, feedback, press, or partnerships — drop us a note and we&apos;ll get back to you.</p>
        </div>
      </div>

      <div className="contact-body">
        <div className="contact-layout">
          <div className="contact-form-card">
            <div className="contact-form-head">
              <h2>Send us a message</h2>
              <p>Fill out the form and we&apos;ll reply within 1–2 business days.</p>
            </div>
            <ContactForm />
          </div>

          <aside className="contact-aside">
            <div className="contact-aside-card">
              <div className="contact-aside-icon"><Mail size={18} /></div>
              <h3>Prefer email?</h3>
              <p>Reach us directly at our shared inbox — we read everything.</p>
              <a href="mailto:hello@finpersona.com" className="contact-aside-link">
                hello@finpersona.com
              </a>
            </div>

            <div className="contact-aside-card">
              <div className="contact-aside-icon"><Clock size={18} /></div>
              <h3>Response time</h3>
              <p>Most messages get a reply within <strong>1–2 business days</strong>. Urgent security reports are acknowledged within 24 hours.</p>
            </div>

            <div className="contact-aside-card">
              <div className="contact-aside-icon"><Building2 size={18} /></div>
              <h3>Company</h3>
              <p><strong>Aexlora Sdn Bhd</strong><br/>Registration No. 1668346-X<br/>Kuala Lumpur, Malaysia</p>
            </div>
          </aside>
        </div>

        <div className="contact-footer-links">
          <Link href="/security" style={{fontSize:13,color:"var(--purple)",fontWeight:600}}>How we protect your data →</Link>
          <Link href="/" style={{fontSize:13,color:"var(--muted)"}}>← Back to Finpersona</Link>
        </div>
      </div>
    </div>
  );
}
