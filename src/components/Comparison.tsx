import Reveal from "./RevealOnScroll";

const CheckY = () => (
  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(26,122,74,.12)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M2 5.5 L4.5 8 L9 3" stroke="#1a7a4a" strokeWidth="1.8" strokeLinecap="round"/></svg>
  </div>
);
const CheckN = () => (
  <div style={{ width: 20, height: 20, borderRadius: "50%", background: "rgba(170,51,51,.08)", display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
    <svg width="11" height="11" viewBox="0 0 11 11" fill="none"><path d="M3 3 L8 8 M8 3 L3 8" stroke="#a33" strokeWidth="1.8" strokeLinecap="round"/></svg>
  </div>
);

const rows = [
  { feature: "Acts in your best interest", whalen: "Always, it's how we're built", trad: "Not always", wY: true },
  { feature: "Retirement income planning", whalen: "Included: the Money Prism", trad: "Rarely coordinated", wY: true },
  { feature: "Proactive tax planning", whalen: "Year-round, integrated", trad: "Refer to CPA", wY: true },
  { feature: "Estate planning coordination", whalen: "Included, ongoing", trad: "Separate engagement", wY: true },
  { feature: "Transparent, flat fees", whalen: "No hidden charges", trad: "Commissions common", wY: true },
  { feature: "Virtual, serve you anywhere", whalen: "Nationwide, digital-first", trad: "Local office required", wY: true },
  { feature: "Personalized One Page Plan", whalen: "Every client receives one", trad: "Generic reports only", wY: true },
];

export default function Comparison() {
  return (
    <section id="comparison" style={{ background: "var(--warm)", padding: "112px 56px" }}>
      <div style={{ textAlign: "center", marginBottom: 60 }}>
        <Reveal><div className="sec-eyebrow center">The Whalen Difference</div></Reveal>
        <Reveal delay="d1">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", textAlign: "center", letterSpacing: "-.01em" }}>
            Not all financial advisors<br />are <em style={{ fontStyle: "italic", color: "var(--teal)" }}>created equal.</em>
          </h2>
        </Reveal>
        <Reveal delay="d2">
          <p style={{ fontSize: 17, fontWeight: 300, color: "var(--text-mid)", maxWidth: 540, margin: "18px auto 0", lineHeight: 1.8 }}>
            Here&rsquo;s how we compare to the traditional advisory model.
          </p>
        </Reveal>
      </div>

      <Reveal variant="scale" delay="d1">
        <div style={{ maxWidth: 900, margin: "0 auto", borderRadius: 6, overflow: "hidden", boxShadow: "var(--shadow-lg)", border: "1px solid var(--rule)" }}>
          {/* Header */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", background: "var(--navy)" }} className="comp-header">
            <div style={{ padding: "24px 28px", fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }} />
            <div style={{ padding: "24px 28px", fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--teal)", display: "flex", alignItems: "center", gap: 10 }}>
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none"><path d="M9 2 L16 6 L16 11 C16 14.5 12.8 17 9 18 C5.2 17 2 14.5 2 11 L2 6 Z" stroke="#0099CC" strokeWidth="1.5"/><path d="M6 9 L8 11 L12 7" stroke="#0099CC" strokeWidth="1.5" strokeLinecap="round"/></svg>
              <strong style={{ color: "#0099CC" }}>WHALEN</strong>
            </div>
            <div style={{ padding: "24px 28px", fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "rgba(255,255,255,.4)" }}>Traditional Firm</div>
          </div>

          {/* Rows */}
          {rows.map((r, i) => (
            <div key={r.feature} style={{
              display: "grid", gridTemplateColumns: "1fr 1fr 1fr",
              borderTop: "1px solid var(--rule)",
              background: i % 2 === 0 ? "#fff" : "var(--card-alt)",
            }} className="comp-row">
              <div style={{ padding: "20px 28px", fontSize: 15, fontWeight: 500, color: "var(--ink)", display: "flex", alignItems: "center" }}>{r.feature}</div>
              <div style={{ padding: "20px 28px", fontSize: 15, fontWeight: 500, color: "#1a7a4a", display: "flex", alignItems: "center", gap: 10 }}>
                <CheckY />{r.whalen}
              </div>
              <div style={{ padding: "20px 28px", fontSize: 15, fontWeight: 400, color: "#a33", display: "flex", alignItems: "center", gap: 10, opacity: .75 }} className="comp-trad">
                <CheckN />{r.trad}
              </div>
            </div>
          ))}
        </div>
      </Reveal>

      <style>{`
        @media(max-width:1100px){
          #comparison{padding:80px 24px!important}
          .comp-header,.comp-row{grid-template-columns:1fr 1fr 1fr!important}
        }
        @media(max-width:640px){
          .comp-header,.comp-row{grid-template-columns:1fr 1fr!important}
          .comp-trad{display:none!important}
        }
      `}</style>
    </section>
  );
}
