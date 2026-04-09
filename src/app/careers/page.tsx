import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers — WHALEN Financial",
  description: "Join the WHALEN Financial team. We're a digital-first wealth management firm serving families nationwide.",
};

export default function CareersPage() {
  return (
    <>
      <header style={{
        background: "#080f1a",
        padding: "76px 56px 64px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}>
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

          {/* Culture block */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 40, marginBottom: 64 }} className="careers-intro">
            {[
              { title: "Client-First Culture", body: "Every decision we make is filtered through one question: is this right for the client? We operate as fiduciaries without exception." },
              { title: "Remote-First Team", body: "We are a digital-first firm. Our team works from across the country, connected by shared tools, values, and a commitment to doing great work." },
              { title: "Integrated Approach", body: "We don't silo disciplines. Tax, investments, estate, and protection are one conversation — and our team reflects that cross-functional approach." },
              { title: "Growth Minded", body: "We invest in our people. Whether you're early in your career or a seasoned professional, there's room to grow here." },
            ].map((item) => (
              <div key={item.title} style={{
                background: "rgba(255,255,255,.03)",
                border: "1px solid rgba(255,255,255,.07)",
                borderRadius: 4,
                padding: "32px 28px",
              }}>
                <div style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 22, fontWeight: 400, color: "#fff", marginBottom: 10 }}>{item.title}</div>
                <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.5)", margin: 0 }}>{item.body}</p>
              </div>
            ))}
          </div>

          {/* No open roles */}
          <div style={{ borderTop: "1px solid rgba(255,255,255,.07)", paddingTop: 52, marginBottom: 52 }}>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 32, fontWeight: 300, color: "#fff", marginBottom: 16 }}>
              Open Positions
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, color: "rgba(255,255,255,.45)", lineHeight: 1.8, marginBottom: 0 }}>
              We don&rsquo;t always post every role we&rsquo;re hiring for. If you believe you&rsquo;d be a strong fit for the WHALEN team, send us your resume below and we&rsquo;ll reach out when the right opportunity arises.
            </p>
          </div>

          {/* Resume submission */}
          <div style={{
            background: "rgba(0,153,204,.06)",
            border: "1px solid rgba(0,153,204,.2)",
            borderRadius: 4,
            padding: "44px 40px",
          }}>
            <h3 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8 }}>
              Submit Your Resume
            </h3>
            <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.5)", lineHeight: 1.75, marginBottom: 32 }}>
              Tell us a little about yourself and attach your resume. We review every submission and will reach out if there&rsquo;s a fit.
            </p>

            <form
              action="mailto:info@whalenfinancial.com"
              method="post"
              encType="text/plain"
              style={{ display: "flex", flexDirection: "column", gap: 20 }}
            >
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }} className="form-row">
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>First Name</label>
                  <input name="first_name" type="text" required style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 3, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", fontFamily: "inherit" }} />
                </div>
                <div>
                  <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Last Name</label>
                  <input name="last_name" type="text" required style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 3, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", fontFamily: "inherit" }} />
                </div>
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Email Address</label>
                <input name="email" type="email" required style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 3, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", fontFamily: "inherit" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Role of Interest</label>
                <input name="role" type="text" placeholder="e.g. Financial Advisor, Client Services, Operations" style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 3, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", fontFamily: "inherit" }} />
              </div>

              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", marginBottom: 8 }}>Tell Us About Yourself</label>
                <textarea name="message" rows={5} placeholder="A brief note about your background and why you're interested in WHALEN..." style={{ width: "100%", background: "rgba(255,255,255,.06)", border: "1px solid rgba(255,255,255,.12)", borderRadius: 3, padding: "12px 14px", fontSize: 14, color: "#fff", outline: "none", fontFamily: "inherit", resize: "vertical" }} />
              </div>

              <p style={{ fontSize: 12, fontWeight: 300, color: "rgba(255,255,255,.3)", margin: 0 }}>
                Please email your resume directly to{" "}
                <a href="mailto:info@whalenfinancial.com" style={{ color: "#0099CC", textDecoration: "none" }}>info@whalenfinancial.com</a>{" "}
                with the subject line &ldquo;Resume Submission.&rdquo; We review every application.
              </p>

              <div>
                <a href="mailto:info@whalenfinancial.com?subject=Resume%20Submission" style={{
                  display: "inline-block",
                  background: "#0099CC", color: "#fff",
                  padding: "15px 32px",
                  fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase",
                  textDecoration: "none", borderRadius: 2,
                }}>
                  Send Your Resume
                </a>
              </div>
            </form>
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
        @media(max-width:768px){
          header, main, footer { padding-left: 24px !important; padding-right: 24px !important; }
          .careers-intro { grid-template-columns: 1fr !important; }
          .form-row { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </>
  );
}
