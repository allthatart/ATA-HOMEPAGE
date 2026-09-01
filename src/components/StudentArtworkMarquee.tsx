const ARTWORKS = Array.from({ length: 8 }, (_, i) => ({
  seed: `allthatart-artwork-${i + 1}`,
  alt: `학생 작품 ${i + 1}`,
}));

export function StudentArtworkMarquee() {
  // 이어붙임(seamless loop)을 위해 배열을 두 번 반복합니다.
  const doubled = [...ARTWORKS, ...ARTWORKS];

  return (
    <div className="overflow-hidden">
      <div className="marquee-track flex w-max gap-6">
        {doubled.map((art, i) => (
          <div
            key={i}
            className="h-64 w-52 shrink-0 overflow-hidden rounded-lg md:h-80 md:w-64"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`https://picsum.photos/seed/${art.seed}/500/700`}
              alt={art.alt}
              className="h-full w-full object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
