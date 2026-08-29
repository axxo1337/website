"use client";

import { useEffect } from "react";

//
// [SECTION] Content
//

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        const register = () => {
          navigator.serviceWorker.register("/sw.js").catch((error) => {
            console.error("ServiceWorker registration failed: ", error);
          });
        };

        if (document.readyState === "complete") {
          register();
        } else {
          window.addEventListener("load", register);
          return () => window.removeEventListener("load", register);
        }
      }
    }
  }, []);

  return null;
}
