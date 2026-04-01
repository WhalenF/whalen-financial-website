"use client";

import Image from "next/image";
import { useState } from "react";
import Reveal from "./RevealOnScroll";

const teamMembers = [
  {
    photo: "/team/andrew-whalen.png", name: "Andrew Whalen", role: "CEO & Wealth Advisor",
    dept: "Leadership", color: "#0099CC",
    bio: "Andrew founded Whalen Financial with a single conviction: that every family deserves the same integrated planning once reserved for the ultra-wealthy. With decades of experience across investments, retirement income, and estate strategy, he personally oversees the firm's planning philosophy and client experience.",
  },
  {
    photo: "/team/john-urosevich.png", name: "John Urosevich", role: "COO",
    dept: "Leadership", color: "#0099CC",
    bio: "John keeps the firm running at the highest standard of operational excellence. He oversees internal systems, team coordination, and the processes that ensure every client interaction is seamless, timely, and consistent with the Whalen standard.",
  },
  {
    photo: "/team/vanessa-medina.png", name: "Vanessa Medina", role: "Wealth Advisor",
    dept: "Advisory", color: "#2e9e5e",
    bio: "Vanessa guides clients through complex financial transitions — from retirement planning to legacy design. Her approach blends technical rigor with genuine relationship-building, ensuring each plan is as personal as it is precise.",
  },
  {
    photo: "/team/luke-perry.png", name: "Luke Perry", role: "Portfolio Manager",
    dept: "Advisory", color: "#2e9e5e",
    bio: "Luke oversees portfolio construction and ongoing investment strategy for Whalen clients. He focuses on risk-adjusted returns, asset allocation, and ensuring each portfolio is aligned with the client's time horizon and income needs.",
  },
  {
    photo: "/team/cristian-sanabria.png", name: "Cristian Sanabria", role: "Portfolio Analyst",
    dept: "Advisory", color: "#2e9e5e",
    bio: "Cristian supports the advisory team with in-depth market research, portfolio analysis, and investment due diligence. His analytical approach helps ensure that every client's portfolio is grounded in data and aligned with long-term objectives.",
  },
  {
    photo: "/team/matthew-cuglietta.png", name: "Matthew Cuglietta", role: "Client Relations Associate",
    dept: "Client Services", color: "#b47a28",
    bio: "Matthew is often the first point of contact for prospective and existing clients. He coordinates discovery calls, manages ongoing communication, and ensures every client feels heard, valued, and well-informed throughout their relationship with the firm.",
  },
  {
    photo: "/team/kirsten-creel.png", name: "Kirsten Creel", role: "Client Service Associate",
    dept: "Client Services", color: "#b47a28",
    bio: "Kirsten keeps client accounts running smoothly behind the scenes — handling account paperwork, service requests, and follow-through on every commitment the team makes. She's the reason things never fall through the cracks.",
  },
  {
    photo: "/team/antonio-middleton.png", name: "Antonio Middleton", role: "Marketing Manager",
    dept: "Operations", color: "#7840b4",
    bio: "Antonio oversees the firm's brand presence, digital strategy, and content initiatives. He's responsible for translating Whalen's planning philosophy into messaging that resonates — and for ensuring the firm's reputation reflects the quality of its work.",
  },
  {
    photo: "/team/adrian-zarandin.png", name: "Adrian Zarandin", role: "Client Service Associate",
    dept: "Client Services", color: "#b47a28",
    bio: "Adrian supports the day-to-day needs of Whalen clients with professionalism and care. From account servicing to coordinating advisor requests, he ensures every client interaction reflects the firm's commitment to exceptional service.",
  },
  {
    photo: "/team/nessa-rodriguez.png", name: "Nessa Rodriguez", role: "Client Onboarding Specialist",
    dept: "Client Services", color: "#b47a28",
    bio: "Nessa guides new clients through every step of joining the firm — from initial paperwork to account setup and first-meeting preparation. Her goal is to make the onboarding experience feel effortless and welcoming from day one.",
  },
  {
    photo: "/team/al-whalen.png", name: "Al Whalen, EA CFP", role: "Tax Advisor",
    dept: "Tax", color: "#b43c3c",
    bio: "Al is an Enrolled Agent and Certified Financial Planner with deep expertise in tax strategy, IRS representation, and integrated financial planning. He works closely with clients on proactive tax planning, Roth conversions, and RMD optimization throughout the year.",
  },
  {
    photo: "/team/dawn-ferreira.png", name: "Dawn Ferreira", role: "Tax Advisor",
    dept: "Tax", color: "#b43c3c",
    bio: "Dawn brings years of tax advisory experience to the Whalen team, helping clients navigate complex tax situations with clarity and confidence. Her collaborative approach ensures tax strategy is always coordinated with the broader financial plan.",
  },
  {
    photo: "/team/megan-healy.png", name: "Megan Healy", role: "Tax Advisor",
    dept: "Tax", color: "#b43c3c",
    bio: "Megan specializes in tax planning for individuals, retirees, and small business owners. She stays ahead of tax law changes so clients are always positioned to minimize liability and keep more of what they've earned.",
  },
  {
    photo: "/team/brandon-isaacs.png", name: "Brandon Isaacs", role: "Tax Preparer",
    dept: "Tax", color: "#b43c3c",
    bio: "Brandon prepares federal and state returns for a wide range of client profiles, with a focus on accuracy, thoroughness, and clear communication. He's an important part of ensuring every client's tax filing is handled with precision and care.",
  },
  {
    photo: "/team/griselda-vasquez.png", name: "Griselda Vasquez-Salamanca", role: "Tax Preparer",
    dept: "Tax", color: "#b43c3c",
    bio: "Griselda brings meticulous attention to detail and a commitment to client service to her role on the tax team. She ensures every return is prepared accurately and on time, with the care each client's financial life deserves.",
  },
];

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
