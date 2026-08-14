import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import TableOfContents from "@/components/ui/TableOfContents";
import Socials from "@/components/page/Home/Socials";
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
};

export default async function References() {
  const post = await import("@/app/references/references.mdx");
  const MDXContent = post.default;

  return (
    <Main
      title="References"
      createdAt={new Date("2025-12-22")}
      updatedAt={new Date("2026-08-14")}
    >
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
