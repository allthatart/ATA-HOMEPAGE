import { Reveal } from "@/components/Reveal";
import { jejuGothic } from "@/fonts";
import { T } from "@/components/T";

const INFO = [
  {
    label: "주소",
    labelEn: "Address",
    value: "서울시 강남구 논현로 168길 25, B/D Allthatart",
    valueEn: "25, Nonhyeon-ro 168-gil, Gangnam-gu, Seoul, B/D Allthatart",
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
            <iframe
              src="https://www.google.com/maps?q=%EC%84%9C%EC%9A%B8%ED%8A%B9%EB%B3%84%EC%8B%9C%20%EA%B0%95%EB%82%A8%EA%B5%AC%20%EB%85%BC%ED%98%84%EB%A1%9C168%EA%B8%B8%2025&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="올댓아트 오시는 길 지도"
            />
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
                  </dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>
    </>
  );
}
