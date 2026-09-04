"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { cn } from "@/lib/client/utils";
import type { DotLottie, DotLottieReactProps } from "@lottiefiles/dotlottie-react";

//
// [SECTION] Content
//

const DotLottieReact = dynamic(() => import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact), { ssr: false });

export default function LottiePlayer({
  className,
  containerClassName,
  autoplay = true,
  loop = true,
  previewAlt = "Animation preview",
  style,
  dotLottieRefCallback,
  ...props
}: LottiePlayerProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleDotLottieRef = useCallback(
    (dotLottie: DotLottie | null) => {
      dotLottieRefCallback?.(dotLottie);
      if (!dotLottie) return;
      if (dotLottie.isLoaded) {
        setIsLoaded(true);
      } else {
        const onLoad = () => {
          setIsLoaded(true);
          dotLottie.removeEventListener("load", onLoad);
        };
        dotLottie.addEventListener("load", onLoad);
      }
    },
    [dotLottieRefCallback],
  );

  return (
    <div className={cn("relative flex items-center justify-center", containerClassName)}>
      <DotLottieReact
        autoplay={autoplay}
        loop={loop}
        dotLottieRefCallback={handleDotLottieRef}
        className={cn("w-full h-full object-contain", className)}
        {...props}
      />
    </div>
  );
}

//
// [SECTION] Types
//

export interface LottiePlayerProps extends DotLottieReactProps {
  previewAlt?: string;
  containerClassName?: string;
}
