import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Job } from '@/types';

interface Props {
  job: Job;
}

export const JOB_TYPE_LABELS: Record<string, string> = {
  FULL_TIME: 'Full Time',
  PART_TIME: 'Part Time',
  CONTRACT: 'Contract',
  FREELANCE: 'Freelance',
  INTERNSHIP: 'Internship',
};

export const LEVEL_COLORS: Record<string, string> = {
  ENTRY: 'bg-green-100 text-green-800',
  MID: 'bg-blue-100 text-blue-800',
  SENIOR: 'bg-purple-100 text-purple-800',
  LEAD: 'bg-orange-100 text-orange-800',
  EXECUTIVE: 'bg-red-100 text-red-800',
};

export function formatSalary(min: number | null, max: number | null): string {
  if (!min && !max) return '';
  const fmt = (n: number) => `$${(n / 1000).toFixed(0)}K`;
  if (min && max) return `${fmt(min)} – ${fmt(max)}`;
  if (min) return `From ${fmt(min)}`;
  return `Up to ${fmt(max!)}`;
}

export default function JobCard({ job }: Props) {
  return (
    <Link href={`/jobs/${job.id}`}>
      <Card className="hover:shadow-md hover:border-slate-300 transition-all cursor-pointer h-full">
        <CardHeader className="pb-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-semibold text-slate-900 leading-snug">{job.title}</h3>
              <p className="text-sm text-slate-500 mt-0.5">{job.companyName}</p>
            </div>
            {job.companyLogoUrl && (
              <Image
                src={job.companyLogoUrl}
                alt={job.companyName}
                width={40}
                height={40}
                className="rounded object-contain flex-shrink-0"
              />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            {job.jobType && (
              <Badge variant="secondary">
                {JOB_TYPE_LABELS[job.jobType] ?? job.jobType}
              </Badge>
            )}
            {job.experienceLevel && (
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${LEVEL_COLORS[job.experienceLevel] ?? ''}`}>
                {job.experienceLevel}
              </span>
            )}
          </div>
          <div className="flex items-center justify-between text-sm text-slate-500">
            {job.location && <span>{job.location}</span>}
            {(job.salaryMin || job.salaryMax) && (
              <span className="font-medium text-slate-700">
                {formatSalary(job.salaryMin, job.salaryMax)}
              </span>
            )}
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
