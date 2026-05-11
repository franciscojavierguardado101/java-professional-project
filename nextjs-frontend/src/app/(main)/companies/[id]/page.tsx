import { getCompany, getJobs } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CompanyLogo from '@/components/CompanyLogo';
import { Separator } from '@/components/ui/separator';
import JobCard from '@/components/JobCard';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function CompanyDetailPage({ params }: Props) {
  const { id } = await params;
  const companyId = Number(id);

  if (isNaN(companyId)) notFound();

  let company;
  let allJobs;
  try {
    [company, allJobs] = await Promise.all([getCompany(companyId), getJobs()]);
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status === 404) notFound();
    return (
      <div className="max-w-xl mx-auto px-4 py-24 text-center space-y-4">
        <h2 className="text-xl font-semibold text-slate-800">API Unavailable</h2>
        <p className="text-slate-500 text-sm">
          Could not connect to the Spring Boot API. Make sure{' '}
          <code className="bg-slate-100 px-1 rounded">NEXT_PUBLIC_API_URL</code> is set in Vercel
          and the Railway service is running.
        </p>
        <Link href="/companies" className="text-blue-600 hover:underline text-sm">
          ← Back to Companies
        </Link>
      </div>
    );
  }

  const companyJobs = allJobs.filter((job) => job.companyId === companyId);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <Link href="/companies" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        Back to Companies
      </Link>

      {/* Company header */}
      <div className="bg-white rounded-xl border p-8 mb-8">
        <div className="flex items-center gap-5">
          <CompanyLogo name={company.name} logoUrl={company.logoUrl} size={80} />
          <div>
            <h1 className="text-2xl font-bold text-slate-900">{company.name}</h1>
            {company.website && (
              <a
                href={company.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline mt-1 inline-block"
              >
                {company.website}
              </a>
            )}
          </div>
        </div>

        {company.description && (
          <>
            <Separator className="my-6" />
            <p className="text-slate-600 leading-relaxed">{company.description}</p>
          </>
        )}
      </div>

      {/* Jobs at this company */}
      <h2 className="text-xl font-bold text-slate-900 mb-4">
        Open Positions ({companyJobs.length})
      </h2>

      {companyJobs.length === 0 ? (
        <div className="text-center py-12 text-slate-400">
          No open positions at this company right now.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {companyJobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}
    </div>
  );
}
