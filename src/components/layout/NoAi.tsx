"use client";

import Shellshock from "@/components/ui/Shellshock.tsx";
import NoAiSign from "@/components/ui/NoAiSign.tsx";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/client/utils";
import { Fragment, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/client/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

//
// [SECTION] Content
//

function StyledButton({ isOpen }: StyledButtonProps) {
  return (
    <Fragment>
      <NoAiSign
        className={cn(
          "absolute -rotate-6 bottom-0 -left-5 w-22 transition-all group-hover:-left-8 md:group-hover:-left-7 group-hover:bottom-3 md:group-hover:bottom-2 group-hover:-rotate-10 duration-300 ease-in-out",
          isOpen && "-left-8 bottom-3 md:-left-7 md:bottom-2 -rotate-10",
        )}
      />
      <Shellshock className="w-50" />
    </Fragment>
  );
}

export default function NoAi() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [hide, setHide] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const triggerRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    setHide(localStorage.getItem("hideNoAiMessage") !== null);
  }, []);

  useEffect(() => {
    if (!revealed || isOpen) return;
    const onClick = (event: MouseEvent) => {
      if (
        triggerRef.current &&
        !triggerRef.current.contains(event.target as Node)
      ) {
        setRevealed(false);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [revealed, isOpen]);

  if (isDesktop) {
    return (
      <Dialog open={isOpen && !hide} onOpenChange={setOpen}>
        <DialogTrigger
          className={cn(
            "cursor-pointer fixed z-20 bottom-10 -right-20 md:-bottom-10 md:-right-10 scale-70 md:scale-100 -rotate-20 drop-shadow-2xl group brightness-30 hover:brightness-100 hover:bottom-12 md:hover:-bottom-6 hover:-right-16 md:hover:-right-6 transition-all duration-300 ease-in-out",
            isOpen && "bottom-12 -right-16 md:-bottom-6 md:-right-6",
            hide &&
              "opacity-0 pointer-events-none select-none -bottom-5 -right-5",
          )}
        >
          <StyledButton isOpen={isOpen} />
        </DialogTrigger>
        <DialogContent></DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen && !hide}
      onOpenChange={(open) => {
        if (!open) {
          setOpen(false);
          setRevealed(false);
        } else if (!revealed) {
          setRevealed(true);
        } else {
          setOpen(true);
        }
      }}
    >
      <DrawerTrigger
        ref={triggerRef}
        className={cn(
          "cursor-pointer fixed z-20 bottom-10 -right-20 md:-bottom-10 md:-right-10 scale-70 md:scale-100 -rotate-20 drop-shadow-2xl group brightness-40 hover:brightness-100 hover:bottom-12 md:hover:-bottom-6 hover:-right-16 md:hover:-right-6 transition-all duration-300 ease-in-out",
          !revealed && "-right-28",
          isOpen && "bottom-12 -right-16 md:-bottom-6 md:-right-6",
          revealed && "brightness-80",
          hide &&
            "opacity-0 pointer-events-none select-none bottom-10 -right-30",
        )}
      >
        <StyledButton isOpen={isOpen} />
      </DrawerTrigger>
      <DrawerContent></DrawerContent>
    </Drawer>
  );
}

//
// [SECTION] Types
//

interface StyledButtonProps {
  isOpen: boolean;
}
