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
    body: 'Sharp is the work of constant refinement — your image, your space, your craft. Not a state you arrive at, but a practice you maintain. A sharp portrait reads immediately. A sharp listing sells the life inside it. A sharp version of yourself walks into the room already prepared.',
  },
  {
    name: 'Seen',
    color: '#38bdf8',
    body: 'Being seen is two things at once. The first is being captured honestly — no performance, no mask, just the version of you that actually exists. The second is making sure that version lands in a world where attention lasts three seconds. Learning to tell stories visually. Building an audience that actually shows up. Cutting through the noise.',
  },
  {
    name: 'Human',
    color: '#a0462a',
    body: 'Human is the reminder that none of this is about the work in isolation. It\'s about connection — with clients, with other creatives, with the communities worth showing up for. Sharing what\'s actually happening, including the parts that aren\'t working. Staying real behind the lens and in front of it. Photography is easy to do behind a mask. Sharp Sighted chooses not to.',
  },
];

const branches = [
  {
    name: 'Sharp Sighted Photos',
    pillar: 'Seen',
    pillarColor: '#38bdf8',
    description:
      'Story portraits, lifestyle sessions, and corporate headshots — all on-location, all built around the person. For people whose professional image should look like them, not like a template.',
    href: 'https://sharpsighted.photos',
    cookie: 'photos',
  },
  {
    name: 'Sharp Sighted Media',
    pillar: 'Sharp',
    pillarColor: '#c9922a',
    description:
      'Real estate photography, aerials, walkthroughs, floor plans, and listing video — five deliverables, 24-hour turnaround, built for agents who are serious about every listing. A quarterly retainer option for agents who want a real marketing partner year-round.',
    href: 'https://sharpsighted.media',
    cookie: 'media',
  },
  {
    name: 'Sharp Sighted Studio',
    pillar: 'Human',
    pillarColor: '#a0462a',
    description:
      'An open community of photographers and creators in North Texas. Group outings, hands-on education, behind-the-scenes work, and the 10% Rule in action. No barrier to entry — show up, bring a camera, and make things with people who are doing the same.',
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
            Two specializations. One community. Portrait work and real estate media for the people
            who take both seriously — and an open group of photographers and creators who get
            together, make things, and grow.
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

      {/* ── The Thread ───────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">The Thread</p>
          <h2
            className="text-[clamp(1.85rem,4vw,2.75rem)] font-serif font-light leading-[1.2] mb-10"
            style={{ color: 'var(--text)' }}
          >
            People and the places{' '}
            <em style={{ fontStyle: 'italic', color: 'var(--brand-cyan)' }}>
              they feel at home in.
            </em>
          </h2>
          <div className="max-w-2xl flex flex-col gap-5">
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              A real estate shoot that treats the room as the subject misses half of what makes it
              worth buying. The room is a stage. The light through the window, the layout that
              reveals how someone actually lives — that's what the image needs to communicate.
              When a home has been shaped to fit the person inside it, a photograph can feel like
              an invitation instead of a floor plan.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              A portrait taken somewhere generic says generic things. When the environment enters
              the frame — the workspace, the tools, the place that actually holds meaning — it does
              half the work. The person doesn't have to perform a story. They're already standing
              inside one.
            </p>
            <p className="text-base leading-relaxed" style={{ color: 'var(--text-mid)' }}>
              The weighting is different. The philosophy isn't. Both disciplines are about making
              the relationship between people and place visible. That's the thread.
            </p>
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
            Ten percent of Dean's capacity is reserved — not for overflow, but for causes worth
            showing up for. The same portrait work, real estate media, and community documentation
            he charges for, offered freely to the right people and missions. It's not optional,
            and it's not marketing.
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
