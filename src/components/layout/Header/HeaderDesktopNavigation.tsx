import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import Link from "next/link";
import { Fragment } from "react/jsx-runtime";
import { links } from ".";
import { Library } from "lucide-react";

//
// [SECTION] Content
//

export default function DesktopNavigation() {
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
                  <ul className="grid grid-cols-1 gap-2 w-60">
                    {link.content.map((element, elementIndex) => (
                      <li key={`linkElement-${elementIndex}`}>
                        <Link
                          href={element.href}
                          className="flex gap-2 items-center hover:bg-black/20 transition-all hover:p-1 rounded-md"
                        >
                          <element.icon className="shrink-0 size-6 p-1 border border-black rounded-sm" />
                          <span>{element.title}</span>
                        </Link>
                      </li>
                    ))}
                    <li>
                      <Link
                        href={link.href}
                        className="flex gap-2 items-center hover:bg-black/20 transition-all hover:p-1 rounded-md"
                      >
                        <Library className="shrink-0 size-6 p-1 border border-black rounded-sm" />
                        <span>View all</span>
                      </Link>
                    </li>
                  </ul>
                </NavigationMenuContent>
              </Fragment>
            )}
          </NavigationMenuItem>
        ))}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
