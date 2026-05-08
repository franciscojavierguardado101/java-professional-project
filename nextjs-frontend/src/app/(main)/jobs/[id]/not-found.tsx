import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function JobNotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Job Not Found</h1>
      <p className="text-slate-500">This job listing may have been removed or the link is incorrect.</p>
      <Link href="/jobs">
        <Button>Browse All Jobs</Button>
      </Link>
    </div>
  );
}
