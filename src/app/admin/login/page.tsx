import type { Metadata } from "next";
import Image from "next/image";
import { signIn } from "@/auth";

export const metadata: Metadata = {
  title: "Sign In | Whalen Admin",
  robots: { index: false, follow: false },
};

export default function AdminLoginPage() {
  async function signInWithMicrosoft() {
    "use server";
    await signIn("microsoft-entra-id", { redirectTo: "/admin" });
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#0a1829",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        fontFamily: "var(--font-body)",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 440,
          background: "#ffffff",
          borderRadius: 4,
          padding: "48px 40px",
          boxShadow: "0 24px 64px rgba(0,0,0,.35)",
          textAlign: "center",
        }}
      >
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 28 }}>
          <Image
            src="/logo-blue.png"
            alt="Whalen Financial"
            width={220}
            height={88}
            style={{ objectFit: "contain", height: 64, width: "auto" }}
            priority
          />
        </div>

        <h1
          style={{
            fontFamily: "var(--font-display)",
            fontSize: 28,
            fontWeight: 500,
            color: "#1a2535",
            margin: "0 0 8px",
            letterSpacing: ".005em",
          }}
        >
          Whalen Admin
        </h1>
        <p
          style={{
            fontSize: 14,
            color: "#607a8f",
            margin: "0 0 32px",
            lineHeight: 1.55,
          }}
        >
          Sign in to manage referrals, surveys, and job postings.
        </p>

        <form action={signInWithMicrosoft}>
          <button
            type="submit"
            style={{
              width: "100%",
              background: "#0099CC",
              color: "#ffffff",
              border: "none",
              padding: "16px 24px",
              fontSize: 13,
              fontWeight: 600,
              letterSpacing: ".1em",
              textTransform: "uppercase",
              borderRadius: 2,
              cursor: "pointer",
              transition: "background .2s, transform .2s",
              fontFamily: "var(--font-body)",
            }}
          >
            Sign in with Microsoft
          </button>
        </form>

        <p
          style={{
            fontSize: 12,
            color: "#8fa3b3",
            margin: "24px 0 0",
            lineHeight: 1.55,
          }}
        >
          Whalen Financial team members only — sign in with your
          @whalenfinancial.com Microsoft account.
        </p>
      </div>
    </div>
  );
}
