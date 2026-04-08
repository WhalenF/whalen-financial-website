"use client";

import Reveal from "./RevealOnScroll";
import reviewsData from "../../content/reviews.json";

const reviews = reviewsData.reviews;

// Duplicate for seamless loop
const doubled = [...reviews, ...reviews];

export default function Reviews() {
  return (
    <section id="reviews" style={{ background: "var(--page)", padding: "112px 0 112px" }}>
      <div style={{ padding: "0 56px", textAlign: "center", marginBottom: 56 }}>
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
            <div style={{ display: "flex", gap: 1 }}>
              {[1,2,3,4].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>)}
              <span style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
            </div>
            <span style={{ fontSize: 13, fontWeight: 500, color: "var(--ink)" }}>4.7</span>
            <span style={{ fontSize: 13, color: "var(--text-soft)" }}>· 29 Google Reviews</span>
          </div>
        </Reveal>
      </div>

      {/* Video Testimonials */}
      <div style={{ padding: "0 56px", marginBottom: 56 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, maxWidth: 960, margin: "0 auto" }} className="video-testimonials">
          {[
            { name: "Enstin", label: "Client Testimonial", src: "/testimonials/enstin.mp4" },
            { name: "Perelli", label: "Client Testimonial", src: "/testimonials/perelli.mp4" },
          ].map((v) => (
            <Reveal key={v.name} variant="scale">
              <div style={{ borderRadius: 6, overflow: "hidden", background: "var(--card)", border: "1px solid var(--rule)", boxShadow: "var(--shadow)" }}>
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  style={{ width: "100%", display: "block", aspectRatio: "16/9", objectFit: "cover" }}
                >
                  <source src={v.src} type="video/mp4" />
                </video>
                <div style={{ padding: "16px 20px", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--teal-dim)", border: "1px solid var(--teal-border)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 13, fontWeight: 600, color: "var(--teal)", flexShrink: 0 }}>
                    {v.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--ink)" }}>{v.name}</div>
                    <div style={{ fontSize: 12, color: "var(--text-soft)", marginTop: 1 }}>{v.label}</div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>

      {/* Scrolling marquee */}
      <Reveal>
        <div style={{ position: "relative", overflow: "hidden", width: "100%" }}>
          {/* Fade left edge */}
          <div style={{ position: "absolute", left: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to right, var(--page), transparent)", zIndex: 2, pointerEvents: "none" }} />
          {/* Fade right edge */}
          <div style={{ position: "absolute", right: 0, top: 0, bottom: 0, width: 120, background: "linear-gradient(to left, var(--page), transparent)", zIndex: 2, pointerEvents: "none" }} />

          <div className="reviews-track">
            {doubled.map((r, i) => (
              <div key={i} className="review-card" style={{
                width: 360,
                flexShrink: 0,
                background: "var(--card)",
                borderRadius: 4,
                padding: "32px 28px",
                boxShadow: "var(--shadow)",
                border: "1px solid var(--rule)",
                display: "flex",
                flexDirection: "column",
                gap: 14,
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <div style={{ display: "flex", gap: 3 }}>
                    {[1,2,3,4,5].map(s => <span key={s} style={{ color: "#f59e0b", fontSize: 16 }}>★</span>)}
                  </div>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ opacity: 0.35 }}>
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                  </svg>
                </div>
                <div style={{ fontFamily: "var(--font-display)", fontSize: 17, fontWeight: 300, fontStyle: "italic", color: "var(--ink)", lineHeight: 1.65, flex: 1 }}>
                  &ldquo;{r.text}&rdquo;
                </div>
                <div style={{ fontSize: 13, fontWeight: 500, color: "var(--text-soft)", paddingTop: 10, borderTop: "1px solid var(--rule)", display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 34, height: 34, borderRadius: "50%", background: "var(--card-alt)", border: "1px solid var(--rule)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 600, color: "var(--teal)", flexShrink: 0 }}>
                    {r.initials}
                  </div>
                  <div>
                    <strong style={{ color: "var(--ink)", fontSize: 14 }}>{r.name}</strong>
                    <div style={{ fontSize: 12, marginTop: 1 }}>{r.location}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Reveal>

      <style>{`
        #reviews { padding-left: 0 !important; padding-right: 0 !important; }
        @media(max-width:640px){ .video-testimonials{grid-template-columns:1fr!important} }
        .reviews-track {
          display: flex;
          gap: 16px;
          width: max-content;
          padding: 16px 0 20px;
          animation: scroll-right 50s linear infinite;
        }
        .reviews-track:hover {
          animation-play-state: paused;
        }
        @keyframes scroll-right {
          0%   { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        @media(max-width:640px){
          .review-card { width: 300px !important; }
        }
      `}</style>
    </section>
  );
}
