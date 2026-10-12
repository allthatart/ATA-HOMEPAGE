import { notFound, redirect } from "next/navigation";
import { CURRICULUM_TRACKS, getTrack } from "@/lib/curriculum-data";

export function generateStaticParams() {
  return CURRICULUM_TRACKS.map((t) => ({ track: t.slug }));
}

// 신입학·편입학·대학원은 각각의 전용 페이지(…/regular)로 이어집니다.
export default async function CurriculumTrackPage({
  params,
}: {
  params: Promise<{ track: string }>;
}) {
  const { track: trackSlug } = await params;
  const track = getTrack(trackSlug);
  if (!track) notFound();

  redirect(`/curriculum/${track.slug}/regular`);
}
