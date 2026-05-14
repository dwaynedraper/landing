import type { Metadata } from 'next';
import TenPercentCTA from '@/components/TenPercentCTA';

export const metadata: Metadata = {
  title: 'The 10% Rule',
  description:
    'Sharp Sighted gives 10% of time, resources, or effort to causes that matter. Submit a cause for consideration.',
};

const MAILTO_BODY = encodeURIComponent(
  `Cause name:\nYour role / connection to the cause:\nWhat's needed (portrait session, real estate media, community content, other):\nTiming or deadline:\nAnything else I should know:`
);

const MAILTO_HREF = `mailto:dean@sharpsightedstudio.com?subject=10%25%20Rule%20Submission&body=${MAILTO_BODY}`;

export default function TenPercentPage() {
  return (
    <div>
      {/* ── Hero ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <p className="eyebrow">The 10% Rule</p>
          <h1
            className="text-[clamp(2.5rem,8vw,5.25rem)] font-serif font-light leading-[1.1] mb-6"
            style={{ color: 'var(--text)' }}
          >
            Ten percent{' '}
            <em style={{ color: 'var(--brand-cyan)', fontStyle: 'italic' }}>of the work,</em>{' '}
            given.
          </h1>
          <p
            className="max-w-2xl text-base md:text-lg leading-relaxed"
            style={{ color: 'var(--text-mid)' }}
          >
            Ten percent of Sharp Sighted's capacity goes to causes that align with the work.
            Photography, media, documentation — given freely to the people and missions that
            deserve it.
          </p>
        </div>
      </section>

      <hr className="shine-line" />

      {/* ── Body ─────────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--surface)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10">
          <div className="max-w-2xl flex flex-col gap-6">
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-mid)' }}
            >
              The 10% Rule is not a marketing position. It&apos;s the same work — portrait sessions,
              real estate media, community content — given at no charge to the right people and the
              right missions. The causes that fit most naturally: community organizations,
              accessibility and neurodiversity advocacy, education, mental health, animal welfare,
              and anything genuinely aligned with Sharp Sighted&apos;s pillars.
            </p>
            <p
              className="text-base leading-relaxed"
              style={{ color: 'var(--text-mid)' }}
            >
              Reviewed personally by Dean. No form, no committee. The 10% has a ceiling and demand
              regularly exceeds it — most causes brought to the table are worth helping, and not all
              of them can be taken on. Every submission gets a response within two weeks.
            </p>
          </div>
        </div>
      </section>

      <hr className="shine-line" />

      {/* ── CTA ──────────────────────────────────────────────────────── */}
      <section
        className="py-20 md:py-28"
        style={{ background: 'var(--bg)' }}
      >
        <div className="max-w-[1100px] mx-auto px-5 md:px-10 flex flex-col items-start gap-6">
          <TenPercentCTA href={MAILTO_HREF} />
          <p
            className="text-xs italic max-w-md"
            style={{ color: 'var(--text-muted)' }}
          >
            Reviewed personally. Replied to within two weeks. Demand regularly exceeds what the
            10% can carry — every cause is considered, not every one can be taken on.
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
