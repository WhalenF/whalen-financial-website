"use client";

import Image from "next/image";
import Reveal from "./RevealOnScroll";

const teamMembers = [
  { photo: "/team/andrew-whalen.png",    name: "Andrew Whalen",             role: "CEO & Wealth Advisor",        dept: "Leadership",      color: "#0099CC" },
  { photo: "/team/john-urosevich.png",   name: "John Urosevich",            role: "COO",                         dept: "Leadership",      color: "#0099CC" },
  { photo: "/team/vanessa-medina.png",   name: "Vanessa Medina",            role: "Wealth Advisor",              dept: "Advisory",        color: "#2e9e5e" },
  { photo: "/team/luke-perry.png",       name: "Luke Perry",                role: "Portfolio Manager",           dept: "Advisory",        color: "#2e9e5e" },
  { photo: "/team/matthew-cuglietta.png",name: "Matthew Cuglietta",         role: "Client Relations Associate",  dept: "Client Services", color: "#b47a28" },
  { photo: "/team/kirsten-creel.png",    name: "Kirsten Creel",             role: "Client Service Associate",    dept: "Client Services", color: "#b47a28" },
  { photo: "/team/antonio-middleton.png",name: "Antonio Middleton",         role: "Marketing Manager",           dept: "Operations",      color: "#7840b4" },
  { photo: "/team/adrian-zarandin.png",  name: "Adrian Zarandin",           role: "Client Service Associate",    dept: "Client Services", color: "#b47a28" },
  { photo: "/team/nessa-rodriguez.png",  name: "Nessa Rodriguez",           role: "Client Onboarding Specialist",dept: "Client Services", color: "#b47a28" },
  { photo: "/team/al-whalen.png",        name: "Al Whalen, EA CFP",         role: "Tax Advisor",                 dept: "Tax",             color: "#b43c3c" },
  { photo: "/team/dawn-ferreira.png",    name: "Dawn Ferreira",             role: "Tax Advisor",                 dept: "Tax",             color: "#b43c3c" },
  { photo: "/team/megan-healy.png",      name: "Megan Healy",               role: "Tax Advisor",                 dept: "Tax",             color: "#b43c3c" },
  { photo: "/team/brandon-isaacs.png",   name: "Brandon Isaacs",            role: "Tax Preparer",                dept: "Tax",             color: "#b43c3c" },
  { photo: "/team/griselda-vasquez.png", name: "Griselda Vasquez-Salamanca",role: "Tax Preparer",                dept: "Tax",             color: "#b43c3c" },
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
          <Reveal key={m.name} variant="scale" delay={["","d1","d2","d3","d4","d5"][i % 6] as any}>
            <div style={{
              background: "var(--card)", borderRadius: 4, overflow: "hidden",
              boxShadow: "var(--shadow)", border: "1px solid var(--rule)",
              transition: "transform .3s,box-shadow .3s", cursor: "default",
            }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow-lg)"; }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = ""; (e.currentTarget as HTMLElement).style.boxShadow = "var(--shadow)"; }}
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
                {/* Dept badge overlay */}
                <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, background: "linear-gradient(to top,rgba(13,33,55,.75),transparent)", padding: "24px 16px 10px" }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: ".16em", textTransform: "uppercase", color: m.color }}>{m.dept}</div>
                </div>
              </div>

              {/* Info */}
              <div style={{ padding: "20px 22px" }}>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 20, fontWeight: 500, color: "var(--ink)", marginBottom: 3, lineHeight: 1.2 }}>{m.name}</div>
                <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: ".1em", textTransform: "uppercase", color: "var(--teal)" }}>{m.role}</div>
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
