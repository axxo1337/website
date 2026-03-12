"use client";

import { cn } from "@/lib/client/utils";
import { useEffect, useRef, useState } from "react";
import { extractHeadings, Heading } from ".";

//
// [SECTION] Content
//

export default function TableOfContentsDesktop({ exclude }: TableOfContentsDesktop) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const locked = useRef(false);

  useEffect(() => {
    const items = extractHeadings(exclude);
    setHeadings(items);
    if (items.length > 0) setActiveId(items[0].id);
  }, []);

  useEffect(() => {
    if (headings.length === 0) return;

    function updateActiveHeading() {
      if (locked.current) return;

      const scrollY = window.scrollY;
      let current = headings[0]?.id ?? "";

      for (const { id } of headings) {
        const el = document.getElementById(id);
        if (el && el.offsetTop - 100 <= scrollY) {
          current = id;
        }
      }

      setActiveId(current);
    }

    window.addEventListener("scroll", updateActiveHeading, { passive: true });
    updateActiveHeading();

    return () => window.removeEventListener("scroll", updateActiveHeading);
  }, [headings]);

  useEffect(() => {
    const sections = document.querySelectorAll("section");
    if (sections.length === 0) return;

    const visibleSections = new Set<Element>();
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) visibleSections.add(entry.target);
          else visibleSections.delete(entry.target);
        }
        setVisible(visibleSections.size > 0);
      },
      { threshold: 0 }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  if (headings.length === 0) return null;

  return (
    <div
      className={cn(
        "hidden xl:block fixed right-0 top-1/2 -translate-y-1/2 z-50 p-6 transition-opacity duration-300",
        visible ? "opacity-100" : "opacity-0 pointer-events-none"
      )}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div
        className={cn(
          "flex flex-col gap-2.5 transition-opacity duration-200",
          hovered ? "opacity-0 invisible" : "opacity-100"
        )}
      >
        {headings.map((heading) => (
          <div
            key={heading.id}
            className={cn(
              "rounded-full h-[2px] transition-colors",
              heading.level === 2 && "w-6",
              heading.level === 3 && "ml-1 w-5",
              heading.level >= 4 && "ml-2 w-4",
              activeId === heading.id ? "bg-white" : "bg-white/25"
            )}
          />
        ))}
      </div>
      <nav
        className={cn(
          "absolute right-6 top-1/2 -translate-y-1/2 bg-background border border-white/10 rounded-lg p-1.5 w-48 shadow-lg shadow-black/50 transition-all duration-200",
          hovered
            ? "opacity-100 scale-100"
            : "opacity-0 scale-95 pointer-events-none"
        )}
      >
        <ul className="flex flex-col text-xs">
          {headings.map((heading) => (
            <li key={heading.id}>
              <a
                href={`#${heading.id}`}
                onClick={(e) => {
                  e.preventDefault();
                  locked.current = true;
                  setActiveId(heading.id);
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                  setTimeout(() => { locked.current = false; }, 850);
                }}
                className={cn(
                  "block transition-colors truncate rounded-md px-2.5 py-1.5 hover:bg-white/10",
                  heading.level === 3 && "pl-5",
                  heading.level >= 4 && "pl-8",
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
    </div>
  );
}

//
// [SECTION] Types
//

interface TableOfContentsDesktop {
  exclude?: string[];
}
