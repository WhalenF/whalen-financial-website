"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./RevealOnScroll";
import teamData from "../../content/team.json";

const deptColors: Record<string, string> = {
  Leadership: "#0099CC",
  Advisory: "#2e9e5e",
  "Client Services": "#b47a28",
  Operations: "#7840b4",
  Tax: "#b43c3c",
};

const teamMembers = teamData.members.map((m) => ({
  ...m,
  color: m.color || deptColors[m.dept] || "#0099CC",
}));

export default function Team() {
  const [expanded, setExpanded] = useState<string | null>(null);

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
        {teamMembers.map((m, i) => {
          const isOpen = expanded === m.name;
          return (
            <Reveal key={m.name} variant="scale" delay={["","d1","d2","d3","d4","d5"][i % 6] as any}>
              <div
                style={{
                  background: "var(--card)", borderRadius: 4, overflow: "hidden",
                  boxShadow: isOpen ? "var(--shadow-lg)" : "var(--shadow)",
                  border: `1px solid ${isOpen ? m.color + "44" : "var(--rule)"}`,
                  transition: "transform .3s, box-shadow .3s, border-color .3s",
                  cursor: "pointer",
                }}
                onClick={() => setExpanded(isOpen ? null : m.name)}
                onMouseEnter={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; }}
                onMouseLeave={e => { if (!isOpen) (e.currentTarget as HTMLElement).style.transform = ""; }}
              >
                {/* Photo */}
                <div style={{ position: "relative", width: "100%", aspectRatio: "4/5", overflow: "hidden", background: "#0d2137" }}>
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width:640px) 100vw, (max-width:1100px) 50vw, 25vw"
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(13,33,55,.75),transparent)", padding: "24px 16px 10px" }}>
                    <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: m.color }}>{m.dept}</div>
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: "20px 22px" }}>
                  <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--ink)", marginBottom: 3, lineHeight: 1.2 }}>{m.name}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)", marginBottom: isOpen ? 14 : 0 }}>{m.role}</div>

                  {/* Expandable bio */}
                  <div style={{
                    maxHeight: isOpen ? 200 : 0,
                    overflow: "hidden",
                    transition: "max-height .45s cubic-bezier(0.16,1,0.3,1)",
                  }}>
                    <p style={{ fontSize: 13, fontWeight: 300, lineHeight: 1.75, color: "var(--text-mid)", margin: 0, paddingTop: 2 }}>
                      {m.bio}
                    </p>
                  </div>

                  {/* Toggle hint */}
                  <div style={{ marginTop: 12, display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 500, color: isOpen ? m.color : "var(--text-xsoft)", letterSpacing: ".06em", textTransform: "uppercase", transition: "color .2s" }}>
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" style={{ transition: "transform .3s", transform: isOpen ? "rotate(180deg)" : "rotate(0)" }}>
                      <path d="M2 4 L6 8 L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    {isOpen ? "Close" : "Read bio"}
                  </div>
                </div>
              </div>
            </Reveal>
          );
        })}
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
