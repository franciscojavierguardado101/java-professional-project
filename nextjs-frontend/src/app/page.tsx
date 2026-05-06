import { getJobs, getCompanies } from '@/lib/api';
import { getHeroBanner } from '@/lib/contentful';
import JobCard from '@/components/JobCard';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Job, Company } from '@/types';

export default async function HomePage() {
  let jobs: Job[] = [];
  let companies: Company[] = [];
  let apiError = false;

  // Contentful fetch runs in parallel with the API — null means not configured yet
  const [apiResult, hero] = await Promise.allSettled([
    Promise.all([getJobs(), getCompanies()]),
    getHeroBanner(),
  ]);

  if (apiResult.status === 'fulfilled') {
    [jobs, companies] = apiResult.value;
  } else {
    apiError = true;
  }

  const heroBanner = hero.status === 'fulfilled' ? hero.value : null;
  const featuredJobs = jobs.slice(0, 6);

  if (apiError) {
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">API Unavailable</h2>
        <p className="text-slate-500 text-sm">
          The Spring Boot API is not running. Start it with:
        </p>
        <pre className="bg-slate-100 text-slate-700 text-sm rounded px-4 py-3 text-left inline-block">
          cd spring-boot-api{'\n'}./mvnw spring-boot:run
        </pre>
      </div>
    );
  }

  // Use Contentful content when available, fall back to static defaults
  const heroTitle = heroBanner?.title ?? 'Find Your Next Great Role';
  const heroSubtitle = heroBanner?.subtitle ?? `Browse ${jobs.length} open positions at ${companies.length} top companies.`;
  const heroCtaText = heroBanner?.ctaText ?? 'Browse All Jobs';
  const heroCtaLink = heroBanner?.ctaLink ?? '/jobs';

  return (
    <div>
      {/* Hero — content from Contentful when configured */}
      <section className="bg-slate-900 text-white py-20 px-4">
        <div className="max-w-3xl mx-auto text-center space-y-6">
          <h1 className="text-5xl font-bold leading-tight tracking-tight">
            {heroTitle}
          </h1>
          <p className="text-slate-300 text-lg">{heroSubtitle}</p>
          <div className="flex gap-3 justify-center pt-2">
            <Link href={heroCtaLink}>
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
                {heroCtaText}
              </Button>
            </Link>
            <Link href="/companies">
              <Button size="lg" variant="outline" className="border-slate-600 text-white hover:bg-slate-800">
                View Companies
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="max-w-6xl mx-auto px-4 py-14">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Featured Jobs</h2>
          <Link href="/jobs" className="text-sm text-blue-600 hover:underline font-medium">
            View all {jobs.length} jobs →
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {featuredJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      </section>

      {/* Companies strip */}
      <section className="border-t bg-white py-12 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-center text-sm font-semibold text-slate-400 uppercase tracking-widest mb-8">
            Hiring Now
          </h2>
          <div className="flex flex-wrap justify-center gap-8">
            {companies.map((company) => (
              <Link
                key={company.id}
                href={`/companies/${company.id}`}
                className="text-slate-600 hover:text-slate-900 font-semibold text-lg transition-colors"
              >
                {company.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
