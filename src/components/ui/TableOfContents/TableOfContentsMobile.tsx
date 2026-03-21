"use client";

import { cn } from "@/lib/client/utils";
import { useEffect, useRef, useState } from "react";
import { List } from "lucide-react";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import useTableOfContents from "@/lib/client/hooks/useTableOfContents";

//
// [SECTION] Content
//

export default function TableOfContentsMobile({ exclude }: TableOfContentsMobile) {
  const [open, setOpen] = useState(false);
  const { headings, activeId, visible, scrollToDelayed } = useTableOfContents(exclude, open);
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!open) return;
    requestAnimationFrame(() => {
      const active = navRef.current?.querySelector("[data-active]");
      if (active) active.scrollIntoView({ block: "center" });
    });
  }, [open]);

  if (headings.length === 0) return null;

  return (
    <div className={cn(
      "xl:hidden fixed bottom-4 right-6 z-50 transition-opacity duration-300",
      visible ? "opacity-100" : "opacity-0 pointer-events-none"
    )}>
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>
          <button
            className="flex items-center justify-center w-12 h-12 rounded-full bg-background border border-white/10 shadow-lg shadow-black/50"
            aria-label="Table of contents"
          >
            <List className="w-5 h-5 text-white" />
          </button>
        </DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Table of Contents</DrawerTitle>
          </DrawerHeader>
          <nav ref={navRef} className="px-4 pb-6 overflow-y-auto">
            <ul className="flex flex-col text-sm">
              {headings.map((heading) => (
                <li key={heading.id}>
                    <a
                      href={`#${heading.id}`}
                      data-active={activeId === heading.id || undefined}
                      onClick={(e) => {
                        e.preventDefault();
                        setOpen(false);
                        scrollToDelayed(heading.id, 300);
                      }}
                      className={cn(
                        "block transition-colors truncate rounded-md px-3 py-2 hover:bg-white/10",
                        heading.level === 3 && "pl-6",
                        heading.level >= 4 && "pl-9",
                        activeId === heading.id
                          ? "text-white font-medium"
                          : "text-white/50"
                      )}
                    >
                      {heading.text}
                    </a>
                </li>
              ))}
            </ul>
          </nav>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

//
// [SECTION] Types
//

interface TableOfContentsMobile {
  exclude?: string[];
}
