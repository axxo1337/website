import Main from "@/components/layout/Main";
import Section from "@/components/layout/Section";
import Image from "next/image";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

export default function Login() {
  return (
    <Main
      title="Login"
      createdAt={new Date("2026-11-15")}
      updatedAt={new Date("2026-11-15")}
    >
      <Section title="Look at this moron!">
        <p>
          <u>THIS IS A STATIC WEBSITE</u> <b>YOU TROGLODYTE</b>
        </p>
        <Image
          alt="Idiot"
          src="/images/honeypot/idiot.avif"
          width={498}
          height={385}
          className="mt-2"
        />
        <p className="mt-2">
          You and your LLM harvest aren&apos;t going to find a thing 😂
        </p>
        <Image
          alt="Idiot"
          src="/images/honeypot/you_stupid.avif"
          width={791}
          height={267}
          className="mt-2"
        />
      </Section>
    </Main>
  );
}
