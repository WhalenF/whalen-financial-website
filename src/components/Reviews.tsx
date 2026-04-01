import Reveal from "./RevealOnScroll";

const reviews = [
  {
    text: "For the first time in my life, I actually understand where my money is going and why. The One Page Plan changed everything — I can see my whole financial picture at a glance.",
    initials: "RH", name: "Robert H.", location: "Retired, Las Vegas",
  },
  {
    text: "We came in worried about running out of money in retirement. After meeting with Whalen, we left with a plan and real peace of mind. The Money Prism framework made it all click.",
    initials: "ML", name: "Mary & Larry T.", location: "Pre-Retirees, Arizona",
  },
  {
    text: "I was skeptical about a virtual firm, but it's been seamless. My advisor knows my situation better than any advisor I've had in person. The proactive updates are a game changer.",
    initials: "SK", name: "Susan K.", location: "Business Owner, Texas",
  },
];

export default function Reviews() {
  return (
    <section id="reviews" style={{ background: "var(--page)", padding: "112px 56px" }}>
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <Reveal><div className="sec-eyebrow center">Client Stories</div></Reveal>
        <Reveal delay="d1">
          <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(38px,4vw,60px)", fontWeight: 300, lineHeight: 1.1, color: "var(--ink)", textAlign: "center", letterSpacing: "-.01em" }}>
            Read our latest <em style={{ fontStyle: "italic", color: "var(--teal)" }}>reviews.</em>
          </h2>
        </Reveal>
        <Reveal delay="d2">
          <p style={{ fontSize: 17, fontWeight: 300, color: "var(--text-mid)", maxWidth: 500, margin: "16px auto 0", lineHeight: 1.8 }}>
            Don&rsquo;t take our word for it — hear from the families we serve.
          </p>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" }} className="reviews-grid">
        {reviews.map((r, i) => (
          <Reveal key={r.initials} variant="scale" delay={["","d1","d2"][i] as any}>
            <div style={{
              background: "var(--card)", borderRadius: 4, padding: "36px 32px",
              boxShadow: "var(--shadow)", border: "1px solid var(--rule)",
              display: "flex", flexDirection: "column", gap: 16, height: "100%",
            }}>
              <div style={{ display: "flex", gap: 4 }}>
                {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 18 }}>★</span>)}
              </div>
              <div style={{ fontFamily: "var(--font-display)", fontSize: 19, fontWeight: 300, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.6, flex: 1 }}>
                &ldquo;{r.text}&rdquo;
              </div>
              <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-soft)", paddingTop: 12, borderTop: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 10 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--card-alt)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "var(--teal)", flexShrink: 0 }}>
                  {r.initials}
                </div>
                <div>
                  <strong style={{ color: "var(--ink)", fontSize: 14 }}>{r.name}</strong>
                  <div style={{ fontSize: 12, marginTop: 2 }}>{r.location}</div>
                </div>
              </div>
            </div>
          </Reveal>
        ))}
      </div>

      <style>{`
        @media(max-width:1100px){
          .reviews-grid{grid-template-columns:1fr 1fr!important}
          #reviews{padding:80px 24px!important}
        }
        @media(max-width:640px){
          .reviews-grid{grid-template-columns:1fr!important}
        }
      `}</style>
    </section>
  );
}
