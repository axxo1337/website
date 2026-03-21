"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { extractHeadings, Heading } from "@/components/ui/TableOfContents";

//
// [SECTION] Content
//

export default function useTableOfContents(exclude?: string[], pauseScroll?: boolean) {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const [activeId, setActiveId] = useState<string>("");
  const [visible, setVisible] = useState(false);
  const locked = useRef(false);

  useEffect(() => {
    const items = extractHeadings(exclude);
    setHeadings(items);
    if (items.length > 0) setActiveId(items[0].id);
  }, []);

  useEffect(() => {
    if (headings.length === 0 || pauseScroll) return;

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
  }, [headings, pauseScroll]);

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

  const scrollTo = useCallback((id: string) => {
    locked.current = true;
    setActiveId(id);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setTimeout(() => { locked.current = false; }, 850);
  }, []);

  const scrollToDelayed = useCallback((id: string, delay: number) => {
    locked.current = true;
    setActiveId(id);
    setTimeout(() => {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "instant" });
        setTimeout(() => {
          el.scrollIntoView({ behavior: "instant" });
          locked.current = false;
        }, 500);
      } else {
        locked.current = false;
      }
    }, delay);
  }, []);

  return { headings, activeId, visible, scrollTo, scrollToDelayed };
}
