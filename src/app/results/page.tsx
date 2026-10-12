import { Card, CardContent } from "@/components/ui/card";
import { Reveal } from "@/components/Reveal";
import { jejuGothic } from "@/fonts";
import { T } from "@/components/T";

const ACHIEVEMENTS = [
  { value: "6,619건", label: "총 132개 대학 합격승인 건수", labelEn: "admissions to 132 universities" },
  { value: "79%", label: "장학생 합격 비율", labelEn: "scholarship acceptance rate" },
  { value: "$78,326,117", label: "누적 장학금 액수", labelEn: "in cumulative scholarships" },
];

const ACCEPTANCE_LIST = [
  { name: "김**", university: "Aster University", major: "Design", scholarship: "$20,000" },
  { name: "이**", university: "Bloom University", major: "Design", scholarship: "-" },
  { name: "박**", university: "Crest University", major: "Design", scholarship: "$15,000" },
  { name: "최**", university: "Nova University", major: "Design", scholarship: "-" },
  { name: "정**", university: "Lumen University", major: "Design", scholarship: "$28,000" },
  { name: "한**", university: "Atlas University", major: "Design", scholarship: "-" },
  { name: "윤**", university: "Maple University", major: "Design", scholarship: "$12,000" },
  { name: "서**", university: "River University", major: "Design", scholarship: "-" },
  { name: "강**", university: "Orion University", major: "Design", scholarship: "$25,000" },
  { name: "조**", university: "Haven University", major: "Design", scholarship: "-" },
  { name: "임**", university: "Cedar University", major: "Design", scholarship: "$18,000" },
  { name: "장**", university: "Vivid University", major: "Design", scholarship: "-" },
  { name: "송**", university: "Aspen University", major: "Design", scholarship: "$30,000" },
  { name: "오**", university: "Sterling University", major: "Design", scholarship: "-" },
  { name: "신**", university: "Aurora University", major: "Design", scholarship: "$14,000" },
  { name: "권**", university: "Meridian University", major: "Design", scholarship: "-" },
  { name: "황**", university: "Summit University", major: "Design", scholarship: "$22,000" },
  { name: "안**", university: "Willow University", major: "Design", scholarship: "-" },
  { name: "류**", university: "Horizon University", major: "Design", scholarship: "$17,000" },
  { name: "전**", university: "Vertex University", major: "Design", scholarship: "-" },
  { name: "홍**", university: "Pine University", major: "Design", scholarship: "$26,000" },
  { name: "문**", university: "Ember University", major: "Design", scholarship: "-" },
  { name: "배**", university: "Ivory University", major: "Design", scholarship: "$13,000" },
  { name: "백**", university: "Echo University", major: "Design", scholarship: "-" },
  { name: "허**", university: "Terra University", major: "Design", scholarship: "$21,000" },
  { name: "남**", university: "Zenith University", major: "Design", scholarship: "-" },
  { name: "구**", university: "Clover University", major: "Design", scholarship: "$29,000" },
  { name: "노**", university: "Harbor University", major: "Design", scholarship: "-" },
  { name: "주**", university: "Fable University", major: "Design", scholarship: "$16,000" },
  { name: "심**", university: "Opal University", major: "Design", scholarship: "-" },
  { name: "유**", university: "Grove University", major: "Design", scholarship: "$24,000" },
  { name: "차**", university: "Beacon University", major: "Design", scholarship: "-" },
  { name: "도**", university: "Solace University", major: "Design", scholarship: "$11,000" },
  { name: "하**", university: "Prism University", major: "Design", scholarship: "-" },
  { name: "민**", university: "Noble University", major: "Design", scholarship: "$27,000" },
  { name: "표**", university: "Verve University", major: "Design", scholarship: "-" },
  { name: "진**", university: "Origin University", major: "Design", scholarship: "$19,000" },
  { name: "류**", university: "Eden University", major: "Design", scholarship: "-" },
  { name: "성**", university: "Axis University", major: "Design", scholarship: "$23,000" },
  { name: "양**", university: "Muse University", major: "Design", scholarship: "-" },
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
            <T ko="합격 명단" en="Admission List" />
          </h2>
          <p className="mt-3 font-serif text-xl font-bold text-brand-accent">
            <T
              ko="합격을 축하합니다 🎉🎉🎉"
              en="Congratulations! 🎉🎉🎉"
            />
          </p>

          <div className="mx-auto mt-8 w-full overflow-x-auto rounded-lg ring-1 ring-brand-line md:w-1/2">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="bg-brand-canvas text-left text-brand-ink/60">
                  <th className="px-5 py-3 font-medium">
                    <T ko="이름" en="Name" />
                  </th>
                  <th className="px-5 py-3 font-medium">
                    <T ko="대학교" en="University" />
                  </th>
                  <th className="px-5 py-3 font-medium">
                    <T ko="전공" en="Major" />
                  </th>
                  <th className="px-5 py-3 font-medium">
                    <T ko="장학금" en="Scholarship" />
                  </th>
                </tr>
              </thead>
              <tbody>
                {ACCEPTANCE_LIST.map((row, i) => (
                  <tr
                    key={i}
                    className="border-t border-brand-line odd:bg-brand-paper even:bg-brand-canvas/40"
                  >
                    <td className="px-5 py-3 font-medium text-brand-ink">
                      {row.name}
                    </td>
                    <td className="px-5 py-3 text-brand-ink/80">
                      {row.university}
                    </td>
                    <td className="px-5 py-3 text-brand-ink/80">
                      {row.major}
                    </td>
                    <td
                      className={
                        row.scholarship === "-"
                          ? "px-5 py-3 text-brand-ink/40"
                          : "px-5 py-3 font-semibold text-brand-accent-deep"
                      }
                    >
                      {row.scholarship}
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
