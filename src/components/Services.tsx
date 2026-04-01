import Reveal from "./RevealOnScroll";

const services = [
  {
    num: "01",
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <polyline points="4,30 14,18 22,24 36,8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="36" cy="8" r="3" fill="currentColor"/>
        <line x1="4" y1="36" x2="36" y2="36" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" opacity=".35"/>
      </svg>
    ),
    title: "Investment Management",
    body: "Institutional-quality portfolio construction tailored to your risk tolerance, time horizon, and income needs. We monitor, rebalance, and adjust — so you don't have to.",
  },
  {
    num: "02",
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <circle cx="20" cy="20" r="14" stroke="currentColor" strokeWidth="2"/>
        <polyline points="20,10 20,20 28,26" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <circle cx="20" cy="20" r="2" fill="currentColor"/>
      </svg>
    ),
    title: "Retirement Income Planning",
    body: "We engineer income that lasts a lifetime. Social Security optimization, distribution sequencing, and guaranteed income strategies built around your retirement date.",
  },
  {
    num: "03",
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <rect x="8" y="6" width="24" height="28" rx="1" stroke="currentColor" strokeWidth="2"/>
        <line x1="13" y1="14" x2="27" y2="14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        <line x1="13" y1="20" x2="22" y2="20" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
      </svg>
    ),
    title: "Tax Planning",
    body: "Proactive, year-round tax strategy. Roth conversions, tax-loss harvesting, capital gains management, and RMD planning coordinated directly with your portfolio.",
  },
  {
    num: "04",
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <path d="M20 6 L34 14 L34 34 L6 34 L6 14 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <rect x="15" y="24" width="10" height="10" stroke="currentColor" strokeWidth="1.5"/>
      </svg>
    ),
    title: "Estate Planning",
    body: "Coordinate your trust, will, beneficiary designations, and titling with your financial plan. We work alongside your attorney to protect and transfer your legacy efficiently.",
  },
  {
    num: "05",
    icon: (
      <svg className="svc-icon" viewBox="0 0 40 40" fill="none">
        <path d="M20 6 L34 12 L34 22 C34 29 27 35 20 38 C13 35 6 29 6 22 L6 12 Z" stroke="currentColor" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M14 20 L18 24 L26 16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: "Asset Protection",
    body: "Insurance analysis, liability mitigation, and structural strategies that shield your wealth from unexpected risks — illness, lawsuits, long-term care, and market catastrophe.",
  },
];

export default function Services() {
  return (
    <section id="what-we-do" style={{ background: "var(--page)", padding: "112px 56px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80, alignItems: "end", marginBottom: 72 }} className="services-intro">
        <div>
          <Reveal><div className="sec-eyebrow">What We Do</div></Reveal>
          <Reveal delay="d1">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", letterSpacing: "-.01em" }}>
              Five disciplines.<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>One unified plan.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay="d2">
          <div style={{ fontSize: 16, fontWeight: 300, lineHeight: 1.85, color: "var(--text-mid)", borderLeft: "2.5px solid var(--teal-border)", paddingLeft: 28 }}>
            Most financial advisors manage investments and call it financial planning. We don&rsquo;t. <strong style={{ color: "#0099CC" }}>WHALEN</strong> coordinates five distinct disciplines simultaneously — so every decision in one area reinforces all the others. The result is a plan far more powerful than its parts.
          </div>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16 }} className="services-grid">
        {services.map((s, i) => (
          <Reveal key={s.num} delay={i % 3 === 1 ? "d1" : i % 3 === 2 ? "d2" : ""}>
            <div className="service-card" style={{
              background: "var(--card)", padding: "44px 36px", borderRadius: 4,
              boxShadow: "var(--shadow)", border: "1px solid var(--rule)",
              position: "relative", overflow: "hidden", transition: "transform .3s,box-shadow .3s",
              height: "100%",
            }}>
              <style>{`.service-card::after{content:'';position:absolute;top:0;left:0;right:0;height:3px;background:var(--teal);transform:scaleX(0);transform-origin:left;transition:transform .4s}.service-card:hover::after{transform:scaleX(1)}.service-card:hover{transform:translateY(-4px);box-shadow:var(--shadow-lg)}`}</style>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 13, fontWeight: 500, color: "var(--teal)", letterSpacing: ".12em", marginBottom: 18 }}>{s.num}</div>
              <div style={{ width: 38, height: 38, marginBottom: 20, color: "var(--teal)" }}>{s.icon}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 26, fontWeight: 500, color: "var(--ink)", lineHeight: 1.2, marginBottom: 14 }}>{s.title}</div>
              <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.82, color: "var(--text-mid)" }}>{s.body}</div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media(max-width:1100px){
          .services-intro{grid-template-columns:1fr!important;gap:28px!important}
          .services-grid{grid-template-columns:1fr 1fr!important}
          #what-we-do{padding:80px 24px!important}
        }
        @media(max-width:640px){
          .services-grid{grid-template-columns:1fr!important}
        }
        .svc-icon{width:38px;height:38px}
      `}</style>
    </section>
  );
}
