import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { ViewTransition } from "react";
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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    template: "%s - aXXo's website",
    default: "aXXo's website",
  },
  description:
    "Hey! I'm Charles. Although you may know me as aXXo. As of writing this, I'm a 20 year old living in the French province of Quebec (Canada). I've been doing independent software engineering and cybersecurity for almost 7 years now, although, nowadays, I spend most of my time in this space working on video projects and studying for university.",
  icons: {
    icon: "/favicon.ico",
  },
  manifest: "/manifest.json",
  applicationName: "aXXo's website",
  alternates: {
    canonical: "./",
  },
  keywords: [
    "reverse engineering",
    "reversing",
    "how to reverse engineer",

    "computer science",
    "computer science basics",
    "cs fundamentals",
    "compsci learn",
    "comp science tutorial",

    "game hacking",
    "game hack",
    "hack games",
    "game cheats",
    "game modding",
    "game mods",
    "how to hack games",
    "make game hacks",
    "minecraft game hacking",

    "JNI",
    "Java Native Interface",

    "low level programming",
    "assembly language basics",
    "binary analysis",
    "software cracking basics",
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
    description: "Computer science, cybersecurity, and engineering projects by aXXo.",
    images: ["/images/seo/og-image.webp"],
    creator: "@axxo1337",
  },
  openGraph: {
    type: "website",
    siteName: "aXXo's website",
    url: siteUrl,
    title: "aXXo's website",
    description:
      "Just some дебил with unrestricted access to a computer (No I do not make DVD rips). I mostly teach computer-science stuff, but I also have an interest in mathematics and engineering.",
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
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: "aXXo",
    url: siteUrl,
    sameAs: [
      "https://www.youtube.com/@axxo1337",
      "https://github.com/axxo1337",
      "https://www.reddit.com/r/aXXo/",
      "https://www.instagram.com/axxo1337",
    ],
    jobTitle: "Computer Science Educator & Content Creator",
  };

  return (
    <html lang="en">
      <body
        className={`${roboto.variable} antialiased flex flex-col items-center overflow-x-hidden relative min-h-screen before:content-[''] before:fixed before:inset-0 before:-z-50 before:bg-[url('/images/bliss.webp')] before:bg-center before:bg-cover before:bg-no-repeat before:pointer-events-none`}
      >
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
        <div className="px-2.5 md:px-5 lg:px-0 max-w-240 w-full">
          <Header />
          <ViewTransition>{children}</ViewTransition>
          <Footer />
        </div>
      </body>
    </html>
  );
}
