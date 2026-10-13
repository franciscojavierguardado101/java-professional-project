import type { NeoFeedResponse, NeoDayCount, NeoAsteroid } from './types';

const KEY = process.env.NASA_API_KEY ?? 'DEMO_KEY';

function formatDate(d: Date): string {
  return d.toISOString().split('T')[0];
}

export async function getNeoFeed(): Promise<{
  dayCounts:  NeoDayCount[];
  asteroids:  NeoAsteroid[];
  totalCount: number;
} | null> {
  try {
    const end   = new Date();
    const start = new Date(end);
    start.setDate(start.getDate() - 6);

    const url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${formatDate(start)}&end_date=${formatDate(end)}&api_key=${KEY}`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;

    const json: NeoFeedResponse = await res.json();

    const dayCounts: NeoDayCount[] = Object.entries(json.near_earth_objects)
      .sort(([a], [b]) => a.localeCompare(b))
      .map(([date, neos]) => ({
        date:      date.slice(5),    // "MM-DD" for chart labels
        total:     neos.length,
        hazardous: neos.filter((n) => n.is_potentially_hazardous_asteroid).length,
      }));

    const asteroids: NeoAsteroid[] = Object.entries(json.near_earth_objects)
      .flatMap(([, neos]) =>
        neos.map((n) => {
          const approach = n.close_approach_data[0];
          return {
            id:           n.id,
            name:         n.name.replace(/[()]/g, '').trim(),
            hazardous:    n.is_potentially_hazardous_asteroid,
            diameterM:    Math.round(
              (n.estimated_diameter.meters.estimated_diameter_min +
                n.estimated_diameter.meters.estimated_diameter_max) / 2,
            ),
            distanceKm:   Math.round(parseFloat(approach.miss_distance.kilometers)),
            distanceLunar: parseFloat(parseFloat(approach.miss_distance.lunar).toFixed(1)),
            velocityKph:  Math.round(parseFloat(approach.relative_velocity.kilometers_per_hour)),
            date:         approach.close_approach_date,
          };
        }),
      )
      .sort((a, b) => a.distanceKm - b.distanceKm)
      .slice(0, 10);

    return { dayCounts, asteroids, totalCount: json.element_count };
  } catch {
    return null;
  }
}
