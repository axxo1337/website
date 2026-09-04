"use client";

import { Fragment, useState } from "react";
import Image from "next/image";
import LottiePlayer from "@/components/ui/LottiePlayer";
import { cn } from "@/lib/client/utils";
import type { DotLottie } from "@lottiefiles/dotlottie-react";

//
// [SECTION] Content
//

export default function ContentCardThumbnail({
  thumbnailPath,
  animationPath,
  animationBackground,
  animationBackgroundColor,
  animationPreview,
  title,
  fallbackText,
}: ContentCardThumbnailProps) {
  const [isAnimationLoaded, setIsAnimationLoaded] = useState(false);

  const hasAnimationBg = Boolean(animationBackground && animationPath);
  const hasAnimationPreview = Boolean(animationPreview && animationPath);
  const hasAnimationBgColor = Boolean(animationBackgroundColor && animationPath);
  const hasAnimationVisual = hasAnimationBg || hasAnimationPreview || hasAnimationBgColor;
  const showThumbnail = thumbnailPath && !hasAnimationVisual && (!animationPath || !isAnimationLoaded);
  const showFallback = !thumbnailPath && !hasAnimationVisual && (!animationPath || !isAnimationLoaded);

  return (
    <Fragment>
      {showThumbnail && (
        <Image
          src={thumbnailPath}
          fill={true}
          alt={`${title} thumbnail`}
          className="group-hover:scale-[98%] transition-all group-hover:blur-sm blur-none duration-250 ease-in-out absolute object-cover"
        />
      )}

      {showFallback && (
        <span className="absolute left-1/2 top-1/2 -translate-1/2 font-medium text-lg md:text-xl text-center px-4 w-full select-none text-white/50 group-hover:scale-[98%] transition-all duration-200 ease-in-out opacity-100 group-hover:opacity-0">
          {fallbackText}
        </span>
      )}

      {animationPath && (
        <div
          className="group-hover:scale-[98%] transition-all group-hover:blur-sm blur-none duration-250 ease-in-out relative w-full h-full"
          style={{ backgroundColor: animationBackgroundColor || undefined }}
        >
          <LottiePlayer
            src={animationPath}
            previewAlt={`${title} animation preview`}
            autoplay
            loop
            dotLottieRefCallback={(dotLottie: DotLottie | null) => {
              if (!dotLottie) return;
              if (dotLottie.isLoaded) {
                setIsAnimationLoaded(true);
              } else {
                dotLottie.addEventListener("load", () => setIsAnimationLoaded(true));
              }
            }}
            containerClassName="absolute inset-0 w-full h-full z-10"
          />

          {!isAnimationLoaded && animationPreview && (
            <Image alt="preview" width={960} height={540} className="absolute z-5" src={animationPreview} />
          )}

          {animationBackground && (
            <Image alt="preview" width={960} height={540} className="absolute" src={animationBackground} />
          )}
        </div>
      )}
    </Fragment>
  );
}

//
// [SECTION] Types
//

export interface ContentCardThumbnailProps {
  thumbnailPath?: string | null;
  animationPath?: string | null;
  animationBackground?: string | null;
  animationBackgroundColor?: string | null;
  animationPreview?: string | null;
  title: string;
  fallbackText: string;
}
