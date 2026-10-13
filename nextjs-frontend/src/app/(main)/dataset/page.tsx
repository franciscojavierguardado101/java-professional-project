import { getTopCollegesByEarnings, getCollegeEnrollmentVsEarnings } from '@/lib/datasets/collegescorecard';
import { getUsGdpPerCapita } from '@/lib/datasets/worldbank';
import ChartCard from '@/components/dataset/ChartCard';
import EarningsBarChart from '@/components/dataset/EarningsBarChart';
import GdpLineChart from '@/components/dataset/GdpLineChart';
import EnrollmentScatterChart from '@/components/dataset/EnrollmentScatterChart';
import type { CollegeEarning, CollegeEnrollment, GdpDataPoint } from '@/lib/datasets/types';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dataset Explorer',
  description: 'Interactive data visualizations powered by US government open data APIs.',
};

export default async function DatasetPage() {
  const [earningsResult, enrollmentResult, gdpResult] = await Promise.allSettled([
    getTopCollegesByEarnings(15),
    getCollegeEnrollmentVsEarnings(120),
    getUsGdpPerCapita(20),
  ]);

  const earnings: CollegeEarning[]    = earningsResult.status   === 'fulfilled' ? earningsResult.value   : [];
  const enrollment: CollegeEnrollment[] = enrollmentResult.status === 'fulfilled' ? enrollmentResult.value : [];
  const gdp: GdpDataPoint[]           = gdpResult.status        === 'fulfilled' ? gdpResult.value        : [];

  const totalSchools  = 6273;
  const gdpYearStart  = gdp[0]?.year ?? '—';
  const gdpYearEnd    = gdp[gdp.length - 1]?.year ?? '—';

  return (
    <div className="min-h-screen bg-slate-50">

      {/* ── Hero ─────────────────────────────────────────────────────────────── */}
      <section className="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950 text-white py-14 px-4">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 bg-white/10 text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-4 tracking-wide uppercase">
            Open Government Data
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight">
            Dataset Explorer
          </h1>
          <p className="mt-4 text-slate-300 text-base sm:text-lg max-w-2xl leading-relaxed">
            Live visualizations built on free, public APIs from the US Department of Education
            and the World Bank. Data refreshes every 24 hours — no downloads, no CSV files.
          </p>

          {/* Stat strip */}
          <div className="mt-8 flex flex-wrap gap-6">
            <Stat label="Schools analyzed" value={totalSchools.toLocaleString()} />
            <Stat label="GDP data range" value={`${gdpYearStart} – ${gdpYearEnd}`} />
            <Stat label="Data sources" value="2 open APIs" />
            <Stat label="Updates" value="Every 24 hrs" />
          </div>
        </div>
      </section>

      {/* ── Charts ───────────────────────────────────────────────────────────── */}
      <section className="max-w-6xl mx-auto px-4 py-12 space-y-10">

        {/* Bar chart — full width */}
        {earnings.length > 0 ? (
          <ChartCard
            title="Top 15 US Colleges by Graduate Earnings"
            description="Median annual earnings of graduates measured 10 years after initial enrollment, sorted highest to lowest. Data highlights the outsized returns from specialized medical and engineering institutions."
            source="US Department of Education — College Scorecard API"
            sourceUrl="https://collegescorecard.ed.gov/data/documentation/"
          >
            <EarningsBarChart data={earnings} />
          </ChartCard>
        ) : (
          <ChartError title="Graduate Earnings" />
        )}

        {/* Line + Scatter — side by side on desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">

          {gdp.length > 0 ? (
            <ChartCard
              title="US GDP Per Capita (Current USD)"
              description={`Economic output per person from ${gdpYearStart} to ${gdpYearEnd}. The COVID-19 dip in 2020 is marked — the subsequent recovery reflects post-pandemic fiscal stimulus.`}
              source="World Bank Open Data"
              sourceUrl="https://data.worldbank.org/indicator/NY.GDP.PCAP.CD"
            >
              <GdpLineChart data={gdp} />
            </ChartCard>
          ) : (
            <ChartError title="US GDP Per Capita" />
          )}

          {enrollment.length > 0 ? (
            <ChartCard
              title="Enrollment Size vs Graduate Earnings"
              description="Each point is a US institution. The cluster pattern shows that higher earnings are not strongly correlated with enrollment size — small specialized schools often outperform large universities."
              source="US Department of Education — College Scorecard API"
              sourceUrl="https://collegescorecard.ed.gov/data/documentation/"
            >
              <EnrollmentScatterChart data={enrollment} />
            </ChartCard>
          ) : (
            <ChartError title="Enrollment vs Earnings" />
          )}

        </div>
      </section>

      {/* ── Footer note ──────────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <p className="text-xs text-slate-400 text-center leading-relaxed">
          All data is sourced from publicly available government APIs. No personal data is
          collected or stored. Charts are rendered client-side using{' '}
          <a href="https://recharts.org" target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:underline">
            Recharts
          </a>
          .
        </p>
      </div>

    </div>
  );
}

// ── Local helper components ───────────────────────────────────────────────────

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col">
      <span className="text-2xl font-bold text-white">{value}</span>
      <span className="text-xs text-slate-400 mt-0.5">{label}</span>
    </div>
  );
}

function ChartError({ title }: { title: string }) {
  return (
    <div className="bg-white rounded-2xl border border-slate-200 p-10 text-center text-slate-400 text-sm">
      <p className="font-medium text-slate-500">{title}</p>
      <p className="mt-1">Could not load data from the API. Try refreshing the page.</p>
    </div>
  );
}
