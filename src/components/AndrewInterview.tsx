import Reveal from "./RevealOnScroll";

export default function AndrewInterview() {
  return (
    <section style={{ background: "var(--navy)", padding: "56px 56px 64px", textAlign: "center" }}>
      <Reveal variant="scale">
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
          section:has(iframe[title="Andrew Whalen Interview"]){padding:40px 24px 48px!important}
        }
      `}</style>
    </section>
  );
}
