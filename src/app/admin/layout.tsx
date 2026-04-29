import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import AdminHeader from "./_components/AdminHeader";

export const metadata: Metadata = {
  title: {
    template: "%s | Whalen Admin",
    default: "Whalen Admin",
  },
  robots: { index: false, follow: false },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Defensive guard — middleware should have already redirected.
  if (!session?.user) {
    redirect("/admin/login");
  }

  const user = {
    email: session.user.email ?? "",
    name: session.user.name ?? undefined,
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f1ec",
        fontFamily: "var(--font-body)",
        color: "var(--text)",
      }}
    >
      <AdminHeader user={user} />
      <main
        style={{
          maxWidth: 1280,
          margin: "0 auto",
          padding: "32px 40px 64px",
        }}
      >
        {children}
      </main>
    </div>
  );
}
