import type { Metadata } from 'next';
import { Playfair_Display, Montserrat } from 'next/font/google';
import { SpeedInsights } from '@vercel/speed-insights/next';
import './globals.css';
import { Providers } from './providers';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

const playfair = Playfair_Display({
  variable: '--font-playfair',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500'],
  style: ['normal', 'italic'],
});

const montserrat = Montserrat({
  variable: '--font-montserrat',
  subsets: ['latin'],
  display: 'swap',
  weight: ['400', '500', '600'],
});

const SITE_URL = 'https://sharpsightedstudio.com';

export const metadata: Metadata = {
  title: {
    template: '%s — Sharp Sighted',
    default: 'Sharp Sighted — Portraits, Real Estate, Community in North Texas',
  },
  description:
    'Sharp Sighted is the multi-genre photography practice of Dean Draper in North Texas. Three specialist branches under one umbrella: portraits, real estate media, and community.',
  metadataBase: new URL(SITE_URL),
  openGraph: {
    type: 'website',
    siteName: 'Sharp Sighted',
    locale: 'en_US',
    images: ['/opengraph-image.png'],
  },
  twitter: { card: 'summary_large_image' },
  alternates: { canonical: SITE_URL },
  robots: { index: true, follow: true },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Sharp Sighted Studio',
  alternateName: ['Sharp Sighted', 'Sharp Sighted Photos', 'Sharp Sighted Media'],
  url: SITE_URL,
  logo: `${SITE_URL}/logo.png`,
  founder: { '@type': 'Person', name: 'Dean Draper' },
  foundingDate: '2022-07',
  email: 'dean@sharpsightedstudio.com',
  telephone: '+1-214-233-5338',
  areaServed: 'Dallas-Fort Worth Metroplex',
  sameAs: [
    'https://sharpsighted.photos',
    'https://sharpsighted.media',
    'https://sharpsighted.studio',
    'https://www.instagram.com/sharp_sighted_studio',
    'https://www.facebook.com/sharpsightedstudio',
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${playfair.variable} ${montserrat.variable} dark`}
      suppressHydrationWarning
    >
      <head>
        {/* No-FOUC theme script — runs before paint */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('ss_theme');var root=document.documentElement;root.classList.remove('dark','light');root.classList.add(t==='light'?'light':'dark');}catch(e){}})();`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        {PLAUSIBLE_DOMAIN && <script async src="https://plausible.io/js/pa-rJNcgCeqyKrYkkNB_nbJ4.js" />}
        {PLAUSIBLE_DOMAIN && (
          <script
            dangerouslySetInnerHTML={{
              __html: `window.plausible=window.plausible||function(){(plausible.q=plausible.q||[]).push(arguments)},plausible.init=plausible.init||function(i){plausible.o=i||{}};plausible.init()`,
            }}
          />
        )}
      </head>
      <body className="min-h-screen flex flex-col font-sans">
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <Providers>
          <Nav />
          <main id="main-content" className="flex-1 pt-14">
            {children}
          </main>
          <Footer activeSite="hub" />
        </Providers>
        <SpeedInsights />
      </body>
    </html>
  );
}
