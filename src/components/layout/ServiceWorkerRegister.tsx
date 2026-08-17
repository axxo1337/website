"use client";

import { useEffect } from "react";

//
// [SECTION] Content
//

export default function ServiceWorkerRegister() {
  useEffect(() => {
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      if (process.env.NODE_ENV === "production") {
        window.addEventListener("load", () => {
          navigator.serviceWorker.register("/sw.js").catch((error) => {
            console.error("ServiceWorker registration failed: ", error);
          });
        });
      }
    }
  }, []);

  return null;
}
