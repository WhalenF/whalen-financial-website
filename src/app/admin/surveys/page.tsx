import type { Metadata } from "next";
import { listSurveyRows } from "@/lib/db/queries";
import type { SurveyRow } from "@/lib/db/queries";
import RowsTable from "./RowsTable";

export const metadata: Metadata = {
  title: "Surveys",
  robots: { index: false, follow: false },
};

const cardStyle: React.CSSProperties = {
  background: "#fff",
  borderRadius: 6,
  padding: "28px 32px",
  boxShadow: "var(--shadow)",
  border: "1px solid var(--rule)",
};

const exportButtonStyle: React.CSSProperties = {
  display: "inline-block",
  padding: "10px 18px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".08em",
  textTransform: "uppercase",
  background: "var(--teal)",
  color: "#fff",
  textDecoration: "none",
  border: "none",
  borderRadius: 2,
  transition: "background .2s, transform .2s",
  cursor: "pointer",
};

export default async function AdminSurveysPage() {
  let rows: SurveyRow[] = [];
  let loadError: string | null = null;

  try {
    rows = await listSurveyRows();
  } catch (err) {
    loadError = err instanceof Error ? err.message : String(err);
  }

  return (
    <div>
      {/* Page heading */}
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          alignItems: "flex-end",
          justifyContent: "space-between",
          marginBottom: 28,
        }}
      >
        <div>
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
            Surveys
          </h1>
          <p
            style={{
              color: "var(--text-soft)",
              fontSize: 15,
              marginTop: 8,
              marginBottom: 0,
            }}
          >
            Onboarding survey responses from /welcome.
          </p>
        </div>
        <a
          href="/api/admin/surveys/export.csv"
          download
          style={exportButtonStyle}
        >
          Download CSV
        </a>
      </div>

      {/* Error panel */}
      {loadError ? (
        <div
          style={{
            ...cardStyle,
            borderColor: "rgba(200, 60, 60, 0.4)",
            background: "rgba(200, 60, 60, 0.04)",
          }}
        >
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: 22,
              fontWeight: 400,
              color: "#8b2727",
              margin: "0 0 8px 0",
            }}
          >
            Could not load surveys
          </h2>
          <p
            style={{
              fontSize: 14,
              color: "var(--text-mid)",
              marginTop: 0,
              marginBottom: 12,
              lineHeight: 1.6,
            }}
          >
            Could not load surveys — check Railway Postgres configuration.
          </p>
          <details>
            <summary
              style={{
                cursor: "pointer",
                fontSize: 13,
                color: "var(--text-soft)",
                fontWeight: 600,
              }}
            >
              Error details
            </summary>
            <pre
              style={{
                marginTop: 8,
                fontSize: 12,
                whiteSpace: "pre-wrap",
                wordBreak: "break-word",
                color: "var(--text-mid)",
                background: "var(--card-alt)",
                padding: 12,
                borderRadius: 4,
              }}
            >
              {loadError}
            </pre>
          </details>
        </div>
      ) : (
        <div style={cardStyle}>
          <RowsTable initialRows={rows} />
        </div>
      )}
    </div>
  );
}
