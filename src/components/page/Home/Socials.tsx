"use client";

import Section from "@/components/layout/Section";
import Social from "./Social";
import { Discord, Email, Github, Instagram, Reddit, YouTube } from "@/components/ui/SocialIcons";

//
// [SECTION] Defines
//

export const socials = [
  {
    href: "https://www.youtube.com/@axxo1337",
    title: "YouTube",
    icon: YouTube,
  },
  {
    href: "https://www.instagram.com/axxo1337",
    title: "Instagram",
    icon: Instagram,
  },
  {
    href: "https://www.reddit.com/r/aXXo",
    title: "Reddit",
    icon: Reddit,
  },
  {
    href: "https://discord.gg/tdEAJU2XwZ",
    title: "Discord (apply to join)",
    icon: Discord,
  },
  {
    href: "https://github.com/axxo1337",
    title: "Github",
    icon: Github,
  },
  {
    copyTitle: "E-Mail",
    copyContent: "axxo1337@proton.me",
    title: "axxo1337 [at] proton [dot] me",
    icon: Email,
  },
];

//
// [SECTION] Content
//

export default function Socials() {
  return (
    <Section subtitle="How to reach me?" title="My social media">
      <ul className="flex flex-wrap gap-6 gap-y-4">
        {socials.map((social, socialIndex) => (
          <Social key={`social-${socialIndex}`} {...social} />
        ))}
      </ul>
    </Section>
  );
}
