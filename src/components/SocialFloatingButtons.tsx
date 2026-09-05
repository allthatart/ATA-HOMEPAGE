import Link from "next/link";

function InstagramIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5 md:size-6">
      <rect x="3" y="3" width="18" height="18" rx="5" stroke="currentColor" strokeWidth="2" />
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2" />
      <circle cx="17.5" cy="6.5" r="1.2" fill="currentColor" />
    </svg>
  );
}

function BlogIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" className="size-5 md:size-6">
      <path
        d="M4 4h11l5 5v11H4V4z"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path d="M8 11h8M8 15h5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  {
    href: "https://www.instagram.com/allthatart_seoul/",
    label: "인스타그램",
    Icon: InstagramIcon,
  },
  {
    href: "https://blog.naver.com/allthatartseoul",
    label: "네이버 블로그",
    Icon: BlogIcon,
  },
];

export function SocialFloatingButtons() {
  return (
    <div className="fixed bottom-6 right-5 z-30 flex flex-col gap-3 md:bottom-8 md:right-8">
      {SOCIAL_LINKS.map(({ href, label, Icon }) => (
        <Link
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="flex size-12 items-center justify-center rounded-full bg-brand-ink text-white shadow-lg transition-colors hover:bg-brand-accent md:size-14"
        >
          <Icon />
        </Link>
      ))}
    </div>
  );
}
