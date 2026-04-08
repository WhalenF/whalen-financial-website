import Image from "next/image";
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
              {/* Spine shadow */}
              <div style={{ position: "absolute", left: -10, top: 8, bottom: 8, width: 10, background: "linear-gradient(to right,#050a12,#1a2a3a)", borderRadius: "2px 0 0 2px" }} />
              {/* Book cover image */}
              <div style={{ boxShadow: "20px 20px 60px rgba(0,0,0,.28), 4px 4px 12px rgba(0,0,0,.14)", borderRadius: 2, overflow: "hidden", lineHeight: 0 }}>
                <Image
                  src="/book-cover.png"
                  alt="Confessions of a Wealth Manager"
                  width={400}
                  height={520}
                  style={{ width: 280, height: "auto", display: "block" }}
                  priority
                />
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
              <a href="https://confessionsofawealthmanager.com/products/confessions-of-a-wealth-manager-by-andrew-whalen" target="_blank" rel="noreferrer" className="btn-primary">
                Order Your Copy
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
