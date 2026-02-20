"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Simple IntersectionObserver hook that adds 'revealed' class to elements.
 * Use with CSS classes 'reveal' or 'reveal-scale' for smooth scroll animations.
 * This replaces Framer Motion whileInView which causes flickering.
 */
export function useReveal(threshold = 0.15) {
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, revealed };
}
