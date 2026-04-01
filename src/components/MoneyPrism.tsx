import Reveal from "./RevealOnScroll";

const zones = [
  {
    cls: "blue",
    color: "#0099CC",
    bg: "rgba(0,153,204,.14)",
    border: "#0099CC",
    label: "Blue Zone",
    horizon: "Years 0–2",
    title: "Liquidity & Safety",
    body: "Your accessible reserves. Cash, money markets, and short-term instruments that fund day-to-day expenses without touching growth assets during downturns.",
    tags: ["Cash Equivalents", "Money Market", "CDs", "Emergency Reserve"],
  },
  {
    cls: "green",
    color: "#2e9e5e",
    bg: "rgba(46,158,94,.14)",
    border: "#2e9e5e",
    label: "Green Zone",
    horizon: "Years 2–10",
    title: "Income & Preservation",
    body: "Your income engine. Bonds, dividend strategies, annuities, and income-producing assets that replenish the Blue Zone with predictable cash flow.",
    tags: ["Fixed Income", "Dividends", "Annuities", "Income Funds"],
  },
  {
    cls: "red",
    color: "#c94040",
    bg: "rgba(201,64,64,.14)",
    border: "#c94040",
    label: "Red Zone",
    horizon: "Years 10+",
    title: "Growth & Legacy",
    body: "Your long-term engine. Equities and growth-oriented assets designed to outpace inflation and leave a meaningful legacy for those you love.",
    tags: ["Equities", "Alternatives", "Real Assets", "Legacy Planning"],
  },
];

export default function MoneyPrism() {
  return (
    <section id="money-prism" style={{ background: "var(--navy)", color: "#fff", padding: "112px 56px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "relative", zIndex: 2 }}>
        <Reveal variant="blur"><div className="sec-eyebrow" style={{ color: "var(--teal)" }}>Our Proprietary Framework</div></Reveal>
        <Reveal variant="blur" delay="d1">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "#fff", letterSpacing: "-.01em" }}>
            The Money Prism<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>Retirement Strategy</em>
          </h2>
        </Reveal>
      </div>

      <div style={{ position: "relative", zIndex: 2, display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 88, alignItems: "center", marginTop: 64 }} className="prism-layout">
        <div>
          <Reveal variant="left" delay="d2">
            <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.82, color: "rgba(255,255,255,.7)", marginTop: 18 }}>
              Most portfolios are designed for accumulation. Retirement demands something different — a deliberate, time-segmented strategy that delivers income when you need it, growth when you don&rsquo;t, and certainty throughout.
            </p>
          </Reveal>
          <Reveal variant="left" delay="d3">
            <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.82, color: "rgba(255,255,255,.7)", marginTop: 16 }}>
              The Money Prism divides your retirement assets into three zones based on time horizon. Each zone has a distinct purpose, a distinct risk profile, and a distinct set of tools. Together, they form a complete retirement income machine.
            </p>
          </Reveal>
          <Reveal variant="left" delay="d4">
            <a href="#cta" style={{ display: "inline-flex", alignItems: "center", gap: 10, fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)", textDecoration: "none", marginTop: 32, transition: "gap .2s" }}>
              See how your plan would look →
            </a>
          </Reveal>
        </div>

        <Reveal variant="right" delay="d2">
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {zones.map((z) => (
              <div key={z.cls} className={`prism-zone prism-${z.cls}`} style={{
                padding: "30px 36px", borderRadius: 4,
                background: z.bg, borderLeft: `4px solid ${z.border}`,
                cursor: "default",
              }}>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
                  <div style={{ width: 9, height: 9, borderRadius: "50%", background: z.color, flexShrink: 0 }} />
                  <div style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: z.color }}>{z.label}</div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 11, color: "rgba(255,255,255,.35)", marginLeft: "auto" }}>{z.horizon}</div>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 400, color: "#fff", marginBottom: 8, lineHeight: 1.2 }}>{z.title}</div>
                <div style={{ fontSize: 14, fontWeight: 300, lineHeight: 1.72, color: "rgba(255,255,255,.58)" }}>{z.body}</div>
                <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 12 }}>
                  {z.tags.map((t) => (
                    <span key={t} style={{
                      fontSize: 10, fontWeight: 500, letterSpacing: ".07em", textTransform: "uppercase",
                      padding: "4px 9px", borderRadius: 2, color: "rgba(255,255,255,.65)",
                      background: `${z.bg}`,
                    }}>{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        .prism-zone {
          transition: transform .55s cubic-bezier(0.16, 1, 0.3, 1),
                      border-left-color .55s cubic-bezier(0.16, 1, 0.3, 1),
                      box-shadow .55s cubic-bezier(0.16, 1, 0.3, 1),
                      background .55s cubic-bezier(0.16, 1, 0.3, 1);
        }
        .prism-blue:hover  { transform: translateX(10px); border-left-color: #33bbee !important; background: rgba(0,153,204,.22) !important; box-shadow: -4px 0 20px rgba(0,153,204,.18); }
        .prism-green:hover { transform: translateX(10px); border-left-color: #40c87a !important; background: rgba(46,158,94,.22) !important; box-shadow: -4px 0 20px rgba(46,158,94,.18); }
        .prism-red:hover   { transform: translateX(10px); border-left-color: #e05a5a !important; background: rgba(201,64,64,.22) !important; box-shadow: -4px 0 20px rgba(201,64,64,.18); }
        @media(max-width:1100px){
          .prism-layout{grid-template-columns:1fr!important;gap:44px!important}
          #money-prism{padding:80px 24px!important}
        }
      `}</style>
    </section>
  );
}
