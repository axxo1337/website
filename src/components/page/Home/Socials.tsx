import Section from "@/components/layout/Section";
import Social from "./Social";

//
// [SECTION] Defines
//

export const socials = [
  {
    href: "https://www.youtube.com/@axxo1337",
    title: "YouTube",
    iconPath: "/images/socials/youtube.png",
  },
  {
    href: "https://www.instagram.com/axxo1337",
    title: "Instagram",
    iconPath: "/images/socials/instagram.png",
  },
  {
    href: "https://www.reddit.com/r/aXXo/",
    title: "Reddit",
    iconPath: "/images/socials/reddit.png",
  },
  {
    href: "https://discord.gg/tdEAJU2XwZ",
    title: "Discord (apply to join)",
    iconPath: "/images/socials/discord.png",
  },
  {
    href: "https://github.com/axxo1337",
    title: "Github",
    iconPath: "/images/socials/github.png",
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
