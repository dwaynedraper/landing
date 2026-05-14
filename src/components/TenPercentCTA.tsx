'use client';

import { plausible } from '@/lib/plausible';

interface TenPercentCTAProps {
  href: string;
}

export default function TenPercentCTA({ href }: TenPercentCTAProps) {
  function handleClick() {
    plausible('ten_percent_submitted');
  }

  return (
    <a
      href={href}
      onClick={handleClick}
      className="inline-flex items-center gap-2 text-xs tracking-[0.12em] uppercase font-sans font-semibold px-6 py-3.5 transition-opacity duration-200 hover:opacity-80"
      style={{
        background: 'var(--accent)',
        color: 'var(--bg)',
      }}
    >
      Submit a cause →
    </a>
  );
}
