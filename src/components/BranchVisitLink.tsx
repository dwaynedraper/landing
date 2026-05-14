'use client';

import { plausible } from '@/lib/plausible';

interface BranchVisitLinkProps {
  name: string;
  href: string;
  cookie: string;
  pillarColor: string;
  className?: string;
}

export default function BranchVisitLink({
  name,
  href,
  cookie,
  pillarColor,
  className,
}: BranchVisitLinkProps) {
  function handleClick() {
    document.cookie = `ss_preferred_site=${cookie}; path=/; max-age=${30 * 24 * 60 * 60}; SameSite=Lax`;
    plausible('about_to_branch_clicked', { props: { branch: cookie } });
  }

  const trackedHref = `${href}?from=hub&utm_source=sharpsightedstudio.com&utm_medium=internal`;

  return (
    <a
      href={trackedHref}
      onClick={handleClick}
      className={`inline-flex items-center gap-1.5 text-xs tracking-[0.1em] uppercase font-sans font-semibold px-4 py-2.5 transition-opacity duration-200 hover:opacity-80 ${className ?? ''}`}
      style={{
        color: pillarColor,
        border: `1px solid ${pillarColor}55`,
      }}
      rel="noopener noreferrer"
    >
      Visit {name} →
    </a>
  );
}
