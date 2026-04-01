export default function CTA() {
  return (
    <section id="cta" style={{ background: "var(--teal)", padding: "96px 56px", textAlign: "center" }}>
      <h2 style={{
        fontFamily: "var(--font-display)",
        fontSize: "clamp(40px,5vw,68px)",
        fontWeight: 300, color: "#fff", lineHeight: 1.1,
        letterSpacing: "-.01em", marginBottom: 18,
      }}>
        Ready to build a plan<br /><em style={{ fontStyle: "italic" }}>built around your life?</em>
      </h2>
      <p style={{ fontSize: 18, fontWeight: 300, color: "rgba(255,255,255,.85)", lineHeight: 1.7, maxWidth: 520, margin: "0 auto 40px" }}>
        Schedule a no-obligation discovery call. We&rsquo;ll listen to your goals and give you an honest picture of where you stand.
      </p>
      <div style={{ display: "flex", gap: 16, justifyContent: "center", flexWrap: "wrap" }}>
        <a href="https://calendly.com/whalenfinancial/discovery" target="_blank" rel="noreferrer" className="btn-white">
          Schedule a Discovery Call
        </a>
        <a href="tel:+18666003030" className="btn-ghost-white">
          (866) 600-3030
        </a>
      </div>

      <style>{`
        @media(max-width:640px){
          #cta{padding:72px 24px!important}
          #cta .cta-actions{flex-direction:column;align-items:center}
        }
      `}</style>
    </section>
  );
}
