import Link from "next/link";
import Image from "next/image";
import SignOutButton from "./SignOutButton";

type AdminHeaderProps = {
  user: {
    email: string;
    name?: string;
  };
};

const NAV_ITEMS = [
  { label: "Dashboard", href: "/admin" },
  { label: "Referrals", href: "/admin/referrals" },
  { label: "Surveys", href: "/admin/surveys" },
  { label: "Jobs", href: "/admin/jobs" },
];

export default function AdminHeader({ user }: AdminHeaderProps) {
  return (
    <header
      style={{
        position: "sticky",
        top: 0,
        zIndex: 100,
        background: "rgba(13,33,55,.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,153,204,.18)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "0 40px",
        height: 72,
        gap: 32,
      }}
    >
      <Link
        href="/admin"
        style={{ textDecoration: "none", display: "flex", alignItems: "center" }}
      >
        <Image
          src="/logo-blue.png"
          alt="Whalen Financial"
          width={200}
          height={80}
          style={{ objectFit: "contain", height: 44, width: "auto" }}
          priority
        />
      </Link>

      <nav
        style={{
          display: "flex",
          gap: 28,
          alignItems: "center",
          flex: 1,
          justifyContent: "center",
        }}
      >
        {NAV_ITEMS.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            style={{
              fontSize: 12,
              fontWeight: 500,
              letterSpacing: ".09em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,.78)",
              textDecoration: "none",
              transition: "color .2s",
            }}
          >
            {item.label}
          </Link>
        ))}
      </nav>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 16,
        }}
      >
        <span
          style={{
            fontSize: 12,
            color: "rgba(255,255,255,.6)",
            letterSpacing: ".02em",
          }}
        >
          {user.email}
        </span>
        <SignOutButton />
      </div>
    </header>
  );
}
