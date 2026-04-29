import type { Metadata } from "next";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import SurveyForm from "./SurveyForm";
import ReferralForm from "./ReferralForm";
import SocialStrip from "./SocialStrip";

export const metadata: Metadata = {
  title: "Welcome to Whalen | Whalen Financial",
  robots: { index: false, follow: false },
};

export default function WelcomePage() {
  return (
    <>
      <Nav />

      {/* Welcome Hero band */}
      <section
        id="welcome-hero"
        style={{
          background: "#0a1829",
          padding: "148px 56px 96px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Dark gradient overlay echo */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background:
              "linear-gradient(135deg,rgba(10,24,41,.92) 0%,rgba(10,24,41,.7) 60%,rgba(13,42,63,.78) 100%)",
            zIndex: 1,
          }}
        />
        {/* Radial glow */}
        <div
          style={{
            position: "absolute",
            top: "10%",
            right: "8%",
            width: 600,
            height: 600,
            background:
              "radial-gradient(circle,rgba(0,153,204,.07) 0%,transparent 70%)",
            pointerEvents: "none",
            zIndex: 1,
          }}
        />

        <div style={{ position: "relative", zIndex: 2, maxWidth: 820, margin: "0 auto" }}>
          <div
            className="sec-eyebrow"
            style={{ color: "var(--teal)", justifyContent: "flex-start" }}
          >
            Welcome to Whalen
          </div>

          <h1
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(46px,5.5vw,82px)",
              fontWeight: 300,
              lineHeight: 1.04,
              color: "#fff",
              letterSpacing: "-.01em",
              marginBottom: 26,
            }}
          >
            Glad to have you{" "}
            <em style={{ fontStyle: "italic", color: "#0099CC" }}>with us.</em>
          </h1>

          <p
            style={{
              fontSize: 19,
              fontWeight: 300,
              lineHeight: 1.72,
              color: "rgba(255,255,255,.8)",
              maxWidth: 640,
            }}
          >
            Two short things — your feedback shapes how we welcome the next person who joins us. And there&rsquo;s a place at the bottom to refer anyone you think we should meet.
          </p>
        </div>

        <style>{`
          @media(max-width:1100px){
            #welcome-hero{padding:130px 24px 72px!important}
          }
        `}</style>
      </section>

      {/* Survey */}
      <SurveyForm />

      {/* Divider + section header */}
      <section
        style={{
          background: "var(--page)",
          padding: "72px 56px 16px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            maxWidth: 820,
            margin: "0 auto",
            borderTop: "1px solid var(--rule)",
            paddingTop: 56,
          }}
        >
          <div
            className="sec-eyebrow center"
            style={{ color: "var(--teal)" }}
          >
            Pay it forward
          </div>
          <h2
            style={{
              fontFamily: "var(--font-display)",
              fontSize: "clamp(34px,4vw,54px)",
              fontWeight: 300,
              lineHeight: 1.1,
              color: "var(--ink)",
              letterSpacing: "-.005em",
            }}
          >
            Know someone who should{" "}
            <em style={{ fontStyle: "italic", color: "var(--teal)" }}>meet us?</em>
          </h2>
        </div>
      </section>

      {/* Referral */}
      <ReferralForm />

      {/* Social */}
      <SocialStrip />

      <Footer />
    </>
  );
}
