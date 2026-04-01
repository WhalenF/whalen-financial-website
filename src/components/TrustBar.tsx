export default function TrustBar() {
  const items = [
    "Forbes Finance Council",
    "Kiplinger",
    "Inc. 5000",
  ];

  return (
    <div id="trust" style={{
      background: "var(--warm)",
      borderBottom: "1px solid var(--rule)",
      padding: "22px 56px",
      display: "flex", alignItems: "center",
      gap: 40, flexWrap: "wrap",
    }}>
      <div style={{
        fontSize: 10, fontWeight: 600, letterSpacing: ".2em",
        textTransform: "uppercase", color: "var(--text-soft)", whiteSpace: "nowrap", flexShrink: 0,
      }}>Recognized by</div>
      <div style={{ width: 1, height: 26, background: "var(--rule)", flexShrink: 0 }} />
      <div style={{ display: "flex", alignItems: "center", gap: 36, flexWrap: "wrap" }}>
        {items.map((item) => (
          <div key={item} style={{
            fontSize: 14, fontWeight: 400, color: "var(--text-mid)",
            display: "flex", alignItems: "center", gap: 8,
          }}>
            <div style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--teal)", flexShrink: 0 }} />
            {item}
          </div>
        ))}
      </div>
      <style>{`@media(max-width:1100px){#trust{padding:18px 24px!important;gap:18px!important}}`}</style>
    </div>
  );
}
