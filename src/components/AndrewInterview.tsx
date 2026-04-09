import Reveal from "./RevealOnScroll";

export default function AndrewInterview() {
  return (
    <section style={{ background: "var(--navy)", padding: "72px 56px 80px", textAlign: "center" }}>
      <Reveal variant="blur">
        <div className="sec-eyebrow center" style={{ color: "var(--teal)" }}>Meet Andrew</div>
      </Reveal>
      <Reveal delay="d1">
        <h2 style={{ fontFamily: "var(--font-display)", fontSize: "clamp(30px,3.5vw,48px)", fontWeight: 300, color: "#fff", lineHeight: 1.15, marginBottom: 12 }}>
          Why we do what we do
        </h2>
      </Reveal>
      <Reveal delay="d2">
        <p style={{ fontSize: 16, fontWeight: 300, color: "rgba(255,255,255,.55)", maxWidth: 480, margin: "0 auto 36px", lineHeight: 1.75 }}>
          A candid conversation with Andrew Whalen on wealth management, retirement, and building a firm that puts clients first.
        </p>
      </Reveal>
      <Reveal variant="scale" delay="d2">
        <div style={{
          position: "relative",
          width: "min(600px, 100%)",
          margin: "0 auto",
          borderRadius: 6,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,.45)",
          border: "1px solid rgba(255,255,255,.08)",
          aspectRatio: "16/9",
          background: "#0a1829",
        }}>
          <iframe
            src="https://www.youtube.com/embed/WXynoZta9UI?controls=1&rel=0&modestbranding=1"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: "none" }}
            title="Andrew Whalen Interview"
          />
        </div>
      </Reveal>

      <style>{`
        @media(max-width:768px){
          #andrew-interview,section:has(.andrew-interview-inner){padding:56px 24px 64px!important}
        }
      `}</style>
    </section>
  );
}
