'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { plausible } from '@/lib/plausible';
import RippedOrStampedNote from '@/components/RippedOrStampedNote';

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

interface PendingRedirect {
  branch: Branch;
  url: string;
  seconds: number;
}

const COUNTDOWN_TOTAL = 5;

export default function Chooser({ hubParam, resetParam }: ChooserProps) {
  const router = useRouter();
  const [openCards, setOpenCards] = useState<Set<Branch>>(new Set());
  const [redirectChecked, setRedirectChecked] = useState(false);
  const [pendingRedirect, setPendingRedirect] = useState<PendingRedirect | null>(null);
  const [isDesktopView, setIsDesktopView] = useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const countdownRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /* Detect desktop on mount */
  useEffect(() => {
    setIsDesktopView(isDesktop());
  }, []);

  /* Cookie + redirect logic; desktop default-open state */
  useEffect(() => {
    if (resetParam) {
      deleteCookie('ss_preferred_site');
      setRedirectChecked(true);
    } else {
      const preferred = getCookie('ss_preferred_site') as Branch | null;
      if (preferred && !hubParam && BRANCH_URLS[preferred]) {
        setPendingRedirect({ branch: preferred, url: `${BRANCH_URLS[preferred]}?from=hub&utm_source=sharpsightedstudio.com&utm_medium=internal`, seconds: COUNTDOWN_TOTAL });
        setRedirectChecked(true);
        if (isDesktop()) setOpenCards(new Set(ALL_BRANCHES));
        return;
      }
      setRedirectChecked(true);
    }

    if (isDesktop()) {
      setOpenCards(new Set(ALL_BRANCHES));
    }
  }, [hubParam, resetParam, router]);

  /* Countdown tick */
  useEffect(() => {
    if (!pendingRedirect) return;

    countdownRef.current = setInterval(() => {
      setPendingRedirect((prev) => {
        if (!prev) return null;
        if (prev.seconds <= 1) {
          clearInterval(countdownRef.current!);
          window.location.href = prev.url;
          return null;
        }
        return { ...prev, seconds: prev.seconds - 1 };
      });
    }, 1000);

    return () => {
      if (countdownRef.current) clearInterval(countdownRef.current);
    };
  }, [pendingRedirect?.url]); // eslint-disable-line react-hooks/exhaustive-deps

  /* Escape key dismisses modal */
  useEffect(() => {
    if (!pendingRedirect) return;
    function onKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') cancelRedirect();
    }
    document.addEventListener('keydown', onKeyDown);
    return () => document.removeEventListener('keydown', onKeyDown);
  }, [pendingRedirect]); // eslint-disable-line react-hooks/exhaustive-deps

  function cancelRedirect() {
    if (countdownRef.current) clearInterval(countdownRef.current);
    countdownRef.current = null;
    setPendingRedirect(null);
    plausible('redirect_cancelled');
  }

  function executeRedirect(url: string) {
    if (countdownRef.current) clearInterval(countdownRef.current);
    plausible('redirect_proceeded');
    window.location.href = url;
  }

  /* Keyboard: arrow keys cycle focus; Escape closes all cards */
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
    if (isDesktopView) return;
    setOpenCards((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        plausible('branch_card_collapsed', { props: { branch: id } });
      } else {
        next.clear();
        next.add(id);
        plausible('branch_card_expanded', { props: { branch: id } });
      }
      return next;
    });
  }

  function handleVisit(card: CardDef) {
    setCookie('ss_preferred_site', card.id, 30);
    plausible('branch_visit_clicked', { props: { branch: card.id } });
    window.location.href = `${card.ctaHref}?from=hub&utm_source=sharpsightedstudio.com&utm_medium=internal`;
  }

  if (!redirectChecked) {
    return null;
  }

  const redirectCard = pendingRedirect
    ? CARDS.find((c) => c.id === pendingRedirect.branch) ?? null
    : null;

  return (
    <>
      {/* ── Redirect modal ────────────────────────────────────────────── */}
      {pendingRedirect && redirectCard && (
        <>
          <div
            onClick={cancelRedirect}
            aria-hidden="true"
            style={{
              position: 'fixed',
              inset: 0,
              background: 'rgba(0,0,0,0.55)',
              zIndex: 9998,
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label={`Redirecting to ${redirectCard.title}`}
            style={{
              position: 'fixed',
              top: '5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              width: 'min(460px, calc(100vw - 2rem))',
              zIndex: 9999,
              background: 'var(--surface)',
              border: `1px solid ${redirectCard.pillarColor}55`,
              borderTop: `3px solid ${redirectCard.pillarColor}`,
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
              padding: '1.75rem 1.75rem 1.5rem',
            }}
          >
            <p
              className="font-serif font-light text-xl mb-1"
              style={{ color: 'var(--text)' }}
            >
              {redirectCard.title}
            </p>
            <p className="font-sans text-sm mb-5" style={{ color: 'var(--text-muted)' }}>
              Redirecting in{' '}
              <span
                style={{
                  color: redirectCard.pillarColor,
                  fontWeight: 700,
                  fontVariantNumeric: 'tabular-nums',
                }}
              >
                {pendingRedirect.seconds}
              </span>{' '}
              second{pendingRedirect.seconds !== 1 ? 's' : ''}.
            </p>

            {/* Progress bar */}
            <div
              style={{
                height: '2px',
                background: 'var(--border)',
                marginBottom: '1.5rem',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  background: redirectCard.pillarColor,
                  width: `${(pendingRedirect.seconds / COUNTDOWN_TOTAL) * 100}%`,
                  transition: 'width 0.9s linear',
                }}
              />
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={cancelRedirect}
                className="flex-1 text-xs tracking-[0.12em] uppercase font-sans font-semibold py-3 transition-opacity duration-150 hover:opacity-70"
                style={{
                  color: 'var(--text-muted)',
                  border: '1px solid var(--border)',
                  background: 'transparent',
                }}
              >
                Cancel
              </button>
              <button
                onClick={() => executeRedirect(pendingRedirect.url)}
                className="flex-1 text-xs tracking-[0.12em] uppercase font-sans font-semibold py-3 transition-opacity duration-150 hover:opacity-80"
                style={{ background: redirectCard.pillarColor, color: '#fff', border: 'none' }}
              >
                Go now →
              </button>
            </div>
            <p
              className="text-xs mt-3 text-center"
              style={{ color: 'var(--text-muted)', opacity: 0.6 }}
            >
              Click outside or press Esc to cancel
            </p>
          </div>
        </>
      )}

      <div className="flex flex-col min-h-[calc(100vh-3.5rem)]">
        {/* ── Hero ────────────────────────────────────────────────────── */}
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

        {/* ── Thread ──────────────────────────────────────────────────── */}
        <div className="px-5 md:px-10 pb-10" style={{ background: 'var(--bg)' }}>
          <p
            className="max-w-[1100px] mx-auto text-sm md:text-base leading-relaxed"
            style={{ color: 'var(--text-muted)' }}
          >
            The two disciplines look different on paper. In practice, they draw from the same
            source. A home that reflects its owner deserves to be photographed as an experience,
            not a floor plan — immersive, with the details that make it distinctly theirs. A
            portrait taken somewhere that actually matters to the subject says things the face
            alone can't. Both are about the relationship between people and the places they
            inhabit. The weighting shifts. The philosophy doesn't.
          </p>
        </div>

        {/* ── Cards ───────────────────────────────────────────────────── */}
        <section
          className="flex-1 px-5 md:px-10 pb-10"
          style={{ background: 'var(--bg)' }}
          aria-label="Choose a Sharp Sighted branch"
        >
          <div className="max-w-[1100px] mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4" role="list">
              {CARDS.map((card, idx) => (
                <BranchCard
                  key={card.id}
                  card={card}
                  isOpen={openCards.has(card.id)}
                  forceOpen={isDesktopView}
                  onToggle={() => toggleCard(card.id)}
                  onVisit={() => handleVisit(card)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  ref={(el) => { cardRefs.current[idx] = el; }}
                />
              ))}

              {/* Hub card */}
              <HubCard />
            </div>
          </div>
        </section>

        {/* ── Ripped or Stamped project update ──────────────────────────── */}
        <RippedOrStampedNote />

        {/* ── Closing tagline ──────────────────────────────────────────── */}
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
    </>
  );
}

function HubCard() {
  return (
    <div
      className="col-span-full relative overflow-hidden rounded-sm"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: 'linear-gradient(90deg, transparent, var(--brand-cyan), transparent)',
          opacity: 0.2,
        }}
        aria-hidden="true"
      />
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 px-6 py-5 md:px-8 md:py-6">
        <div className="flex flex-col gap-1">
          <span
            className="text-xs tracking-[0.18em] uppercase font-sans font-semibold"
            style={{ color: 'var(--text-muted)' }}
          >
            Sharp Sighted
          </span>
          <span className="text-sm font-sans" style={{ color: 'var(--text-mid)' }}>
            Want to learn more about Sharp Sighted?
          </span>
        </div>
        <Link
          href="/about"
          onClick={() => plausible('stay_on_hub_clicked')}
          className="text-xs tracking-[0.12em] uppercase font-sans font-semibold shrink-0 transition-opacity duration-150 hover:opacity-70"
          style={{ color: 'var(--brand-cyan)' }}
        >
          Stay on the hub →
        </Link>
      </div>
    </div>
  );
}

interface BranchCardProps {
  card: CardDef;
  isOpen: boolean;
  forceOpen: boolean;
  onToggle: () => void;
  onVisit: () => void;
  onKeyDown: (e: React.KeyboardEvent) => void;
  ref: React.RefCallback<HTMLDivElement>;
}

const BranchCard = ({
  card,
  isOpen,
  forceOpen,
  onToggle,
  onVisit,
  onKeyDown,
  ref,
}: BranchCardProps) => {
  const contentRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);
  const [hovered, setHovered] = useState(false);
  const prefersReduced =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    if (forceOpen || !contentRef.current) return;
    setHeight(isOpen ? contentRef.current.scrollHeight : 0);
  }, [isOpen, forceOpen]);

  const panelId = `card-panel-${card.id}`;
  const triggerId = `card-trigger-${card.id}`;
  const effectiveOpen = forceOpen || isOpen;

  return (
    <div
      role="listitem"
      className="relative rounded-sm outline-none"
      style={{
        background: 'var(--surface)',
        border: `1px solid ${effectiveOpen ? card.pillarColor + '44' : 'var(--border)'}`,
        transition: prefersReduced
          ? 'none'
          : 'border-color 0.2s ease, transform 0.2s ease, box-shadow 0.2s ease',
        transform: hovered && !prefersReduced ? 'translateY(-2px) scale(1.01)' : 'none',
        boxShadow: hovered && !prefersReduced ? `0 8px 28px ${card.pillarColor}2a` : 'none',
      }}
      ref={ref}
      tabIndex={-1}
      onKeyDown={onKeyDown}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Top shine line */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${card.pillarColor}, transparent)`,
          opacity: effectiveOpen ? 0.65 : 0.35,
          transition: prefersReduced ? 'none' : 'opacity 0.2s ease',
        }}
        aria-hidden="true"
      />

      {/* Header — non-interactive on desktop, button on mobile */}
      {forceOpen ? (
        <div className="px-6 pt-7 pb-5">
          <div className="flex flex-col gap-2">
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
        </div>
      ) : (
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
          <span
            className="shrink-0 mt-1"
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
      )}

      {/* Expandable panel */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={forceOpen ? undefined : triggerId}
        style={
          forceOpen
            ? { overflow: 'hidden' }
            : {
                height: `${height}px`,
                overflow: 'hidden',
                transition: prefersReduced ? 'none' : 'height 0.35s cubic-bezier(0.4,0,0.2,1)',
              }
        }
      >
        <div ref={contentRef} className="px-6 pb-7 flex flex-col gap-5">
          <hr className="shine-line" style={{ margin: '0 0 0.5rem' }} aria-hidden="true" />

          <p className="text-sm leading-relaxed" style={{ color: 'var(--text-mid)' }}>
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
                  className="inline-block w-1 h-1 rounded-full shrink-0"
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
            style={{ background: card.pillarColor, color: '#ffffff' }}
          >
            {card.ctaLabel} →
          </button>
        </div>
      </div>
    </div>
  );
};
