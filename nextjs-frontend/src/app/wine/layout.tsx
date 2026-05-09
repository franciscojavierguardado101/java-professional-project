import type { Metadata } from 'next';
import WineShell from '@/components/wine/WineShell';

export const metadata: Metadata = {
  title: 'Total Wine & More — Wine, Beer & Spirits',
  description: 'Shop the largest selection of wine, beer, and spirits. Find the perfect bottle for any occasion.',
};

export default function WineLayout({ children }: { children: React.ReactNode }) {
  return <WineShell>{children}</WineShell>;
}
