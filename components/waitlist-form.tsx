"use client";

interface WaitlistFormProps {
  dark?: boolean;
}

export default function WaitlistForm({dark}: WaitlistFormProps) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const input = e.currentTarget.querySelector('input') as HTMLInputElement;
    if (input) {
      input.value = "";
      input.placeholder = "On the list — we'll be in touch";
    }
  }
  return (
    <form
      className={`waitlist-form${dark ? " adv-waitlist-dark" : ""}`}
      onSubmit={handleSubmit}
    >
      <input type="email" placeholder="you@advisory.com" required />
      <button className="btn btn-primary" type="submit">
        <span>Join waitlist</span>
      </button>
    </form>
  );
}
