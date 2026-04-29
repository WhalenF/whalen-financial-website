"use client";

import { useEffect, useRef, useState } from "react";

function CountUp({ to, duration = 1100, delay = 880 }: { to: number; duration?: number; delay?: number }) {
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (started.current) return;
      started.current = true;
      const startTime = performance.now();
      const tick = (now: number) => {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        // Ease-out quart: starts fast, decelerates nicely at the end
        const eased = 1 - Math.pow(1 - progress, 4);
        setValue(Math.round(eased * to));
        if (progress < 1) requestAnimationFrame(tick);
        else setValue(to);
      };
      requestAnimationFrame(tick);
    }, delay);
    return () => clearTimeout(timeout);
  }, [to, duration, delay]);

  return <>{value}</>;
}

export default function Hero() {
  return (
    <section id="hero" style={{
      minHeight: "100vh",
      background: "#0a1829",
      display: "flex", flexDirection: "column", justifyContent: "center",
      position: "relative", overflow: "hidden",
      padding: "148px 56px 96px",
    }}>
      {/* Hero Video Background — Vercel Blob */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", zIndex: 0 }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          poster="/hero-bg-poster.jpg"
          src="https://cum8xbv9knswgukd.public.blob.vercel-storage.com/Meet%20Whalen%20Financial.mp4"
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.45,
          }}
        />
      </div>

      {/* Dark overlay */}
      <div style={{
        position: "absolute", inset: 0,
        background: "linear-gradient(135deg,rgba(10,24,41,.82) 0%,rgba(10,24,41,.6) 60%,rgba(13,42,63,.7) 100%)",
        zIndex: 1,
      }}/>

      {/* Radial glow */}
      <div style={{
        position: "absolute", top: "20%", right: "10%", width: 600, height: 600,
        background: "radial-gradient(circle,rgba(0,153,204,.07) 0%,transparent 70%)",
        pointerEvents: "none", zIndex: 1,
      }}/>

      <div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
        <h1 style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(54px,6.5vw,92px)",
          fontWeight: 300, lineHeight: 1.04,
          color: "#fff", letterSpacing: "-.01em",
          marginBottom: 26,
        }}
          className="animate-fade-up delay-150"
        >
          Your wealth,<br />
          <em style={{ fontStyle: "italic", color: "#0099CC" }}>organized for life.</em>
          <span className="hero-cursor">|</span>
        </h1>

        <p style={{
          fontSize: 19, fontWeight: 300, lineHeight: 1.72,
          color: "rgba(255,255,255,.8)", maxWidth: 560, marginBottom: 44,
        }}
          className="animate-fade-up delay-320"
        >
          <strong style={{ color: "#0099CC" }}>WHALEN</strong>{" "}is a digital-first wealth management firm serving families nationwide. Investment management, retirement income, tax planning, estate planning, and asset protection, in one integrated plan built around your life.
        </p>

        <div style={{ display: "flex", gap: 16, alignItems: "center", flexWrap: "wrap" }}
          className="animate-fade-up delay-500"
        >
          <a href="https://calendly.com/confessions-of-a-wealth-manager/your-retirement-money-prism-diagnostic-clone" target="_blank" rel="noreferrer" className="btn-primary">
            Schedule a Discovery Call
          </a>
          <a href="#comparison" className="btn-ghost">
            See What Makes Us Different
          </a>
        </div>
      </div>

      {/* Stats */}
      <div style={{
        position: "absolute", bottom: 56, left: "50%", transform: "translateX(-50%)", zIndex: 2,
        display: "flex", gap: 64,
      }}
        className="animate-fade-up delay-800 hero-stats"
      >
        {[
          { to: 50, sup: "+", label: "Years of Experience" },
          { to: 5,  sup: "",  label: "Planning Disciplines" },
          { to: 1,  sup: "",  label: "Integrated Plan" },
        ].map((s) => (
          <div key={s.label} style={{ textAlign: "center" }}>
            <div style={{
              fontFamily: s.to === 1 ? "var(--font-body)" : "var(--font-display)",
              fontSize: 44, fontWeight: 300, color: "#fff", lineHeight: 1,
            }}>
              <CountUp to={s.to} />
              <span style={{ color: "#0099CC" }}>{s.sup}</span>
            </div>
            <div style={{
              fontSize: 11, fontWeight: 500, letterSpacing: ".11em",
              textTransform: "uppercase", color: "rgba(255,255,255,.42)", marginTop: 5,
            }}>{s.label}</div>
          </div>
        ))}
      </div>

      <style>{`
        @media(max-width:1100px){
          .hero-stats{display:none!important}
          #hero{padding:130px 24px 80px!important}
        }
        .hero-cursor {
          display: inline-block;
          color: #0099CC;
          font-style: normal;
          font-weight: 300;
          margin-left: 4px;
          animation: blink-cursor 1.1s step-end infinite;
        }
        @keyframes blink-cursor {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
