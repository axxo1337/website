import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import TableOfContents from "@/components/ui/TableOfContents";
import Socials from "@/components/page/Home/Socials";
import JsonLd from "@/components/ui/JsonLd";
import { getBreadcrumbJsonLd } from "@/lib/server/jsonld";
import fs from "fs";
import path from "path";
import { calculateReadingTime } from "@/lib/server/mdx";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "References",
  description: "A curated collection of resources for learning game hacking, C++, data structures, Windows internals, and reverse engineering.",
  alternates: {
    canonical: "/references",
  },
  openGraph: {
    title: "References - aXXo's website",
    description: "A curated collection of resources for learning game hacking, C++, data structures, Windows internals, and reverse engineering.",
    url: "/references",
  },
  twitter: {
    card: "summary_large_image",
    title: "References - aXXo's website",
    description: "A curated collection of resources for learning game hacking, C++, data structures, Windows internals, and reverse engineering.",
  },
};

export default async function References() {
  const post = await import("@/app/references/references.mdx");
  const MDXContent = post.default;

  const refPath = path.join(process.cwd(), "src/app/references/references.mdx");
  const readingTime = fs.existsSync(refPath)
    ? calculateReadingTime(fs.readFileSync(refPath, "utf-8"))
    : undefined;

  const breadcrumbs = getBreadcrumbJsonLd([
    { name: "Home", url: "/" },
    { name: "References", url: "/references" },
  ]);

  return (
    <Main
      title="References"
      createdAt={new Date("2025-12-22")}
      updatedAt={new Date("2026-08-14")}
      readingTime={readingTime}
    >
      <JsonLd schema={breadcrumbs} />
      <Section subtitle="Some advice and links" title="Material">
        <div>
          <MDXContent />
        </div>
      </Section>
      <Socials />
      <TableOfContents />
    </Main>
  );
}
