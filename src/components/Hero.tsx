"use client";

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "linear-gradient(135deg,#0d2137 0%,#0a1829 60%,#0d2a3f 100%)",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "148px 56px 96px",
    }}>
      {/* Grid BG */}
      <div style={{
        position: "absolute", inset: 0,
        backgroundImage: "linear-gradient(rgba(0,153,204,.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,153,204,.04) 1px,transparent 1px)",
        backgroundSize: "72px 72px", opacity: .5, zIndex: 1,
      }}/>

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "20%", right: "10%", width: 600, height: 600,
        background: "radial-gradient(circle,rgba(0,153,204,.07) 0%,transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }}/>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(54px,6.5vw,92px)",
          fontWeight: 300, lineHeight: 1.04,
          color: "#fff", letterSpacing: "-.01em",
          marginBottom: 26,
        }}
          className="animate-fade-up delay-150"
        >
          Your wealth,<br />
          <em style={{ fontStyle: "italic", color: "#0099CC" }}>organized for life.</em>
        </h1>

        <p style={{
          fontSize: 19, fontWeight: 300, lineHeight: 1.72,
          color: "rgba(255,255,255,.8)", maxWidth: 560, marginBottom: 44,
        }}
          className="animate-fade-up delay-320"
        >
          <strong style={{ color: "#0099CC" }}>WHALEN</strong>{" "}is a digital-first wealth management firm serving families nationwide. Investment management, retirement income, tax planning, estate planning, and asset protection&nbsp;&mdash; in one integrated plan built around your life.
        </p>

        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
          className="animate-fade-up delay-500"
        >
          <a href="https://calendly.com/whalenfinancial/discovery" target="_blank" rel="noreferrer" className="btn-primary">
            Schedule a Discovery Call
          </a>
          <a href="#comparison" className="btn-ghost">
            See What Makes Us Different
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: "absolute", bottom: 56, right: 56, zIndex: 2,
        display: "flex", gap: 48,
      }}
        className="animate-fade-up delay-800 hero-stats"
      >
        {[
          { num: "50", sup: "+", label: "Years of Experience" },
          { num: "5", sup: "", label: "Planning Disciplines" },
          { num: "1", sup: "", label: "Integrated Plan" },
        ].map((s) => (
          <div key={s.label}>
            <div style={{
              fontFamily: "var(--font-display)", fontSize: 44,
              fontWeight: 300, color: "#fff", lineHeight: 1,
            }}>
              {s.num}<span style={{ color: "#0099CC" }}>{s.sup}</span>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 500, letterSpacing: ".11em",
              textTransform: "uppercase", color: "rgba(255,255,255,.42)", marginTop: 5,
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:1100px){
          .hero-stats{display:none!important}
          #hero{padding:130px 24px 80px!important}
        }
      `}</style>
    </section>
  );
}
