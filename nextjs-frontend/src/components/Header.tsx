import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm">
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight">
          JobBoard
        </Link>
        <nav className="flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/jobs" className="hover:text-slate-900 transition-colors">
            Browse Jobs
          </Link>
          <Link href="/companies" className="hover:text-slate-900 transition-colors">
            Companies
          </Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">
            About
          </Link>
        </nav>
      </div>
      <Separator />
    </header>
  );
}
