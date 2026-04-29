"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <nav
      style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "space-between",
        padding: "0 56px", height: 76,
        background: scrolled ? "rgba(8,15,26,.98)" : "rgba(13,33,55,.97)",
        backdropFilter: "blur(16px)",
        borderBottom: "1px solid rgba(0,153,204,.12)",
        transition: "background .35s ease",
      }}
    >
      {/* LOGO */}
      <Link href="/" onClick={scrollToTop} style={{ textDecoration: "none", cursor: "pointer" }}>
        <Image
          src="/logo-blue.png"
          alt="Whalen Financial"
          width={220}
          height={88}
          style={{ objectFit: "contain", height: 54, width: "auto" }}
          priority
        />
      </Link>

      {/* DESKTOP LINKS */}
      <ul style={{ display: "flex", gap: 30, listStyle: "none", alignItems: "center" }} className="nav-desktop">
        {[
          { label: "Services", href: "#what-we-do" },
          { label: "Money Prism", href: "#money-prism" },
          { label: "Why Whalen", href: "#comparison" },
          { label: "Our Team", href: "#team" },
          { label: "Client Experience", href: "#client-experience" },
          { label: "The Book", href: "#book" },
        ].map((l) => (
          <li key={l.label}>
            <a href={l.href} style={{
              fontSize: 11.5, fontWeight: 500, letterSpacing: ".09em",
              textTransform: "uppercase", color: "rgba(255,255,255,.72)",
              textDecoration: "none", transition: "color .2s",
            }}
              onMouseEnter={e => (e.currentTarget.style.color = "#0099CC")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.72)")}
            >{l.label}</a>
          </li>
        ))}
        <li>
          <Link href="/portal" style={{
            fontSize: 11.5, fontWeight: 500, letterSpacing: ".09em",
            textTransform: "uppercase", color: "rgba(255,255,255,.72)",
            textDecoration: "none", transition: "color .2s",
          }}
            onMouseEnter={e => (e.currentTarget.style.color = "#0099CC")}
            onMouseLeave={e => (e.currentTarget.style.color = "rgba(255,255,255,.72)")}
          >Client Login →</Link>
        </li>
        <li>
          <a href="https://calendly.com/confessions-of-a-wealth-manager/your-retirement-money-prism-diagnostic-clone" target="_blank" rel="noreferrer"
            style={{
              background: "#0099CC", color: "#fff", padding: "10px 20px",
              fontSize: 11, fontWeight: 600, letterSpacing: ".1em",
              borderRadius: 2, textDecoration: "none", transition: "background .2s",
              textTransform: "uppercase",
            }}
            onMouseEnter={e => (e.currentTarget.style.background = "#007fab")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0099CC")}
          >Schedule a Call</a>
        </li>
      </ul>

      {/* MOBILE HAMBURGER */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        style={{ display: "none", background: "none", border: "none", cursor: "pointer", padding: 8 }}
        className="nav-hamburger"
        aria-label="Menu"
      >
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
          <line x1="3" y1="6" x2="21" y2="6" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="3" y1="12" x2="21" y2="12" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
          <line x1="3" y1="18" x2="21" y2="18" stroke="white" strokeWidth="1.8" strokeLinecap="round"/>
        </svg>
      </button>

      {/* MOBILE MENU */}
      {mobileOpen && (
        <div style={{
          position: "fixed", top: 76, left: 0, right: 0,
          background: "rgba(8,15,26,.98)", padding: "24px 24px 32px",
          borderBottom: "1px solid rgba(0,153,204,.15)",
          display: "flex", flexDirection: "column", gap: 20,
        }}>
          {[
            { label: "Services", href: "#what-we-do" },
            { label: "Money Prism", href: "#money-prism" },
            { label: "Why Whalen", href: "#comparison" },
            { label: "Our Team", href: "#team" },
            { label: "Client Experience", href: "#client-experience" },
            { label: "The Book", href: "#book" },
          ].map((l) => (
            <a key={l.label} href={l.href} onClick={() => setMobileOpen(false)}
              style={{ fontSize: 13, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", textDecoration: "none" }}
            >{l.label}</a>
          ))}
          <Link href="/portal" onClick={() => setMobileOpen(false)}
            style={{ fontSize: 13, fontWeight: 500, letterSpacing: ".08em", textTransform: "uppercase", color: "rgba(255,255,255,.8)", textDecoration: "none" }}
          >Client Login →</Link>
          <a href="https://calendly.com/confessions-of-a-wealth-manager/your-retirement-money-prism-diagnostic-clone" target="_blank" rel="noreferrer"
            style={{ background: "#0099CC", color: "#fff", padding: "12px 24px", fontSize: 12, fontWeight: 600, letterSpacing: ".1em", borderRadius: 2, textDecoration: "none", textAlign: "center", textTransform: "uppercase" }}
          >Schedule a Call</a>
        </div>
      )}

      <style>{`
        @media(max-width:1100px){
          .nav-desktop{display:none!important}
          .nav-hamburger{display:block!important}
          nav{padding:0 24px!important}
        }
      `}</style>
    </nav>
  );
}
