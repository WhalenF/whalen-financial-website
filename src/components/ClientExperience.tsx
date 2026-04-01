import Reveal from "./RevealOnScroll";

const steps = [
  {
    num: "01", title: "Discovery Call", when: "Week 1",
    body: "A 45–60 minute conversation with your advisor. We learn about you, your goals, and your concerns. You learn about us. No commitments, no pressure.",
    bullets: ["We listen — you talk", "We explain our process & fees", "You decide if we're the right fit"],
  },
  {
    num: "02", title: "Plan Presentation", when: "Weeks 2–4",
    body: "We build and present your custom Whalen Plan — your complete financial picture, gaps, opportunities, projections, and a personalized retirement roadmap.",
    bullets: ["Full financial snapshot", "Retirement income projections", "Money Prism zone breakdown"],
  },
  {
    num: "03", title: "Implementation", when: "Months 1–3",
    body: "We execute the plan. Accounts transfer. Portfolios are built. Tax strategies are set in motion. Estate documents are coordinated. You just sign and breathe.",
    bullets: ["Account transfers handled for you", "Portfolio construction begins", "Tax & estate coordination starts"],
  },
];

const ongoingCols = [
  { head: "Portfolio", items: ["Quarterly rebalancing", "Tax-loss harvesting", "Performance reporting", "Risk monitoring"] },
  { head: "Planning", items: ["Plan updates", "Life event reviews", "Goal tracking", "Projection modeling"] },
  { head: "Tax", items: ["Roth conversion strategy", "RMD planning", "Tax bracket management", "Year-end coordination"] },
  { head: "Protection", items: ["Insurance reviews", "Beneficiary audits", "Estate doc coordination", "Emergency reserve check"] },
];

export default function ClientExperience() {
  return (
    <section id="client-experience" style={{ background: "var(--page)", padding: "112px 56px" }}>
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <Reveal><div className="sec-eyebrow center">The Client Experience</div></Reveal>
        <Reveal delay="d1">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", textAlign: "center", letterSpacing: "-.01em" }}>
            What to expect when you<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>become a Whalen client.</em>
          </h2>
        </Reveal>
        <Reveal delay="d2">
          <p style={{ fontSize: 17, fontWeight: 300, color: "var(--text-mid)", maxWidth: 540, margin: "18px auto 0", lineHeight: 1.8 }}>
            From your first call to your ongoing relationship — no surprises, no hidden steps.
          </p>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" }} className="ce-cards">
        {steps.map((s, i) => (
          <Reveal key={s.num} delay={["","d1","d2"][i] as any}>
            <div style={{ background: "var(--card)", border: "1px solid var(--rule)", borderTop: "3px solid var(--teal)", padding: "40px 32px", borderRadius: 4, boxShadow: "var(--shadow)", height: "100%" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 300, color: "rgba(0,153,204,.18)", lineHeight: 1, marginBottom: 14 }}>{s.num}</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 24, fontWeight: 500, color: "var(--ink)", marginBottom: 6 }}>{s.title}</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 18 }}>{s.when}</div>
              <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "var(--text-mid)", marginBottom: 18 }}>{s.body}</div>
              {s.bullets.map(b => (
                <div key={b} style={{ display: "flex", gap: 10, fontSize: 14, color: "var(--text-mid)", alignItems: "flex-start", marginBottom: 8 }}>
                  <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", flexShrink: 0, marginTop: 7 }} />
                  {b}
                </div>
              ))}
            </div>
          </Reveal>
        ))}
      </div>

      {/* One Page Plan callout */}
      <Reveal>
        <div style={{ background: "var(--card-alt)", border: "1px solid var(--rule)", borderLeft: "4px solid var(--teal)", padding: 44, maxWidth: 1100, margin: "16px auto 0", borderRadius: 4, display: "grid", gridTemplateColumns: "auto 1fr", gap: 44, alignItems: "center", boxShadow: "var(--shadow)" }} className="opp-grid">
          <div style={{ width: 68, height: 68, background: "var(--teal-dim)", border: "1px solid var(--teal-border)", borderRadius: 4, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <rect x="4" y="2" width="18" height="24" rx="1" stroke="#0099CC" strokeWidth="1.8"/>
              <line x1="7" y1="9" x2="19" y2="9" stroke="#0099CC" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="7" y1="14" x2="19" y2="14" stroke="#0099CC" strokeWidth="1.4" strokeLinecap="round"/>
              <line x1="7" y1="19" x2="14" y2="19" stroke="#0099CC" strokeWidth="1.4" strokeLinecap="round"/>
              <circle cx="24" cy="25" r="6" fill="#f0f5f9" stroke="#0099CC" strokeWidth="1.5"/>
              <path d="M21.5 25 L23.5 27 L27 22.5" stroke="#0099CC" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".18em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 10 }}>Your Plan Deliverable</div>
            <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 500, color: "var(--ink)", marginBottom: 10 }}>The Whalen One Page Plan</div>
            <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.82, color: "var(--text-mid)", marginBottom: 18 }}>
              Every client receives a personalized One Page Plan — a comprehensive financial blueprint that distills your entire wealth picture into one clear, actionable document. Your Freedom Number, retirement income projections, Money Prism allocation, tax strategy, Social Security timing, estate planning checklist, and asset protection analysis — all on one page.
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 7 }}>
              {["Freedom Number","Retirement Projections","Money Prism Allocation","Tax Strategy","Social Security Timing","Estate Checklist","Asset Protection","Updated Annually"].map(t => (
                <span key={t} style={{ fontSize: 10, fontWeight: 600, letterSpacing: ".09em", textTransform: "uppercase", padding: "5px 12px", background: "rgba(0,153,204,.08)", border: "1px solid var(--teal-border)", color: "var(--teal)", borderRadius: 2 }}>{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>

      {/* Ongoing */}
      <Reveal>
        <div style={{ background: "var(--navy)", borderLeft: "4px solid var(--teal)", padding: 48, maxWidth: 1100, margin: "16px auto 0", borderRadius: 4 }}>
          <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: 44, alignItems: "start" }} className="ce-ongoing-grid">
            <div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 52, fontWeight: 300, color: "rgba(0,153,204,.3)", lineHeight: 1 }}>04</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 400, color: "#fff" }}>Lifetime<br />Partnership</div>
              <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".14em", textTransform: "uppercase", color: "var(--teal)", marginTop: 10 }}>Ongoing</div>
            </div>
            <div>
              <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,.65)", lineHeight: 1.82, marginBottom: 8, maxWidth: 680 }}>
                This is where <strong style={{ color: "#0099CC" }}>WHALEN</strong> is different. Most advisors check in once a year. We&rsquo;re proactive — monitoring your plan continuously, reaching out when something changes, coordinating across every discipline so nothing slips through the cracks.
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 24, marginTop: 20 }} className="ce-ongoing-cols">
                {ongoingCols.map(col => (
                  <div key={col.head}>
                    <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 10 }}>{col.head}</div>
                    {col.items.map(item => (
                      <div key={item} style={{ fontSize: 14, color: "rgba(255,255,255,.6)", fontWeight: 300, marginBottom: 7 }}>{item}</div>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Reveal>

      <style>{`
        @media(max-width:1100px){
          .ce-cards{grid-template-columns:1fr!important}
          .opp-grid{grid-template-columns:1fr!important;gap:20px!important}
          .ce-ongoing-grid{grid-template-columns:1fr!important;gap:20px!important}
          .ce-ongoing-cols{grid-template-columns:1fr 1fr!important}
          #client-experience{padding:80px 24px!important}
        }
        @media(max-width:640px){
          .ce-ongoing-cols{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}
