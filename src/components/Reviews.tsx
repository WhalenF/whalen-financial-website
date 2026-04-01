import Reveal from "./RevealOnScroll";

const reviews = [
  {
    text: "Professionalism at its finest. Whalen Financial is like a financial Costco. It's a one stop shop with everything you need AND personality plus.",
    initials: "HP", name: "Holly Pribyl", location: "Client, Las Vegas",
  },
  {
    text: "It takes a special firm and a special team to have a happy client all the way in Florida. At Whalen Financial, I don't feel like \"just\" a client…they make me feel like family.",
    initials: "Li", name: "Lianne", location: "Client, Florida",
  },
  {
    text: "This is actually the fourth financial advisor I've gone to and I finally found the right fit for our family. The entire staff is professional, courteous, and most importantly informative.",
    initials: "JM", name: "John Mangani", location: "Client, Las Vegas",
  },
  {
    text: "After all of these years, a friend recommended Whalen Financial. We first met Nancy, Director of First Impressions — a delight. When we met Andrew Whalen, we knew we had found the right team.",
    initials: "JD", name: "John DiFiore", location: "Client, Las Vegas, NV",
  },
  {
    text: "Whalen Financial is an incredible, all-inclusive estate planning company. From Nancy's warm greeting to CEO Andrew Whalen — you will be hard pressed to find a team like this anywhere.",
    initials: "TO", name: "Trevor Otsuka", location: "Client, Las Vegas, NV",
  },
  {
    text: "Al Whalen takes the stress out of filing taxes and truly cares about his clients. He goes the extra mile. Everyone at his office has been extremely friendly, professional, and helpful.",
    initials: "JL", name: "Jeff LaGesse", location: "Client, Las Vegas, NV",
  },
  {
    text: "The Whalen Group is very professional and informing. Nancy will always call and leave a reminder for upcoming appointments. Very warm and positive welcome. Andrew is always ready to offer his expertise as well as offering his associates' inputs.",
    initials: "GY", name: "Greg Yonai", location: "Client, Las Vegas",
  },
];

const delays = ["", "d1", "d2", "d3", "d4", "d5", "d6"];

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

        {/* Google aggregate badge */}
        <Reveal delay="d3">
          <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginTop: 24, padding: "10px 20px", background: "var(--card)", border: "1px solid var(--rule)", borderRadius: 4, boxShadow: "var(--shadow)" }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div style={{ display: "flex", gap: 2 }}>
              {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>5.0</span>
            <span style={{ fontSize: 13, color: "var(--text-soft)" }}>· Google Reviews</span>
          </div>
        </Reveal>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 16, maxWidth: 1100, margin: "0 auto" }} className="reviews-grid">
        {reviews.map((r, i) => (
          <Reveal key={r.initials + i} variant="scale" delay={delays[i % 7] as any}>
            <div style={{
              background: "var(--card)", borderRadius: 4, padding: "36px 32px",
              boxShadow: "var(--shadow)", border: "1px solid var(--rule)",
              display: "flex", flexDirection: "column", gap: 16, height: "100%",
            }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <div style={{ display: "flex", gap: 3 }}>
                  {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 17 }}>★</span>)}
                </div>
                {/* Google G */}
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
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
