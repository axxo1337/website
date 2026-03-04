import { Fragment } from "react/jsx-runtime";
import TableOfContentsDesktop from "./TableOfContentsDesktop";
import TableOfContentsMobile from "./TableOfContentsMobile";

//
// [SECTION] Content
//

export function extractHeadings(): Heading[] {
  const section = document.querySelector("section");
  if (!section) return [];

  const elements = section.querySelectorAll("h3[id], h4[id]");
  return [
    { id: "overview", text: "Overview", level: 3 },
    ...Array.from(elements).map((el) => ({
      id: el.id,
      text: el.textContent || "",
      level: el.tagName === "H3" ? 3 : 4,
    })),
  ];
}

export default function TableOfContents() {
  return (
    <Fragment>
      <TableOfContentsDesktop />
      <TableOfContentsMobile />
    </Fragment>
  );
}

//
// [SECTION] Types
//

export type Heading = {
  id: string;
  text: string;
  level: number;
};