import type { Metadata } from 'next';
import Chooser from '@/components/Chooser';

export const metadata: Metadata = {
  title: 'Sharp Sighted — Portraits, Real Estate, Community in North Texas',
  description:
    'Sharp Sighted is the multi-genre photography practice of Dean Draper in North Texas. Three specialist branches under one umbrella: portraits, real estate media, and community.',
};

interface PageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function HomePage({ searchParams }: PageProps) {
  const params = await searchParams;
  const hubParam = params['hub'] === 'true';
  const resetParam = params['reset'] === 'true';

  return <Chooser hubParam={hubParam} resetParam={resetParam} />;
}
