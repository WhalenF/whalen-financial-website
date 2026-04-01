import Reveal from "./RevealOnScroll";

const bullets = [
  "How to tell if your advisor is actually working for you — or for their firm.",
  "The questions every investor should ask before trusting anyone with their money.",
  "What integrated wealth management actually looks like — and why it matters for your retirement.",
];

export default function Book() {
  return (
    <section id="book" style={{ background: "var(--warm)", padding: "112px 56px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 88, alignItems: "center" }} className="book-layout">
        {/* Book visual */}
        <Reveal variant="left">
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ position: "relative" }}>
            {/* Spine */}
            <div style={{ position: "absolute", left: -10, top: 8, bottom: 8, width: 10, background: "linear-gradient(to right,#050a12,#0a1525)", borderRadius: "2px 0 0 2px" }} />
            {/* Face */}
            <div style={{
              width: 270, minHeight: 370, background: "var(--navy)", padding: "40px 34px",
              position: "relative",
              boxShadow: "20px 20px 60px rgba(0,0,0,.22),4px 4px 12px rgba(0,0,0,.12)",
              display: "flex", flexDirection: "column", justifyContent: "space-between",
              borderRadius: 2,
            }}>
              {/* Top teal bar */}
              <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 4, background: "var(--teal)", borderRadius: "2px 2px 0 0" }} />
              {/* Decorative rings */}
              <div style={{ position: "absolute", bottom: 0, right: 0, width: 110, height: 110, overflow: "hidden", opacity: .06 }}>
                <svg viewBox="0 0 120 120" fill="none" style={{ width: "100%" }}>
                  <circle cx="120" cy="120" r="80" stroke="#0099CC" strokeWidth="20"/>
                  <circle cx="120" cy="120" r="50" stroke="#0099CC" strokeWidth="14"/>
                </svg>
              </div>
              <div>
                <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".2em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 18 }}>Whalen Financial</div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 27, fontWeight: 300, color: "#fff", lineHeight: 1.2, fontStyle: "italic" }}>
                  Confessions<br />of a Wealth<br />Manager
                </div>
                <div style={{ width: 36, height: 2, background: "var(--teal)", margin: "18px 0" }} />
                <div style={{ fontSize: 11, fontWeight: 300, color: "rgba(255,255,255,.5)", letterSpacing: ".04em", lineHeight: 1.5 }}>
                  What the financial industry<br />doesn&rsquo;t want you to know
                </div>
              </div>
              <div>
                <div style={{ width: "100%", height: 1, background: "rgba(255,255,255,.1)", marginBottom: 14 }} />
                <div style={{ fontSize: 10, fontWeight: 500, color: "rgba(255,255,255,.32)", letterSpacing: ".1em", textTransform: "uppercase" }}>
                  By the Team at Whalen Financial
                </div>
              </div>
            </div>
          </div>
        </div>
        </Reveal>

        {/* Content */}
        <div>
          <Reveal variant="right"><div className="sec-eyebrow">The Book</div></Reveal>
          <Reveal variant="right" delay="d1">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", letterSpacing: "-.01em", marginBottom: 18 }}>
              <em style={{ fontStyle: "italic", color: "var(--teal)" }}>Confessions</em> of a<br />Wealth Manager
            </h2>
          </Reveal>
          <Reveal variant="right" delay="d2">
            <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.8, color: "var(--text-mid)", marginBottom: 28 }}>
              The wealth management industry is full of jargon, conflicts of interest, and advice designed to benefit advisors — not clients. This book changes that.
            </p>
          </Reveal>

          {bullets.map((b, i) => (
            <Reveal key={i} variant="right" delay={["d2","d3","d4"][i] as any}>
              <div style={{ display: "flex", gap: 14, alignItems: "flex-start", marginBottom: 16 }}>
                <div style={{ width: 4, height: 4, borderRadius: "50%", background: "var(--teal)", flexShrink: 0, marginTop: 9 }} />
                <div style={{ fontSize: 16, fontWeight: 300, color: "var(--text-mid)", lineHeight: 1.75 }}>{b}</div>
              </div>
            </Reveal>
          ))}

          <Reveal variant="right" delay="d4">
            <div style={{ display: "flex", gap: 14, flexWrap: "wrap", alignItems: "center", marginTop: 6 }}>
              <a href="https://calendly.com/whalenfinancial/discovery" target="_blank" rel="noreferrer" className="btn-primary">
                Get a Free Copy
              </a>
              <a href="https://calendly.com/whalenfinancial/discovery" target="_blank" rel="noreferrer" className="btn-outline">
                Learn More
              </a>
            </div>
          </Reveal>
        </div>
      </div>

      <style>{`
        @media(max-width:1100px){
          .book-layout{grid-template-columns:1fr!important;gap:48px!important}
          #book{padding:80px 24px!important}
        }
      `}</style>
    </section>
  );
}
