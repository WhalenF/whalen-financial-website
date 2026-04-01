import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "WHALEN — Wealth Management Built for Life",
  description:
    "WHALEN is a digital-first wealth management firm serving families nationwide. Investment management, retirement income planning, tax strategy, estate planning, and asset protection — in one integrated plan.",
  keywords:
    "wealth management, retirement planning, financial advisor, retirement income planning, tax planning, estate planning, investment management, Las Vegas financial advisor, virtual financial advisor, Money Prism strategy",
  openGraph: {
    type: "website",
    siteName: "WHALEN Financial",
    title: "WHALEN — Wealth Management Built for Life",
    description:
      "A digital-first wealth management firm serving families nationwide. Investment management, retirement income planning, tax strategy, estate planning, and asset protection — in one integrated plan.",
    url: "https://whalenfinancial.com/",
    images: [{ url: "https://whalenfinancial.com/og-image.jpg", width: 1200, height: 630 }],
  },
  twitter: {
    card: "summary_large_image",
    site: "@whalenfinancial",
    title: "WHALEN — Wealth Management Built for Life",
    description:
      "A digital-first wealth management firm. Investment management, retirement income, tax planning, estate planning, and asset protection — one integrated plan, built around your life.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=DM+Sans:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
