"use client";

import Reveal from "./RevealOnScroll";

const pillars = [
  { num: "1", title: "Fiduciary, Always", body: "We are legally and ethically obligated to act in your best interest — not ours. No commissions, no hidden incentives. Every recommendation is one we'd make for our own family." },
  { num: "2", title: "Integrated Planning", body: "Your investments, taxes, retirement income, estate, and protection strategy are built as a single coordinated system — not five separate conversations with five different advisors." },
  { num: "3", title: "Proactive, Not Reactive", body: "We don't wait for you to call. We monitor your plan continuously and reach out when market shifts, tax law changes, or life events require action." },
  { num: "4", title: "Your Life, Your Plan", body: "No templates. Every engagement begins with deep discovery — your goals, your concerns, your legacy. The plan we build is yours alone." },
  { num: "5", title: "Transparent Fees", body: "Our fee-based model means you know exactly what you pay and exactly what you get. No surprises, no conflicts of interest, no fine print." },
];

export default function WhyWhalen() {
  return (
    <section id="why-whalen" style={{ background: "var(--page)", padding: "112px 56px" }}>
      <Reveal><div className="sec-eyebrow">Why <strong style={{ color: "#0099CC" }}>WHALEN</strong></div></Reveal>
      <Reveal delay="d1">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", letterSpacing: "-.01em" }}>
          We&rsquo;re not a product company.<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>We&rsquo;re a planning firm.</em>
        </h2>
      </Reveal>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 88, alignItems: "start", marginTop: 56 }} className="why-layout">
        <div>
          {pillars.map((p, i) => (
            <Reveal key={p.num} variant="left" delay={["","d1","d2","d3","d4"][i] as any}>
              <div style={{
                padding: "28px 0", borderBottom: "1px solid var(--rule)",
                display: "grid", gridTemplateColumns: "44px 1fr", gap: 18, alignItems: "start",
                borderTop: i === 0 ? "1px solid var(--rule)" : undefined,
              }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 30, fontWeight: 300, color: "var(--teal)", lineHeight: 1, paddingTop: 4 }}>{p.num}</div>
                <div>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--ink)", marginBottom: 7 }}>{p.title}</div>
                  <div style={{ fontSize: 15, fontWeight: 300, lineHeight: 1.8, color: "var(--text-mid)" }}>{p.body}</div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <div style={{ position: "sticky", top: 100 }}>
          <Reveal variant="right">
            <div style={{ background: "var(--navy)", padding: "52px 44px", borderRadius: 4, position: "relative", overflow: "hidden" }}>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 110, fontWeight: 300, color: "rgba(0,153,204,.14)", lineHeight: .6, position: "absolute", top: 20, left: 32, pointerEvents: "none" }}>&ldquo;</div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 27, fontWeight: 300, fontStyle: "italic", color: "#fff", lineHeight: 1.52, position: "relative", zIndex: 1 }}>
                A unique life requires a <span style={{ color: "var(--teal)", fontStyle: "normal" }}>unique plan</span> — one built around who you are, not a product we sell.
              </div>
              <div style={{ fontSize: 12, fontWeight: 500, letterSpacing: ".1em", textTransform: "uppercase", color: "rgba(255,255,255,.38)", marginTop: 24, display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 22, height: 1, background: "rgba(255,255,255,.2)", display: "inline-block" }} />
                <strong style={{ color: "#0099CC" }}>WHALEN</strong> Philosophy
              </div>
            </div>
          </Reveal>

          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginTop: 12 }}>
            {[
              { num: "50", sup: "+", label: "Years of Combined Experience" },
              { num: "5", sup: "", label: "Planning Disciplines" },
              { num: "3×", sup: "", label: "Annual Plan Reviews" },
              { num: "1", sup: "", label: "Integrated Plan Per Client" },
            ].map((m) => (
              <Reveal key={m.label} variant="scale">
                <div style={{ background: "var(--card)", padding: "28px 24px", borderRadius: 4, border: "1px solid var(--rule)", boxShadow: "var(--shadow)" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 44, fontWeight: 300, color: "var(--ink)", lineHeight: 1 }}>
                    {m.num}<sup style={{ fontSize: 20, verticalAlign: "super" }}>{m.sup}</sup>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 400, color: "var(--text-soft)", marginTop: 5, lineHeight: 1.4 }}>{m.label}</div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media(max-width:1100px){
          .why-layout{grid-template-columns:1fr!important;gap:44px!important}
          #why-whalen{padding:80px 24px!important}
        }
      `}</style>
    </section>
  );
}
