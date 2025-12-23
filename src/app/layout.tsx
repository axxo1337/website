import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import "./globals.css";
import "katex/dist/katex.min.css";

//
// [SECTION] Defines
//

const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    template: "%s - aXXo's website",
    default: "aXXo's website",
  },
  description:
    "Just some дебил with unrestricted access to a computer (No I do not make DVD rips). I mostly teach computer-science stuff, but I also have an interest in mathematics and engineering.",
  applicationName: "aXXo's website",
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
    "mincraft game hacking",

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
      // , url: "https://axxowastaken.me/about-me"
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
  openGraph: {
    type: "website",
    siteName: "aXXo's website",
    url: "https://axxowastaken.me",
    title: "aXXo's website",
    description:
      "Just some дебил with unrestricted access to a computer (No I do not make DVD rips). I mostly teach computer-science stuff, but I also have an interest in mathematics and engineering.",
    images: [
      {
        url: "/images/seo/og-image.png",
        width: 1200,
        height: 630,
        alt: "aXXo's website banner",
        type: "image/png",
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
      <body className={`${roboto.variable} antialiased flex flex-col items-center overflow-x-hidden`}>
        <div className="px-5 lg:px-0 max-w-255 w-full">
          <Header />
          {children}
          <Footer />
        </div>
      </body>
    </html>
  );
}
