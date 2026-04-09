"use client";

import Image from "next/image";

const complianceLinks = [
  { label: "Form CRS", href: "https://app.box.com/file/2159109164775?s=ll8b4o2hoyik8a2mvq614lzlexmrmub3" },
  { label: "Privacy Policy", href: "https://app.box.com/file/2159120667968?s=q69csgtxxyaa6n7moh55a4xcjc912xob" },
  { label: "ADV 2A", href: "https://app.box.com/file/2159101531159?s=704wyfrm7nhe86201amrxpujh1mc1j4j" },
  { label: "ADV 2B", href: "https://app.box.com/file/2160760942843?s=yt0cvpsaxej2zkbrumhkd83a6eypnczi" },
  { label: "Disclosures", href: "https://whalenfinancial.com/disclaimer" },
  { label: "SEC Adviser Info", href: "https://www.adviserinfo.sec.gov" },
];

const navLinks = [
  { head: "Planning", links: ["Investment Management","Retirement Income","Tax Planning","Estate Planning","Asset Protection"] },
  { head: "Company", links: ["About Us","Our Team","The Whalen Plan","Client Experience","Careers"] },
  { head: "Resources", links: ["The Book","Client Portal","Schedule a Call","(866) 600-3030","info@whalenfinancial.com"] },
];

export default function Footer() {
  return (
    <footer style={{ background: "#080f1a", padding: "72px 56px 40px", color: "rgba(255,255,255,.5)" }}>
      <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr 1fr 1fr", gap: 60, paddingBottom: 52, borderBottom: "1px solid rgba(255,255,255,.07)", marginBottom: 36 }} className="footer-top">
        {/* Brand */}
        <div>
          <div style={{ marginBottom: 20 }}>
            <Image
              src="/logo-white.png"
              alt="Whalen Financial"
              width={160}
              height={64}
              style={{ objectFit: "contain", height: 40, width: "auto" }}
            />
          </div>
          <p style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.75, color: "rgba(255,255,255,.4)", marginBottom: 24, maxWidth: 280 }}>
            A digital-first wealth management firm serving families nationwide. Investment management, retirement income, tax planning, estate planning, and asset protection, in one integrated plan.
          </p>
          <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.5)", marginBottom: 6 }}>
            <a href="tel:+18666003030" style={{ color: "rgba(255,255,255,.5)", textDecoration: "none" }}>(866) 600-3030</a>
          </div>
          <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.5)" }}>
            <a href="mailto:info@whalenfinancial.com" style={{ color: "rgba(255,255,255,.5)", textDecoration: "none" }}>info@whalenfinancial.com</a>
          </div>
          <div style={{ fontSize: 13, fontWeight: 300, color: "rgba(255,255,255,.3)", marginTop: 12 }}>
            7160 Rafael Rivera Way, Suite 220<br />Las Vegas, NV 89113
          </div>
        </div>

        {/* Nav columns */}
        {navLinks.map(col => (
          <div key={col.head}>
            <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "rgba(255,255,255,.28)", marginBottom: 18 }}>{col.head}</div>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
              {col.links.map(l => (
                <li key={l}>
                  <a href="#" style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.5)", textDecoration: "none", transition: "color .2s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "#0099CC")}
                    onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.5)")}
                  >{l}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Compliance links */}
      <div style={{ display: "flex", flexWrap: "wrap", gap: "8px 24px", marginBottom: 20, paddingBottom: 20, borderBottom: "1px solid rgba(255,255,255,.05)" }}>
        <span style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.2)", flexShrink: 0, alignSelf: "center" }}>Regulatory</span>
        {complianceLinks.map(l => (
          <a key={l.label} href={l.href} target="_blank" rel="noreferrer"
            style={{ fontSize: 12, color: "rgba(255,255,255,.35)", textDecoration: "none", transition: "color .2s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "#0099CC")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.35)")}
          >{l.label}</a>
        ))}
      </div>

      {/* RIA disclosure */}
      <div style={{ fontSize: 12, color: "rgba(255,255,255,.2)", lineHeight: 1.7, marginBottom: 24, maxWidth: 900 }}>
        WHALEN Financial is a Registered Investment Advisor (RIA) registered with the U.S. Securities and Exchange Commission. Registration does not imply a certain level of skill or training. Investing involves risk, including the possible loss of principal. Past performance is not indicative of future results. This website is for informational purposes only and does not constitute investment advice.
      </div>

      {/* Bottom */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 12, color: "rgba(255,255,255,.25)", flexWrap: "wrap", gap: 16 }}>
        <span>&copy; {new Date().getFullYear()} WHALEN Financial. All rights reserved.</span>
        <div style={{ display: "flex", gap: 24 }}>
          <a href="/privacy" style={{ color: "rgba(255,255,255,.25)", textDecoration: "none" }}>Privacy Policy</a>
          <a href="/terms" style={{ color: "rgba(255,255,255,.25)", textDecoration: "none" }}>Terms of Use</a>
          <a href="https://www.adviserinfo.sec.gov" target="_blank" rel="noreferrer" style={{ color: "rgba(255,255,255,.25)", textDecoration: "none" }}>SEC Adviser Info</a>
        </div>
      </div>

      <style>{`
        @media(max-width:1100px){
          .footer-top{grid-template-columns:1fr 1fr!important;gap:36px!important}
          footer{padding:60px 24px 32px!important}
        }
        @media(max-width:640px){
          .footer-top{grid-template-columns:1fr!important}
        }
      `}</style>
    </footer>
  );
}
