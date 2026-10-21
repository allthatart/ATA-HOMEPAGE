import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { jejuGothic } from "@/fonts";
import { T } from "@/components/T";
import { BookingForm } from "@/components/BookingForm";
import { BOOKING_API_URL, FALLBACK_FORM_URL } from "@/lib/booking";

const STEPS = [
  {
    title: "예약 신청",
    titleEn: "Request",
    desc: "아래에서 날짜와 시간을 고르고 상담 신청서를 작성해 주세요.",
    descEn: "Choose a date and time below and fill out the consultation form.",
  },
  {
    title: "일정 조율",
    titleEn: "Scheduling",
    desc: "담당 선생님이 확인한 뒤 확정 여부를 문자로 안내드려요. 확정 문자를 받으면 예약이 완료돼요.",
    descEn:
      "A teacher will review your request and text you to confirm. Your booking is complete once you receive the confirmation.",
  },
  {
    title: "방문 상담",
    titleEn: "In-Person Consultation",
    desc: "학생의 포트폴리오와 목표를 듣고 맞춤 커리큘럼을 제안해 드려요.",
    descEn:
      "We'll discuss the student's portfolio and goals and suggest a tailored curriculum.",
  },
];

export default function ConsultationPage() {
  return (
    <>
      <section className="w-full px-5 md:px-10 pt-20 pb-16">
          <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
          Consultation
        </p>
        <h1
          className={`${jejuGothic.className} mt-4 max-w-2xl text-4xl leading-[1.15] text-brand-ink md:text-6xl`}
        >
          <T
            ko={
              <>
                상담은 무료입니다.
                <br />
                편하게 문의해주세요.
              </>
            }
            en={<>Consultations are free. Feel free to reach out.</>}
          />
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-brand-ink/70">
          <T
            ko="희망 대학과 전공, 현재 포트폴리오 상태를 먼저 듣고, 세밀한
          진학계획과 함께 맞춤 커리큘럼을 안내해 드립니다."
            en="We'll start by learning about your target university, major,
          and current portfolio, then guide you through a detailed
          admissions plan and a curriculum tailored to you."
          />
        </p>
      
          </div>
      </section>

      <section className="w-full px-5 md:px-10 pb-24">
        <div className="grid gap-8 md:grid-cols-[1fr_1.2fr] md:items-start">
          <div className="space-y-4">
            {STEPS.map((step, i) => (
              <Reveal key={step.title} delay={i * 120} className="flex gap-4">
                <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-accent font-serif text-sm font-bold text-white">
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-brand-ink">
                    <T ko={step.title} en={step.titleEn} />
                  </p>
                  <p className="mt-1 text-sm text-brand-ink/60">
                    <T ko={step.desc} en={step.descEn} />
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={150}>
          <Card className="border-brand-line bg-brand-canvas">
            <CardContent className="text-center py-4">
              <p className="font-serif text-xl font-bold text-brand-ink">
                <T ko="지금 바로 상담을 신청하세요" en="Request your consultation now" />
              </p>
              <p className="mt-2 text-sm text-brand-ink/60">
                <T
                  ko="신청서 작성은 1분이면 충분해요."
                  en="The form only takes about a minute."
                />
              </p>

              {BOOKING_API_URL ? (
                <div className="mt-6">
                  <BookingForm apiUrl={BOOKING_API_URL} />
                </div>
              ) : (
                <Button
                  size="lg"
                  className="mt-6 w-full rounded-full bg-[#f37520] hover:bg-brand-accent-deep sm:w-auto"
                  asChild
                >
                  <a
                    href={FALLBACK_FORM_URL}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <T ko="상담 신청서 작성하기" en="Fill Out the Form" />
                  </a>
                </Button>
              )}

              <div className="mt-8 border-t border-brand-line pt-6 text-sm text-brand-ink/70">
                <p>
                  <T ko="전화 상담도 가능합니다" en="Phone consultations are also available" />
                </p>
                <p className="mt-1 font-semibold text-brand-ink">
                  02-3443-9894
                </p>
              </div>
            </CardContent>
          </Card>
          </Reveal>
        </div>
      </section>
    </>
  );
}
