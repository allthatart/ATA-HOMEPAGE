import Link from "next/link";

export function Footer() {
  return (
    <footer className="border-t border-brand-line bg-brand-canvas">
      <div className="w-full px-5 py-14 md:px-10">
        <div className="grid gap-10 md:grid-cols-3">
          <div>
            <p className="font-serif text-lg font-bold tracking-tight text-brand-ink">
              ALL THAT ART
            </p>
            <p className="mt-3 text-sm leading-relaxed text-brand-ink/60">
              유학미술의 모든것. 사람과 사람이 만들어 갑니다.
            </p>
            <div className="mt-4 flex gap-4 text-xs text-brand-ink/50">
              <a
                href="https://blog.naver.com/allthatartseoul"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent"
              >
                NAVER BLOG
              </a>
              <a
                href="https://www.instagram.com/allthatart_seoul/"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent"
              >
                INSTAGRAM
              </a>
              <a
                href="https://www.youtube.com/channel/UC7ryDQMngDpL1OF-9P9Vojw"
                target="_blank"
                rel="noreferrer"
                className="hover:text-brand-accent"
              >
                YOUTUBE
              </a>
            </div>
          </div>

          <div className="text-sm text-brand-ink/70">
            <p className="font-medium text-brand-ink">오시는 길</p>
            <p className="mt-3">서울시 강남구 논현로 168길 25</p>
            <p className="mt-1">B/D Allthatart</p>
            <p className="mt-3">Tel. 02-3443-9894</p>
            <p className="mt-1">Fax. 02-3443-6549</p>
          </div>

          <div className="text-sm text-brand-ink/70">
            <p className="font-medium text-brand-ink">바로가기</p>
            <ul className="mt-3 space-y-2">
              <li>
                <Link href="/about" className="hover:text-brand-accent">
                  학원 소개
                </Link>
              </li>
              <li>
                <Link href="/curriculum" className="hover:text-brand-accent">
                  커리큘럼
                </Link>
              </li>
              <li>
                <Link href="/results" className="hover:text-brand-accent">
                  합격결과
                </Link>
              </li>
              <li>
                <Link href="/consultation" className="hover:text-brand-accent">
                  상담예약
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-brand-line pt-6 text-xs text-brand-ink/40">
          © 2010 - {new Date().getFullYear()} All That Art. All Rights
          Reserved.
        </div>
      </div>
    </footer>
  );
}
