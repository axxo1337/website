"use client";

import { cn } from "@/lib/client/utils";
import { useEffect, useState } from "react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

export default function TableOfContents() {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [isXl, setIsXl] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1280px)");
    setIsXl(mq.matches);
    const handler = (e: MediaQueryListEvent) => setIsXl(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    if (!isXl) {
      setHeadings([]);
      setActiveId("");
      return;
    }

    const section = document.querySelector("section");
    if (!section) return;

    const elements = section.querySelectorAll("h3[id], h4[id]");
    const items: Heading[] = [
      { id: "overview", text: "Overview", level: 3 },
      ...Array.from(elements).map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: el.tagName === "H3" ? 3 : 4,
      })),
    ];

    setHeadings(items);
    setActiveId("overview");
  }, [isXl]);

  useEffect(() => {
    if (!isXl || headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: "0px 0px -80% 0px" }
    );

    for (const { id } of headings) {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  }, [headings, isXl]);

  useEffect(() => {
    if (!isXl) {
      setVisible(false);
      return;
    }

    const section = document.querySelector("section");
    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { rootMargin: "0px 0px 0px 0px", threshold: 0 }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [isXl]);

  if (headings.length === 0 || !isXl) return null;

  return (
    <div
      className={cn(
        "fixed right-0 top-1/2 -translate-y-1/2 z-50 p-6 transition-opacity duration-300",
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
              heading.level === 4 ? "ml-2 w-4" : "w-6",
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
                  document.getElementById(heading.id)?.scrollIntoView({
                    behavior: "smooth",
                  });
                }}
                className={cn(
                  "block transition-colors truncate rounded-md px-2.5 py-1.5 hover:bg-white/10",
                  heading.level === 4 && "pl-6",
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
