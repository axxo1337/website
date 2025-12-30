import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "References",
};

export default function References() {
  return (
    <Main title="References" createdAt={new Date(2025, 11, 22)} updatedAt={new Date(2025, 11, 22)}>
      <Section subtitle="What's this about?" title="Overview">
        <p className="md:text-lg">
          This page was originally named &quot;resources&quot;, but as{" "}
          <Link href="https://github.com/grimy86" className="inline-anchor">
            grimy86
          </Link>{" "}
          (a good lad) pointed out, it may mislead people into thinking I&apos;m affiliated to whatever I put here. So unless
          specified otherwise I&apos;m not. Anything I put here is purely to list helpful resources which I may or may not have
          used in my previous work. All that matters is that it&apos;s pedagogically useful.
        </p>
      </Section>
      <Section subtitle="Some advice and links" title="Material">
        <h3 className="text-2xl md:text-3xl first:mt-0! mt-5 py-0.5 mb-2">Game Hacking</h3>
        <span>Coming soon...</span>

        <h3 className="text-2xl md:text-3xl first:mt-0! mt-5 py-0.5 mb-2">Reverse Engineering</h3>
        <span>Coming soon...</span>
      </Section>
    </Main>
  );
}
