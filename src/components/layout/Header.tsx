import Link from "next/link";
import Logo from "../ui/Logo";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";

export default function Header() {
  return (
    <header className="flex items-center justify-between pt-14">
      <Link href="/" className="flex items-center gap-3.5">
        <Logo className="w-7 h-7" />
        <span className="text-2xl font-semibold">aXXo</span>
      </Link>
      <nav>WORK IN PROGRESS</nav>
    </header>
  );
}
