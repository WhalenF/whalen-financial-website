import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getJobs, getJob } from "@/lib/jobs";

export async function generateStaticParams() {
  const jobs = await getJobs();
  return jobs.map((job) => ({ slug: job.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) return {};
  return {
    title: `${job.title} — WHALEN Financial`,
    description: job.summary,
  };
}

export default async function JobPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const job = await getJob(slug);
  if (!job) notFound();

  return (
    <>
      <header style={{ background: "#080f1a", padding: "76px 56px 64px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/careers" style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            ← All Positions
          </Link>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0099CC", marginBottom: 16 }}>Now Hiring</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px,4vw,56px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            {job.title}
          </h1>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 12, marginBottom: 28 }}>
            {job.tags.map(tag => (
              <span key={tag} style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".06em", padding: "6px 14px", borderRadius: 20, background: "rgba(0,153,204,.1)", border: "1px solid rgba(0,153,204,.25)", color: "#0099CC" }}>{tag}</span>
            ))}
          </div>
          <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 620, margin: 0 }}>
            {job.summary}
          </p>
        </div>
      </header>

      <main style={{ background: "#080f1a", padding: "60px 56px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 52 }}>

          {/* The Role */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#fff", marginBottom: 16 }}>The Role</h2>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,.6)", marginBottom: 14 }}>{job.intro}</p>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10, paddingLeft: 0 }}>
              {job.introPoints.map(item => (
                <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12, fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>
                  <span style={{ color: "#0099CC", marginTop: 4, flexShrink: 0 }}>→</span>
                  {item}
                </li>
              ))}
            </ul>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.85, color: "rgba(255,255,255,.5)", marginTop: 16, fontStyle: "italic" }}>{job.introFooter}</p>
          </section>

          {/* Responsibilities */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#fff", marginBottom: 24 }}>Key Responsibilities</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {job.responsibilities.map(section => (
                <div key={section.title} style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 4, padding: "24px 28px" }}>
                  <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#0099CC", marginBottom: 14 }}>{section.title}</div>
                  <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, paddingLeft: 0, margin: 0 }}>
                    {section.items.map(item => (
                      <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.6)", lineHeight: 1.7 }}>
                        <span style={{ color: "rgba(0,153,204,.6)", marginTop: 5, flexShrink: 0, fontSize: 8 }}>●</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </section>

          {/* Not this role */}
          <section style={{ background: "rgba(255,255,255,.02)", border: "1px solid rgba(255,255,255,.06)", borderRadius: 4, padding: "28px 28px 24px" }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 400, color: "#fff", marginBottom: 16 }}>What This Role Is Not</h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {job.notThis.map(item => (
                <div key={item} style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.45)", lineHeight: 1.7, paddingLeft: 16, borderLeft: "2px solid rgba(255,255,255,.1)" }}>
                  {item}
                </div>
              ))}
            </div>
            <p style={{ fontSize: 14, fontWeight: 400, color: "rgba(255,255,255,.7)", marginTop: 16, lineHeight: 1.75 }}>
              {job.notThisFooter.replace(" — ", " \u2014 ")}
            </p>
          </section>

          {/* Qualifications */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#fff", marginBottom: 24 }}>Qualifications</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="qual-grid">
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 4, padding: "24px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "#0099CC", marginBottom: 14 }}>Required</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, paddingLeft: 0, margin: 0 }}>
                  {job.required.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.6)", lineHeight: 1.65 }}>
                      <span style={{ color: "#0099CC", marginTop: 4, flexShrink: 0 }}>✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 4, padding: "24px" }}>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".12em", textTransform: "uppercase", color: "rgba(255,255,255,.35)", marginBottom: 14 }}>Preferred</div>
                <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 8, paddingLeft: 0, margin: 0 }}>
                  {job.preferred.map(item => (
                    <li key={item} style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>
                      <span style={{ color: "rgba(255,255,255,.25)", marginTop: 4, flexShrink: 0 }}>+</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </section>

          {/* Compensation */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 400, color: "#fff", marginBottom: 20 }}>Compensation & Benefits</h2>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }} className="comp-grid">
              <div style={{ background: "rgba(0,153,204,.07)", border: "1px solid rgba(0,153,204,.2)", borderRadius: 4, padding: "24px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 36, fontWeight: 300, color: "#fff", marginBottom: 4 }}>{job.salaryDisplay}</div>
                <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "#0099CC" }}>{job.salaryLabel}</div>
              </div>
              <div style={{ background: "rgba(255,255,255,.03)", border: "1px solid rgba(255,255,255,.07)", borderRadius: 4, padding: "24px" }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 24, fontWeight: 300, color: "#fff", marginBottom: 4 }}>{job.bonusTitle}</div>
                <div style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,.5)", lineHeight: 1.65 }}>{job.bonusBody}</div>
              </div>
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {job.benefits.map(b => (
                <span key={b} style={{ fontSize: 13, fontWeight: 400, padding: "8px 16px", borderRadius: 3, background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.09)", color: "rgba(255,255,255,.6)" }}>{b}</span>
              ))}
            </div>
          </section>

          {/* Apply CTA */}
          <section style={{ background: "rgba(0,153,204,.06)", border: "1px solid rgba(0,153,204,.2)", borderRadius: 4, padding: "44px 40px", textAlign: "center" }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 30, fontWeight: 300, color: "#fff", marginBottom: 10 }}>
              Ready to Apply?
            </h3>
            <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: 32, maxWidth: 480, margin: "0 auto 32px" }}>
              Send your resume and a brief note on why this role is the right fit to{" "}
              <a href="mailto:info@whalenfinancial.com" style={{ color: "#0099CC", textDecoration: "none" }}>info@whalenfinancial.com</a>{" "}
              with the subject line <strong style={{ color: "rgba(255,255,255,.7)" }}>&ldquo;{job.applySubject}&rdquo;</strong>.
            </p>
            <a
              href={`mailto:info@whalenfinancial.com?subject=${encodeURIComponent(job.applySubject)}`}
              style={{ display: "inline-block", background: "#0099CC", color: "#fff", padding: "16px 36px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", textDecoration: "none", borderRadius: 2 }}
            >
              Apply Now
            </a>
          </section>

        </div>
      </main>

      <footer style={{ background: "#080f1a", borderTop: "1px solid rgba(255,255,255,.05)", padding: "24px 56px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.2)", margin: 0 }}>
          &copy; {new Date().getFullYear()} WHALEN Financial. All rights reserved. &bull;{" "}
          <Link href="/disclosures" style={{ color: "rgba(255,255,255,.3)", textDecoration: "none" }}>Disclosures</Link>
        </p>
      </footer>

      <style>{`
        @media(max-width:768px){
          header, main, footer { padding-left: 24px !important; padding-right: 24px !important; }
          .qual-grid, .comp-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
