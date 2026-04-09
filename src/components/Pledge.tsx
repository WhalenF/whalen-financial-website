import Reveal from "./RevealOnScroll";

export default function Pledge() {
  return (
    <section id="pledge" style={{ background: "var(--navy)", padding: "112px 56px", position: "relative", overflow: "hidden" }}>
      <div style={{ position: "absolute", top: "-40%", left: "50%", transform: "translateX(-50%)", width: 700, height: 700, background: "radial-gradient(circle,rgba(0,153,204,.12) 0%,transparent 70%)", pointerEvents: "none" }} />

      <div style={{ position: "relative", zIndex: 2, maxWidth: 780, margin: "0 auto", textAlign: "center" }}>
        <Reveal variant="blur">
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: "rgba(0,153,204,.12)", border: "2px solid rgba(0,153,204,.3)", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 32px" }}>
            <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
              <path d="M18 3 L31 9 L31 19 C31 26.5 25 32.5 18 35 C11 32.5 5 26.5 5 19 L5 9 Z" stroke="#0099CC" strokeWidth="2"/>
              <path d="M12 18 L16 22 L24 14" stroke="#0099CC" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </Reveal>

        <Reveal variant="blur"><div className="sec-eyebrow center" style={{ color: "var(--teal)" }}>Our Client Commitment</div></Reveal>

        <Reveal delay="d1">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,58px)", fontWeight: 300, color: "#fff", lineHeight: 1.1, marginBottom: 24 }}>
            We earn your trust<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>every single year.</em>
          </h2>
        </Reveal>

        <Reveal delay="d2">
          <p style={{ fontSize: 18, fontWeight: 300, lineHeight: 1.8, color: "rgba(255,255,255,.7)", marginBottom: 40 }}>
            We don&rsquo;t believe in locking clients in. We believe in showing up every year, so you never want to leave. Our commitment is built on three pillars.
          </p>
        </Reveal>

        <Reveal variant="scale" delay="d2">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 2, marginBottom: 48 }} className="pledge-items">
            {[
              { icon: "100%", title: "Transparent, Always", body: "We are legally and ethically obligated to put your interests first — your intent, no exceptions." },
              { icon: "3×", title: "Reviews Per Year", body: "Every four months, we review your plan, portfolio, and life changes." },
              { icon: "0", title: "Surprises on Your Bill", body: "Transparent pricing. You know exactly what you pay and exactly what you get — before you sign anything." },
            ].map((p) => (
              <div key={p.title} style={{ background: "rgba(255,255,255,.04)", border: "1px solid rgba(255,255,255,.07)", padding: "32px 24px", textAlign: "center" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 40, fontWeight: 300, color: "var(--teal)", lineHeight: 1, marginBottom: 12 }}>{p.icon}</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 400, color: "#fff", marginBottom: 8 }}>{p.title}</div>
                <div style={{ fontSize: 14, fontWeight: 300, color: "rgba(255,255,255,.55)", lineHeight: 1.7 }}>{p.body}</div>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal delay="d3">
          <a href="https://calendly.com/confessions-of-a-wealth-manager/your-retirement-money-prism-diagnostic-clone" target="_blank" rel="noreferrer" className="btn-primary">
            Hold Us to It — Schedule a Call
          </a>
        </Reveal>
      </div>

      <style>{`
        .pledge-items{grid-template-columns:repeat(3,1fr)!important}
        @media(max-width:1100px){
          .pledge-items{grid-template-columns:1fr!important}
          #pledge{padding:80px 24px!important}
        }
      `}</style>
    </section>
  );
}
