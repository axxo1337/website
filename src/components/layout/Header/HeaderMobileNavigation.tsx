"use client";

import Logo from "@/components/ui/Logo";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import Link from "next/link";
import { links, TLink } from ".";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/client/utils";

//
// [SECTION] Content
//

function SecondaryNavigation({
  link,
  openSecondaryNav,
  setOpenSecondaryNav,
}: SecondaryNavigation) {
  return (
    <div className="w-full border-t last:border-b border-white/25">
      <div
        className="px-6 py-4 flex items-center justify-between cursor-pointer"
        onClick={() => setOpenSecondaryNav(link.title)}
      >
        <span>{link.title}</span>
        <ChevronRight />
      </div>
      <aside
        className={cn(
          "absolute w-full h-full transition-[left] ease-in-out top-0 left-full bg-background border-t border-white/25",
          openSecondaryNav === link.title && "left-0"
        )}
      >
        <div
          className="px-6 py-4 flex items-center cursor-pointer border-b gap-1 border-white/25"
          onClick={() => setOpenSecondaryNav(null)}
        >
          <ChevronLeft />
          <span>Back</span>
        </div>
        <div className="pt-6 px-6">
          <div className="border-b border-white/25 pb-2">
            <span className="text-sm">{link.title}</span>
          </div>
          <nav className="pt-2">
            <ul className="flex flex-col gap-2">
              {link.content?.map((element, elementIndex) => (
                <li key={`element-${elementIndex}`} className="flex">
                  <Link href={element.href} className="w-full">
                    {element.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </aside>
    </div>
  );
}

export default function MobileNavigation() {
  const pathname = usePathname();
  const [sheetOpen, setSheetOpen] = useState(false);
  const [openSecondaryNav, setOpenSecondaryNav] = useState<null | string>(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setSheetOpen(false);
    setOpenSecondaryNav(null);
  }, [pathname]);

  return (
    <Sheet
      open={sheetOpen}
      onOpenChange={(state) => {
        setSheetOpen(state);
        if (state === true) setOpenSecondaryNav(null);
      }}
    >
      <SheetTrigger className="md:hidden cursor-pointer">
        <Menu />
      </SheetTrigger>
      <SheetContent className="border-0 w-full">
        <SheetHeader className="pt-6 px-6">
          <SheetTitle className="text-2xl">Navigation</SheetTitle>
          <SheetDescription hidden={true}>
            Navigate through the various pages of my website
          </SheetDescription>
        </SheetHeader>
        <div className="font-medium text-lg flex flex-col relative h-full">
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
              <SecondaryNavigation
                key={`link-${linkIndex}`}
                link={link}
                openSecondaryNav={openSecondaryNav}
                setOpenSecondaryNav={setOpenSecondaryNav}
              />
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

//
// [SECTION] Types
//

interface SecondaryNavigation {
  link: TLink;
  openSecondaryNav: null | string;
  setOpenSecondaryNav: React.Dispatch<null | string>;
}
