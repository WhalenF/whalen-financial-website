const SOCIALS = [
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/company/whalen-financial",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.95v5.66H9.36V9h3.41v1.56h.05c.47-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28zM5.34 7.43a2.06 2.06 0 110-4.13 2.06 2.06 0 010 4.13zM7.12 20.45H3.56V9h3.56v11.45zM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0z" />
      </svg>
    ),
  },
  {
    name: "Facebook",
    href: "https://www.facebook.com/WhalenFinancial/",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07c0 6.02 4.39 11.01 10.13 11.93v-8.44H7.08v-3.5h3.05V9.41c0-3.03 1.79-4.7 4.53-4.7 1.31 0 2.69.24 2.69.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.5h-2.8V24C19.61 23.08 24 18.09 24 12.07z" />
      </svg>
    ),
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/whalenfinancial/",
    svg: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.63a5.84 5.84 0 00-2.12 1.38A5.84 5.84 0 00.63 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12c0 3.26.01 3.67.07 4.95.06 1.27.26 2.15.56 2.91.31.8.74 1.48 1.38 2.12a5.84 5.84 0 002.12 1.38c.76.3 1.64.5 2.91.56C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.56a5.84 5.84 0 002.12-1.38 5.84 5.84 0 001.38-2.12c.3-.76.5-1.64.56-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.56-2.91a5.84 5.84 0 00-1.38-2.12A5.84 5.84 0 0019.86.63C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0zm0 5.84a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm6.41-10.4a1.44 1.44 0 100-2.88 1.44 1.44 0 000 2.88z" />
      </svg>
    ),
  },
];

export default function SocialStrip() {
  return (
    <section
      id="social-strip"
      style={{
        background: "var(--card-alt)",
        padding: "88px 56px",
        textAlign: "center",
        borderTop: "1px solid var(--rule)",
      }}
    >
      <div className="sec-eyebrow center" style={{ color: "var(--teal)", justifyContent: "center" }}>
        Stay connected
      </div>
      <h2
        style={{
          fontFamily: "var(--font-display)",
          fontSize: "clamp(34px,4vw,54px)",
          fontWeight: 300,
          color: "var(--ink)",
          lineHeight: 1.1,
          margin: "0 0 36px",
          letterSpacing: "-.005em",
        }}
      >
        Follow <em style={{ fontStyle: "italic", color: "var(--teal)" }}>us</em>.
      </h2>

      <div style={{ display: "flex", justifyContent: "center", gap: 18, flexWrap: "wrap" }}>
        {SOCIALS.map((s) => (
          <a
            key={s.name}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.name}
            className="social-btn"
            style={{
              width: 54,
              height: 54,
              borderRadius: "50%",
              border: "1px solid var(--rule)",
              background: "var(--card)",
              color: "var(--ink)",
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "color .2s, border-color .2s, transform .2s, box-shadow .2s",
              textDecoration: "none",
            }}
          >
            {s.svg}
          </a>
        ))}
      </div>

      <style>{`
        .social-btn:hover{
          color: var(--teal) !important;
          border-color: var(--teal) !important;
          transform: translateY(-2px);
          box-shadow: 0 0 0 4px rgba(0,153,204,.12), 0 8px 24px rgba(0,153,204,.18);
        }
        @media(max-width:1100px){
          #social-strip{padding:64px 24px!important}
        }
      `}</style>
    </section>
  );
}
