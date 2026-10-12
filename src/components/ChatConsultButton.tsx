"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";

const CONTACT_EMAIL = "ata@allthatart.co.kr";
const PHONE_DISPLAY = "02-3443-9894";

type Status = "idle" | "sent";

function InquiryModal({ onClose }: { onClose: () => void }) {
  const [status, setStatus] = useState<Status>("idle");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const subject = `[홈페이지 채팅상담] ${name || "이름 미입력"}`;
    const body = [
      `이름: ${name}`,
      `이메일: ${email}`,
      `전화번호: ${phone}`,
      "",
      "메시지:",
      message,
    ].join("\n");

    // 별도 서버 없이, 방문자의 메일 앱으로 바로 문의 내용을 보냅니다.
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(
      subject
    )}&body=${encodeURIComponent(body)}`;

    setStatus("sent");
  }

  return createPortal(
    <div
      role="dialog"
      aria-modal="true"
      aria-label="채팅 상담"
      onClick={onClose}
      className="fixed inset-0 z-[100] flex items-end justify-center bg-black/60 p-0 md:items-center md:p-6"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="flex max-h-[85vh] w-full max-w-sm flex-col overflow-hidden rounded-t-2xl bg-brand-ink shadow-2xl md:rounded-2xl"
      >
        {/* 헤더 */}
        <div className="flex items-start justify-between px-6 py-5">
          <div>
            <p className="text-lg font-bold text-white">
              Allthatart {PHONE_DISPLAY}
            </p>
            <p className="mt-1 text-sm text-white/60">
              최선을 다해 상담드리겠습니다.
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="text-white/60 transition-colors hover:text-white"
          >
            <X className="size-6" />
          </button>
        </div>

        <div className="overflow-y-auto px-6 pb-6">
          {status === "sent" ? (
            <div className="rounded-xl bg-white/5 px-5 py-8 text-center">
              <p className="font-semibold text-white">
                문의가 접수됐어요.
              </p>
              <p className="mt-2 text-sm text-white/60">
                메일 앱이 열리지 않았다면 {CONTACT_EMAIL} 로 직접
                보내주셔도 돼요.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <label className="block">
                <span className="text-sm text-white/50">이름</span>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="mt-1 w-full border-b border-white/25 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/50">이메일</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1 w-full border-b border-white/25 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/50">전화번호</span>
                <input
                  required
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="mt-1 w-full border-b border-white/25 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white"
                />
              </label>
              <label className="block">
                <span className="text-sm text-white/50">메시지</span>
                <textarea
                  rows={3}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1 w-full resize-none border-b border-white/25 bg-transparent py-2 text-white outline-none placeholder:text-white/30 focus:border-white"
                />
              </label>

              <button
                type="submit"
                className="w-full rounded-full bg-white py-3 text-sm font-bold text-brand-ink transition-transform hover:scale-[1.02]"
              >
                제출
              </button>
            </form>
          )}

          <p className="mt-6 text-xs leading-relaxed text-white/40">
            방문 상담을 원하실 경우, 가능하신 날짜와 시간을 알려주시면
            확인 후 연락드리겠습니다. (상담은 무료로 진행됩니다.)
          </p>
        </div>
      </div>
    </div>,
    document.body
  );
}

export function ChatConsultButton() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="채팅 상담"
        className="flex h-12 items-center gap-2 rounded-full bg-[#FEE500] px-5 text-sm font-bold text-[#391B1B] shadow-lg transition-transform hover:scale-105 md:h-14 md:px-6 md:text-base"
      >
        <svg viewBox="0 0 24 24" className="size-5 shrink-0 md:size-6">
          <path
            fill="currentColor"
            d="M12 3C6.48 3 2 6.58 2 11c0 2.79 1.82 5.24 4.56 6.67-.2.73-.72 2.63-.83 3.04-.13.5.19.5.4.36.16-.1 2.58-1.75 3.62-2.46.71.1 1.45.16 2.25.16 5.52 0 10-3.58 10-8s-4.48-8-10-8z"
          />
        </svg>
        채팅 상담
      </button>
      {open && <InquiryModal onClose={() => setOpen(false)} />}
    </>
  );
}
