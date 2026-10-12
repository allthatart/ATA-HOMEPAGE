"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

type Phase = "hidden" | "visible" | "exit" | "done";

export function Onboarding() {
  const [phase, setPhase] = useState<Phase>("hidden");

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
      setPhase("done");
      return;
    }

    document.body.style.overflow = "hidden";

    const t1 = setTimeout(() => setPhase("visible"), 50);
    const t2 = setTimeout(() => setPhase("exit"), 2200);
    const t3 = setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
    }, 3000);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
      document.body.style.overflow = "";
    };
  }, []);

  if (phase === "done") return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[9999] flex items-center justify-center bg-[#f37520] transition-opacity duration-700 ease-out",
        phase === "exit" ? "opacity-0 pointer-events-none" : "opacity-100"
      )}
      aria-hidden="true"
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/first.png"
        alt=""
        className={cn(
          "w-[clamp(14rem,20vw,26rem)] transition-all duration-700 ease-out",
          phase === "hidden" ? "opacity-0 translate-y-2" : "opacity-100 translate-y-0"
        )}
      />
    </div>
  );
}
