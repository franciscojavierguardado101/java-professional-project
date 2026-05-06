import { getJobs } from '@/lib/api';
import JobListings from '@/components/JobListings';
import { Job } from '@/types';

export const metadata = {
  title: 'Browse Jobs — JobBoard',
};

export default async function JobsPage() {
  let jobs: Job[] = [];
  let apiError = false;

  try {
    jobs = await getJobs();
  } catch {
    apiError = true;
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Browse Jobs</h1>
        <p className="text-slate-500 mt-1">Find your next opportunity</p>
      </div>

      {apiError ? (
        <div className="text-center py-16 text-slate-500">
          Could not load jobs. Make sure the Spring Boot API is running on port 8080.
        </div>
      ) : (
        <JobListings initialJobs={jobs} />
      )}
    </div>
  );
}
