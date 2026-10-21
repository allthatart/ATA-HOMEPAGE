"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/utils";

type Config = {
  today: string; // YYYY-MM-DD (한국 시간)
  now: string; // HH:mm (한국 시간)
  days: number;
  slots: string[];
  closedWeekdays: number[];
  booked: Record<string, string[]>;
};

type Status = "idle" | "sending" | "done";

const EDU = [
  ["중학교 재학", "Middle school (current)"],
  ["중학교 졸업", "Middle school (graduated)"],
  ["고등학교 재학", "High school (current)"],
  ["고등학교 졸업", "High school (graduated)"],
  ["대학교 재학", "University (current)"],
  ["대학교 졸업", "University (graduated)"],
  ["대학원 재학", "Graduate school (current)"],
  ["대학원 졸업", "Graduate school (graduated)"],
] as const;

const ROUTES = [
  ["소개", "Referral"],
  ["홈페이지", "Website"],
  ["블로그", "Blog"],
  ["기타", "Other"],
] as const;

const TYPES = [
  ["방문 상담 [구체적인 진학상담]", "Visit (detailed admissions consultation)"],
  ["전화 상담 [간단한 질의응답]", "Phone (quick Q&A)"],
] as const;

const TEXT = {
  ko: {
    date: "예약일자",
    dateHint: (days: number) => `오늘부터 ${days}일 이내에서 선택할 수 있어요.`,
    time: "예약시간",
    pickDate: "먼저 날짜를 선택해 주세요.",
    full: "예약 마감",
    name: "이름",
    phone: "전화번호",
    phonePh: "010-1234-5678",
    edu: "최종학력",
    major: "희망전공",
    univ: "희망대학",
    route: "알게된 경로",
    type: "상담유형",
    memo: "추가 문의사항",
    select: "선택",
    submit: "상담 신청하기",
    sending: "접수 중…",
    loading: "예약 가능한 시간을 불러오는 중…",
    loadFail: "예약 화면을 불러오지 못했어요. 잠시 후 다시 시도하거나 전화로 문의해 주세요.",
    retry: "다시 시도",
    closedDay: "이 날은 상담을 받지 않아요. 다른 날짜를 선택해 주세요.",
    needAll: "날짜, 시간, 이름, 전화번호, 최종학력, 알게된 경로를 모두 입력해 주세요.",
    badPhone: "휴대폰 번호를 010-1234-5678 형식으로 입력해 주세요.",
    taken: "방금 다른 분이 같은 시간을 예약했어요. 다른 시간을 선택해 주세요.",
    tooMany: "같은 번호로는 예약을 2건까지만 할 수 있어요. 일정 변경은 전화로 문의해 주세요.",
    past: "이미 지난 시간이에요. 다른 시간을 선택해 주세요.",
    invalid: "입력 내용을 다시 확인해 주세요.",
    fail: "접수 중 문제가 생겼어요. 잠시 후 다시 시도하거나 전화로 문의해 주세요.",
    doneTitle: "상담 신청이 접수되었어요",
    doneDesc: "학원에서 확인 후 확정 여부를 문자로 안내드려요. 확정 문자를 받기 전에는 예약이 확정된 것이 아니에요.",
    doneNote: "신청하신 시간은 확인이 끝날 때까지 다른 분이 선택할 수 없어요.",
    again: "다른 시간 신청하기",
    phoneLabel: "전화 문의",
  },
  en: {
    date: "Date",
    dateHint: (days: number) => `You can book up to ${days} days ahead.`,
    time: "Time",
    pickDate: "Please choose a date first.",
    full: "Booked",
    name: "Name",
    phone: "Phone",
    phonePh: "010-1234-5678",
    edu: "Education",
    major: "Desired major",
    univ: "Desired university",
    route: "How did you hear about us?",
    type: "Consultation type",
    memo: "Additional questions",
    select: "Select",
    submit: "Request consultation",
    sending: "Submitting…",
    loading: "Loading available times…",
    loadFail: "Could not load the booking form. Please try again later or call us.",
    retry: "Try again",
    closedDay: "We don't take consultations on this day. Please choose another date.",
    needAll: "Please fill in date, time, name, phone, education and how you heard about us.",
    badPhone: "Please enter a mobile number like 010-1234-5678.",
    taken: "Someone just booked that time. Please choose another one.",
    tooMany: "Only 2 bookings are allowed per phone number. Please call us to change a booking.",
    past: "That time has already passed. Please choose another one.",
    invalid: "Please check your input.",
    fail: "Something went wrong. Please try again later or call us.",
    doneTitle: "Your request has been received",
    doneDesc: "We will review it and send you a text to confirm. Your booking is not confirmed until you receive that text.",
    doneNote: "The time you requested is held for you until we finish reviewing.",
    again: "Request another time",
    phoneLabel: "Call",
  },
} as const;

const fieldClass =
  "border-input focus-visible:border-ring focus-visible:ring-ring/50 h-9 w-full rounded-md border bg-transparent px-3 text-base shadow-xs outline-none focus-visible:ring-[3px] md:text-sm";

function weekdayOf(date: string) {
  const [y, m, d] = date.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

function addDays(date: string, n: number) {
  const [y, m, d] = date.split("-").map(Number);
  const dt = new Date(y, m - 1, d + n);
  const p = (v: number) => String(v).padStart(2, "0");
  return `${dt.getFullYear()}-${p(dt.getMonth() + 1)}-${p(dt.getDate())}`;
}

export function BookingForm({ apiUrl }: { apiUrl: string }) {
  const { lang } = useLang();
  const t = TEXT[lang === "en" ? "en" : "ko"];
  const en = lang === "en";

  const [config, setConfig] = useState<Config | null>(null);
  const [loadError, setLoadError] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [form, setForm] = useState({
    name: "",
    phone: "",
    edu: "",
    major: "",
    univ: "",
    route: "",
    type: TYPES[0][0] as string,
    memo: "",
    website: "", // 스팸 방지용 숨김 칸 (사람은 비워 둡니다)
  });

  // reloadKey 가 바뀔 때마다 최신 예약 현황을 다시 불러옵니다.
  const [reloadKey, setReloadKey] = useState(0);
  const reload = useCallback(() => setReloadKey((k) => k + 1), []);

  useEffect(() => {
    let cancelled = false;
    fetch(apiUrl, { cache: "no-store" })
      .then((res) => res.json())
      .then((data) => {
        if (cancelled) return;
        if (!data.ok) throw new Error("server");
        setConfig(data as Config);
        setLoadError(false);
      })
      .catch(() => {
        if (!cancelled) setLoadError(true);
      });
    return () => {
      cancelled = true;
    };
  }, [apiUrl, reloadKey]);

  const closedDay = useMemo(
    () => !!config && !!date && config.closedWeekdays.includes(weekdayOf(date)),
    [config, date]
  );

  const takenTimes = useMemo(
    () => new Set((config && date && config.booked[date]) || []),
    [config, date]
  );

  function slotDisabled(slot: string) {
    if (!config || !date || closedDay) return true;
    if (takenTimes.has(slot)) return true;
    if (date === config.today && slot <= config.now) return true;
    return false;
  }

  function update(key: keyof typeof form, value: string) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  function changeDate(value: string) {
    setDate(value);
    setTime("");
    setError("");
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!date || !time || !form.name.trim() || !form.phone.trim() || !form.edu || !form.route) {
      setError(t.needAll);
      return;
    }
    if (!/^01[016789]-?\d{3,4}-?\d{4}$/.test(form.phone.replace(/\s/g, ""))) {
      setError(t.badPhone);
      return;
    }

    setStatus("sending");
    try {
      // text/plain 으로 보내면 브라우저가 사전 확인 없이 바로 전송합니다. (구글 앱스 스크립트 웹 앱 방식)
      const res = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify({ ...form, date, time }),
      });
      const data = await res.json();
      if (data.ok) {
        setStatus("done");
        return;
      }
      setStatus("idle");
      const map: Record<string, string> = {
        slot_taken: t.taken,
        too_many: t.tooMany,
        past: t.past,
        invalid_phone: t.badPhone,
        invalid_date: t.invalid,
        invalid_time: t.invalid,
        invalid_name: t.invalid,
        invalid: t.invalid,
      };
      setError(map[data.error] ?? t.fail);
      if (data.error === "slot_taken" || data.error === "past") {
        setTime("");
        reload(); // 최신 예약 현황으로 다시 불러오기
      }
    } catch {
      setStatus("idle");
      setError(t.fail);
    }
  }

  function reset() {
    setStatus("idle");
    setDate("");
    setTime("");
    setError("");
    setForm((f) => ({ ...f, major: "", univ: "", memo: "" }));
    reload();
  }

  if (loadError) {
    return (
      <div className="text-center text-sm text-brand-ink/70">
        <p>{t.loadFail}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-4 rounded-full"
          onClick={() => {
            setLoadError(false);
            reload();
          }}
        >
          {t.retry}
        </Button>
        <p className="mt-6">
          {t.phoneLabel} <span className="font-semibold text-brand-ink">02-3443-9894</span>
        </p>
      </div>
    );
  }

  if (!config) {
    return <p className="py-6 text-center text-sm text-brand-ink/60">{t.loading}</p>;
  }

  if (status === "done") {
    return (
      <div className="py-4 text-center" role="status">
        <p className="font-serif text-xl font-bold text-brand-ink">{t.doneTitle}</p>
        <p className="mt-3 text-sm font-semibold text-brand-accent-deep">
          {date} {time}
        </p>
        <p className="mt-3 text-sm text-brand-ink/70">{t.doneDesc}</p>
        <p className="mt-2 text-xs text-brand-ink/50">{t.doneNote}</p>
        <Button
          type="button"
          variant="outline"
          className="mt-6 rounded-full"
          onClick={reset}
        >
          {t.again}
        </Button>
      </div>
    );
  }

  const label = "mb-1.5 block text-sm font-medium text-brand-ink";
  const req = <span className="text-brand-accent-deep"> *</span>;

  return (
    <form onSubmit={submit} className="space-y-5 text-left" noValidate>
      {/* 날짜 */}
      <div>
        <label htmlFor="bk-date" className={label}>
          {t.date}
          {req}
        </label>
        <Input
          id="bk-date"
          type="date"
          value={date}
          min={config.today}
          max={addDays(config.today, config.days)}
          onChange={(e) => changeDate(e.target.value)}
        />
        <p className="mt-1 text-xs text-brand-ink/50">{t.dateHint(config.days)}</p>
        {closedDay && <p className="mt-1 text-xs text-red-600">{t.closedDay}</p>}
      </div>

      {/* 시간 */}
      <div>
        <span className={label}>
          {t.time}
          {req}
        </span>
        {!date ? (
          <p className="text-sm text-brand-ink/50">{t.pickDate}</p>
        ) : (
          <div className="grid grid-cols-3 gap-2 sm:grid-cols-4">
            {config.slots.map((slot) => {
              const disabled = slotDisabled(slot);
              const full = takenTimes.has(slot);
              return (
                <button
                  key={slot}
                  type="button"
                  disabled={disabled}
                  onClick={() => setTime(slot)}
                  aria-pressed={time === slot}
                  className={cn(
                    "h-10 rounded-md border text-sm transition-colors",
                    time === slot
                      ? "border-[#f37520] bg-[#f37520] font-semibold text-white"
                      : "border-brand-line bg-brand-paper text-brand-ink hover:border-[#f37520]",
                    disabled &&
                      "cursor-not-allowed border-brand-line bg-brand-canvas text-brand-ink/30 hover:border-brand-line"
                  )}
                >
                  <span className={cn(full && "line-through")}>{slot}</span>
                  {full && <span className="ml-1 text-[10px] no-underline">{t.full}</span>}
                </button>
              );
            })}
          </div>
        )}
      </div>

      {/* 이름 / 전화번호 */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-name" className={label}>
            {t.name}
            {req}
          </label>
          <Input
            id="bk-name"
            value={form.name}
            maxLength={40}
            autoComplete="name"
            onChange={(e) => update("name", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bk-phone" className={label}>
            {t.phone}
            {req}
          </label>
          <Input
            id="bk-phone"
            type="tel"
            inputMode="tel"
            value={form.phone}
            maxLength={20}
            placeholder={t.phonePh}
            autoComplete="tel"
            onChange={(e) => update("phone", e.target.value)}
          />
        </div>
      </div>

      {/* 최종학력 / 알게된 경로 */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-edu" className={label}>
            {t.edu}
            {req}
          </label>
          <select
            id="bk-edu"
            className={fieldClass}
            value={form.edu}
            onChange={(e) => update("edu", e.target.value)}
          >
            <option value="">{t.select}</option>
            {EDU.map(([ko, enLabel]) => (
              <option key={ko} value={ko}>
                {en ? enLabel : ko}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="bk-route" className={label}>
            {t.route}
            {req}
          </label>
          <select
            id="bk-route"
            className={fieldClass}
            value={form.route}
            onChange={(e) => update("route", e.target.value)}
          >
            <option value="">{t.select}</option>
            {ROUTES.map(([ko, enLabel]) => (
              <option key={ko} value={ko}>
                {en ? enLabel : ko}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* 희망전공 / 희망대학 */}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="bk-major" className={label}>
            {t.major}
          </label>
          <Input
            id="bk-major"
            value={form.major}
            maxLength={60}
            onChange={(e) => update("major", e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="bk-univ" className={label}>
            {t.univ}
          </label>
          <Input
            id="bk-univ"
            value={form.univ}
            maxLength={60}
            onChange={(e) => update("univ", e.target.value)}
          />
        </div>
      </div>

      {/* 상담유형 */}
      <fieldset>
        <legend className={label}>{t.type}</legend>
        <div className="space-y-2">
          {TYPES.map(([ko, enLabel]) => (
            <label key={ko} className="flex cursor-pointer items-center gap-2 text-sm text-brand-ink">
              <input
                type="radio"
                name="bk-type"
                value={ko}
                checked={form.type === ko}
                onChange={() => update("type", ko)}
                className="size-4 accent-[#f37520]"
              />
              {en ? enLabel : ko}
            </label>
          ))}
        </div>
      </fieldset>

      {/* 추가 문의 */}
      <div>
        <label htmlFor="bk-memo" className={label}>
          {t.memo}
        </label>
        <textarea
          id="bk-memo"
          rows={3}
          maxLength={1000}
          value={form.memo}
          onChange={(e) => update("memo", e.target.value)}
          className={cn(fieldClass, "h-auto py-2")}
        />
      </div>

      {/* 스팸 방지용 숨김 칸: 사람에게는 보이지 않습니다 */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={form.website}
            onChange={(e) => update("website", e.target.value)}
          />
        </label>
      </div>

      {error && (
        <p role="alert" className="rounded-md bg-red-50 px-3 py-2 text-sm text-red-700">
          {error}
        </p>
      )}

      <Button
        type="submit"
        size="lg"
        disabled={status === "sending"}
        className="w-full rounded-full bg-[#f37520] hover:bg-brand-accent-deep"
      >
        {status === "sending" ? t.sending : t.submit}
      </Button>
    </form>
  );
}
