'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { plausible } from '@/lib/plausible';

type Branch = 'photos' | 'media' | 'studio';

interface CardDef {
  id: Branch;
  eyebrow: string;
  title: string;
  description: string;
  offerings: string[];
  ctaLabel: string;
  ctaHref: string;
  pillarColor: string;
}

const CARDS: CardDef[] = [
  {
    id: 'photos',
    eyebrow: 'PORTRAITS & HEADSHOTS',
    title: 'Sharp Sighted Photos',
    description:
      'Premium portrait and headshot work for founders, executives, creators, and remarkable humans whose story doesn\'t fit a generic studio backdrop. On-location, story-first, built for the people who refuse to perform a version of themselves that doesn\'t fit.',
    offerings: [
      'Lifestyle & Story Portraits',
      'Corporate Team Headshots',
      'Fine Art Print Collections',
    ],
    ctaLabel: 'Visit Sharp Sighted Photos',
    ctaHref: 'https://sharpsighted.photos',
    pillarColor: '#38bdf8',
  },
  {
    id: 'media',
    eyebrow: 'REAL ESTATE MEDIA',
    title: 'Sharp Sighted Media',
    description:
      'Premium real estate media for top-producing agents along the 121 — agents who treat marketing as a competitive advantage, not a line item. Five-deliverable Essentials Package with 24-hour turnaround. Quarterly retainer for agents who want a real marketing partner.',
    offerings: [
      'The Essentials Package',
      'The Visibility Retainer',
      'Cinematic Walkthroughs & Aerials',
    ],
    ctaLabel: 'Visit Sharp Sighted Media',
    ctaHref: 'https://sharpsighted.media',
    pillarColor: '#c9922a',
  },
  {
    id: 'studio',
    eyebrow: 'JOIN THE COMMUNITY',
    title: 'Sharp Sighted Studio',
    description:
      'The connective tissue of Sharp Sighted. Behind-the-scenes, education, collaboration, and the 10% Rule — Dean\'s standing commitment to give 10% of time, resources, or effort to causes that matter. Home of Ripped or Stamped and the photographer collective.',
    offerings: [
      'Education & Behind-the-Scenes',
      'The 10% Documented',
      'Ripped or Stamped Series',
    ],
    ctaLabel: 'Visit Sharp Sighted Studio',
    ctaHref: 'https://sharpsighted.studio',
    pillarColor: '#a0462a',
  },
];

const ALL_BRANCHES = new Set<Branch>(['photos', 'media', 'studio']);

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
  return match ? decodeURIComponent(match[1]) : null;
}

function setCookie(name: string, value: string, days: number) {
  const maxAge = days * 24 * 60 * 60;
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${maxAge}; SameSite=Lax`;
}

function deleteCookie(name: string) {
  document.cookie = `${name}=; path=/; max-age=0; SameSite=Lax`;
}

const BRANCH_URLS: Record<Branch, string> = {
  photos: 'https://sharpsighted.photos',
  media: 'https://sharpsighted.media',
  studio: 'https://sharpsighted.studio',
};

function isDesktop() {
  return typeof window !== 'undefined' && window.innerWidth >= 768;
}

interface ChooserProps {
  hubParam: boolean;
  resetParam: boolean;
}

export default function Chooser({ hubParam, resetParam }: ChooserProps) {
  const router = useRouter();
  const [openCards, setOpenCards] = useState<Set<Branch>>(new Set());
  const [redirectChecked, setRedirectChecked] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  /* Cookie + redirect logic; desktop default-open state */
  useEffect(() => {
    if (resetParam) {
      deleteCookie('ss_preferred_site');
      setRedirectChecked(true);
    } else {
      const preferred = getCookie('ss_preferred_site') as Branch | null;
      if (preferred && !hubParam && BRANCH_URLS[preferred]) {
        router.replace(`${BRANCH_URLS[preferred]}?from=hub`);
        return;
      }
      setRedirectChecked(true);
    }

    if (isDesktop()) {
      setOpenCards(new Set(ALL_BRANCHES));
    }
  }, [hubParam, resetParam, router]);

  /* Keyboard: arrow keys cycle focus; Escape closes all */
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent, idx: number) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
        e.preventDefault();
        const dir = e.key === 'ArrowRight' ? 1 : -1;
        const next = (idx + dir + CARDS.length) % CARDS.length;
        cardRefs.current[next]?.focus();
      }
      if (e.key === 'Escape') {
        setOpenCards(new Set());
      }
    },
    []
  );

  function toggleCard(id: Branch) {
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        plausible('branch_card_collapsed', { props: { branch: id } });
      } else {
        if (!isDesktop()) {
          next.clear();
        }
        next.add(id);
        plausible('branch_card_expanded', { props: { branch: id } });
      }
      return next;
    });
  }

  function handleVisit(card: CardDef) {
    setCookie('ss_preferred_site', card.id, 30);
    plausible('branch_visit_clicked', { props: { branch: card.id } });
    window.location.href = card.ctaHref;
  }

  if (!redirectChecked) {
    return null;
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section
        className="flex flex-col justify-center px-5 md:px-10 pt-16 pb-10 md:pt-24 md:pb-14"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto w-full">
          <h1
            className="text-[clamp(2.5rem,8vw,5.25rem)] font-serif font-light leading-[1.1] mb-5"
            style={{ color: 'var(--text)' }}
          >
            Three doors.{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brand-cyan)' }}>One studio.</em>
          </h1>
          <p
            className="text-xl md:text-2xl font-sans"
            style={{ color: 'var(--text)' }}
          >
            Which one are you here for?
          </p>
        </div>
      </section>

      {/* ── Cards ─────────────────────────────────────────────────────── */}
      <section
        className="flex-1 px-5 md:px-10 pb-10"
        style={{ background: 'var(--bg)' }}
        aria-label="Choose a Sharp Sighted branch"
      >
        <div className="max-w-[1100px] mx-auto w-full">
          <div
            className="grid grid-cols-1 md:grid-cols-3 gap-4"
            role="list"
          >
            {CARDS.map((card, idx) => (
              <BranchCard
                key={card.id}
                card={card}
                isOpen={openCards.has(card.id)}
                onToggle={() => toggleCard(card.id)}
                onVisit={() => handleVisit(card)}
                onKeyDown={(e) => handleKeyDown(e, idx)}
                ref={(el) => { cardRefs.current[idx] = el; }}
              />
            ))}
          </div>

          {/* 4th option */}
          <div className="mt-8 text-center">
            <Link
              href="/about"
              onClick={() => plausible('stay_on_hub_clicked')}
              className="text-sm"
              style={{ color: 'var(--brand-cyan)' }}
            >
              Just learning about Sharp Sighted?{' '}
              <span className="font-semibold">Stay on the hub →</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ── Closing tagline ───────────────────────────────────────────── */}
      <div
        className="px-5 md:px-10 py-12 text-center"
        style={{ borderTop: '1px solid var(--border)' }}
      >
        <p
          className="font-serif font-light italic text-base md:text-lg tracking-wide"
          style={{ color: 'var(--text-muted)' }}
        >
          Stay Sharp. Stay Seen. Stay Human.
        </p>
      </div>
    </div>
  );
}

interface BranchCardProps {
  card: CardDef;
  isOpen: boolean;
  onToggle: () => void;
  onVisit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.RefCallback<HTMLDivElement>;
}

const BranchCard = ({
  card,
  isOpen,
  onToggle,
  onVisit,
  onKeyDown,
  ref,
}: BranchCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (!contentRef.current) return;
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen]);

  const panelId = `card-panel-${card.id}`;
  const triggerId = `card-trigger-${card.id}`;

  return (
    <div
      role="listitem"
      className="relative overflow-hidden rounded-sm outline-none"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${isOpen ? card.pillarColor + '44' : 'var(--border)'}`,
        transition: prefersReduced ? 'none' : 'border-color 0.2s ease',
      }}
      ref={ref}
      tabIndex={-1}
      onKeyDown={onKeyDown}
    >
      {/* Top shine line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.pillarColor}, transparent)`,
          opacity: isOpen ? 0.65 : 0.35,
          transition: prefersReduced ? 'none' : 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Trigger / header */}
      <button
        id={triggerId}
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={onToggle}
        className="w-full text-left px-6 pt-7 pb-5 flex items-start justify-between gap-4 focus-visible:outline-none"
        style={{ background: 'transparent' }}
      >
        <div className="flex flex-col gap-2 flex-1 min-w-0">
          <span
            className="text-sm tracking-[0.18em] uppercase font-sans font-semibold leading-snug"
            style={{ color: card.pillarColor }}
          >
            {card.eyebrow}
          </span>
          <span
            className="text-xl md:text-2xl font-serif font-light leading-tight"
            style={{ color: 'var(--text)' }}
          >
            {card.title}
          </span>
        </div>

        {/* Chevron */}
        <span
          className="flex-shrink-0 mt-1"
          aria-hidden="true"
          style={{
            color: card.pillarColor,
            transform: isOpen ? 'rotate(90deg)' : 'rotate(0deg)',
            transition: prefersReduced ? 'none' : 'transform 0.25s ease',
            display: 'inline-block',
            fontSize: '1rem',
          }}
        >
          ›
        </span>
      </button>

      {/* Expandable panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={triggerId}
        style={{
          height: `${height}px`,
          overflow: 'hidden',
          transition: prefersReduced ? 'none' : 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
        }}
      >
        <div ref={contentRef} className="px-6 pb-7 flex flex-col gap-5">
          <hr
            className="shine-line"
            style={{ margin: '0 0 0.5rem' }}
            aria-hidden="true"
          />

          <p
            className="text-sm leading-relaxed"
            style={{ color: 'var(--text-mid)' }}
          >
            {card.description}
          </p>

          <ul className="flex flex-col gap-1.5">
            {card.offerings.map((o) => (
              <li
                key={o}
                className="flex items-center gap-2 text-xs"
                style={{ color: 'var(--text-mid)' }}
              >
                <span
                  className="inline-block w-1 h-1 rounded-full flex-shrink-0"
                  style={{ background: card.pillarColor }}
                  aria-hidden="true"
                />
                {o}
              </li>
            ))}
          </ul>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onVisit();
            }}
            className="self-start inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-sans font-semibold px-5 py-3 transition-opacity duration-200 hover:opacity-80"
            style={{
              background: card.pillarColor,
              color: '#ffffff',
            }}
          >
            {card.ctaLabel} →
          </button>
        </div>
      </div>
    </div>
  );
};
