"use client";

import Link from "next/link";
import { useCopyToClipboard } from "@/lib/client/hooks/useCopyToClipboard";
import { toast } from "sonner";
import { Fragment, type ComponentType } from "react";
import { cn } from "@/lib/client/utils";
import type { IconProps } from "@/components/ui/SocialIcons";

export default function Social({ copyContent, copyTitle, href, icon: Icon, title }: SocialProps) {
  const { copyToClipboard } = useCopyToClipboard();

  const handleCopy = () => {
    if (copyContent) {
      copyToClipboard(copyContent);
      toast.success(`${copyTitle ?? `"${title}"`} copied to clipboard`);
    }
  };

  const commonClasses =
    "flex items-center group gap-2 border border-white/20 hover:border-white duration-250 transition-colors rounded-full py-2 px-4 blured-bg focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50";

  const renderContent = () => (
    <Fragment>
      <Icon className="size-6 md:size-8 group-hover:brightness-85 duration-250 transition-all shrink-0" />
      <span className="font-medium -top-px text-lg md:text-xl group-hover:text-white/80 transition-colors duration-250 group-hover-underline flex items-center gap-2">
        {title}
      </span>
    </Fragment>
  );

  if (href) {
    return (
      <li>
        <Link href={href} className={commonClasses}>
          {renderContent()}
        </Link>
      </li>
    );
  }

  if (copyContent) {
    return (
      <li>
        <button
          type="button"
          onClick={handleCopy}
          aria-label={`Copy ${copyContent}`}
          className={cn("cursor-pointer text-left", commonClasses)}
        >
          {renderContent()}
        </button>
      </li>
    );
  }

  return (
    <li>
      <div className={commonClasses}>{renderContent()}</div>
    </li>
  );
}

export interface SocialProps {
  copyContent?: string;
  copyTitle?: string;
  href?: string | null;
  icon: ComponentType<IconProps>;
  title: string;
}
