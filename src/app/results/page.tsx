import type { Metadata } from "next";
import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { jejuGothic } from "@/fonts";
import { T } from "@/components/T";
import {
  ADMISSIONS,
  ADMISSIONS_TOTAL,
  ADMISSIONS_UNIVERSITIES,
  ADMISSIONS_UPDATED_AT,
} from "@/lib/admissions";

export const metadata: Metadata = {
  title: "합격결과",
  description:
    "2010-2026학년도 해외 명문 미술대학 합격 현황. 167개 대학, 6,800건 이상의 합격허가 기록.",
  alternates: { canonical: "/results" },
};

const ACHIEVEMENTS = [
  {
    value: `${ADMISSIONS_TOTAL.toLocaleString()}건`,
    label: `총 ${ADMISSIONS_UNIVERSITIES}개 대학 합격승인 건수`,
    labelEn: `admissions to ${ADMISSIONS_UNIVERSITIES} universities`,
  },
  { value: "79%", label: "장학생 합격 비율", labelEn: "scholarship acceptance rate" },
  { value: "$78,326,117", label: "누적 장학금 액수", labelEn: "in cumulative scholarships" },
];

export default function ResultsPage() {
  return (
    <>
      <section className="w-full px-5 md:px-10 pt-20 pb-16">
          <div className="mx-auto max-w-3xl">
        <p className="text-sm font-semibold tracking-[0.2em] text-brand-accent-deep uppercase">
          Results
        </p>
        <h1
          className={`${jejuGothic.className} mt-4 max-w-2xl text-4xl leading-[1.15] text-brand-ink md:text-6xl`}
        >
          <T
            ko={
              <>
                2026학년도 합격을
                <br />
                축하드립니다.
              </>
            }
            en={<>Congratulations to our 2026 admits.</>}
          />
        </h1>
        <p className="mt-8 max-w-2xl leading-relaxed text-brand-ink/70">
          <T
            ko={
              <>
                “올댓아트”는 미술유학 전문 교육기관으로 2009년에 설립되어
                창의적 미술인재 양성과
                <br />
                해외 명문 미술대학 입학을 위해 최선의 노력을 다 하고 있습니다.
              </>
            }
            en={
              <>
                All That Art is a specialist art-study-abroad academy founded in
                2009. We do our utmost to nurture creative art talent and to
                help students gain admission to leading art universities
                overseas.
              </>
            }
          />
        </p>
        <p className="mt-4 max-w-2xl leading-relaxed text-brand-ink/70">
          <T
            ko="추가 합격발표가 계속 이어지고 있습니다."
            en="More admission results are coming in."
          />
        </p>
      
          </div>
      </section>

      <section className="border-y border-brand-line bg-brand-canvas py-20">
        <div className="w-full px-5 md:px-10">
          <div className="grid gap-6 sm:grid-cols-3">
            {ACHIEVEMENTS.map((a, i) => (
              <Reveal key={a.label} delay={i * 120} variant="pop">
                <Card className="border-brand-line bg-brand-paper h-full">
                  <CardContent className="text-center py-4">
                    <p className="font-serif text-3xl font-bold text-brand-accent">
                      {a.value}
                    </p>
                    <p className="mt-2 text-sm text-brand-ink/60">
                      <T ko={a.label} en={a.labelEn} />
                    </p>
                  </CardContent>
                </Card>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="w-full px-5 md:px-50 py-20">
        <Reveal>
          <h2 className="font-serif text-2xl font-bold text-brand-ink md:text-3xl">
            <T
              ko="해외 명문 미술대학 합격 현황 (2010-2026학년도)"
              en="Admissions by University (2010-2026)"
            />
          </h2>
          <p className="mt-3 font-serif text-xl font-bold text-brand-accent">
            <T
              ko="합격을 축하합니다 🎉🎉🎉"
              en="Congratulations! 🎉🎉🎉"
            />
          </p>

          <p className="mt-2 text-sm text-brand-ink/50">
            <T
              ko={`${ADMISSIONS_UPDATED_AT} 업데이트`}
              en={`Updated ${ADMISSIONS_UPDATED_AT}`}
            />
          </p>

          <div className="mx-auto mt-8 w-full overflow-x-auto rounded-lg ring-1 ring-brand-line md:w-1/2">
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-brand-canvas text-left text-brand-ink/60">
                  <th className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-3 font-medium">
                    <T ko="번호" en="No." />
                  </th>
                  <th className="px-3 py-3 sm:px-5 sm:py-3 font-medium">
                    <T ko="대학교" en="University" />
                  </th>
                  <th className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-3 font-medium">
                    <T ko="합격허가 수" en="Admissions" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {ADMISSIONS.map((row) => (
                  <tr
                    key={row.no}
                    className="border-t border-brand-line odd:bg-brand-paper even:bg-brand-canvas/40"
                  >
                    <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-3 text-brand-ink/40">
                      {String(row.no).padStart(3, "0")}
                    </td>
                    <td className="px-3 py-3 sm:px-5 sm:py-3 font-medium text-brand-ink">
                      {row.university}
                    </td>
                    <td className="whitespace-nowrap px-3 py-3 sm:px-5 sm:py-3 font-semibold text-brand-accent-deep">
                      {row.count.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Reveal>
      </section>
    </>
  );
}
