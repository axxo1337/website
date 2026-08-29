"use client";

import { Fragment } from "react/jsx-runtime";
import useTableOfContents from "@/lib/client/hooks/useTableOfContents";
import TableOfContentsDesktop from "./TableOfContentsDesktop";
import TableOfContentsMobile from "./TableOfContentsMobile";

//
// [SECTION] Content
//

export function extractHeadings(exclude?: string[]): Heading[] {
  const sections = document.querySelectorAll("section");
  if (sections.length === 0) return [];

  const excluded = new Set(exclude);
  return Array.from(sections).flatMap((section) =>
    Array.from(section.querySelectorAll("h2[id], h3[id], h4[id], h5[id], h6[id]"))
      .filter((el) => !excluded.has(el.id))
      .map((el) => ({
        id: el.id,
        text: el.textContent || "",
        level: parseInt(el.tagName[1]),
      }))
  );
}

export default function TableOfContents({ exclude }: TableOfContentsProps) {
  const { headings, activeId, visible, scrollTo, scrollToDelayed } = useTableOfContents(exclude);

  if (headings.length === 0) return null;

  return (
    <Fragment>
      <TableOfContentsDesktop
        headings={headings}
        activeId={activeId}
        visible={visible}
        scrollTo={scrollTo}
      />
      <TableOfContentsMobile
        headings={headings}
        activeId={activeId}
        visible={visible}
        scrollToDelayed={scrollToDelayed}
      />
    </Fragment>
  );
}

//
// [SECTION] Types
//

export interface TableOfContentsProps {
  exclude?: string[];
}

export type Heading = {
  id: string;
  text: string;
  level: number;
};