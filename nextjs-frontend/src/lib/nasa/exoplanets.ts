import type { ExoplanetYearCount } from './types';

export async function getExoplanetDiscoveriesByYear(): Promise<ExoplanetYearCount[]> {
  try {
    const query = encodeURIComponent(
      'SELECT disc_year, count(*) as total FROM ps WHERE default_flag=1 AND disc_year IS NOT NULL GROUP BY disc_year ORDER BY disc_year',
    );
    const res = await fetch(
      `https://exoplanetarchive.ipac.caltech.edu/TAP/sync?query=${query}&format=json`,
      { next: { revalidate: 86400 } },
    );
    if (!res.ok) return [];

    const raw: { disc_year: number; total: number }[] = await res.json();
    return raw.map((r) => ({ year: r.disc_year, total: r.total }));
  } catch {
    return [];
  }
}
