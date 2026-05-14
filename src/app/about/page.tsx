import type { Metadata } from 'next';
import Link from 'next/link';
import BranchVisitLink from '@/components/BranchVisitLink';

export const metadata: Metadata = {
  title: 'About',
  description:
    'Sharp Sighted is the multi-genre photography practice of Dean Draper in North Texas. Three specialist branches — portraits, real estate media, and community — under one umbrella.',
};

const pillars = [
  {
    name: 'Sharp',
    color: '#c9922a',
    body: 'Tuned. Fit. Your best self. Sharp is about presenting at your highest level — your body, your image, your space, your craft. A sharp portrait. A sharp listing. A sharp room. A sharp version of yourself walking into the meeting that matters.',
  },
  {
    name: 'Seen',
    color: '#38bdf8',
    body: 'Authentic visibility. Standing in your truth. Being truly seen requires authenticity, refusing to perform a version of yourself that doesn\'t fit. It also means cutting through the noise — social media, saturated markets, identical content.',
  },
  {
    name: 'Human',
    color: '#a0462a',
    body: 'Community. Warmth. The 10%. Human is the pillar that keeps Sharp Sighted from becoming a transaction engine. It lives in collaboration with other creatives, in genuine connection with clients, and in the 10% Rule — 10% of time, resources, or effort to causes worth showing up for.',
  },
];

const branches = [
  {
    name: 'Sharp Sighted Photos',
    pillar: 'Seen',
    pillarColor: '#38bdf8',
    description:
      'Premium portrait and headshot work for founders, executives, creators, and remarkable humans whose story doesn\'t fit a generic studio backdrop. On-location, story-first, built for the people who refuse to perform a version of themselves that doesn\'t fit.',
    href: 'https://sharpsighted.photos',
    cookie: 'photos',
  },
  {
    name: 'Sharp Sighted Media',
    pillar: 'Sharp',
    pillarColor: '#c9922a',
    description:
      'Premium real estate media for top-producing agents in the 121 corridor — agents who treat marketing as a competitive advantage, not a line item. Five-deliverable Essentials Package with 24-hour turnaround. Quarterly retainer for agents who want a real marketing partner.',
    href: 'https://sharpsighted.media',
    cookie: 'media',
  },
  {
    name: 'Sharp Sighted Studio',
    pillar: 'Human',
    pillarColor: '#a0462a',
    description:
      'The connective tissue of Sharp Sighted. Behind-the-scenes, education, collaboration, and the 10% Rule — Dean\'s standing commitment to give 10% of time, resources, or effort to causes that matter. Home of Ripped or Stamped and the photographer collective.',
    href: 'https://sharpsighted.studio',
    cookie: 'studio',
  },
];

export default function AboutPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">About Sharp Sighted</p>
          <h1
            className="text-[clamp(2.5rem,8vw,5.25rem)] font-serif font-light leading-[1.1] mb-6"
            style={{ color: 'var(--text)' }}
          >
            Sharp Sighted is the work of{' '}
            <em style={{ color: 'var(--brand-cyan)', fontStyle: 'italic' }}>Dean Draper.</em>
          </h1>
          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-mid)' }}
          >
            A multi-genre photography practice based in North Texas. Three specialist branches —
            portraits, real estate media, and community — under one umbrella, with one tagline
            closing every piece of work.
          </p>
        </div>
      </section>

      <hr className="shine-line" />

      {/* ── Tagline / Pillars ─────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">The Operating Philosophy</p>
          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-serif font-light leading-[1.2] mb-12"
            style={{ color: 'var(--text)' }}
          >
            <em style={{ fontStyle: 'italic', color: 'var(--brand-cyan)' }}>
              Stay Sharp. Stay Seen. Stay Human.
            </em>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((p) => (
              <div
                key={p.name}
                className="p-6 md:p-7 rounded-sm"
                style={{
                  background: 'var(--surface-2)',
                  border: '1px solid var(--border)',
                }}
              >
                <div
                  className="inline-block text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-3 pb-2"
                  style={{
                    color: p.color,
                    borderBottom: `1px solid ${p.color}44`,
                  }}
                >
                  {p.name}
                </div>
                <p
                  className="text-sm leading-relaxed"
                  style={{ color: 'var(--text-mid)' }}
                >
                  {p.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <hr className="shine-line" />

      {/* ── Three Branches ────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">Three Doors. One Studio.</p>
          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-serif font-light leading-[1.2] mb-12"
            style={{ color: 'var(--text)' }}
          >
            What Sharp Sighted{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brand-cyan)' }}>does.</em>
          </h2>

          <div className="flex flex-col gap-8">
            {branches.map((b) => (
              <BranchCard key={b.name} branch={b} />
            ))}
          </div>
        </div>
      </section>

      <hr className="shine-line" />

      {/* ── 10% Rule ─────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">The 10% Rule</p>
          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-serif font-light leading-[1.2] mb-6"
            style={{ color: 'var(--text)' }}
          >
            Ten percent of{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brand-cyan)' }}>
              time, resources, or effort
            </em>{' '}
            given to causes that matter.
          </h2>
          <p
            className="text-base leading-relaxed mb-8 max-w-2xl"
            style={{ color: 'var(--text-mid)' }}
          >
            Dean commits 10% of time, resources, or effort — almost never money — to causes he
            believes in. This looks like doing the same work he charges for, for free, for the right
            people and the right missions. The 10% is non-negotiable.
          </p>
          <Link
            href="/10-percent"
            className="inline-block text-xs tracking-[0.12em] uppercase font-sans font-semibold"
            style={{ color: 'var(--accent)' }}
          >
            Learn about the 10% Rule →
          </Link>
        </div>
      </section>

      <hr className="shine-line" />

      {/* ── Contact ──────────────────────────────────────────────────── */}
      <section
        id="contact"
        className="py-20 md:py-28"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">Get in Touch</p>
          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-serif font-light leading-[1.2] mb-10"
            style={{ color: 'var(--text)' }}
          >
            Reach out.
          </h2>

          <div className="flex flex-col gap-5 mb-8">
            <ContactRow
              icon="✉"
              label="Email"
              value="dean@sharpsightedstudio.com"
              href="mailto:dean@sharpsightedstudio.com"
            />
            <ContactRow
              icon="☎"
              label="Business line"
              value="(214) 233-5338"
              href="tel:+12142335338"
            />
            <ContactRow
              icon="◎"
              label="Service area"
              value="121 corridor — Collin through Tarrant Counties"
            />
          </div>

          <p
            className="text-xs italic"
            style={{ color: 'var(--text-muted)' }}
          >
            Email is the most reliable channel. Phone is best-effort.
          </p>
        </div>
      </section>

      {/* ── Closing tagline ──────────────────────────────────────────── */}
      <section
        className="py-16 text-center"
        style={{ background: 'var(--surface)' }}
      >
        <p
          className="font-serif font-light text-xl md:text-2xl italic tracking-wide"
          style={{ color: 'var(--text-mid)' }}
        >
          Stay Sharp. Stay Seen. Stay Human.
        </p>
      </section>
    </div>
  );
}

function BranchCard({
  branch,
}: {
  branch: (typeof branches)[number];
}) {
  return (
    <div
      className="relative overflow-hidden rounded-sm p-6 md:p-8"
      style={{
        background: 'var(--surface)',
        border: '1px solid var(--border)',
      }}
    >
      {/* Top shine line in pillar color */}
      <div
        className="absolute top-0 left-0 right-0 h-[2px]"
        style={{
          background: `linear-gradient(90deg, transparent, ${branch.pillarColor}, transparent)`,
          opacity: 0.55,
        }}
      />
      <div className="flex flex-col md:flex-row md:items-start gap-6">
        <div className="flex-1">
          <div
            className="text-xs font-sans font-semibold tracking-[0.2em] uppercase mb-2"
            style={{ color: branch.pillarColor }}
          >
            {branch.pillar}
          </div>
          <h3
            className="text-xl md:text-2xl font-serif font-light mb-3"
            style={{ color: 'var(--text)' }}
          >
            {branch.name}
          </h3>
          <p
            className="text-sm leading-relaxed max-w-xl"
            style={{ color: 'var(--text-mid)' }}
          >
            {branch.description}
          </p>
        </div>
        <div className="flex-shrink-0">
          <BranchVisitLink
            name={branch.name}
            href={branch.href}
            cookie={branch.cookie}
            pillarColor={branch.pillarColor}
          />
        </div>
      </div>
    </div>
  );
}


function ContactRow({
  icon,
  label,
  value,
  href,
}: {
  icon: string;
  label: string;
  value: string;
  href?: string;
}) {
  return (
    <div className="flex items-baseline gap-4">
      <span
        className="text-sm w-5 flex-shrink-0"
        style={{ color: 'var(--accent)' }}
        aria-hidden="true"
      >
        {icon}
      </span>
      <span
        className="text-xs tracking-[0.1em] uppercase w-28 flex-shrink-0"
        style={{ color: 'var(--text-muted)' }}
      >
        {label}
      </span>
      {href ? (
        <a
          href={href}
          className="text-sm"
          style={{ color: 'var(--text)' }}
        >
          {value}
        </a>
      ) : (
        <span className="text-sm" style={{ color: 'var(--text)' }}>
          {value}
        </span>
      )}
    </div>
  );
}
