"use client";

import React, { ReactNode, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export const AnimatedList = React.memo(
  ({
    children,
    className,
    delay = 1000,
  }: {
    children: ReactNode;
    className?: string;
    delay?: number;
  }) => {
    const [index, setIndex] = useState(0);
    const childrenArray = React.Children.toArray(children);

    const itemsToShow = useMemo(
      () => childrenArray.slice(0, index + 1).reverse(),
      [index, childrenArray],
    );

    useEffect(() => {
      const interval = setInterval(() => {
        setIndex((prevIndex) => (prevIndex + 1) % childrenArray.length);
      }, delay);

      return () => clearInterval(interval);
    }, [childrenArray.length, delay]);

    return (
      <div className={`flex flex-col-reverse items-center gap-4 ${className}`}>
        <AnimatePresence initial={false}>
          {itemsToShow.map((item) => (
            <AnimatedListItem key={(item as React.ReactElement).key}>
              {item}
            </AnimatedListItem>
          ))}
        </AnimatePresence>
      </div>
    );
  },
);

AnimatedList.displayName = "AnimatedList";

export function AnimatedListItem({ children }: { children: ReactNode }) {
  const animations = {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1, originY: 0 },
    exit: { scale: 0, opacity: 0 },
    transition: { type: "spring", stiffness: 350, damping: 40 },
  };

  return (
    <motion.div {...animations} className="mx-auto w-full">
      {children}
    </motion.div>
  );
}
