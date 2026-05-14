import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: '404 — Page Not Found',
};

const links = [
  { label: 'Portraits & Headshots', sub: 'sharpsighted.photos', href: 'https://sharpsighted.photos', color: '#38bdf8' },
  { label: 'Real Estate Media', sub: 'sharpsighted.media', href: 'https://sharpsighted.media', color: '#c9922a' },
  { label: 'Community & Studio', sub: 'sharpsighted.studio', href: 'https://sharpsighted.studio', color: '#a0462a' },
  { label: 'Back to the Hub', sub: 'sharpsightedstudio.com', href: '/', color: undefined },
];

export default function NotFound() {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-[70vh] py-20 px-5"
      style={{ background: 'var(--bg)' }}
    >
      <p className="eyebrow" style={{ justifyContent: 'center' }}>404</p>
      <h1
        className="text-[clamp(2.5rem,8vw,4rem)] font-serif font-light leading-[1.1] text-center mb-4"
        style={{ color: 'var(--text)' }}
      >
        Nothing here.
      </h1>
      <p
        className="text-base text-center mb-12 max-w-sm"
        style={{ color: 'var(--text-mid)' }}
      >
        The page you&apos;re looking for doesn&apos;t exist. Here&apos;s where you might be headed:
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            className="flex flex-col gap-1 p-5 rounded-sm transition-opacity duration-200 hover:opacity-80"
            style={{
              background: 'var(--surface)',
              border: `1px solid ${l.color ? l.color + '33' : 'var(--border)'}`,
            }}
          >
            <span
              className="text-xs font-sans font-semibold tracking-[0.1em] uppercase"
              style={{ color: l.color ?? 'var(--brand-cyan)' }}
            >
              {l.label}
            </span>
            <span
              className="text-xs"
              style={{ color: 'var(--text-muted)' }}
            >
              {l.sub}
            </span>
          </Link>
        ))}
      </div>

      <p
        className="mt-16 font-serif font-light italic text-lg"
        style={{ color: 'var(--text-muted)' }}
      >
        Stay Sharp. Stay Seen. Stay Human.
      </p>
    </div>
  );
}
