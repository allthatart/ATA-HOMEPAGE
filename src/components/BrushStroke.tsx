import { cn } from "@/lib/utils";

export function BrushStroke({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 600 90"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("pointer-events-none select-none", className)}
      preserveAspectRatio="none"
      aria-hidden="true"
    >
      <path
        d="M8 52C38 18 92 6 158 10C226 14 268 40 336 36C406 32 432 4 508 8C556 10.5 584 26 592 46C578 70 520 82 448 78C368 73.5 332 54 258 58C186 62 152 82 84 80C42 78.5 16 68 8 52Z"
        fill="var(--brand-accent)"
      />
    </svg>
  );
}
