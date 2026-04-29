"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { Job, JobSection } from "@/lib/jobs";
import { saveJob, deleteJob } from "../jobs/actions";

type JobFormProps = {
  initial: Job;
  mode: "create" | "edit";
};

type FieldErrors = Record<string, string[]>;

// ─── Styles ─────────────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5dfd6",
  borderRadius: 4,
  padding: "32px 36px",
  marginBottom: 24,
  boxShadow: "0 1px 3px rgba(10,24,41,.04)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 18,
  fontWeight: 500,
  color: "#1a2535",
  margin: "0 0 6px",
  letterSpacing: ".01em",
};

const sectionDescStyle: React.CSSProperties = {
  fontSize: 13,
  color: "#607a8f",
  margin: "0 0 20px",
  lineHeight: 1.55,
};

const labelStyle: React.CSSProperties = {
  display: "block",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".06em",
  textTransform: "uppercase",
  color: "#1a2535",
  marginBottom: 8,
};

const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "10px 12px",
  fontFamily: "var(--font-body)",
  fontSize: 14,
  lineHeight: 1.5,
  color: "#1a2535",
  background: "#ffffff",
  border: "1px solid #d4cdc0",
  borderRadius: 3,
  outline: "none",
  transition: "border-color .2s",
  boxSizing: "border-box",
};

const readOnlyInputStyle: React.CSSProperties = {
  ...inputStyle,
  background: "#f4f1ec",
  color: "#607a8f",
  cursor: "not-allowed",
};

const textareaStyle: React.CSSProperties = {
  ...inputStyle,
  minHeight: 96,
  fontFamily: "var(--font-body)",
  resize: "vertical",
};

const helperStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#8fa3b3",
  margin: "6px 0 0",
  lineHeight: 1.5,
};

const errorStyle: React.CSSProperties = {
  fontSize: 12,
  color: "#b3261e",
  margin: "6px 0 0",
  lineHeight: 1.5,
};

const fieldStyle: React.CSSProperties = {
  marginBottom: 20,
};

const buttonPrimaryStyle: React.CSSProperties = {
  background: "#0099CC",
  color: "#ffffff",
  border: "none",
  padding: "12px 28px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  borderRadius: 2,
  cursor: "pointer",
  transition: "background .2s, opacity .2s",
  fontFamily: "var(--font-body)",
};

const buttonSecondaryStyle: React.CSSProperties = {
  background: "transparent",
  color: "#1a2535",
  border: "1px solid #d4cdc0",
  padding: "12px 24px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  borderRadius: 2,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
};

const buttonDangerStyle: React.CSSProperties = {
  background: "transparent",
  color: "#b3261e",
  border: "1px solid #e5b8b4",
  padding: "12px 24px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  borderRadius: 2,
  cursor: "pointer",
  fontFamily: "var(--font-body)",
};

const sectionBlockStyle: React.CSSProperties = {
  border: "1px solid #e5dfd6",
  borderRadius: 3,
  padding: "20px 20px 4px",
  marginBottom: 16,
  background: "#fbfaf7",
};

const sectionRowStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 12,
  gap: 12,
};

const sectionIndexStyle: React.CSSProperties = {
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "#607a8f",
};

// ─── Helpers ────────────────────────────────────────────────────────────

function linesToArray(value: string): string[] {
  return value
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0);
}

function arrayToLines(arr: string[]): string {
  return arr.join("\n");
}

type FormState = {
  slug: string;
  title: string;
  tagsText: string;
  summary: string;
  intro: string;
  introPointsText: string;
  introFooter: string;
  responsibilities: Array<{ title: string; itemsText: string }>;
  notThisText: string;
  notThisFooter: string;
  requiredText: string;
  preferredText: string;
  salaryDisplay: string;
  salaryLabel: string;
  bonusTitle: string;
  bonusBody: string;
  benefitsText: string;
  applySubject: string;
};

function fromJob(job: Job): FormState {
  return {
    slug: job.slug,
    title: job.title,
    tagsText: arrayToLines(job.tags),
    summary: job.summary,
    intro: job.intro,
    introPointsText: arrayToLines(job.introPoints),
    introFooter: job.introFooter,
    responsibilities: job.responsibilities.map((r) => ({
      title: r.title,
      itemsText: arrayToLines(r.items),
    })),
    notThisText: arrayToLines(job.notThis),
    notThisFooter: job.notThisFooter,
    requiredText: arrayToLines(job.required),
    preferredText: arrayToLines(job.preferred),
    salaryDisplay: job.salaryDisplay,
    salaryLabel: job.salaryLabel,
    bonusTitle: job.bonusTitle,
    bonusBody: job.bonusBody,
    benefitsText: arrayToLines(job.benefits),
    applySubject: job.applySubject,
  };
}

function toJob(state: FormState): Job {
  const responsibilities: JobSection[] = state.responsibilities.map((r) => ({
    title: r.title.trim(),
    items: linesToArray(r.itemsText),
  }));

  return {
    slug: state.slug.trim(),
    title: state.title.trim(),
    tags: linesToArray(state.tagsText),
    summary: state.summary,
    intro: state.intro,
    introPoints: linesToArray(state.introPointsText),
    introFooter: state.introFooter,
    responsibilities,
    notThis: linesToArray(state.notThisText),
    notThisFooter: state.notThisFooter,
    required: linesToArray(state.requiredText),
    preferred: linesToArray(state.preferredText),
    salaryDisplay: state.salaryDisplay,
    salaryLabel: state.salaryLabel,
    bonusTitle: state.bonusTitle,
    bonusBody: state.bonusBody,
    benefits: linesToArray(state.benefitsText),
    applySubject: state.applySubject,
  };
}

// ─── Component ──────────────────────────────────────────────────────────

export default function JobForm({ initial, mode }: JobFormProps) {
  const router = useRouter();
  const [state, setState] = useState<FormState>(fromJob(initial));
  const [errors, setErrors] = useState<FieldErrors>({});
  const [formMessage, setFormMessage] = useState<string | null>(null);
  const [pending, startTransition] = useTransition();
  const [deleting, startDeleteTransition] = useTransition();

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((s) => ({ ...s, [key]: value }));
  }

  function addSection() {
    setState((s) => ({
      ...s,
      responsibilities: [...s.responsibilities, { title: "", itemsText: "" }],
    }));
  }

  function removeSection(idx: number) {
    setState((s) => ({
      ...s,
      responsibilities: s.responsibilities.filter((_, i) => i !== idx),
    }));
  }

  function updateSection(
    idx: number,
    patch: Partial<{ title: string; itemsText: string }>,
  ) {
    setState((s) => ({
      ...s,
      responsibilities: s.responsibilities.map((r, i) =>
        i === idx ? { ...r, ...patch } : r,
      ),
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setFormMessage(null);

    const job = toJob(state);
    const originalSlug = mode === "edit" ? initial.slug : undefined;

    startTransition(async () => {
      const result = await saveJob(job, mode, originalSlug);
      // Server action redirects on success — if we're still here, it failed.
      if (result && result.ok === false) {
        setErrors((result.errors as FieldErrors) ?? {});
        setFormMessage(result.message ?? "Could not save the posting.");
      }
    });
  }

  function handleDelete() {
    if (mode !== "edit") return;
    const confirmed = window.confirm(
      `Delete posting "${initial.title || initial.slug}"? This cannot be undone.`,
    );
    if (!confirmed) return;

    startDeleteTransition(async () => {
      await deleteJob(initial.slug);
    });
  }

  const fieldError = (key: string) => errors[key]?.[0];

  return (
    <form onSubmit={handleSubmit} noValidate>
      {formMessage ? (
        <div
          role="alert"
          style={{
            background: "#fdecea",
            border: "1px solid #e5b8b4",
            color: "#7a1a14",
            padding: "12px 16px",
            borderRadius: 3,
            marginBottom: 20,
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          {formMessage}
        </div>
      ) : null}

      {/* ── Basics ────────────────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Basics</h2>
        <p style={sectionDescStyle}>
          Title and slug appear on the careers list. Slug is the URL segment and
          cannot be changed after creation.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="title">
            Title
          </label>
          <input
            id="title"
            type="text"
            value={state.title}
            onChange={(e) => update("title", e.target.value)}
            style={inputStyle}
            required
          />
          {fieldError("title") ? (
            <p style={errorStyle}>{fieldError("title")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="slug">
            Slug
          </label>
          <input
            id="slug"
            type="text"
            value={state.slug}
            onChange={(e) => update("slug", e.target.value)}
            style={mode === "edit" ? readOnlyInputStyle : inputStyle}
            readOnly={mode === "edit"}
            required
            placeholder="senior-financial-advisor"
          />
          <p style={helperStyle}>
            Lowercase letters, numbers, and hyphens only. Used in the public URL
            (e.g., /careers/{state.slug || "your-slug"}).
            {mode === "edit"
              ? " Slug is immutable after creation to avoid breaking external links."
              : ""}
          </p>
          {fieldError("slug") ? (
            <p style={errorStyle}>{fieldError("slug")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="tags">
            Tags
          </label>
          <textarea
            id="tags"
            value={state.tagsText}
            onChange={(e) => update("tagsText", e.target.value)}
            style={{ ...textareaStyle, minHeight: 80 }}
            placeholder={"Full-time\nRemote\nSalt Lake City"}
          />
          <p style={helperStyle}>One tag per line.</p>
          {fieldError("tags") ? (
            <p style={errorStyle}>{fieldError("tags")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="summary">
            Summary
          </label>
          <textarea
            id="summary"
            value={state.summary}
            onChange={(e) => update("summary", e.target.value)}
            style={textareaStyle}
          />
          <p style={helperStyle}>
            Short blurb shown on the careers list page next to the title.
          </p>
          {fieldError("summary") ? (
            <p style={errorStyle}>{fieldError("summary")}</p>
          ) : null}
        </div>
      </div>

      {/* ── Intro ─────────────────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Intro</h2>
        <p style={sectionDescStyle}>
          The opening section on the public posting detail page.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="intro">
            Intro paragraph
          </label>
          <textarea
            id="intro"
            value={state.intro}
            onChange={(e) => update("intro", e.target.value)}
            style={textareaStyle}
          />
          {fieldError("intro") ? (
            <p style={errorStyle}>{fieldError("intro")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="introPoints">
            Intro points
          </label>
          <textarea
            id="introPoints"
            value={state.introPointsText}
            onChange={(e) => update("introPointsText", e.target.value)}
            style={textareaStyle}
          />
          <p style={helperStyle}>One bullet per line.</p>
          {fieldError("introPoints") ? (
            <p style={errorStyle}>{fieldError("introPoints")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="introFooter">
            Intro footer
          </label>
          <textarea
            id="introFooter"
            value={state.introFooter}
            onChange={(e) => update("introFooter", e.target.value)}
            style={textareaStyle}
          />
          {fieldError("introFooter") ? (
            <p style={errorStyle}>{fieldError("introFooter")}</p>
          ) : null}
        </div>
      </div>

      {/* ── Responsibilities ─────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Responsibilities</h2>
        <p style={sectionDescStyle}>
          Grouped sections, each with a title and a list of bullet points.
        </p>

        {state.responsibilities.length === 0 ? (
          <p
            style={{
              ...helperStyle,
              padding: "16px",
              border: "1px dashed #d4cdc0",
              textAlign: "center",
              borderRadius: 3,
              marginBottom: 16,
            }}
          >
            No sections yet.
          </p>
        ) : null}

        {state.responsibilities.map((section, idx) => (
          <div key={idx} style={sectionBlockStyle}>
            <div style={sectionRowStyle}>
              <span style={sectionIndexStyle}>Section {idx + 1}</span>
              <button
                type="button"
                onClick={() => removeSection(idx)}
                style={{
                  ...buttonSecondaryStyle,
                  padding: "6px 12px",
                  fontSize: 11,
                  border: "1px solid #e5b8b4",
                  color: "#b3261e",
                }}
              >
                Remove
              </button>
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Title</label>
              <input
                type="text"
                value={section.title}
                onChange={(e) => updateSection(idx, { title: e.target.value })}
                style={inputStyle}
              />
            </div>

            <div style={fieldStyle}>
              <label style={labelStyle}>Items</label>
              <textarea
                value={section.itemsText}
                onChange={(e) =>
                  updateSection(idx, { itemsText: e.target.value })
                }
                style={textareaStyle}
              />
              <p style={helperStyle}>One item per line.</p>
            </div>
          </div>
        ))}

        <button type="button" onClick={addSection} style={buttonSecondaryStyle}>
          + Add Section
        </button>

        {fieldError("responsibilities") ? (
          <p style={errorStyle}>{fieldError("responsibilities")}</p>
        ) : null}
      </div>

      {/* ── Not this ─────────────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>“This is not the role if…”</h2>
        <p style={sectionDescStyle}>
          Disqualifying signals — helps self-select out anti-fit candidates.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="notThis">
            Disqualifiers
          </label>
          <textarea
            id="notThis"
            value={state.notThisText}
            onChange={(e) => update("notThisText", e.target.value)}
            style={textareaStyle}
          />
          <p style={helperStyle}>One per line.</p>
          {fieldError("notThis") ? (
            <p style={errorStyle}>{fieldError("notThis")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="notThisFooter">
            Closing line
          </label>
          <textarea
            id="notThisFooter"
            value={state.notThisFooter}
            onChange={(e) => update("notThisFooter", e.target.value)}
            style={textareaStyle}
          />
          {fieldError("notThisFooter") ? (
            <p style={errorStyle}>{fieldError("notThisFooter")}</p>
          ) : null}
        </div>
      </div>

      {/* ── Qualifications ───────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Qualifications</h2>
        <p style={sectionDescStyle}>
          What candidates need vs. nice-to-haves.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="required">
            Required
          </label>
          <textarea
            id="required"
            value={state.requiredText}
            onChange={(e) => update("requiredText", e.target.value)}
            style={textareaStyle}
          />
          <p style={helperStyle}>One per line.</p>
          {fieldError("required") ? (
            <p style={errorStyle}>{fieldError("required")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="preferred">
            Preferred
          </label>
          <textarea
            id="preferred"
            value={state.preferredText}
            onChange={(e) => update("preferredText", e.target.value)}
            style={textareaStyle}
          />
          <p style={helperStyle}>One per line.</p>
          {fieldError("preferred") ? (
            <p style={errorStyle}>{fieldError("preferred")}</p>
          ) : null}
        </div>
      </div>

      {/* ── Compensation ─────────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Compensation</h2>
        <p style={sectionDescStyle}>
          Salary headline plus a bonus blurb and the benefits list.
        </p>

        <div
          style={{
            ...fieldStyle,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 16,
          }}
        >
          <div>
            <label style={labelStyle} htmlFor="salaryDisplay">
              Salary display
            </label>
            <input
              id="salaryDisplay"
              type="text"
              value={state.salaryDisplay}
              onChange={(e) => update("salaryDisplay", e.target.value)}
              style={inputStyle}
              placeholder="$95,000 – $125,000"
            />
            {fieldError("salaryDisplay") ? (
              <p style={errorStyle}>{fieldError("salaryDisplay")}</p>
            ) : null}
          </div>

          <div>
            <label style={labelStyle} htmlFor="salaryLabel">
              Salary label
            </label>
            <input
              id="salaryLabel"
              type="text"
              value={state.salaryLabel}
              onChange={(e) => update("salaryLabel", e.target.value)}
              style={inputStyle}
              placeholder="Base salary"
            />
            {fieldError("salaryLabel") ? (
              <p style={errorStyle}>{fieldError("salaryLabel")}</p>
            ) : null}
          </div>
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="bonusTitle">
            Bonus title
          </label>
          <input
            id="bonusTitle"
            type="text"
            value={state.bonusTitle}
            onChange={(e) => update("bonusTitle", e.target.value)}
            style={inputStyle}
          />
          {fieldError("bonusTitle") ? (
            <p style={errorStyle}>{fieldError("bonusTitle")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="bonusBody">
            Bonus body
          </label>
          <textarea
            id="bonusBody"
            value={state.bonusBody}
            onChange={(e) => update("bonusBody", e.target.value)}
            style={textareaStyle}
          />
          {fieldError("bonusBody") ? (
            <p style={errorStyle}>{fieldError("bonusBody")}</p>
          ) : null}
        </div>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="benefits">
            Benefits
          </label>
          <textarea
            id="benefits"
            value={state.benefitsText}
            onChange={(e) => update("benefitsText", e.target.value)}
            style={textareaStyle}
          />
          <p style={helperStyle}>One benefit per line.</p>
          {fieldError("benefits") ? (
            <p style={errorStyle}>{fieldError("benefits")}</p>
          ) : null}
        </div>
      </div>

      {/* ── Apply ─────────────────────────────────────────────────── */}
      <div style={cardStyle}>
        <h2 style={sectionTitleStyle}>Apply</h2>
        <p style={sectionDescStyle}>
          Subject line used in the apply mailto link on the public page.
        </p>

        <div style={fieldStyle}>
          <label style={labelStyle} htmlFor="applySubject">
            Apply subject
          </label>
          <input
            id="applySubject"
            type="text"
            value={state.applySubject}
            onChange={(e) => update("applySubject", e.target.value)}
            style={inputStyle}
            placeholder="Application: Senior Financial Advisor"
          />
          {fieldError("applySubject") ? (
            <p style={errorStyle}>{fieldError("applySubject")}</p>
          ) : null}
        </div>
      </div>

      {/* ── Actions ───────────────────────────────────────────────── */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 16,
          marginTop: 8,
        }}
      >
        <div>
          {mode === "edit" ? (
            <button
              type="button"
              onClick={handleDelete}
              disabled={pending || deleting}
              style={{
                ...buttonDangerStyle,
                opacity: pending || deleting ? 0.6 : 1,
              }}
            >
              {deleting ? "Deleting…" : "Delete posting"}
            </button>
          ) : null}
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          <button
            type="button"
            onClick={() => router.push("/admin/jobs")}
            disabled={pending || deleting}
            style={{
              ...buttonSecondaryStyle,
              opacity: pending || deleting ? 0.6 : 1,
            }}
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={pending || deleting}
            style={{
              ...buttonPrimaryStyle,
              opacity: pending || deleting ? 0.6 : 1,
            }}
          >
            {pending
              ? mode === "create"
                ? "Creating…"
                : "Saving…"
              : mode === "create"
                ? "Create posting"
                : "Save changes"}
          </button>
        </div>
      </div>
    </form>
  );
}
