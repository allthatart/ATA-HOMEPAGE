"use client";

import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";
import { useLang } from "@/lib/i18n";

// 압구정역 3번 출구 → 올댓아트 (도보). [위도, 경도]
// 경로선은 도보 길찾기(OpenStreetMap 기반)로 계산한 좌표입니다. 약 350m, 도보 5분.
const START: [number, number] = [37.526063, 127.028672];
const END: [number, number] = [37.523723, 127.030282];
const ROUTE: [number, number][] = [
  [37.526063, 127.028672],
  [37.525976, 127.028668],
  [37.525939, 127.028666],
  [37.525835, 127.028661],
  [37.525015, 127.028599],
  [37.524547, 127.028576],
  [37.524474, 127.028568],
  [37.524259, 127.029036],
  [37.524071, 127.029527],
  [37.523723, 127.030282],
];

const ACCENT = "#ff3319";

function dot(color: string) {
  return `<span style="display:block;width:16px;height:16px;border-radius:9999px;background:${color};border:3px solid #fff;box-shadow:0 1px 4px rgba(0,0,0,.45)"></span>`;
}

export function RouteMap({ className }: { className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { lang } = useLang();

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let cancelled = false;
    let cleanup = () => {};

    // leaflet은 window가 필요하므로 브라우저에서만 불러옵니다.
    import("leaflet").then((mod) => {
      if (cancelled) return;
      const L = mod.default ?? mod;

      const map = L.map(el, { scrollWheelZoom: false, zoomControl: true });
      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noreferrer">OpenStreetMap</a>',
      }).addTo(map);

      // 경로선: 흰 테두리 위에 주황색 선
      L.polyline(ROUTE, { color: "#fff", weight: 9, opacity: 0.95 }).addTo(map);
      L.polyline(ROUTE, { color: ACCENT, weight: 5, opacity: 1 }).addTo(map);

      const startLabel = lang === "en" ? "Apgujeong Stn. Exit 3" : "압구정역 3번 출구";
      const endLabel = lang === "en" ? "All That Art" : "올댓아트";

      L.marker(START, {
        icon: L.divIcon({ html: dot("#1f2937"), className: "", iconSize: [16, 16], iconAnchor: [8, 8] }),
      })
        .addTo(map)
        .bindTooltip(startLabel, { permanent: true, direction: "top", offset: [0, -8] });
      L.marker(END, {
        icon: L.divIcon({ html: dot(ACCENT), className: "", iconSize: [16, 16], iconAnchor: [8, 8] }),
      })
        .addTo(map)
        .bindTooltip(endLabel, { permanent: true, direction: "bottom", offset: [0, 8] });

      map.fitBounds(L.latLngBounds(ROUTE), {
        paddingTopLeft: [40, 64],
        paddingBottomRight: [40, 72],
      });

      cleanup = () => map.remove();
    });

    return () => {
      cancelled = true;
      cleanup();
    };
  }, [lang]);

  return (
    <div
      ref={ref}
      className={className}
      role="img"
      aria-label={
        lang === "en"
          ? "Walking route from Exit 3 of Apgujeong Station to All That Art"
          : "압구정역 3번 출구에서 올댓아트까지 도보 경로 지도"
      }
    />
  );
}
