"use client";

import {useState} from "react";
import {ChevronDown, Send, CheckCircle2, Loader2, AlertCircle} from "lucide-react";

const TOPICS = [
  {value: "general", label: "General inquiry"},
  {value: "support", label: "Product support"},
  {value: "press", label: "Press & media"},
  {value: "partnership", label: "Partnership"},
  {value: "other", label: "Other"},
] as const;

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("general");
  const [message, setMessage] = useState("");
  const [website, setWebsite] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (status === "submitting") return;
    setStatus("submitting");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, email, topic, message, website}),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setStatus("error");
        setErrorMsg(data?.error || "Something went wrong. Please try again.");
        return;
      }
      setStatus("success");
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
  }

  function resetForm() {
    setName("");
    setEmail("");
    setTopic("general");
    setMessage("");
    setWebsite("");
    setErrorMsg("");
    setStatus("idle");
  }

  if (status === "success") {
    return (
      <div className="contact-form-success" role="status" aria-live="polite">
        <div className="contact-form-success-icon"><CheckCircle2 size={28} /></div>
        <h3>Message sent</h3>
        <p>Thanks for reaching out — we&apos;ll get back to you within 1–2 business days at <strong>{email}</strong>.</p>
        <button type="button" className="contact-form-reset" onClick={resetForm}>Send another message</button>
      </div>
    );
  }

  const submitting = status === "submitting";

  return (
    <form className="contact-form" onSubmit={handleSubmit} noValidate>
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        value={website}
        onChange={(e) => setWebsite(e.target.value)}
        style={{position:"absolute",left:"-9999px",width:1,height:1,opacity:0}}
        aria-hidden="true"
      />

      <div className="contact-form-row">
        <label className="contact-field">
          <span className="contact-field-label">Name</span>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your full name"
            maxLength={120}
            required
            disabled={submitting}
          />
        </label>
        <label className="contact-field">
          <span className="contact-field-label">Email</span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            maxLength={254}
            required
            disabled={submitting}
          />
        </label>
      </div>

      <label className="contact-field">
        <span className="contact-field-label">Topic</span>
        <div className="contact-select-wrap">
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            disabled={submitting}
            required
          >
            {TOPICS.map(t => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
          <ChevronDown size={16} className="contact-select-caret" aria-hidden="true" />
        </div>
      </label>

      <label className="contact-field">
        <span className="contact-field-label">Message</span>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How can we help?"
          rows={5}
          maxLength={5000}
          required
          disabled={submitting}
        />
        <span className="contact-field-hint">{message.length}/5000</span>
      </label>

      {status === "error" && (
        <div className="contact-form-error" role="alert">
          <AlertCircle size={16} />
          <span>{errorMsg}</span>
        </div>
      )}

      <button type="submit" className="contact-form-submit" disabled={submitting}>
        {submitting ? (
          <><Loader2 size={16} className="contact-spin" /><span>Sending…</span></>
        ) : (
          <><Send size={16} /><span>Send message</span></>
        )}
      </button>
    </form>
  );
}
