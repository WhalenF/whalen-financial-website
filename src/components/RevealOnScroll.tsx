"use client";

import { useEffect, useRef, ReactNode } from "react";

type Variant = "up" | "left" | "right" | "scale" | "blur";

interface Props {
  children: ReactNode;
  className?: string;
  delay?: string;
  variant?: Variant;
  threshold?: number;
}

const variantClass: Record<Variant, string> = {
  up:    "reveal",
  left:  "reveal-left",
  right: "reveal-right",
  scale: "reveal-scale",
  blur:  "reveal-blur",
};

export default function Reveal({
  children,
  className = "",
  delay = "",
  variant = "up",
  threshold = 0.1,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add("visible");
          obs.disconnect();
        }
      },
      { threshold }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [threshold]);

  const base = variantClass[variant];

  return (
    <div ref={ref} className={`${base} ${delay} ${className}`.trim()}>
      {children}
    </div>
  );
}
