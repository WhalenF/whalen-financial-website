"use client";

import { Fragment, useMemo, useState } from "react";
import type { SurveyRow } from "@/lib/graph/excel";

// ─── Question text (from /welcome SurveyForm) ──────────────────────────

type SurveyKey = keyof Omit<SurveyRow, "submitted_at" | "ip">;

const QUESTIONS: { key: SurveyKey; number: number; text: string }[] = [
  {
    key: "q1_overall_onboarding",
    number: 1,
    text: "How would you rate your overall onboarding experience so far?",
  },
  {
    key: "q2_communication_clarity",
    number: 2,
    text: "How clear and easy to understand was our communication during onboarding?",
  },
  {
    key: "q3_responsiveness",
    number: 3,
    text: "How responsive was your advisor and the Whalen team to your questions?",
  },
  {
    key: "q4_smooth_vs_clunky",
    number: 4,
    text: "Which parts of getting started felt smoothest, and which felt clunky or confusing?",
  },
  {
    key: "q5_explained_earlier",
    number: 5,
    text: "Is there anything we should have explained earlier or in more detail?",
  },
  {
    key: "q6_advisors_considered",
    number: 6,
    text: "Before deciding on Whalen, how many other RIAs or financial advisors did you seriously consider?",
  },
  {
    key: "q7_first_heard",
    number: 7,
    text: "How did you first hear about Whalen Financial?",
  },
  {
    key: "q8_life_trigger",
    number: 8,
    text: "What was happening in your life that triggered the search for a new advisor?",
  },
  {
    key: "q9_mattered_most",
    number: 9,
    text: "Which of the following mattered most when choosing us? (pick up to 3)",
  },
  {
    key: "q10_almost_stopped",
    number: 10,
    text: "What almost stopped you from moving forward with Whalen?",
  },
  {
    key: "q11_stand_out",
    number: 11,
    text: "If you compared us to other firms, what made Whalen stand out?",
  },
  {
    key: "q12_decision_confidence",
    number: 12,
    text: "How confident did you feel in your decision the day you signed on?",
  },
  {
    key: "q13_one_sentence_describe",
    number: 13,
    text: "In one sentence, how would you describe Whalen to a friend who's looking for an advisor?",
  },
  {
    key: "q14_searching_feelings",
    number: 14,
    text: "Take us back to when you were searching — what were you feeling, worrying about, or hoping to find in an advisor?",
  },
  {
    key: "q15_first_90_days",
    number: 15,
    text: "Is there anything we could improve to make new clients feel even more confident in their first 90 days?",
  },
  {
    key: "q16_testimonial_consent",
    number: 16,
    text: "May we share your feedback (anonymously or attributed) as a testimonial?",
  },
  { key: "q17_name", number: 17, text: "Your name" },
  { key: "q18_email", number: 18, text: "Your email" },
];

// ─── Style helpers ──────────────────────────────────────────────────────

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "12px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
  borderBottom: "1px solid var(--rule)",
  background: "var(--card-alt)",
  whiteSpace: "nowrap",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--text)",
  verticalAlign: "top",
};

const pillStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "2px 10px",
  fontSize: 11,
  fontWeight: 500,
  background: "var(--teal-dim)",
  color: "var(--teal-d)",
  borderRadius: 999,
  border: "1px solid var(--teal-border)",
  margin: "2px 4px 2px 0",
  whiteSpace: "nowrap",
};

// ─── Helpers ────────────────────────────────────────────────────────────

function formatDate(iso: string | undefined | null): string {
  if (!iso) return "—";
  try {
    const d = new Date(iso);
    if (Number.isNaN(d.getTime())) return iso;
    return d.toLocaleString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

function StarRating({ value }: { value: number | null | undefined }) {
  if (value == null || Number.isNaN(value)) return <span>—</span>;
  const filled = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span
      title={`${value} / 5`}
      style={{ color: "var(--teal)", letterSpacing: 1, whiteSpace: "nowrap" }}
    >
      {"★".repeat(filled)}
      <span style={{ color: "var(--text-xsoft)" }}>
        {"★".repeat(5 - filled)}
      </span>
    </span>
  );
}

function asTags(v: unknown): string[] {
  if (Array.isArray(v))
    return v.filter((x): x is string => typeof x === "string");
  if (typeof v === "string" && v.trim()) {
    // Handle Excel storage as comma- or semicolon-separated
    return v
      .split(/[;,]/)
      .map((s) => s.trim())
      .filter(Boolean);
  }
  return [];
}

function renderAnswer(key: SurveyKey, row: SurveyRow): React.ReactNode {
  const v = row[key];
  if (v == null || v === "") {
    return <span style={{ color: "var(--text-xsoft)" }}>—</span>;
  }
  if (key === "q9_mattered_most") {
    const tags = asTags(v);
    if (tags.length === 0)
      return <span style={{ color: "var(--text-xsoft)" }}>—</span>;
    return (
      <div>
        {tags.map((t, i) => (
          <span key={i} style={pillStyle}>
            {t}
          </span>
        ))}
      </div>
    );
  }
  if (
    key === "q1_overall_onboarding" ||
    key === "q2_communication_clarity" ||
    key === "q3_responsiveness" ||
    key === "q12_decision_confidence"
  ) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
        <StarRating value={Number(v)} />
        <span style={{ color: "var(--text-soft)", fontSize: 13 }}>
          {String(v)} / 5
        </span>
      </div>
    );
  }
  return (
    <span style={{ whiteSpace: "pre-wrap", lineHeight: 1.5 }}>
      {String(v)}
    </span>
  );
}

// ─── Component ─────────────────────────────────────────────────────────

export default function RowsTable({
  initialRows,
}: {
  initialRows: SurveyRow[];
}) {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<Set<number>>(new Set());

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return initialRows;
    return initialRows.filter((s) => {
      const tagsStr = asTags(s.q9_mattered_most).join(" ");
      const haystack = [
        s.submitted_at ?? "",
        s.q17_name ?? "",
        s.q18_email ?? "",
        s.q4_smooth_vs_clunky ?? "",
        s.q5_explained_earlier ?? "",
        s.q6_advisors_considered ?? "",
        s.q7_first_heard ?? "",
        s.q8_life_trigger ?? "",
        s.q10_almost_stopped ?? "",
        s.q11_stand_out ?? "",
        s.q13_one_sentence_describe ?? "",
        s.q14_searching_feelings ?? "",
        s.q15_first_90_days ?? "",
        s.q16_testimonial_consent ?? "",
        tagsStr,
        String(s.q1_overall_onboarding ?? ""),
        String(s.q2_communication_clarity ?? ""),
        String(s.q3_responsiveness ?? ""),
        String(s.q12_decision_confidence ?? ""),
      ]
        .join(" ")
        .toLowerCase();
      return haystack.includes(q);
    });
  }, [initialRows, query]);

  // Sort newest first
  const sorted = useMemo(
    () =>
      [...filtered].sort((a, b) => {
        const ta = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
        const tb = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
        return tb - ta;
      }),
    [filtered],
  );

  const toggleExpand = (i: number) => {
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });
  };

  // Aggregate footer (across all rows, not filtered)
  const aggregates = useMemo(() => {
    const collect = (key: SurveyKey) => {
      const nums = initialRows
        .map((r) => Number(r[key]))
        .filter((n) => Number.isFinite(n) && n > 0);
      if (nums.length === 0) return null;
      const sum = nums.reduce((acc, n) => acc + n, 0);
      return sum / nums.length;
    };
    return {
      q1: collect("q1_overall_onboarding"),
      q2: collect("q2_communication_clarity"),
      q3: collect("q3_responsiveness"),
      total: initialRows.length,
    };
  }, [initialRows]);

  return (
    <div>
      {/* Search bar */}
      <div style={{ marginBottom: 16 }}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search surveys…"
          style={{
            width: "100%",
            maxWidth: 420,
            padding: "10px 14px",
            fontSize: 14,
            border: "1px solid var(--rule)",
            borderRadius: 4,
            background: "#fff",
            color: "var(--text)",
            outline: "none",
            fontFamily: "var(--font-body)",
          }}
        />
      </div>

      <div style={{ overflowX: "auto" }}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Submitted At</th>
              <th style={thStyle}>Name (Q17)</th>
              <th style={thStyle}>Email (Q18)</th>
              <th style={thStyle}>Q1</th>
              <th style={thStyle}>Q2</th>
              <th style={thStyle}>Q3</th>
              <th style={thStyle}>Q9 Tags</th>
            </tr>
          </thead>
          <tbody>
            {sorted.length === 0 && (
              <tr>
                <td
                  colSpan={7}
                  style={{
                    ...tdStyle,
                    textAlign: "center",
                    color: "var(--text-soft)",
                    padding: "32px 12px",
                  }}
                >
                  {query ? "No matching surveys." : "No surveys yet."}
                </td>
              </tr>
            )}
            {sorted.map((s, i) => {
              const isOpen = expanded.has(i);
              const name = (s.q17_name ?? "").trim();
              const email = (s.q18_email ?? "").trim();
              const tags = asTags(s.q9_mattered_most);
              return (
                <Fragment key={i}>
                  <tr
                    onClick={() => toggleExpand(i)}
                    style={{
                      cursor: "pointer",
                      background: isOpen ? "var(--teal-dim)" : "transparent",
                      transition: "background .15s",
                    }}
                  >
                    <td style={tdStyle}>{formatDate(s.submitted_at)}</td>
                    <td style={tdStyle}>
                      {name || (
                        <span style={{ color: "var(--text-xsoft)" }}>
                          (anonymous)
                        </span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      {email || (
                        <span style={{ color: "var(--text-xsoft)" }}>—</span>
                      )}
                    </td>
                    <td style={tdStyle}>
                      <StarRating value={s.q1_overall_onboarding ?? null} />
                    </td>
                    <td style={tdStyle}>
                      <StarRating value={s.q2_communication_clarity ?? null} />
                    </td>
                    <td style={tdStyle}>
                      <StarRating value={s.q3_responsiveness ?? null} />
                    </td>
                    <td style={tdStyle}>
                      {tags.length === 0 ? (
                        <span style={{ color: "var(--text-xsoft)" }}>—</span>
                      ) : (
                        tags.slice(0, 3).map((t, ti) => (
                          <span key={ti} style={pillStyle}>
                            {t}
                          </span>
                        ))
                      )}
                    </td>
                  </tr>
                  <tr>
                    <td
                      colSpan={7}
                      style={{
                        padding: 0,
                        border: "none",
                        background: "var(--card-alt)",
                      }}
                    >
                      <div
                        style={{
                          maxHeight: isOpen ? 2400 : 0,
                          overflow: "hidden",
                          transition: "max-height .45s var(--ease-expo, ease)",
                        }}
                      >
                        <div
                          style={{
                            padding: "20px 24px",
                            borderTop: isOpen
                              ? "1px solid var(--rule)"
                              : "none",
                            borderBottom: isOpen
                              ? "1px solid var(--rule)"
                              : "none",
                          }}
                        >
                          <div
                            style={{
                              fontSize: 11,
                              fontWeight: 600,
                              letterSpacing: ".12em",
                              textTransform: "uppercase",
                              color: "var(--text-soft)",
                              marginBottom: 12,
                            }}
                          >
                            Full Response
                          </div>
                          <div
                            style={{
                              display: "grid",
                              gridTemplateColumns: "1fr",
                              gap: 14,
                            }}
                          >
                            {QUESTIONS.map((q) => (
                              <div
                                key={q.key}
                                style={{
                                  display: "grid",
                                  gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.4fr)",
                                  gap: 16,
                                  paddingBottom: 10,
                                  borderBottom: "1px dashed var(--rule)",
                                }}
                              >
                                <div>
                                  <div
                                    style={{
                                      fontSize: 12,
                                      fontWeight: 600,
                                      color: "var(--teal)",
                                      letterSpacing: ".06em",
                                      marginBottom: 2,
                                    }}
                                  >
                                    Q{q.number}
                                  </div>
                                  <div
                                    style={{
                                      fontSize: 13,
                                      color: "var(--text-mid)",
                                      lineHeight: 1.5,
                                    }}
                                  >
                                    {q.text}
                                  </div>
                                </div>
                                <div
                                  style={{
                                    fontSize: 14,
                                    color: "var(--ink)",
                                    lineHeight: 1.55,
                                  }}
                                >
                                  {renderAnswer(q.key, s)}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </td>
                  </tr>
                </Fragment>
              );
            })}
          </tbody>
          {/* Aggregate footer */}
          <tfoot>
            <tr style={{ background: "var(--card-alt)" }}>
              <td
                style={{
                  ...tdStyle,
                  fontWeight: 600,
                  borderTop: "2px solid var(--rule)",
                  borderBottom: "none",
                }}
                colSpan={3}
              >
                Averages ({aggregates.total} responses)
              </td>
              <td
                style={{
                  ...tdStyle,
                  borderTop: "2px solid var(--rule)",
                  borderBottom: "none",
                }}
              >
                {aggregates.q1 == null ? "—" : aggregates.q1.toFixed(2)}
              </td>
              <td
                style={{
                  ...tdStyle,
                  borderTop: "2px solid var(--rule)",
                  borderBottom: "none",
                }}
              >
                {aggregates.q2 == null ? "—" : aggregates.q2.toFixed(2)}
              </td>
              <td
                style={{
                  ...tdStyle,
                  borderTop: "2px solid var(--rule)",
                  borderBottom: "none",
                }}
              >
                {aggregates.q3 == null ? "—" : aggregates.q3.toFixed(2)}
              </td>
              <td
                style={{
                  ...tdStyle,
                  borderTop: "2px solid var(--rule)",
                  borderBottom: "none",
                }}
              />
            </tr>
          </tfoot>
        </table>
      </div>

      <div
        style={{
          marginTop: 16,
          fontSize: 13,
          color: "var(--text-soft)",
        }}
      >
        Showing {sorted.length} of {initialRows.length} surveys
      </div>
    </div>
  );
}
