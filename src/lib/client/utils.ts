import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { ReactNode } from "react"
import { format, isValid } from "date-fns"
import { TPostCategory, TPostStatus } from "./types/post";
import { Cpu, Globe, LucideIcon, ShieldCheck, Sparkles } from "lucide-react";

//
// [SECTION] Defines
//

export const postStatusObjectMap = new Map<TPostStatus, { spanClassName: string; containerClassName: string; text: string }>([
  [
    "WIP",
    {
      containerClassName: "bg-[#FBDD31]/20 border-[#FBDD31]",
      spanClassName: "text-[#FBDD31]",
      text: "Work in progress",
    },
  ],
  [
    "DRAFT",
    {
      containerClassName: "bg-[#FB3131]/20 border-[#FB3131]",
      spanClassName: "text-[#FB3131]",
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
      containerClassName: "border-[#FBDD31] bg-[#FBDD31]/20 backdrop-blur-md",
      spanClassName: "text-[#FBDD31]",
      text: "Computer Science",
      icon: Cpu,
    },
  ],
  [
    "CYBERSECURITY",
    {
      containerClassName: "border-[#FB3131] bg-[#FB3131]/20 backdrop-blur-md",
      spanClassName: "text-[#FB3131]",
      text: "Cybersecurity",
      icon: ShieldCheck,
    },
  ],
  [
    "WEB",
    {
      containerClassName: "border-[#317FFB] bg-[#317FFB]/20 backdrop-blur-md",
      spanClassName: "text-[#317FFB]",
      text: "Web",
      icon: Globe,
    },
  ],
  [
    "MISC",
    {
      containerClassName: "border-zinc-500 bg-zinc-500/20 backdrop-blur-md",
      spanClassName: "text-zinc-300",
      text: "Misc",
      icon: Sparkles,
    },
  ],
]);

//
// [SECTION] Functions
//

export function parseImageAlt(alt: string): { text: string; align: string; width: string; caption: string } {
  const parts = alt.split("|").map((s) => s.trim());
  const text = parts[0];
  let align = "center";
  let width = "";
  let caption = "";

  for (const part of parts.slice(1)) {
    if (["left", "center", "right"].includes(part)) {
      align = part;
    } else if (/^\d/.test(part)) {
      width = part;
    } else if (part) {
      caption = part;
    }
  }

  return { text, align, width, caption };
}


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

export function formatUTC(date: Date, formatPattern: string = "MMM d, yyyy"): string {
  if (!date || !isValid(date)) return "N/A";
  const utcDate = new Date(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate());
  return format(utcDate, formatPattern);
}
