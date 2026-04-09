import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Disclosures — WHALEN Financial",
  description: "Important regulatory disclosures for WHALEN Financial, a Registered Investment Advisor registered with the U.S. Securities and Exchange Commission.",
};

export default function DisclosuresPage() {
  return (
    <>
      <header style={{
        background: "#080f1a",
        padding: "76px 56px 48px",
        borderBottom: "1px solid rgba(255,255,255,.06)",
      }}>
        <div style={{ maxWidth: 860, margin: "0 auto" }}>
          <Link href="/" style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.4)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 32 }}>
            ← Back to Home
          </Link>
          <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "#0099CC", marginBottom: 16 }}>Regulatory</div>
          <h1 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: "clamp(36px,4vw,56px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, margin: 0 }}>
            Disclosures
          </h1>
        </div>
      </header>

      <main style={{ background: "#080f1a", padding: "60px 56px 100px", color: "rgba(255,255,255,.7)" }}>
        <div style={{ maxWidth: 860, margin: "0 auto", display: "flex", flexDirection: "column", gap: 48 }}>

          {/* RIA Registration */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", marginBottom: 16 }}>
              Registration &amp; Status
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.62)", marginBottom: 14 }}>
              WHALEN Financial is a Registered Investment Advisor (RIA) registered with the U.S. Securities and Exchange Commission. Registration does not imply a certain level of skill or training.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.62)" }}>
              Our registration information is publicly available through the SEC&rsquo;s Investment Adviser Public Disclosure (IAPD) database at{" "}
              <a href="https://www.adviserinfo.sec.gov" target="_blank" rel="noreferrer" style={{ color: "#0099CC", textDecoration: "none" }}>www.adviserinfo.sec.gov</a>.
            </p>
          </section>

          {/* Investment Risk */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", marginBottom: 16 }}>
              Investment Risk
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.62)", marginBottom: 14 }}>
              Investing involves risk, including the possible loss of principal. Past performance is not indicative of future results. The value of investments and the income derived from them can go down as well as up, and you may not get back the amount originally invested.
            </p>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.62)" }}>
              All investment strategies carry risk. No strategy assures a profit or protects against loss. Different types of investments involve varying degrees of risk, and there can be no assurance that any specific investment will either be suitable or profitable for an investor&rsquo;s portfolio.
            </p>
          </section>

          {/* Informational Purposes */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", marginBottom: 16 }}>
              Informational Purposes Only
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.62)" }}>
              This website is for informational purposes only and does not constitute investment advice, a solicitation, or an offer to buy or sell any security. The information contained herein is not intended to provide, and should not be relied upon for, accounting, legal, or tax advice. Consult your financial, tax, and legal advisors before making any investment decisions.
            </p>
          </section>

          {/* Testimonials */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", marginBottom: 16 }}>
              Client Testimonials
            </h2>
            <p style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.62)" }}>
              Testimonials appearing on this website are from real clients and reflect their individual experiences. They have not been compensated for their testimonials. Individual results will vary and are not representative of all clients. Testimonials are not indicative of future performance or success.
            </p>
          </section>

          {/* Regulatory Documents */}
          <section>
            <h2 style={{ fontFamily: "'Cormorant Garamond', Georgia, serif", fontSize: 28, fontWeight: 400, color: "#fff", marginBottom: 16 }}>
              Regulatory Documents
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                { label: "Form CRS (Client Relationship Summary)", href: "https://app.box.com/file/2159109164775?s=ll8b4o2hoyik8a2mvq614lzlexmrmub3" },
                { label: "Privacy Policy", href: "https://app.box.com/file/2159120667968?s=q69csgtxxyaa6n7moh55a4xcjc912xob" },
                { label: "SEC Investment Adviser Public Disclosure", href: "https://www.adviserinfo.sec.gov" },
              ].map((doc) => (
                <a key={doc.label} href={doc.href} target="_blank" rel="noreferrer" className="doc-link" style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  fontSize: 14, fontWeight: 400, color: "#0099CC", textDecoration: "none",
                  padding: "14px 20px",
                  border: "1px solid rgba(0,153,204,.25)",
                  borderRadius: 4,
                  background: "rgba(0,153,204,.06)",
                  transition: "background .2s, border-color .2s",
                }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none"><path d="M2 2h7l3 3v7H2V2z" stroke="#0099CC" strokeWidth="1.4" strokeLinejoin="round"/><path d="M9 2v3h3" stroke="#0099CC" strokeWidth="1.4" strokeLinejoin="round"/></svg>
                  {doc.label}
                </a>
              ))}
            </div>
          </section>

          {/* Contact */}
          <section style={{ paddingTop: 16, borderTop: "1px solid rgba(255,255,255,.07)" }}>
            <p style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.35)", lineHeight: 1.8 }}>
              WHALEN Financial &bull; 7160 Rafael Rivera Way, Suite 220, Las Vegas, NV 89113 &bull;{" "}
              <a href="tel:+18666003030" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>(866) 600-3030</a> &bull;{" "}
              <a href="mailto:info@whalenfinancial.com" style={{ color: "rgba(255,255,255,.4)", textDecoration: "none" }}>info@whalenfinancial.com</a>
            </p>
          </section>

        </div>
      </main>

      <style>{`
        .doc-link:hover { background: rgba(0,153,204,.12) !important; border-color: rgba(0,153,204,.5) !important; }
        @media(max-width:768px){
          header, main { padding-left: 24px !important; padding-right: 24px !important; }
        }
      `}</style>
    </>
  );
}
