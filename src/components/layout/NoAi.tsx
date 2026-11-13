"use client";

import Shellshock from "@/components/ui/Shellshock.tsx";
import NoAiSign from "@/components/ui/NoAiSign.tsx";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/client/utils";
import { useEffect, useState } from "react";

export default function NoAi() {
  const [hide, setHide] = useState(true);

  useEffect(() => {
    setHide(localStorage.getItem("hideNoAiMessage") !== null);
  }, []);

  return (
    <Dialog>
      <DialogTrigger className="cursor-pointer" disabled={hide}>
        <div
          className={cn(
            "fixed z-20 bottom-0 right-0 group brightness-30 hover:brightness-100 transition-all duration-300 ease-in-out",
            hide &&
              "opacity-0 pointer-events-none select-none -bottom-5 -right-5",
          )}
        >
          <div className="relative -bottom-10 -right-10 -rotate-20 group-hover:-bottom-6 group-hover:-right-6 transition-all duration-300 ease-in-out">
            <NoAiSign className="absolute -rotate-6 bottom-0 -left-5 w-22 transition-all group-hover:-left-7 group-hover:bottom-2 group-hover:-rotate-10 duration-300 ease-in-out" />
            <Shellshock className="w-50" />
          </div>
        </div>
      </DialogTrigger>
      <DialogContent></DialogContent>
    </Dialog>
  );
}
