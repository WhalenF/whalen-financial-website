import type { Metadata } from "next";
import Link from "next/link";
import { listReferralRows, listSurveyRows } from "@/lib/graph/excel";
import type { ReferralRow, SurveyRow } from "@/lib/graph/excel";
import { getJobs } from "@/lib/jobs";
import type { Job } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Dashboard",
  robots: { index: false, follow: false },
};

// ─── Style helpers ──────────────────────────────────────────────────────

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 6,
  padding: "28px 32px",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

const kpiNumberStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 56,
  fontWeight: 300,
  lineHeight: 1,
  color: "var(--navy)",
  letterSpacing: "-.01em",
  marginBottom: 8,
};

const kpiLabelStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".14em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
};

const sectionTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 24,
  fontWeight: 400,
  color: "var(--ink)",
  margin: 0,
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "10px 12px",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".12em",
  textTransform: "uppercase",
  color: "var(--text-soft)",
  borderBottom: "1px solid var(--rule)",
};

const tdStyle: React.CSSProperties = {
  padding: "12px",
  borderBottom: "1px solid var(--rule)",
  color: "var(--text)",
  verticalAlign: "top",
};

const viewAllLinkStyle: React.CSSProperties = {
  fontSize: 13,
  fontWeight: 600,
  color: "var(--teal)",
  textDecoration: "none",
  letterSpacing: ".04em",
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

function sortByDateDesc<T extends { submitted_at?: string | null }>(
  rows: T[],
): T[] {
  return [...rows].sort((a, b) => {
    const ta = a.submitted_at ? new Date(a.submitted_at).getTime() : 0;
    const tb = b.submitted_at ? new Date(b.submitted_at).getTime() : 0;
    return tb - ta;
  });
}

function StarRating({ value }: { value: number | null | undefined }) {
  if (value == null || Number.isNaN(value)) return <span>—</span>;
  const filled = Math.max(0, Math.min(5, Math.round(value)));
  return (
    <span
      title={`${value} / 5`}
      style={{ color: "var(--teal)", letterSpacing: 1 }}
    >
      {"★".repeat(filled)}
      <span style={{ color: "var(--text-xsoft)" }}>
        {"★".repeat(5 - filled)}
      </span>
    </span>
  );
}

// ─── Page ──────────────────────────────────────────────────────────────

export default async function AdminDashboardPage() {
  let referrals: ReferralRow[] = [];
  let surveys: SurveyRow[] = [];
  let jobs: Job[] = [];
  let loadError: string | null = null;

  try {
    const [r, s, j] = await Promise.all([
      listReferralRows(),
      listSurveyRows(),
      getJobs(),
    ]);
    referrals = r;
    surveys = s;
    jobs = j;
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err);
  }

  const recentReferrals = sortByDateDesc(referrals).slice(0, 5);
  const recentSurveys = sortByDateDesc(surveys).slice(0, 5);

  return (
    <div>
      {/* Page heading */}
      <div style={{ marginBottom: 28 }}>
        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 40,
            fontWeight: 300,
            color: "var(--ink)",
            letterSpacing: "-.005em",
            margin: 0,
          }}
        >
          Dashboard
        </h1>
        <p
          style={{
            color: "var(--text-soft)",
            fontSize: 15,
            marginTop: 8,
            marginBottom: 0,
          }}
        >
          Overview of submissions and active job postings.
        </p>
      </div>

      {/* Persistence-not-configured strip */}
      {loadError && (
        <div
          style={{
            background: "rgba(229, 169, 47, 0.08)",
            border: "1px solid rgba(229, 169, 47, 0.35)",
            borderRadius: 4,
            padding: "14px 18px",
            marginBottom: 24,
            color: "#7a5910",
            fontSize: 14,
            lineHeight: 1.5,
          }}
        >
          <strong style={{ fontWeight: 600 }}>
            Persistence not yet configured —
          </strong>{" "}
          see spec section 7 for required env vars.
          <details style={{ marginTop: 8 }}>
            <summary
              style={{ cursor: "pointer", color: "#7a5910", fontSize: 13 }}
            >
              Error details
            </summary>
            <pre
              style={{
                marginTop: 8,
                fontSize: 12,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "#5d4309",
              }}
            >
              {loadError}
            </pre>
          </details>
        </div>
      )}

      {/* KPI cards */}
      <div
        data-admin-kpis
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 20,
          marginBottom: 36,
        }}
      >
        <div style={cardStyle}>
          <div style={kpiNumberStyle}>{referrals.length}</div>
          <div style={kpiLabelStyle}>Total Referrals</div>
        </div>
        <div style={cardStyle}>
          <div style={kpiNumberStyle}>{surveys.length}</div>
          <div style={kpiLabelStyle}>Total Surveys</div>
        </div>
        <div style={cardStyle}>
          <div style={kpiNumberStyle}>{jobs.length}</div>
          <div style={kpiLabelStyle}>Open Job Postings</div>
        </div>
      </div>

      {/* Recent activity tables */}
      <div
        data-admin-recent
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 20,
        }}
      >
        {/* Recent referrals */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={sectionTitleStyle}>Recent Referrals</h2>
            <Link href="/admin/referrals" style={viewAllLinkStyle}>
              View all →
            </Link>
          </div>
          {recentReferrals.length === 0 ? (
            <p
              style={{
                color: "var(--text-soft)",
                fontSize: 14,
                margin: 0,
                padding: "16px 0",
              }}
            >
              No referrals yet.
            </p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Submitted</th>
                  <th style={thStyle}>Referrer</th>
                  <th style={thStyle}>Relationship</th>
                  <th style={thStyle}>Referral</th>
                </tr>
              </thead>
              <tbody>
                {recentReferrals.map((r, i) => (
                  <tr key={i}>
                    <td style={tdStyle}>{formatDate(r.submitted_at)}</td>
                    <td style={tdStyle}>{r.name || "—"}</td>
                    <td style={tdStyle}>{r.relationship || "—"}</td>
                    <td style={tdStyle}>{r.referral_name || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Recent surveys */}
        <div style={cardStyle}>
          <div
            style={{
              display: "flex",
              alignItems: "baseline",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <h2 style={sectionTitleStyle}>Recent Surveys</h2>
            <Link href="/admin/surveys" style={viewAllLinkStyle}>
              View all →
            </Link>
          </div>
          {recentSurveys.length === 0 ? (
            <p
              style={{
                color: "var(--text-soft)",
                fontSize: 14,
                margin: 0,
                padding: "16px 0",
              }}
            >
              No surveys yet.
            </p>
          ) : (
            <table style={tableStyle}>
              <thead>
                <tr>
                  <th style={thStyle}>Submitted</th>
                  <th style={thStyle}>Name</th>
                  <th style={thStyle}>Q1 Rating</th>
                </tr>
              </thead>
              <tbody>
                {recentSurveys.map((s, i) => {
                  const name = (s.q17_name ?? "").trim();
                  return (
                    <tr key={i}>
                      <td style={tdStyle}>{formatDate(s.submitted_at)}</td>
                      <td style={tdStyle}>
                        {name || (
                          <span style={{ color: "var(--text-xsoft)" }}>
                            (anonymous)
                          </span>
                        )}
                      </td>
                      <td style={tdStyle}>
                        <StarRating value={s.q1_overall_onboarding ?? null} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          )}
        </div>
      </div>

      {/* Mobile-first stack */}
      <style>{`
        @media (max-width: 900px) {
          [data-admin-kpis] { grid-template-columns: 1fr !important; }
          [data-admin-recent] { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}
