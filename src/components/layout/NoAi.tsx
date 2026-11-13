"use client";

import Shellshock from "@/components/ui/Shellshock.tsx";
import NoAiSign from "@/components/ui/NoAiSign.tsx";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { cn } from "@/lib/client/utils";
import { Fragment, useEffect, useRef, useState } from "react";
import { useMediaQuery } from "@/lib/client/hooks/useMediaQuery";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/drawer";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";

//
// [SECTION] Content
//

function Policy() {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xl font-medium mb-1">Potatos pomatos</span>

      <p>
        First off, when people refer to artificial intelligence (AI), they often
        mean large language models (LLMs). I feel like this is an important
        precision because not every AI is an LLM, but most of what the craze is
        about today is specifically LLMs.
      </p>

      <p>
        With that said,{" "}
        <span className="font-bold text-red-300">
          I use absolutely NO LLM to script, record or edit my videos or any
          kind of art you see in my projects.
        </span>{" "}
        Everything you see is made by me or my friends.
      </p>

      <span className="text-xl font-medium mb-1 mt-2">WITH THAT SAID</span>

      <p>
        I have to be intellectually honest. I am as guilty as you. I do use LLMs
        in my daily life for: learning, research (with due diligence),
        correcting (spelling etc), and, in some case, coding.
      </p>

      <p>
        When it comes to coding, my usage is infinitesimal. For exemple, the
        website you see in front of you was fully designed by me in Figma. The
        entire base of the code was also manually written by me. In truth,
        almost the entirety of the code that makes it up was written by... me.
      </p>

      <p>
        But like I said, I DO still use LLMs in some cases for: repetitive
        tasks, spelling, highlighting issues and fixing some bugs.
      </p>
    </div>
  );
}

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

  const handleDismiss = () => {
    localStorage.setItem("hideNoAiMessage", "true");
    setHide(true);
    setOpen(false);
    setRevealed(false);
  };

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
            hide
              ? "opacity-0 pointer-events-none select-none -bottom-5 -right-5"
              : "animate-in fade-in",
          )}
        >
          <StyledButton isOpen={isOpen} />
        </DialogTrigger>
        <DialogContent className="min-w-145">
          <DialogHeader>
            <DialogTitle>AI policy</DialogTitle>
            <DialogDescription hidden={true}>
              My views on AI and its usage.
            </DialogDescription>
          </DialogHeader>
          <ScrollArea className="h-95">
            <Policy />
          </ScrollArea>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Close</Button>
            </DialogClose>
            <DialogClose asChild>
              <Button variant="destructive" onClick={handleDismiss}>
                Dismiss
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
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
          hide
            ? "opacity-0 pointer-events-none select-none bottom-10 -right-30"
            : "animate-in fade-in",
        )}
      >
        <StyledButton isOpen={isOpen} />
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>AI policy</DrawerTitle>
          <DrawerDescription hidden={true}>
            My views on AI and its usage.
          </DrawerDescription>
        </DrawerHeader>
        <ScrollArea className="h-95">
          <Policy />
        </ScrollArea>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Close</Button>
          </DrawerClose>
          <DrawerClose asChild>
            <Button variant="destructive" onClick={handleDismiss}>
              Dismiss
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}

//
// [SECTION] Types
//

interface StyledButtonProps {
  isOpen: boolean;
}
