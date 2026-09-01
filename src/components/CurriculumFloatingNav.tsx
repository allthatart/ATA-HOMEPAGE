"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const SECTIONS = [
  { id: "undergraduate", label: "신입학" },
  { id: "transfer", label: "편입학" },
  { id: "graduate", label: "대학원" },
];

export function CurriculumFloatingNav() {
  const [active, setActive] = useState(SECTIONS[0].id);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();

    const observers = SECTIONS.map(({ id }) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) setActive(id);
        },
        { threshold: 0.4, rootMargin: "-100px 0px -40% 0px" }
      );
      observer.observe(el);
      return observer;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
      observers.forEach((o) => o?.disconnect());
    };
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  return (
    <div
      className={cn(
        "fixed left-6 top-1/2 z-40 hidden -translate-y-1/2 flex-col gap-4 transition-opacity duration-300 lg:flex",
        visible ? "opacity-100" : "pointer-events-none opacity-0"
      )}
    >
      {SECTIONS.map((s) => (
        <button
          key={s.id}
          onClick={() => scrollTo(s.id)}
          className="group flex items-center gap-3"
        >
          <span
            className={cn(
              "h-2.5 w-2.5 rounded-full border transition-all",
              active === s.id
                ? "scale-125 border-brand-accent bg-brand-accent"
                : "border-brand-ink/30 bg-transparent group-hover:border-brand-accent"
            )}
          />
          <span
            className={cn(
              "text-xs font-medium tracking-wide transition-colors",
              active === s.id
                ? "text-brand-accent-deep"
                : "text-brand-ink/40 group-hover:text-brand-ink/70"
            )}
          >
            {s.label}
          </span>
        </button>
      ))}
    </div>
  );
}
