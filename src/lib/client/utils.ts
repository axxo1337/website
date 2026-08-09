import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReactNode } from "react"
import { TPostCategory, TPostStatus } from "./types/post";
import { Cpu, Globe, LucideIcon, ShieldCheck, Sparkles } from "lucide-react";

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

export const postCategoryMap = new Map<
  TPostCategory,
  { spanClassName: string; containerClassName: string; text: string; icon: LucideIcon }
>([
  [
    "COMPUTER_SCIENCE",
    {
      containerClassName: "border-yellow-500 bg-yellow-500/20 backdrop-blur-md",
      spanClassName: "text-yellow-500",
      text: "Computer Science",
      icon: Cpu,
    },
  ],
  [
    "CYBERSECURITY",
    {
      containerClassName: "border-red-500 bg-red-500/20 backdrop-blur-md",
      spanClassName: "text-red-500",
      text: "Cybersecurity",
      icon: ShieldCheck,
    },
  ],
  [
    "WEB",
    {
      containerClassName: "border-cyan-500 bg-cyan-500/20 backdrop-blur-md",
      spanClassName: "text-cyan-500",
      text: "Web",
      icon: Globe,
    },
  ],
  [
    "MISC",
    {
      containerClassName: "border-zinc-500 bg-zinc-500/20 backdrop-blur-md",
      spanClassName: "text-zinc-400",
      text: "Misc",
      icon: Sparkles,
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
  if (!date || isNaN(date.getTime())) return "N/A";
  return date.toLocaleDateString("en-US", {
    timeZone: "UTC",
    month: "2-digit",
    day: "2-digit",
    year: "numeric",
  });
}
