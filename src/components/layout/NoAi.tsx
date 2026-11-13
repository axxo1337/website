"use client";

import Shellshock from "@/components/ui/Shellshock.tsx";
import NoAiSign from "@/components/ui/NoAiSign.tsx";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import { cn } from "@/lib/client/utils";
import { useEffect, useState } from "react";
import { useMediaQuery } from "@/lib/client/hooks/useMediaQuery";
import { Drawer, DrawerContent, DrawerTrigger } from "../ui/drawer";

//
// [SECTION] Content
//

function StyledButton({ isOpen, tucked }: StyledButtonProps) {
  return (
    <div
      className={cn(
        "relative md:scale-100 scale-70 drop-shadow-2xl bottom-10 md:-bottom-10 -right-20 md:-right-10 -rotate-20 group-hover:bottom-12 md:group-hover:-bottom-6 group-hover:-right-16 md:group-hover:-right-6 transition-all duration-300 ease-in-out",
        tucked && !isOpen && "-right-28",
        isOpen && "bottom-12 -right-16 md:-bottom-6 md:-right-6",
      )}
    >
      <NoAiSign
        className={cn(
          "absolute -rotate-6 bottom-0 -left-5 w-22 transition-all group-hover:-left-8 md:group-hover:-left-7 group-hover:bottom-3 md:group-hover:bottom-2 group-hover:-rotate-10 duration-300 ease-in-out",
          isOpen && "-left-8 bottom-3 md:-left-7 md:bottom-2 -rotate-10",
        )}
      />
      <Shellshock className="w-50" />
    </div>
  );
}

export default function NoAi() {
  const isDesktop = useMediaQuery("(min-width: 768px)");

  const [hide, setHide] = useState(true);
  const [isOpen, setOpen] = useState(false);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setHide(localStorage.getItem("hideNoAiMessage") !== null);
  }, []);

  if (isDesktop) {
    return (
      <Dialog open={isOpen && !hide} onOpenChange={setOpen}>
        <DialogTrigger
          className={cn(
            "cursor-pointer fixed z-20 bottom-0 right-0 group brightness-30 hover:brightness-100 transition-all duration-300 ease-in-out",
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
        className={cn(
          "cursor-pointer fixed z-20 bottom-0 right-0 group brightness-40 hover:brightness-100 transition-all duration-300 ease-in-out",
          revealed && "brightness-80",
          hide &&
            "opacity-0 pointer-events-none select-none -bottom-5 -right-5",
        )}
      >
        <StyledButton isOpen={isOpen} tucked={!revealed} />
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
  tucked?: boolean;
}
