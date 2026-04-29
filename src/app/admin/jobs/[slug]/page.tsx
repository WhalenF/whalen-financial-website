import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getJob } from "@/lib/jobs";
import JobForm from "../../_components/JobForm";

type PageParams = { slug: string };

export async function generateMetadata(
  { params }: { params: Promise<PageParams> },
): Promise<Metadata> {
  const { slug } = await params;
  return {
    title: `Edit: ${slug}`,
    robots: { index: false, follow: false },
  };
}

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

const slugChipStyle: React.CSSProperties = {
  fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
  fontSize: 12,
  color: "#607a8f",
  background: "#f4f1ec",
  padding: "2px 8px",
  borderRadius: 3,
  marginLeft: 8,
};

export default async function EditJobPage({
  params,
}: {
  params: Promise<PageParams>;
}) {
  const { slug } = await params;
  const job = await getJob(slug);

  if (!job) {
    notFound();
  }

  return (
    <>
      <div style={headerWrapStyle}>
        <Link href="/admin/jobs" style={breadcrumbStyle}>
          ← All postings
        </Link>
        <h1 style={titleStyle}>
          Edit posting
          <span style={slugChipStyle}>{job.slug}</span>
        </h1>
        <p style={subtitleStyle}>
          Changes save instantly to /careers — no redeploy needed.
        </p>
      </div>

      <JobForm initial={job} mode="edit" />
    </>
  );
}
