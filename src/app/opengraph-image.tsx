import { ImageResponse } from 'next/og';

export const alt = 'Sharp Sighted — Portraits, Real Estate, Community in North Texas';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          background: '#111110',
          fontFamily: 'sans-serif',
          padding: '80px',
          gap: '28px',
        }}
      >
        {/* Aperture SVG */}
        <svg
          width="72"
          height="72"
          viewBox="0 0 24 24"
          fill="none"
        >
          <circle cx="12" cy="12" r="10" stroke="#38bdf8" strokeWidth="1.5" />
          <circle cx="12" cy="12" r="3.5" fill="#38bdf8" />
          <line x1="12" y1="2" x2="12" y2="8.5" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="12" y1="15.5" x2="12" y2="22" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="2" y1="12" x2="8.5" y2="12" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="15.5" y1="12" x2="22" y2="12" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="4.93" y1="4.93" x2="9.52" y2="9.52" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="14.48" y1="14.48" x2="19.07" y2="19.07" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="19.07" y1="4.93" x2="14.48" y2="9.52" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
          <line x1="9.52" y1="14.48" x2="4.93" y2="19.07" stroke="#38bdf8" strokeWidth="1.5" strokeLinecap="round" />
        </svg>

        {/* Wordmark */}
        <div
          style={{
            fontSize: '48px',
            fontWeight: '600',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: '#38bdf8',
          }}
        >
          Sharp Sighted
        </div>

        {/* Tagline */}
        <div
          style={{
            fontSize: '20px',
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: '#6a6560',
          }}
        >
          Stay Sharp. Stay Seen. Stay Human.
        </div>

        {/* Separator */}
        <div
          style={{
            width: '320px',
            height: '1px',
            background: 'linear-gradient(90deg, transparent, #38bdf8, transparent)',
            opacity: 0.4,
            marginTop: '8px',
          }}
        />

        {/* Subline */}
        <div
          style={{
            fontSize: '16px',
            color: '#6a6560',
            letterSpacing: '0.06em',
          }}
        >
          sharpsightedstudio.com
        </div>
      </div>
    ),
    { ...size }
  );
}
