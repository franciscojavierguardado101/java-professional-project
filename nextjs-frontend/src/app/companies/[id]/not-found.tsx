import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function CompanyNotFound() {
  return (
    <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
      <h1 className="text-2xl font-bold text-slate-900">Company Not Found</h1>
      <p className="text-slate-500">This company page does not exist or was removed.</p>
      <Link href="/companies">
        <Button>Browse Companies</Button>
      </Link>
    </div>
  );
}
