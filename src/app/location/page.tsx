import type { Metadata } from "next";
import { Reveal } from "@/components/Reveal";
import { jejuGothic } from "@/fonts";
import { T } from "@/components/T";
import { RouteMap } from "@/components/RouteMap";

export const metadata: Metadata = {
  title: "오시는 길",
  description:
    "올댓아트 위치와 연락처. 서울시 강남구 논현로168길 25, 압구정역 3번 출구에서 약 300m.",
  alternates: { canonical: "/location" },
};

type InfoItem = {
  label: string;
  labelEn: string;
  value: string;
  valueEn: string;
  note?: string;
  noteEn?: string;
};

// 지도 아래 "길찾기 열기" 버튼: 구글 지도에서 같은 도보 길찾기를 엽니다.
const DIRECTIONS_URL =
  "https://www.google.com/maps/dir/?api=1&origin=%EC%95%95%EA%B5%AC%EC%A0%95%EC%97%AD%203%EB%B2%88%20%EC%B6%9C%EA%B5%AC&destination=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%85%BC%ED%98%84%EB%A1%9C168%EA%B8%B8%2025&travelmode=walking";

const INFO: InfoItem[] = [
  {
    label: "주소",
    labelEn: "Address",
    value: "서울시 강남구 논현로 168길 25, B/D Allthatart",
    valueEn: "25, Nonhyeon-ro 168-gil, Gangnam-gu, Seoul, B/D Allthatart",
    note: "압구정역 3번 출구에서 약 300m 거리",
    noteEn: "About 300 m from Exit 3 of Apgujeong Station",
  },
  { label: "전화", labelEn: "Phone", value: "02-3443-9894", valueEn: "02-3443-9894" },
  { label: "팩스", labelEn: "Fax", value: "02-3443-6549", valueEn: "02-3443-6549" },
  {
    label: "안내데스크",
    labelEn: "Front Desk",
    value: "월~토 11:00 – 20:00 · 일요일 13:00 – 20:00",
    valueEn: "Mon–Sat 11:00 AM – 8:00 PM · Sun 1:00 PM – 8:00 PM",
  },
  {
    label: "강의시간",
    labelEn: "Class Hours",
    value: "방학중 09:30 – 22:00 · 학기중 13:00 – 21:00",
    valueEn: "Vacation 9:30 AM – 10:00 PM · Term 1:00 PM – 9:00 PM",
  },
];

export default function LocationPage() {
  return (
    <>
      <section className="w-full px-5 md:px-10 pt-20 pb-16">
          <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
          Location
        </p>
        <h1
          className={`${jejuGothic.className} mt-4 max-w-2xl text-4xl leading-[1.15] text-brand-ink md:text-6xl`}
        >
          <T ko="오시는 길" en="Location" />
        </h1>
      
          </div>
      </section>

      <section className="w-full px-5 md:px-10 pb-24">
        <div className="grid gap-10 md:grid-cols-2">
          {/* Google Maps */}
          <Reveal className="aspect-[4/3] overflow-hidden rounded-lg ring-1 ring-brand-line">
            <RouteMap className="h-full w-full" />
          </Reveal>

          <Reveal delay={150}>
            <dl className="divide-y divide-brand-line">
              {INFO.map((item) => (
                <div key={item.label} className="grid grid-cols-3 gap-4 py-4">
                  <dt className="text-sm font-medium text-brand-ink/50">
                    <T ko={item.label} en={item.labelEn} />
                  </dt>
                  <dd className="col-span-2 text-sm text-brand-ink">
                    <T ko={item.value} en={item.valueEn} />
                    {item.note && (
                      <p className="mt-1 break-keep text-brand-ink/60">
                        <T ko={item.note} en={item.noteEn ?? item.note} />
                      </p>
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <a
              href={DIRECTIONS_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-6 inline-flex items-center rounded-full bg-brand-ink px-5 py-2.5 text-sm font-medium text-white transition-colors hover:bg-brand-accent-deep"
            >
              <T
                ko="압구정역 3번 출구 길찾기 열기"
                en="Open walking directions from Exit 3"
              />
            </a>
          </Reveal>
        </div>
      </section>
    </>
  );
}
