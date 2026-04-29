import { signOut } from "@/auth";

export default function SignOutButton() {
  async function handleSignOut() {
    "use server";
    await signOut({ redirectTo: "/" });
  }

  return (
    <form action={handleSignOut} style={{ margin: 0 }}>
      <button
        type="submit"
        style={{
          background: "transparent",
          color: "rgba(255,255,255,.78)",
          border: "1px solid rgba(255,255,255,.22)",
          padding: "8px 16px",
          fontSize: 11,
          fontWeight: 500,
          letterSpacing: ".09em",
          textTransform: "uppercase",
          borderRadius: 2,
          cursor: "pointer",
          transition: "color .2s, border-color .2s",
          fontFamily: "var(--font-body)",
        }}
      >
        Sign out
      </button>
    </form>
  );
}
