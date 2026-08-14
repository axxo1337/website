"use client";

import { motion, type HTMLMotionProps } from "framer-motion";

//
// [SECTION] Content
//

export default function FadeIn({
  children,
  delay = 0,
  y = 10,
  duration = 0.4,
  as = "div",
  className,
  ...props
}: FadeIn) {
  const Component = (as in motion ? motion[as as keyof typeof motion] : motion.div) as typeof motion.div;

  return (
    <Component
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration, ease: "easeOut", delay }}
      className={className}
      {...props}
    >
      {children}
    </Component>
  );
}

//
// [SECTION] Types
//

interface FadeIn extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  y?: number;
  duration?: number;
  as?: keyof typeof motion;
}
