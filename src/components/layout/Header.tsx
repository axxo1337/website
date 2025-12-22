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
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { ChevronRight, Menu } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

//
// [SECTION] Defines
//

const links: TLink[] = [
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
        title: "TEST",
      },
    ],
  },
  {
    title: "Resources",
    href: "/resources",
    content: [
      {
        title: "TEST",
      },
    ],
  },
];

//
// [SECTION] Content
//

function DesktopNavigation() {
  return (
    <NavigationMenu viewport={false} className="hidden md:flex">
      <NavigationMenuList className="font-medium gap-6">
        {links.map((link, linkIndex) => (
          <NavigationMenuItem key={`link-${linkIndex}`}>
            {!link.content ? (
              <NavigationMenuLink
                className="text-lg p-0 bg-transparent! hover:text-white/80 hover-underline"
                asChild
              >
                <Link href={link.href}>{link.title}</Link>
              </NavigationMenuLink>
            ) : (
              <Fragment>
                <NavigationMenuTrigger className="text-lg p-0 h-auto! bg-transparent! data-[state=open]:after:w-full! data-[state=open]:text-white/80! hover:text-white/80! text-white! [&>svg]:size-5 hover-underline">
                  {link.title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  {link.content.map((element, elementIndex) => (
                    <span key={`linkElement-${elementIndex}`}>
                      {element.title}
                    </span>
                  ))}
                </NavigationMenuContent>
              </Fragment>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function MobileNavigation() {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden">
        <Menu />
      </SheetTrigger>
      <SheetContent className="border-0 w-full">
        <SheetHeader className="pt-6 px-6">
          <SheetTitle className="text-2xl">Navigation</SheetTitle>
          <SheetDescription hidden={true}>
            Navigate through the various pages of my website
          </SheetDescription>
        </SheetHeader>
        <div className={"font-medium text-lg flex flex-col"}>
          {links.map((link, linkIndex) =>
            !link.content ? (
              <Link
                key={`link-${linkIndex}`}
                href={link.href}
                className="w-full px-6 py-4 border-t last:border-b border-white/25"
              >
                <span>{link.title}</span>
              </Link>
            ) : (
              <div
                key={`link-${linkIndex}`}
                className="w-full px-6 py-4 border-t last:border-b border-white/25 flex items-center justify-between"
              >
                <span>{link.title}</span>
                <ChevronRight />
              </div>
            )
          )}
        </div>
        <SheetFooter className="items-center pb-6">
          <Link href="/" className="flex items-center gap-2">
            <Logo className="size-4" />
            <span className="text-lg font-semibold">aXXo</span>
          </Link>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}

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

type TLink = {
  title: string;
  href: string;
  content?: {
    title: string;
  }[];
};
