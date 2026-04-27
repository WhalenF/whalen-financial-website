export default function TrustBar() {
  const logos = [
    { alt: "Inc.", src: "https://assets.cdn.filesafe.space/Qv2BQcwLXnadkgGYT0P1/media/69649914f8a93bd66fe4ced5.png", height: 28 },
    { alt: "AdvisorHub", src: "https://assets.cdn.filesafe.space/Qv2BQcwLXnadkgGYT0P1/media/69649914c7683b144fc2d467.png", height: 22 },
    { alt: "Forbes Finance Council", src: "https://assets.cdn.filesafe.space/Qv2BQcwLXnadkgGYT0P1/media/6964991498efbd6f1a0907f8.png", height: 36 },
    { alt: "Kiplinger", src: "https://cdn.mos.cms.futurecdn.net/flexiimages/c9yj8luxnb1764668254.svg", height: 24 },
  ];

  return (
    <div id="trust" style={{
      background: "var(--warm)",
      borderBottom: "1px solid var(--rule)",
      padding: "22px 56px",
      display: "flex", alignItems: "center", justifyContent: "center",
      gap: 40, flexWrap: "wrap",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: ".2em",
        textTransform: "uppercase", color: "var(--text-soft)", whiteSpace: "nowrap", flexShrink: 0,
      }}>Recognized by</div>
      <div style={{ width: 1, height: 26, background: "var(--rule)", flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
        {logos.map((logo) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={logo.alt}
            src={logo.src}
            alt={logo.alt}
            height={logo.height}
            style={{ height: logo.height, width: "auto", objectFit: "contain", filter: "grayscale(100%)", opacity: 0.55 }}
          />
        ))}
      </div>
      <style>{`@media(max-width:1100px){#trust{padding:18px 24px!important;gap:18px!important}}`}</style>
    </div>
  );
}
