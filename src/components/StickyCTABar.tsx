"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function StickyCTABar() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    function onScroll() {
      setVisible(window.scrollY > 420);
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 z-40 border-b border-brand-line bg-brand-paper/95 shadow-md backdrop-blur transition-all duration-300 md:hidden",
        "top-20",
        visible
          ? "translate-y-0 opacity-100"
          : "pointer-events-none -translate-y-full opacity-0"
      )}
    >
      <div className="flex items-center justify-center gap-3 px-5 py-3">
        <Button asChild size="sm" className="md:h-10 md:px-6 md:text-base">
          <Link href="/consultation">무료 상담 예약하기</Link>
        </Button>
        <Button
          asChild
          size="sm"
          variant="outline"
          className="md:h-10 md:px-6 md:text-base"
        >
          <Link href="/curriculum">커리큘럼 살펴보기</Link>
        </Button>
      </div>
    </div>
  );
}
