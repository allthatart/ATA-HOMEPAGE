"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export function Reveal({
  children,
  delay = 0,
  className,
  variant = "fade",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
  variant?: "fade" | "pop";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(el);
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hiddenClasses =
    variant === "pop"
      ? "opacity-0 scale-90 blur-sm translate-y-4"
      : "opacity-0 translate-y-8";
  const shownClasses =
    variant === "pop"
      ? "opacity-100 scale-100 blur-none translate-y-0"
      : "opacity-100 translate-y-0";
  const duration = variant === "pop" ? "duration-500" : "duration-700";

  return (
    <div
      ref={ref}
      className={cn(
        "reveal-el transition-all ease-[cubic-bezier(0.16,1,0.3,1)]",
        duration,
        visible ? shownClasses : hiddenClasses,
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : "0ms" }}
    >
      {children}
    </div>
  );
}
