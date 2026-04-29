"use client";

import { useState } from "react";
import type { SurveyPayload } from "@/lib/forms/schemas";

// ─── Question option lists ─────────────────────────────────────────────

const Q6_OPTIONS = [
  "Just Whalen",
  "1 other",
  "2–3 others",
  "4+ others",
];

const Q7_OPTIONS = [
  "Referral from friend or family",
  "Referral from another professional (CPA, attorney, etc.)",
  "Google or web search",
  "Social media",
  "Podcast or media appearance",
  "Event or seminar",
  "Other",
];

const Q9_OPTIONS = [
  "Personal connection with advisor",
  "Investment philosophy",
  "Fees and pricing transparency",
  "Credentials and expertise",
  "Firm reputation",
  "Tech and reporting tools",
  "Communication style",
  "Specific service (tax, estate, retirement)",
  "Recommendation from someone I trust",
];

const Q16_OPTIONS = [
  "Yes, with my name",
  "Yes, anonymously",
  "Not at this time",
];

// ─── Initial empty state ──────────────────────────────────────────────

type FormState = {
  q1_overall_onboarding: number | null;
  q2_communication_clarity: number | null;
  q3_responsiveness: number | null;
  q4_smooth_vs_clunky: string;
  q5_explained_earlier: string;
  q6_advisors_considered: string;
  q7_first_heard: string;
  q8_life_trigger: string;
  q9_mattered_most: string[];
  q10_almost_stopped: string;
  q11_stand_out: string;
  q12_decision_confidence: number | null;
  q13_one_sentence_describe: string;
  q14_searching_feelings: string;
  q15_first_90_days: string;
  q16_testimonial_consent: string;
  q17_name: string;
  q18_email: string;
};

const INITIAL: FormState = {
  q1_overall_onboarding: null,
  q2_communication_clarity: null,
  q3_responsiveness: null,
  q4_smooth_vs_clunky: "",
  q5_explained_earlier: "",
  q6_advisors_considered: "",
  q7_first_heard: "",
  q8_life_trigger: "",
  q9_mattered_most: [],
  q10_almost_stopped: "",
  q11_stand_out: "",
  q12_decision_confidence: null,
  q13_one_sentence_describe: "",
  q14_searching_feelings: "",
  q15_first_90_days: "",
  q16_testimonial_consent: "",
  q17_name: "",
  q18_email: "",
};

// ─── Shared visual building blocks ────────────────────────────────────

function QuestionLabel({
  number,
  text,
  optional = false,
}: {
  number: number;
  text: string;
  optional?: boolean;
}) {
  return (
    <div style={{ marginBottom: 14, display: "flex", alignItems: "baseline", flexWrap: "wrap", gap: 10 }}>
      <span
        style={{
          fontFamily: "var(--font-display)",
          fontSize: 14,
          fontWeight: 500,
          color: "var(--teal)",
          letterSpacing: ".05em",
        }}
      >
        Q{number}
      </span>
      <span
        style={{
          fontFamily: "var(--font-body)",
          fontSize: 16,
          lineHeight: 1.55,
          color: "var(--ink)",
          fontWeight: 400,
        }}
      >
        {text}
      </span>
      {optional && (
        <span
          style={{
            fontSize: 10,
            fontWeight: 600,
            letterSpacing: ".12em",
            textTransform: "uppercase",
            color: "var(--text-soft)",
            border: "1px solid var(--rule)",
            padding: "2px 8px",
            borderRadius: 999,
          }}
        >
          Optional
        </span>
      )}
    </div>
  );
}

function SectionHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <div style={{ marginBottom: 28, paddingBottom: 18, borderBottom: "1px solid var(--rule)" }}>
      <div className="sec-eyebrow" style={{ color: "var(--teal)", marginBottom: 10 }}>
        {eyebrow}
      </div>
      <h3
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(24px,2.4vw,32px)",
          fontWeight: 400,
          color: "var(--ink)",
          margin: 0,
          lineHeight: 1.2,
        }}
      >
        {title}
      </h3>
    </div>
  );
}

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

function Likert({
  value,
  onChange,
  name,
  leftLabel = "Poor",
  rightLabel = "Excellent",
}: {
  value: number | null;
  onChange: (n: number) => void;
  name: string;
  leftLabel?: string;
  rightLabel?: string;
}) {
  return (
    <div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(5, 1fr)",
          gap: 8,
          marginBottom: 8,
        }}
      >
        {[1, 2, 3, 4, 5].map((n) => {
          const active = value === n;
          return (
            <label
              key={n}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                padding: "14px 8px",
                border: active ? "1.5px solid var(--teal)" : "1px solid var(--rule)",
                background: active ? "rgba(0,153,204,.08)" : "var(--card)",
                color: active ? "var(--teal)" : "var(--ink)",
                fontFamily: "var(--font-display)",
                fontSize: 22,
                fontWeight: 400,
                borderRadius: 3,
                transition: "all .15s",
                userSelect: "none",
              }}
            >
              <input
                type="radio"
                name={name}
                value={n}
                checked={active}
                onChange={() => onChange(n)}
                style={{ position: "absolute", opacity: 0, pointerEvents: "none" }}
              />
              {n}
            </label>
          );
        })}
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          color: "var(--text-soft)",
        }}
      >
        <span>{leftLabel}</span>
        <span>{rightLabel}</span>
      </div>
    </div>
  );
}

function RadioGroup({
  options,
  value,
  onChange,
  name,
}: {
  options: string[];
  value: string;
  onChange: (s: string) => void;
  name: string;
}) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => {
        const active = value === opt;
        return (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              border: active ? "1.5px solid var(--teal)" : "1px solid var(--rule)",
              background: active ? "rgba(0,153,204,.06)" : "var(--card)",
              borderRadius: 3,
              cursor: "pointer",
              fontSize: 15,
              color: "var(--ink)",
              transition: "all .15s",
            }}
          >
            <input
              type="radio"
              name={name}
              value={opt}
              checked={active}
              onChange={() => onChange(opt)}
              style={{ accentColor: "#0099CC" }}
            />
            <span>{opt}</span>
          </label>
        );
      })}
    </div>
  );
}

function CheckboxGroupMax3({
  options,
  values,
  onChange,
}: {
  options: string[];
  values: string[];
  onChange: (next: string[]) => void;
}) {
  const atLimit = values.length >= 3;
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
      {options.map((opt) => {
        const checked = values.includes(opt);
        const disabled = !checked && atLimit;
        return (
          <label
            key={opt}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              padding: "12px 14px",
              border: checked ? "1.5px solid var(--teal)" : "1px solid var(--rule)",
              background: checked ? "rgba(0,153,204,.06)" : "var(--card)",
              borderRadius: 3,
              cursor: disabled ? "not-allowed" : "pointer",
              fontSize: 15,
              color: disabled ? "var(--text-xsoft)" : "var(--ink)",
              opacity: disabled ? 0.55 : 1,
              transition: "all .15s",
            }}
          >
            <input
              type="checkbox"
              checked={checked}
              disabled={disabled}
              onChange={(e) => {
                if (e.target.checked) {
                  onChange([...values, opt]);
                } else {
                  onChange(values.filter((v) => v !== opt));
                }
              }}
              style={{ accentColor: "#0099CC" }}
            />
            <span>{opt}</span>
          </label>
        );
      })}
      <div
        style={{
          fontSize: 12,
          color: "var(--text-soft)",
          marginTop: 4,
        }}
      >
        Pick up to 3. {values.length}/3 selected.
      </div>
    </div>
  );
}

// ─── Main component ────────────────────────────────────────────────────

export default function SurveyForm() {
  const [state, setState] = useState<FormState>(INITIAL);
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const update = <K extends keyof FormState>(k: K, v: FormState[K]) => {
    setState((s) => ({ ...s, [k]: v }));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError(null);

    // Light client-side guard: required Likerts must be set
    if (
      state.q1_overall_onboarding == null ||
      state.q2_communication_clarity == null ||
      state.q3_responsiveness == null
    ) {
      setError("Please answer the first three rating questions before submitting.");
      return;
    }

    // Build payload matching the Zod schema
    const payload: SurveyPayload = {
      q1_overall_onboarding: state.q1_overall_onboarding,
      q2_communication_clarity: state.q2_communication_clarity,
      q3_responsiveness: state.q3_responsiveness,
      q4_smooth_vs_clunky: state.q4_smooth_vs_clunky || undefined,
      q5_explained_earlier: state.q5_explained_earlier || undefined,
      q6_advisors_considered: state.q6_advisors_considered || undefined,
      q7_first_heard: state.q7_first_heard || undefined,
      q8_life_trigger: state.q8_life_trigger || undefined,
      q9_mattered_most: state.q9_mattered_most.length ? state.q9_mattered_most : undefined,
      q10_almost_stopped: state.q10_almost_stopped || undefined,
      q11_stand_out: state.q11_stand_out || undefined,
      q12_decision_confidence: state.q12_decision_confidence ?? undefined,
      q13_one_sentence_describe: state.q13_one_sentence_describe || undefined,
      q14_searching_feelings: state.q14_searching_feelings || undefined,
      q15_first_90_days: state.q15_first_90_days || undefined,
      q16_testimonial_consent: state.q16_testimonial_consent || undefined,
      q17_name: state.q17_name || undefined,
      q18_email: state.q18_email || "",
    };

    setSubmitting(true);
    try {
      const res = await fetch("/api/survey", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        setError("Something went wrong submitting your feedback. Please try again.");
        setSubmitting(false);
        return;
      }
      setSubmitted(true);
    } catch {
      setError("We couldn't reach the server. Check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <section style={{ background: "var(--page)", padding: "72px 56px" }}>
        <div
          style={{
            maxWidth: 720,
            margin: "0 auto",
            background: "var(--card)",
            border: "1px solid var(--rule)",
            borderRadius: 4,
            padding: "56px 48px",
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
              fontSize: "clamp(26px,2.6vw,36px)",
              fontWeight: 400,
              color: "var(--ink)",
              marginBottom: 14,
              lineHeight: 1.2,
            }}
          >
            Thank you
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
            Your feedback genuinely shapes how we welcome the next person who walks through our door. Your advisor will see this, and we appreciate you taking the time.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section style={{ background: "var(--page)", padding: "72px 56px" }} id="survey">
      <form
        onSubmit={handleSubmit}
        style={{
          maxWidth: 820,
          margin: "0 auto",
          background: "var(--card)",
          border: "1px solid var(--rule)",
          borderRadius: 4,
          padding: "56px 48px",
          boxShadow: "var(--shadow)",
        }}
        className="welcome-survey"
      >
        {/* SECTION 1 */}
        <SectionHeader eyebrow="Section 1" title="Onboarding Experience" />

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel number={1} text="How would you rate your overall onboarding experience so far?" />
          <Likert
            name="q1"
            value={state.q1_overall_onboarding}
            onChange={(n) => update("q1_overall_onboarding", n)}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel number={2} text="How clear and easy to understand was our communication during onboarding?" />
          <Likert
            name="q2"
            value={state.q2_communication_clarity}
            onChange={(n) => update("q2_communication_clarity", n)}
            leftLabel="Confusing"
            rightLabel="Crystal clear"
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel number={3} text="How responsive was your advisor and the Whalen team to your questions?" />
          <Likert
            name="q3"
            value={state.q3_responsiveness}
            onChange={(n) => update("q3_responsiveness", n)}
            leftLabel="Slow"
            rightLabel="Very responsive"
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={4}
            text="Which parts of getting started felt smoothest, and which felt clunky or confusing?"
            optional
          />
          <textarea
            rows={4}
            value={state.q4_smooth_vs_clunky}
            onChange={(e) => update("q4_smooth_vs_clunky", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 48 }}>
          <QuestionLabel
            number={5}
            text="Is there anything we should have explained earlier or in more detail?"
            optional
          />
          <input
            type="text"
            value={state.q5_explained_earlier}
            onChange={(e) => update("q5_explained_earlier", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* SECTION 2 */}
        <SectionHeader eyebrow="Section 2" title="Why You Chose Whalen" />

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={6}
            text="Before deciding on Whalen, how many other RIAs or financial advisors did you seriously consider?"
            optional
          />
          <RadioGroup
            name="q6"
            options={Q6_OPTIONS}
            value={state.q6_advisors_considered}
            onChange={(s) => update("q6_advisors_considered", s)}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={7}
            text="How did you first hear about Whalen Financial?"
            optional
          />
          <RadioGroup
            name="q7"
            options={Q7_OPTIONS}
            value={state.q7_first_heard}
            onChange={(s) => update("q7_first_heard", s)}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={8}
            text="What was happening in your life that triggered the search for a new advisor?"
            optional
          />
          <textarea
            rows={4}
            value={state.q8_life_trigger}
            onChange={(e) => update("q8_life_trigger", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={9}
            text="Which of the following mattered most when choosing us? (pick up to 3)"
            optional
          />
          <CheckboxGroupMax3
            options={Q9_OPTIONS}
            values={state.q9_mattered_most}
            onChange={(next) => update("q9_mattered_most", next)}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={10}
            text="What almost stopped you from moving forward with Whalen?"
            optional
          />
          <textarea
            rows={4}
            value={state.q10_almost_stopped}
            onChange={(e) => update("q10_almost_stopped", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={11}
            text="If you compared us to other firms, what made Whalen stand out?"
            optional
          />
          <textarea
            rows={4}
            value={state.q11_stand_out}
            onChange={(e) => update("q11_stand_out", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={12}
            text="How confident did you feel in your decision the day you signed on?"
            optional
          />
          <Likert
            name="q12"
            value={state.q12_decision_confidence}
            onChange={(n) => update("q12_decision_confidence", n)}
            leftLabel="Uncertain"
            rightLabel="Very confident"
          />
        </div>

        <div style={{ marginBottom: 48 }}>
          <QuestionLabel
            number={13}
            text="In one sentence, how would you describe Whalen to a friend who's looking for an advisor?"
            optional
          />
          <input
            type="text"
            value={state.q13_one_sentence_describe}
            onChange={(e) => update("q13_one_sentence_describe", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* SECTION 3 */}
        <SectionHeader eyebrow="Section 3" title="Open-Ended Reflections" />

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={14}
            text="Take us back to when you were searching — what were you feeling, worrying about, or hoping to find in an advisor?"
            optional
          />
          <textarea
            rows={4}
            value={state.q14_searching_feelings}
            onChange={(e) => update("q14_searching_feelings", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={15}
            text="Is there anything we could improve to make new clients feel even more confident in their first 90 days?"
            optional
          />
          <textarea
            rows={4}
            value={state.q15_first_90_days}
            onChange={(e) => update("q15_first_90_days", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel
            number={16}
            text="May we share your feedback (anonymously or attributed) as a testimonial?"
            optional
          />
          <RadioGroup
            name="q16"
            options={Q16_OPTIONS}
            value={state.q16_testimonial_consent}
            onChange={(s) => update("q16_testimonial_consent", s)}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel number={17} text="Your name" optional />
          <input
            type="text"
            value={state.q17_name}
            onChange={(e) => update("q17_name", e.target.value)}
            style={inputStyle}
          />
        </div>

        <div style={{ marginBottom: 36 }}>
          <QuestionLabel number={18} text="Your email" optional />
          <input
            type="email"
            value={state.q18_email}
            onChange={(e) => update("q18_email", e.target.value)}
            style={inputStyle}
          />
        </div>

        {/* Error + Submit */}
        {error && (
          <div
            role="alert"
            style={{
              padding: "12px 14px",
              marginBottom: 20,
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
            opacity: submitting ? 0.6 : 1,
            cursor: submitting ? "wait" : "pointer",
          }}
        >
          {submitting ? "Submitting…" : "Submit feedback"}
        </button>

        <style>{`
          .welcome-survey input:focus,
          .welcome-survey textarea:focus {
            border-color: var(--teal) !important;
            box-shadow: 0 0 0 3px rgba(0,153,204,.12);
          }
          @media(max-width:1100px){
            .welcome-survey{padding:40px 24px!important}
          }
        `}</style>
      </form>
    </section>
  );
}
