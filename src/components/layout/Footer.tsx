import Link from "next/link";
import Logo from "../ui/Logo";

export default function Footer() {
  return (
    <footer className="mt-12 sm:mt-16 pb-16">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <Link href="/" className="flex items-center gap-2.5">
          <Logo className="size-6" />
          <span className="text-xl font-semibold">aXXo</span>
        </Link>
        <nav>
          <ul className="flex items-center gap-6 md:text-base text-sm">
            <li>
              <Link href="/" className="hover:text-white/80 font-medium transition-colors hover-underline">
                About me
              </Link>
            </li>
            <li>
              <Link href="/videos" className="hover:text-white/80 font-medium transition-colors hover-underline">
                Videos
              </Link>
            </li>
            <li>
              <Link href="/projects" className="hover:text-white/80 font-medium transition-colors hover-underline">
                Projects
              </Link>
            </li>
            <li>
              <Link href="/references" className="hover:text-white/80 font-medium transition-colors hover-underline">
                References
              </Link>
            </li>
          </ul>
        </nav>
      </div>
      <div className="mt-6 md:mt-8">
        <span className="text-white/50 text-sm md:text-base">© {new Date().getFullYear()} aXXo, All rights reserved</span>
      </div>
    </footer>
  );
}
