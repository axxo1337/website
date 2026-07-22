import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReactNode } from "react"
import { TPostStatus } from "./types/post";

//
// [SECTION] Defines
//

export const postStatusObjectMap = new Map<TPostStatus, { spanClassName: string; containerClassName: string; text: string }>([
  [
    "WIP",
    {
      containerClassName: "bg-yellow-500/20 border-yellow-500",
      spanClassName: "text-yellow-500",
      text: "Work in progress",
    },
  ],
  [
    "DRAFT",
    {
      containerClassName: "bg-red-500/20 border-red-500",
      spanClassName: "text-red-500",
      text: "Draft (Not available in prod)",
    },
  ],
]);

//
// [SECTION] Functions
//

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "")
}

export function extractText(node: ReactNode): string {
  if (typeof node === "string") return node;
  if (typeof node === "number") return String(node);
  if (!node) return "";
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (typeof node === "object" && "props" in node) {
    return extractText((node as { props: { children?: ReactNode } }).props.children);
  }
  return "";
}

export function formatUTC(date: Date): string {
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}
