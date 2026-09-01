import { cn } from "@/lib/utils";

export function PlaceholderImage({
  seed,
  alt,
  className,
  width = 1200,
  height = 800,
}: {
  seed: string;
  alt: string;
  className?: string;
  width?: number;
  height?: number;
}) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`https://picsum.photos/seed/${seed}/${width}/${height}`}
      alt={alt}
      className={cn("w-full rounded-lg object-cover", className)}
      loading="lazy"
    />
  );
}
