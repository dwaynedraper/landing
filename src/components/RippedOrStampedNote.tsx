/**
 * RippedOrStampedNote — hub announcement block.
 *
 * Renders directly below the three-way Chooser on the homepage. Carries
 * the terracotta (Human / Studio pillar) accent, matching the Studio
 * branch card above it, and routes visitors to the full status page on
 * sharpsighted.studio. Build-phase framing only.
 */

/* Terracotta — the Human pillar accent, matching the Studio branch card. */
const ROS_ACCENT = '#a0462a';

export default function RippedOrStampedNote() {
  return (
    <section
      className="px-5 md:px-10 pb-10"
      style={{ background: 'var(--bg)' }}
      aria-label="Ripped or Stamped project update"
    >
      <div className="max-w-[1100px] mx-auto w-full">
        <div
          className="relative overflow-hidden rounded-sm"
          style={{
            background: 'var(--surface)',
            border: '1px solid var(--border)',
          }}
        >
          {/* Top shine line */}
          <div
            className="absolute top-0 left-0 right-0 h-[2px]"
            style={{
              background: `linear-gradient(90deg, transparent, ${ROS_ACCENT}, transparent)`,
              opacity: 0.5,
            }}
            aria-hidden="true"
          />

          <div className="px-6 py-7 md:px-8 md:py-8 flex flex-col gap-4">
            {/* Eyebrow + status badge */}
            <div className="flex flex-wrap items-center justify-between gap-3">
              <span
                className="text-xs tracking-[0.22em] uppercase font-sans font-semibold"
                style={{ color: ROS_ACCENT }}
              >
                Project Update
              </span>
              <span
                className="text-[0.65rem] tracking-[0.18em] uppercase font-sans font-semibold"
                style={{
                  color: ROS_ACCENT,
                  border: `1px solid ${ROS_ACCENT}55`,
                  borderRadius: '3px',
                  padding: '0.3rem 0.6rem',
                }}
              >
                In Build · May 2026
              </span>
            </div>

            {/* Title */}
            <h2
              className="font-serif font-light leading-tight"
              style={{
                fontSize: 'clamp(1.5rem, 3.5vw, 2.1rem)',
                color: 'var(--text)',
              }}
            >
              Ripped or Stamped:{' '}
              <em style={{ fontStyle: 'italic', color: ROS_ACCENT }}>
                The Architect’s Journey
              </em>
            </h2>

            {/* One-line premise */}
            <p
              className="text-sm md:text-base leading-relaxed"
              style={{ color: 'var(--text)' }}
            >
              A radical-reality series about learning fine art printing in public. The wins,
              the failures, and the cursing on the days mastery does not come quickly.
            </p>

            {/* Build status */}
            <p
              className="text-sm leading-relaxed"
              style={{ color: 'var(--text-mid)' }}
            >
              The show is real, and it is being built right now. Building it the right way
              carries a lot with it. Legal groundwork, licensing, equipment, the format, the
              people. Here is where the project stands today.
            </p>

            {/* Actions */}
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3 mt-1">
              <a
                href="https://sharpsighted.studio/ripped-or-stamped"
                className="inline-flex items-center gap-1.5 text-xs tracking-[0.12em] uppercase font-sans font-semibold px-5 py-3 transition-opacity duration-200 hover:opacity-80"
                style={{ background: ROS_ACCENT, color: '#ffffff' }}
              >
                Read the full update →
              </a>
              <a
                href="https://discord.gg/Hsz5bVRx"
                rel="noopener noreferrer"
                target="_blank"
                className="text-xs tracking-[0.12em] uppercase font-sans font-semibold transition-opacity duration-150 hover:opacity-70"
                style={{ color: 'var(--text-mid)' }}
              >
                or join the community on Discord →
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
