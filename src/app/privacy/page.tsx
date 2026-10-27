import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy policy for aXXo's website: a static site that sets no cookies, runs no tracking and collects no personal information.",
  alternates: {
    canonical: "/privacy",
  },
  openGraph: {
    title: "Privacy Policy - aXXo's website",
    description:
      "Privacy policy for aXXo's website: a static site that sets no cookies, runs no tracking and collects no personal information.",
    url: "/privacy",
  },
  twitter: {
    card: "summary_large_image",
    title: "Privacy Policy - aXXo's website",
    description:
      "Privacy policy for aXXo's website: a static site that sets no cookies, runs no tracking and collects no personal information.",
  },
};

export default function PrivacyPage() {
  return (
    <Main
      title="Privacy Policy"
      createdAt={new Date("2026-10-27")}
      updatedAt={new Date("2026-10-27")}
    >
      <Section title="The short version">
        <div className="flex flex-col gap-4 md:gap-6 font-medium">
          <p>
            This is a static website. It sets no cookies, runs no advertising or
            cross-site tracking, and collects no personal information.
          </p>
        </div>
      </Section>

      <Section title="What we collect">
        <div className="flex flex-col gap-4 md:gap-6 font-medium">
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <p>
                <strong>Standard server logs</strong> kept by our hosting
                provider, Cloudflare (IP address, request time, pages
                requested), used for security and operations.
              </p>
            </li>
          </ul>
        </div>
      </Section>

      <Section title="Third parties we rely on">
        <div className="flex flex-col gap-4 md:gap-6 font-medium">
          <ul className="list-disc pl-5 flex flex-col gap-2">
            <li>
              <p>
                <strong>Cloudflare</strong> — serves the site and keeps standard
                server logs.
              </p>
            </li>
            <li>
              <p>
                <strong>YouTube</strong> — video pages embed YouTube&apos;s
                player. If you play a video, your browser makes requests to
                YouTube&apos;s servers, and anything YouTube stores is governed
                by YouTube&apos;s own privacy policy.
              </p>
            </li>
          </ul>
        </div>
      </Section>

      <Section title="Retention and your choices">
        <div className="flex flex-col gap-4 md:gap-6 font-medium">
          <p>
            There is nothing to unsubscribe from, access, export or delete: the
            only records are Cloudflare&apos;s server logs, which this site does
            not control. Questions can be sent to axxo1337 [at] proton [dot] me.
          </p>
        </div>
      </Section>

      <Section title="Changes">
        <div className="flex flex-col gap-4 md:gap-6 font-medium">
          <p>
            If this policy changes, the new version is posted here with an
            updated date.
          </p>
        </div>
      </Section>
    </Main>
  );
}
