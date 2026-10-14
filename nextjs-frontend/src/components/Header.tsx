import Link from 'next/link';
import { Separator } from '@/components/ui/separator';
import MobileMenu from './MobileMenu';

export default function Header() {
  return (
    <header className="bg-white sticky top-0 z-50 shadow-sm" style={{ position: 'relative' }}>
      <div className="max-w-6xl mx-auto px-4 py-4 flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-900 tracking-tight">
          JobBoard
        </Link>

        {/* Desktop nav — hidden on mobile */}
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
          <Link href="/bio" className="hover:text-slate-900 transition-colors">
            Bio
          </Link>
          <Link href="/about" className="hover:text-slate-900 transition-colors">
            About
          </Link>
          <Link
            href="/wine"
            className="bg-[#6b0f1a] text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-[#8b1421] transition-colors"
          >
            Wine Store
          </Link>
          <Link
            href="/dataset"
            className="bg-slate-800 text-white px-3 py-1.5 rounded text-xs font-semibold hover:bg-slate-700 transition-colors"
          >
            Dataset
          </Link>
          <Link
            href="/space"
            className="bg-indigo-950 text-indigo-300 px-3 py-1.5 rounded text-xs font-semibold hover:bg-indigo-900 transition-colors"
          >
            Space
          </Link>
        </nav>

        {/* Mobile hamburger — hidden on desktop */}
        <MobileMenu />
      </div>
      <Separator />
    </header>
  );
}
