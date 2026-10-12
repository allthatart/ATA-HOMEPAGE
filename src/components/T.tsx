"use client";

import type { ReactNode } from "react";
import { useLang } from "@/lib/i18n";

// 짧은 텍스트를 한국어/영어로 바꿔 보여주는 컴포넌트.
// 예: <T ko="상담예약" en="Consultation" />
export function T({ ko, en }: { ko: ReactNode; en: ReactNode }) {
  const { lang } = useLang();
  return <>{lang === "en" ? en : ko}</>;
}
