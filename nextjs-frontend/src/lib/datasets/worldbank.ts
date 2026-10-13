import type { WorldBankEntry, GdpDataPoint } from './types';

export async function getUsGdpPerCapita(years = 20): Promise<GdpDataPoint[]> {
  const url = `https://api.worldbank.org/v2/country/US/indicator/NY.GDP.PCAP.CD?format=json&mrv=${years}&per_page=${years}`;

  const res = await fetch(url, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`World Bank API error: ${res.status}`);

  // Response shape: [metadata, data[]]
  const [, entries]: [unknown, WorldBankEntry[]] = await res.json();

  return (
    entries
      .filter((e) => e.value !== null)
      .map((e) => ({ year: e.date, gdp: Math.round(e.value as number) }))
      // API returns newest-first — reverse for chronological left-to-right display
      .reverse()
  );
}
