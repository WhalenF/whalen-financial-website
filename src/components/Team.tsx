"use client";

import Reveal from "./RevealOnScroll";

const teamMembers = [
  { initials: "AW", name: "Andrew Whalen", role: "CEO & Wealth Advisor", dept: "Leadership", color: "#0099CC", bg: "rgba(0,153,204,.22)" },
  { initials: "JU", name: "John Urosevich", role: "COO", dept: "Leadership", color: "#0099CC", bg: "rgba(0,153,204,.22)" },
  { initials: "VM", name: "Vanessa Medina", role: "Wealth Advisor", dept: "Advisory", color: "#2e9e5e", bg: "rgba(46,158,94,.18)" },
  { initials: "MC", name: "Matthew Cuglietta", role: "Client Relations Associate", dept: "Client Services", color: "#b47a28", bg: "rgba(180,120,40,.18)" },
  { initials: "KC", name: "Kirsten Creel", role: "Client Service Associate", dept: "Client Services", color: "#b47a28", bg: "rgba(180,120,40,.18)" },
  { initials: "AM", name: "Antonio Middleton", role: "Marketing Manager", dept: "Operations", color: "#7840b4", bg: "rgba(120,60,180,.18)" },
  { initials: "AZ", name: "Adrian Zarandin", role: "Client Service Associate", dept: "Client Services", color: "#b47a28", bg: "rgba(180,120,40,.18)" },
  { initials: "NR", name: "Nessa Rodriguez", role: "Client Onboarding Specialist", dept: "Client Services", color: "#b47a28", bg: "rgba(180,120,40,.18)" },
  { initials: "LP", name: "Luke Perry", role: "Portfolio Manager", dept: "Advisory", color: "#2e9e5e", bg: "rgba(46,158,94,.18)" },
  { initials: "AW", name: "Al Whalen, EA CFP", role: "Tax Advisor", dept: "Tax", color: "#b43c3c", bg: "rgba(180,60,60,.18)" },
  { initials: "DF", name: "Dawn Ferreira", role: "Tax Advisor", dept: "Tax", color: "#b43c3c", bg: "rgba(180,60,60,.18)" },
  { initials: "MH", name: "Megan Healy", role: "Tax Advisor", dept: "Tax", color: "#b43c3c", bg: "rgba(180,60,60,.18)" },
  { initials: "BI", name: "Brandon Isaacs", role: "Tax Preparer", dept: "Tax", color: "#b43c3c", bg: "rgba(180,60,60,.18)" },
  { initials: "GV", name: "Griselda Vasquez-Salamanca", role: "Tax Preparer", dept: "Tax", color: "#b43c3c", bg: "rgba(180,60,60,.18)" },
];

export default function Team() {
  return (
    <section id="team" style={{ background: "var(--warm)", padding: "112px 56px" }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 72, alignItems: "end", marginBottom: 64 }} className="team-intro">
        <div>
          <Reveal><div className="sec-eyebrow">Our Team</div></Reveal>
          <Reveal delay="d1">
            <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", letterSpacing: "-.01em" }}>
              Professional backgrounds.<br /><em style={{ fontStyle: "italic", color: "var(--teal)" }}>Personal backstories.</em>
            </h2>
          </Reveal>
        </div>
        <Reveal delay="d2">
          <p style={{ fontSize: 17, fontWeight: 300, lineHeight: 1.8, color: "var(--text-mid)", maxWidth: 600 }}>
            We got into this business for the same reason you&rsquo;re here — because financial security matters, and the people who help you build it matter even more.
          </p>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="team-grid">
        {teamMembers.map((m, i) => (
          <Reveal key={`${m.initials}-${i}`} delay={["","d1","d2","d3"][i % 4] as any}>
            <div style={{
              background: "var(--card)", borderRadius: 4, overflow: "hidden",
              boxShadow: "var(--shadow)", border: "1px solid var(--rule)",
              transition: "transform .3s,box-shadow .3s", cursor: "default",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)"; }}
            >
              {/* Avatar */}
              <div style={{
                height: 180, display: "flex", alignItems: "center", justifyContent: "center",
                position: "relative", overflow: "hidden",
                background: "linear-gradient(135deg,#0d2137 0%,#12304f 100%)",
              }}>
                <div style={{
                  width: 80, height: 80, borderRadius: "50%",
                  background: m.bg, border: `3px solid ${m.color}30`,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}>
                  <span style={{ fontFamily: "var(--font-display)", fontSize: 28, fontWeight: 300, color: m.color }}>{m.initials}</span>
                </div>
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(13,33,55,.7),transparent)", padding: "10px 16px 8px" }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: m.color }}>{m.dept}</div>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "24px 28px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 22, fontWeight: 500, color: "var(--ink)", marginBottom: 4 }}>{m.name}</div>
                <div style={{ fontSize: 12, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: 12 }}>{m.role}</div>
                <div style={{ display: "flex", alignItems: "center", gap: 8, color: "var(--text-xsoft)", fontSize: 13, fontStyle: "italic" }}>
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" style={{ flexShrink: 0 }}>
                    <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M7 6.5 L7 10" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round"/>
                    <circle cx="7" cy="4.5" r=".8" fill="currentColor"/>
                  </svg>
                  Bio coming soon
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media(max-width:1100px){
          .team-intro{grid-template-columns:1fr!important;gap:28px!important}
          .team-grid{grid-template-columns:repeat(2,1fr)!important}
          #team{padding:80px 24px!important}
        }
        @media(max-width:640px){
          .team-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}
