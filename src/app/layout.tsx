import type { Metadata, Viewport } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ViewTransition } from "react";
import { Toaster } from "@/components/ui/sonner";
import JsonLd from "@/components/ui/JsonLd";
import ServiceWorkerRegister from "@/components/layout/ServiceWorkerRegister";
import { getRootJsonLd } from "@/lib/server/jsonld";
import "./globals.css";

//
// [SECTION] Defines
//

const roboto = Roboto({
  weight: ["400", "500", "700"],
  variable: "--font-roboto",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://axxowastaken.me";

export const viewport: Viewport = {
  themeColor: "#0c0c0c",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s - aXXo's website",
    default: "aXXo's website",
  },
  description:
    "Charles (aXXo) — Independent software engineer and educator sharing projects, reverse engineering, Windows internals, and computer science tutorials.",
  icons: {
    icon: "/favicon.ico",
    apple: "/images/icons/apple-touch-icon.png",
  },
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "aXXo",
  },
  applicationName: "aXXo's website",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "reverse engineering",
    "Windows internals",
    "game hacking",
    "low level programming",
    "cybersecurity",
    "assembly language",
    "binary analysis",
    "Java Native Interface",
    "computer science fundamentals",
    "memory forensics",
  ],
  authors: [
    {
      name: "aXXo",
      url: siteUrl,
    },
  ],
  creator: "aXXo",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  twitter: {
    card: "summary_large_image",
    title: "aXXo's website",
    description:
      "Charles (aXXo) — Computer science, cybersecurity, and software engineering projects.",
    images: ["/images/seo/og-image.webp"],
    creator: "@axxo1337",
  },
  openGraph: {
    type: "website",
    siteName: "aXXo's website",
    url: siteUrl,
    title: "aXXo's website",
    description:
      "Charles (aXXo) — Computer science, cybersecurity, and software engineering projects and tutorials.",
    images: [
      {
        url: "/images/seo/og-image.webp",
        width: 1200,
        height: 630,
        alt: "aXXo's website banner",
        type: "image/webp",
      },
    ],
    locale: "en_US",
  },
};

//
// [SECTION] Content
//

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased flex flex-col items-center overflow-x-hidden relative min-h-screen before:content-[''] before:fixed before:inset-0 before:-z-50 before:bg-[url('/images/bliss.webp')] before:bg-center before:bg-cover before:bg-no-repeat before:pointer-events-none`}
      >
        <JsonLd schema={getRootJsonLd()} />
        <div className="px-2.5 md:px-5 lg:px-0 max-w-240 w-full">
          <Header />
          <ViewTransition>{children}</ViewTransition>
          <Footer />
        </div>
        <Toaster />
        <ServiceWorkerRegister />
      </body>
    </html>
  );
}
