import type { Metadata } from "next";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import { getJobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Jobs",
  robots: { index: false, follow: false },
};

const headerWrapStyle: React.CSSProperties = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  marginBottom: 24,
  gap: 16,
};

const titleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 28,
  fontWeight: 500,
  color: "#1a2535",
  margin: 0,
  letterSpacing: ".005em",
};

const subtitleStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#607a8f",
  margin: "4px 0 0",
};

const newButtonStyle: React.CSSProperties = {
  background: "#0099CC",
  color: "#ffffff",
  textDecoration: "none",
  padding: "12px 22px",
  fontSize: 12,
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  borderRadius: 2,
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
};

const cardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px solid #e5dfd6",
  borderRadius: 4,
  boxShadow: "0 1px 3px rgba(10,24,41,.04)",
  overflow: "hidden",
};

const tableStyle: React.CSSProperties = {
  width: "100%",
  borderCollapse: "collapse",
  fontSize: 14,
};

const thStyle: React.CSSProperties = {
  textAlign: "left",
  padding: "14px 20px",
  background: "#fbfaf7",
  borderBottom: "1px solid #e5dfd6",
  fontSize: 11,
  fontWeight: 600,
  letterSpacing: ".1em",
  textTransform: "uppercase",
  color: "#607a8f",
};

const tdStyle: React.CSSProperties = {
  padding: "16px 20px",
  borderBottom: "1px solid #f0ebe2",
  color: "#1a2535",
  verticalAlign: "middle",
};

const rowLinkStyle: React.CSSProperties = {
  color: "#1a2535",
  textDecoration: "none",
  fontWeight: 500,
};

const slugStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 12,
  color: "#607a8f",
};

const tagStyle: React.CSSProperties = {
  display: "inline-block",
  fontSize: 11,
  fontWeight: 500,
  letterSpacing: ".04em",
  padding: "3px 9px",
  borderRadius: 20,
  background: "rgba(0,153,204,.1)",
  border: "1px solid rgba(0,153,204,.22)",
  color: "#0077a3",
  marginRight: 6,
  marginBottom: 4,
};

const noticeStyle: React.CSSProperties = {
  background: "#fff8e1",
  border: "1px solid #f3d97a",
  color: "#7a5b00",
  padding: "14px 18px",
  borderRadius: 3,
  marginBottom: 24,
  fontSize: 14,
  lineHeight: 1.55,
};

const emptyCardStyle: React.CSSProperties = {
  background: "#ffffff",
  border: "1px dashed #d4cdc0",
  borderRadius: 4,
  padding: "64px 32px",
  textAlign: "center",
};

const emptyTitleStyle: React.CSSProperties = {
  fontFamily: "var(--font-display)",
  fontSize: 22,
  fontWeight: 500,
  color: "#1a2535",
  margin: "0 0 8px",
};

const emptyHintStyle: React.CSSProperties = {
  fontSize: 14,
  color: "#607a8f",
  margin: "0 0 24px",
};

function JobsListHeader({ count }: { count: number }) {
  return (
    <div style={headerWrapStyle}>
      <div>
        <h1 style={titleStyle}>Job postings</h1>
        <p style={subtitleStyle}>
          {count === 0
            ? "No postings yet."
            : `${count} posting${count === 1 ? "" : "s"} live on /careers.`}
        </p>
      </div>
      <Link href="/admin/jobs/new" style={newButtonStyle}>
        + New Job
      </Link>
    </div>
  );
}

export default async function AdminJobsListPage() {
  let jobs: Job[] | null = null;
  let storageError: string | null = null;

  try {
    jobs = await getJobs();
  } catch (err) {
    console.error("[admin/jobs] getJobs failed:", err);
    storageError =
      "Job storage not yet configured — see spec section 7 for required env vars.";
  }

  if (storageError) {
    return (
      <>
        <JobsListHeader count={0} />
        <div style={noticeStyle}>{storageError}</div>
        <div style={emptyCardStyle}>
          <h2 style={emptyTitleStyle}>No open positions yet.</h2>
          <p style={emptyHintStyle}>
            Job storage is unavailable — once Vercel KV is configured, postings
            will appear here.
          </p>
        </div>
      </>
    );
  }

  const list = jobs ?? [];

  if (list.length === 0) {
    return (
      <>
        <JobsListHeader count={0} />
        <div style={emptyCardStyle}>
          <h2 style={emptyTitleStyle}>No open positions yet.</h2>
          <p style={emptyHintStyle}>
            Get started by creating your first posting.
          </p>
          <Link href="/admin/jobs/new" style={newButtonStyle}>
            + Create the first one
          </Link>
        </div>
      </>
    );
  }

  return (
    <>
      <JobsListHeader count={list.length} />
      <div style={cardStyle}>
        <table style={tableStyle}>
          <thead>
            <tr>
              <th style={thStyle}>Title</th>
              <th style={thStyle}>Slug</th>
              <th style={thStyle}>Tags</th>
              <th style={thStyle}>Salary</th>
            </tr>
          </thead>
          <tbody>
            {list.map((job) => (
              <tr key={job.slug}>
                <td style={tdStyle}>
                  <Link
                    href={`/admin/jobs/${job.slug}`}
                    style={rowLinkStyle}
                  >
                    {job.title || <em style={{ color: "#8fa3b3" }}>(untitled)</em>}
                  </Link>
                </td>
                <td style={tdStyle}>
                  <span style={slugStyle}>{job.slug}</span>
                </td>
                <td style={tdStyle}>
                  {job.tags.length === 0 ? (
                    <span style={{ color: "#8fa3b3", fontSize: 13 }}>—</span>
                  ) : (
                    job.tags.map((tag) => (
                      <span key={tag} style={tagStyle}>
                        {tag}
                      </span>
                    ))
                  )}
                </td>
                <td style={tdStyle}>
                  {job.salaryDisplay || (
                    <span style={{ color: "#8fa3b3", fontSize: 13 }}>—</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
