import Link from 'next/link';
import { Separator } from '@/components/ui/separator';

export default function Footer() {
  return (
    <footer className="bg-white mt-auto">
      <Separator />
      <div className="max-w-6xl mx-auto px-4 py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
        <span className="font-semibold text-slate-700">JobBoard</span>
        <nav className="flex gap-6">
          <Link href="/jobs" className="hover:text-slate-900 transition-colors">Jobs</Link>
          <Link href="/companies" className="hover:text-slate-900 transition-colors">Companies</Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">About</Link>
        </nav>
        <span>Built with Spring Boot + Next.js</span>
      </div>
    </footer>
  );
}
