import type {
  CollegeScorecardResponse,
  CollegeEarning,
  CollegeEnrollment,
} from './types';

const BASE = 'https://api.data.gov/ed/collegescorecard/v1/schools.json';
const KEY  = 'DEMO_KEY';

export async function getTopCollegesByEarnings(limit = 15): Promise<CollegeEarning[]> {
  const params = new URLSearchParams({
    api_key: KEY,
    fields:  'school.name,latest.earnings.10_yrs_after_entry.median',
    per_page: String(limit),
    sort:    'latest.earnings.10_yrs_after_entry.median:desc',
  });

  const res = await fetch(`${BASE}?${params}`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`);

  const json: CollegeScorecardResponse = await res.json();

  return json.results
    .filter((r) => r['latest.earnings.10_yrs_after_entry.median'] !== null)
    .map((r) => ({
      name:     r['school.name'],
      earnings: r['latest.earnings.10_yrs_after_entry.median'] as number,
    }));
}

export async function getCollegeEnrollmentVsEarnings(limit = 120): Promise<CollegeEnrollment[]> {
  const params = new URLSearchParams({
    api_key:  KEY,
    fields:   'school.name,latest.student.size,latest.earnings.10_yrs_after_entry.median',
    per_page: String(limit),
    sort:     'latest.earnings.10_yrs_after_entry.median:desc',
  });

  const res = await fetch(`${BASE}?${params}`, { next: { revalidate: 86400 } });
  if (!res.ok) throw new Error(`College Scorecard API error: ${res.status}`);

  const json: CollegeScorecardResponse = await res.json();

  return json.results
    .filter(
      (r) =>
        r['latest.student.size'] !== null &&
        r['latest.earnings.10_yrs_after_entry.median'] !== null &&
        r['latest.student.size']! > 0,
    )
    .map((r) => ({
      name:     r['school.name'],
      size:     r['latest.student.size'] as number,
      earnings: r['latest.earnings.10_yrs_after_entry.median'] as number,
    }));
}
