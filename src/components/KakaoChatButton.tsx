const KAKAO_CHANNEL_ID = "_hMxoxnX";

export function KakaoChatButton() {
  return (
    <a
      href={`https://pf.kakao.com/${KAKAO_CHANNEL_ID}/chat`}
      target="_blank"
      rel="noreferrer"
      aria-label="카카오톡 채팅 상담"
      className="flex h-12 items-center gap-2 rounded-full bg-[#FEE500] px-5 text-sm font-bold text-[#391B1B] shadow-lg transition-transform hover:scale-105 md:h-14 md:px-6 md:text-base"
    >
      <svg viewBox="0 0 24 24" className="size-5 shrink-0 md:size-6">
        <path
          fill="currentColor"
          d="M12 3C6.48 3 2 6.58 2 11c0 2.79 1.82 5.24 4.56 6.67-.2.73-.72 2.63-.83 3.04-.13.5.19.5.4.36.16-.1 2.58-1.75 3.62-2.46.71.1 1.45.16 2.25.16 5.52 0 10-3.58 10-8s-4.48-8-10-8z"
        />
      </svg>
      채팅 상담
    </a>
  );
}
