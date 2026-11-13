import { useState, useEffect } from "react";
import { useEventListener } from "./useEventListener";

/**
 * `useMediaQuery` is a custom React hook that checks if a media query matches the current window.
 * It uses `useEffect` to set up the media query and `useEventListener` to listen for changes to the media query.
 *
 * @param mediaQuery - The media query string to check.
 * @returns The boolean state indicating if the media query matches the current window.
 */
export function useMediaQuery(mediaQuery: string) {
  const [isMatch, setIsMatch] = useState(false);
  const [mediaQueryList, setMediaQueryList] = useState<MediaQueryList | null>(
    null,
  );

  useEffect(() => {
    const list = window.matchMedia(mediaQuery);
    setMediaQueryList(list);
    setIsMatch(list.matches);
  }, [mediaQuery]);

  useEventListener(
    "change",
    (e: MediaQueryListEvent) => setIsMatch(e.matches),
    mediaQueryList,
  );

  return isMatch;
}
