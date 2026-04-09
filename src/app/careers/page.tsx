import Link from "next/link";
import type { Metadata } from "next";
import { jobs } from "@/lib/jobs";

export const metadata: Metadata = {
  title: "Careers — WHALEN Financial",
  description: "Join the WHALEN Financial team. We're a digital-first wealth management firm serving families nationwide.",
};

export default function CareersPage() {
  return (
    <>
      <header style={{ background: "#080f1a", padding: "76px 56px 64px", borderBottom: "1px solid rgba(255,255,255,.06)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/" style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            ← Back to Home
          </Link>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0099CC", marginBottom: 16 }}>Join Our Team</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px,4vw,56px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 20 }}>
            Careers at WHALEN
          </h1>
          <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,.6)", maxWidth: 580, margin: 0 }}>
            We built WHALEN to do financial planning the right way. If you share that mission, we&rsquo;d love to hear from you.
          </p>
        </div>
      </header>

      <main style={{ background: "#080f1a", padding: "60px 56px 100px" }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>

          <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 300, color: "#fff", marginBottom: 24 }}>
            Open Positions
          </h2>

          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {jobs.map((job) => (
              <Link key={job.slug} href={`/careers/${job.slug}`} style={{ textDecoration: "none" }}>
                <div className="job-card" style={{
                  background: "rgba(255,255,255,.03)",
                  border: "1px solid rgba(255,255,255,.08)",
                  borderRadius: 4,
                  padding: "28px 32px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  gap: 24,
                  transition: "border-color .2s, background .2s",
                }}>
                  <div>
                    <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 10 }}>{job.title}</div>
                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
                      {job.tags.map(tag => (
                        <span key={tag} style={{ fontSize: 11, fontWeight: 500, letterSpacing: ".06em", padding: "4px 10px", borderRadius: 20, background: "rgba(0,153,204,.1)", border: "1px solid rgba(0,153,204,.2)", color: "#0099CC" }}>{tag}</span>
                      ))}
                    </div>
                    <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.45)", lineHeight: 1.7, margin: 0 }}>{job.summary}</p>
                  </div>
                  <div style={{ flexShrink: 0, width: 36, height: 36, borderRadius: "50%", border: "1px solid rgba(0,153,204,.3)", display: "flex", alignItems: "center", justifyContent: "center", color: "#0099CC" }}>
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M3 7h8M7 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                  </div>
                </div>
              </Link>
            ))}
          </div>

          <div style={{ marginTop: 48, paddingTop: 48, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.35)", lineHeight: 1.8 }}>
              Don&rsquo;t see the right role? Send your resume to{" "}
              <a href="mailto:info@whalenfinancial.com" style={{ color: "#0099CC", textDecoration: "none" }}>info@whalenfinancial.com</a>{" "}
              and we&rsquo;ll keep it on file.
            </p>
          </div>
        </div>
      </main>

      <footer style={{ background: "#080f1a", borderTop: "1px solid rgba(255,255,255,.05)", padding: "24px 56px", textAlign: "center" }}>
        <p style={{ fontSize: 13, color: "rgba(255,255,255,.2)", margin: 0 }}>
          &copy; {new Date().getFullYear()} WHALEN Financial. All rights reserved. &bull;{" "}
          <Link href="/disclosures" style={{ color: "rgba(255,255,255,.3)", textDecoration: "none" }}>Disclosures</Link>
        </p>
      </footer>

      <style>{`
        .job-card:hover { border-color: rgba(0,153,204,.4) !important; background: rgba(0,153,204,.05) !important; }
        @media(max-width:768px){
          header, main, footer { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
