"use client";

import { useState } from "react";
import type { ReferralPayload } from "@/lib/forms/schemas";

const RELATIONSHIP_OPTIONS = ["Family", "Friend", "Colleague", "Other"] as const;
type Relationship = (typeof RELATIONSHIP_OPTIONS)[number];

type FormState = {
  name: string;
  email: string;
  referral_name: string;
  referral_email: string;
  referral_phone: string;
  relationship: Relationship | "";
  note: string;
};

const INITIAL: FormState = {
  name: "",
  email: "",
  referral_name: "",
  referral_email: "",
  referral_phone: "",
  relationship: "",
  note: "",
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "12px 14px",
  fontFamily: "var(--font-body)",
  fontSize: 15,
  lineHeight: 1.5,
  color: "var(--ink)",
  background: "var(--card)",
  border: "1px solid var(--rule)",
  borderRadius: 3,
  outline: "none",
  transition: "border-color .2s",
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 13,
  fontWeight: 500,
  color: "var(--ink)",
  marginBottom: 8,
  letterSpacing: ".01em",
};

const optionalBadge: React.CSSProperties = {
  fontSize: 10,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
  marginLeft: 8,
};

function firstName(full: string): string {
  const trimmed = full.trim();
  if (!trimmed) return "them";
  return trimmed.split(/\s+/)[0];
}

export default function ReferralForm() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submittedReferralName, setSubmittedReferralName] = useState("");
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setState((s) => ({ ...s, [k]: v }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    if (!state.relationship) {
      setError("Please tell us your relationship with the person you're referring.");
      return;
    }

    const payload: ReferralPayload = {
      name: state.name,
      email: state.email,
      referral_name: state.referral_name,
      referral_email: state.referral_email,
      referral_phone: state.referral_phone || undefined,
      relationship: state.relationship,
      note: state.note || undefined,
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/refer", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError("Something went wrong sending your referral. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmittedReferralName(state.referral_name);
      setSubmitted(true);
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section style={{ background: "var(--page)", padding: "32px 56px 96px" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "var(--card)",
            border: "1px solid var(--rule)",
            borderRadius: 4,
            padding: "48px 40px",
            textAlign: "center",
            boxShadow: "var(--shadow)",
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: "50%",
              background: "rgba(0,153,204,.12)",
              border: "2px solid rgba(0,153,204,.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "0 auto 24px",
            }}
          >
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M6 13 L11 18 L20 8" stroke="#0099CC" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h3
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(24px,2.4vw,32px)",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: 14,
              lineHeight: 1.2,
            }}
          >
            Thank you — we&rsquo;ve got it.
          </h3>
          <p
            style={{
              fontSize: 17,
              lineHeight: 1.7,
              color: "var(--text-mid)",
              fontWeight: 300,
              margin: 0,
            }}
          >
            We&rsquo;ll reach out to {firstName(submittedReferralName)} within the week and let you know how it goes.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--page)", padding: "32px 56px 96px" }} id="referral">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 720,
          margin: "0 auto",
          background: "var(--card)",
          border: "1px solid var(--rule)",
          borderRadius: 4,
          padding: "48px 40px",
          boxShadow: "var(--shadow)",
        }}
        className="welcome-referral"
      >
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }} className="referral-grid">
          <div>
            <label style={labelStyle}>Your name</label>
            <input
              type="text"
              required
              value={state.name}
              onChange={(e) => update("name", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Your email</label>
            <input
              type="email"
              required
              value={state.email}
              onChange={(e) => update("email", e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>Referral&rsquo;s name</label>
            <input
              type="text"
              required
              value={state.referral_name}
              onChange={(e) => update("referral_name", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Referral&rsquo;s email</label>
            <input
              type="email"
              required
              value={state.referral_email}
              onChange={(e) => update("referral_email", e.target.value)}
              style={inputStyle}
            />
          </div>

          <div>
            <label style={labelStyle}>
              Referral&rsquo;s phone
              <span style={optionalBadge}>(optional)</span>
            </label>
            <input
              type="tel"
              value={state.referral_phone}
              onChange={(e) => update("referral_phone", e.target.value)}
              style={inputStyle}
            />
          </div>
          <div>
            <label style={labelStyle}>Relationship</label>
            <select
              required
              value={state.relationship}
              onChange={(e) => update("relationship", e.target.value as Relationship)}
              style={{ ...inputStyle, appearance: "auto" }}
            >
              <option value="" disabled>
                Choose one
              </option>
              {RELATIONSHIP_OPTIONS.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div style={{ marginTop: 20 }}>
          <label style={labelStyle}>
            A short note about why you think they&rsquo;d be a good fit for Whalen
            <span style={optionalBadge}>(optional)</span>
          </label>
          <textarea
            rows={4}
            value={state.note}
            onChange={(e) => update("note", e.target.value)}
            style={inputStyle}
          />
        </div>

        {error && (
          <div
            role="alert"
            style={{
              padding: "12px 14px",
              marginTop: 20,
              border: "1px solid #d4452a",
              background: "rgba(212,69,42,.06)",
              color: "#9a3320",
              fontSize: 14,
              borderRadius: 3,
            }}
          >
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="btn-primary"
          style={{
            width: "100%",
            marginTop: 24,
            opacity: submitting ? 0.6 : 1,
            cursor: submitting ? "wait" : "pointer",
          }}
        >
          {submitting ? "Sending…" : "Send referral"}
        </button>

        <style>{`
          .welcome-referral input:focus,
          .welcome-referral textarea:focus,
          .welcome-referral select:focus {
            border-color: var(--teal) !important;
            box-shadow: 0 0 0 3px rgba(0,153,204,.12);
          }
          @media(max-width:640px){
            .referral-grid{grid-template-columns:1fr!important}
            .welcome-referral{padding:36px 24px!important}
          }
        `}</style>
      </form>
    </section>
  );
}
