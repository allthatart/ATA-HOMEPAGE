import Link from "next/link";
import type { CurriculumTrack } from "@/lib/curriculum-data";

export function TrackBox({
  track,
  label,
}: {
  track: CurriculumTrack;
  label: string;
}) {
  // 이제 세 트랙 모두 자체 랜딩 페이지(HERO~CTA)를 가지므로 항상 그리로 이동합니다.
  const href = `/curriculum/${track.slug}`;

  return (
    <Link
      href={href}
      className="group block w-full rounded-xl border-[3.2px] border-orange-500 bg-[#FFEEE6] px-8 py-10 text-left transition-colors hover:bg-orange-500 md:px-12 md:py-12"
    >
      <h2 className="font-serif text-2xl font-bold text-brand-ink transition-colors group-hover:text-white md:text-3xl">
        {label}
      </h2>
      <p className="mt-3 leading-relaxed text-brand-ink/70 transition-colors group-hover:text-white/90">
        {track.lead}
      </p>
    </Link>
  );
}
