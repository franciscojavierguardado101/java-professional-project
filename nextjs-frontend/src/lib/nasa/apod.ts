import type { ApodResponse } from './types';

const KEY = process.env.NASA_API_KEY ?? 'DEMO_KEY';

export async function getApod(): Promise<ApodResponse | null> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/planetary/apod?api_key=${KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}
