import type { EpicImage } from './types';

const KEY = process.env.NASA_API_KEY ?? 'DEMO_KEY';

export async function getEpicImages(limit = 6): Promise<EpicImage[]> {
  try {
    const res = await fetch(
      `https://api.nasa.gov/EPIC/api/natural?api_key=${KEY}`,
      { next: { revalidate: 3600 } },
    );
    if (!res.ok) return [];

    const raw: { identifier: string; caption: string; date: string }[] = await res.json();

    return raw.slice(0, limit).map((item) => {
      const [datePart] = item.date.split(' ');
      const [year, month, day] = datePart.split('-');
      return {
        identifier: item.identifier,
        caption:    item.caption,
        date:       datePart,
        // Official EPIC archive URL format
        imageUrl: `https://epic.gsfc.nasa.gov/archive/natural/${year}/${month}/${day}/png/epic_1b_${item.identifier}.png`,
      };
    });
  } catch {
    return [];
  }
}
