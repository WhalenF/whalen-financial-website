import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Whalen Portal | Whalen Financial",
  robots: { index: false, follow: false },
};

const ORION_LOGIN_URL =
  "https://login.orionadvisor.com/login.html?g=2c1efb79-1e0c-4d35-913a-81c5ce4a58b0";

const TRUST_ITEMS = [
  {
    eyebrow: "VIEW",
    stat: "Account Balances",
    label: "Real-time portfolio values across all accounts",
  },
  {
    eyebrow: "TRACK",
    stat: "Performance",
    label: "Returns, allocations, and progress against your plan",
  },
  {
    eyebrow: "ACCESS",
    stat: "Statements",
    label: "Secure document vault with monthly and quarterly statements",
  },
];

export default function PortalPage() {
  return (
    <>
      <Nav />

      {/* Hero band */}
      <section
        id="portal-hero"
        style={{
          background: "#0a1829",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          position: "relative",
          overflow: "hidden",
          padding: "148px 56px 112px",
        }}
      >
        {/* Dark gradient overlay for depth */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(10,24,41,.82) 0%,rgba(10,24,41,.6) 60%,rgba(13,42,63,.7) 100%)",
            zIndex: 1,
          }}
        />

        {/* Radial teal glow */}
        <div
          style={{
            position: "absolute",
            top: "20%",
            right: "10%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle,rgba(0,153,204,.07) 0%,transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 780 }}>
          <div
            style={{
              fontSize: 12,
              fontWeight: 600,
              letterSpacing: ".18em",
              textTransform: "uppercase",
              color: "#0099CC",
              marginBottom: 20,
            }}
          >
            Whalen Portal
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(54px,6.5vw,92px)",
              fontWeight: 300,
              lineHeight: 1.04,
              color: "#fff",
              letterSpacing: "-.01em",
              marginBottom: 26,
            }}
          >
            Your wealth,
            <br />
            <em style={{ fontStyle: "italic", color: "#0099CC" }}>
              at your fingertips.
            </em>
          </h1>

          <p
            style={{
              fontSize: 19,
              fontWeight: 300,
              lineHeight: 1.72,
              color: "rgba(255,255,255,.8)",
              maxWidth: 620,
              marginBottom: 44,
            }}
          >
            Log in to your Whalen-branded Orion portal to view balances, track
            performance, access statements, and exchange secure messages with
            your advisor. Available 24/7 from any device.
          </p>

          <div
            style={{
              display: "flex",
              gap: 24,
              alignItems: "center",
              flexWrap: "wrap",
            }}
          >
            <a
              href={ORION_LOGIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
            >
              Log in to the Whalen Portal
            </a>
            <a
              href="mailto:clientservices@whalenfinancial.com"
              style={{
                fontSize: 14,
                fontWeight: 400,
                color: "rgba(255,255,255,.72)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(255,255,255,.2)",
                paddingBottom: 2,
                transition: "color .2s, border-color .2s",
              }}
              className="portal-help-link"
            >
              Need help logging in?
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip — 3-up portal capabilities */}
      <section
        id="portal-trust"
        style={{
          background: "var(--navy)",
          padding: "96px 56px",
          position: "relative",
          overflow: "hidden",
          borderTop: "1px solid rgba(255,255,255,.06)",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: "-40%",
            left: "50%",
            transform: "translateX(-50%)",
            width: 700,
            height: 700,
            background:
              "radial-gradient(circle,rgba(0,153,204,.10) 0%,transparent 70%)",
            pointerEvents: "none",
          }}
        />

        <div
          style={{
            position: "relative",
            zIndex: 2,
            maxWidth: 1100,
            margin: "0 auto",
          }}
        >
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3,1fr)",
              gap: 2,
            }}
            className="portal-trust-items"
          >
            {TRUST_ITEMS.map((item) => (
              <div
                key={item.stat}
                style={{
                  background: "rgba(255,255,255,.04)",
                  border: "1px solid rgba(255,255,255,.07)",
                  padding: "40px 28px",
                  textAlign: "center",
                }}
              >
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 600,
                    letterSpacing: ".18em",
                    textTransform: "uppercase",
                    color: "var(--teal)",
                    marginBottom: 16,
                  }}
                >
                  {item.eyebrow}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-display)",
                    fontSize: 32,
                    fontWeight: 300,
                    color: "#fff",
                    lineHeight: 1.1,
                    marginBottom: 12,
                  }}
                >
                  {item.stat}
                </div>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 300,
                    color: "rgba(255,255,255,.55)",
                    lineHeight: 1.7,
                  }}
                >
                  {item.label}
                </div>
              </div>
            ))}
          </div>
        </div>

        <style>{`
          .portal-trust-items{grid-template-columns:repeat(3,1fr)!important}
          @media(max-width:1100px){
            .portal-trust-items{grid-template-columns:1fr!important}
            #portal-hero{padding:130px 24px 88px!important}
            #portal-trust{padding:72px 24px!important}
          }
          .portal-help-link:hover{color:#0099CC!important;border-color:#0099CC!important}
        `}</style>
      </section>

      <Footer />
    </>
  );
}
