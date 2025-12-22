import Link from "next/link";
import Logo from "../../ui/Logo";
import MobileNavigation from "./HeaderMobileNavigation";
import DesktopNavigation from "./HeaderDesktopNavigation";
import { Bug, Diff, LucideIcon, Search } from "lucide-react";

//
// [SECTION] Defines
//

export const links: TLink[] = [
  {
    title: "About me",
    href: "/",
  },
  {
    title: "Videos",
    href: "/videos",
  },
  {
    title: "Projects",
    href: "/projects",
    content: [
      {
        title: "AntiDebug",
        href: "/project/antidebug",
        icon: Bug,
      },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    content: [
      {
        title: "Paul's Online Notes",
        href: "https://tutorial.math.lamar.edu/",
        icon: Diff,
      },
      {
        title: "Binary Ninja",
        href: "https://binary.ninja/",
        icon: Search,
      },
    ],
  },
];

//
// [SECTION] Content
//

export default function Header() {
  return (
    <header className="flex items-center justify-between pt-6 lg:pt-10 xl:pt-14">
      <Link href="/" className="flex items-center gap-3.5">
        <Logo className="size-7" />
        <span className="text-2xl font-semibold">aXXo</span>
      </Link>
      <DesktopNavigation />
      <MobileNavigation />
    </header>
  );
}

//
// [SECTION] Types
//

export type TLink = {
  title: string;
  href: string;
  content?: {
    title: string;
    href: string;
    icon: LucideIcon;
  }[];
};
