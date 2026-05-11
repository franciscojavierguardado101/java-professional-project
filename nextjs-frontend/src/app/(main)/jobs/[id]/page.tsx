import { getJob } from '@/lib/api';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import CompanyLogo from '@/components/CompanyLogo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { JOB_TYPE_LABELS, LEVEL_COLORS, formatSalary } from '@/components/JobCard';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function JobDetailPage({ params }: Props) {
  const { id } = await params;
  const jobId = Number(id);

  if (isNaN(jobId)) notFound();

  let job;
  try {
    job = await getJob(jobId);
  } catch (err: unknown) {
    const status = (err as { status?: number }).status;
    if (status === 404) notFound();
    throw err;
  }

  const salary = formatSalary(job.salaryMin, job.salaryMax);

  return (
    <div className="max-w-4xl mx-auto px-4 py-10">
      {/* Back link */}
      <Link href="/jobs" className="text-sm text-blue-600 hover:underline mb-6 inline-block">
        Back to Jobs
      </Link>

      {/* Header */}
      <div className="bg-white rounded-xl border p-8 mb-6">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-slate-900">{job.title}</h1>
            <Link
              href={`/companies/${job.companyId}`}
              className="text-blue-600 hover:underline font-medium mt-1 inline-block"
            >
              {job.companyName}
            </Link>

            <div className="flex flex-wrap gap-2 mt-4">
              {job.jobType && (
                <Badge variant="secondary">{JOB_TYPE_LABELS[job.jobType] ?? job.jobType}</Badge>
              )}
              {job.experienceLevel && (
                <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[job.experienceLevel] ?? ''}`}>
                  {job.experienceLevel}
                </span>
              )}
              {job.categoryName && (
                <Badge variant="outline">{job.categoryName}</Badge>
              )}
            </div>

            <div className="mt-4 flex flex-wrap gap-6 text-sm text-slate-600">
              {job.location && (
                <span>{job.location}</span>
              )}
              {salary && (
                <span className="font-semibold text-slate-800">{salary} / year</span>
              )}
            </div>
          </div>

          <CompanyLogo name={job.companyName} logoUrl={job.companyLogoUrl} size={72} />
        </div>

        <Separator className="my-6" />

        <Button className="bg-blue-600 hover:bg-blue-700 text-white w-full sm:w-auto">
          Apply Now
        </Button>
      </div>

      {/* Description */}
      <div className="bg-white rounded-xl border p-8">
        <h2 className="text-lg font-semibold text-slate-900 mb-4">Job Description</h2>
        <div className="prose prose-slate max-w-none">
          {job.description.split('\n').map((paragraph, i) => (
            <p key={i} className="text-slate-700 leading-relaxed mb-3">
              {paragraph}
            </p>
          ))}
        </div>
      </div>
    </div>
  );
}
