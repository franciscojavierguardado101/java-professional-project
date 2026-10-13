// ── Raw API response shapes ────────────────────────────────────────────────────

export interface RawCollegeRecord {
  'school.name': string;
  'latest.earnings.10_yrs_after_entry.median': number | null;
  'latest.student.size': number | null;
}

export interface CollegeScorecardResponse {
  metadata: { total: number; page: number; per_page: number };
  results: RawCollegeRecord[];
}

export interface WorldBankEntry {
  date: string;
  value: number | null;
}

// ── Cleaned chart-ready shapes ─────────────────────────────────────────────────

export interface CollegeEarning {
  name: string;
  earnings: number;
}

export interface CollegeEnrollment {
  name: string;
  size: number;
  earnings: number;
}

export interface GdpDataPoint {
  year: string;
  gdp: number;
}
