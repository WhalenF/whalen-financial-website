import type { Metadata } from "next";
import Link from "next/link";
import type { Job } from "@/lib/jobs";
import JobForm from "../../_components/JobForm";

export const metadata: Metadata = {
  title: "New Job",
  robots: { index: false, follow: false },
};

const emptyJob: Job = {
  slug: "",
  title: "",
  tags: [],
  summary: "",
  intro: "",
  introPoints: [],
  introFooter: "",
  responsibilities: [],
  notThis: [],
  notThisFooter: "",
  required: [],
  preferred: [],
  salaryDisplay: "",
  salaryLabel: "",
  bonusTitle: "",
  bonusBody: "",
  benefits: [],
  applySubject: "",
};

const headerWrapStyle: React.CSSProperties = {
  marginBottom: 24,
};

const breadcrumbStyle: React.CSSProperties = {
  fontSize: 12,
  fontWeight: 500,
  letterSpacing: ".09em",
  textTransform: "uppercase",
  color: "#607a8f",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  marginBottom: 12,
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

export default function NewJobPage() {
  return (
    <>
      <div style={headerWrapStyle}>
        <Link href="/admin/jobs" style={breadcrumbStyle}>
          ← All postings
        </Link>
        <h1 style={titleStyle}>New job posting</h1>
        <p style={subtitleStyle}>
          Fill out the fields below. Once saved, the posting appears on /careers
          immediately.
        </p>
      </div>

      <JobForm initial={emptyJob} mode="create" />
    </>
  );
}
