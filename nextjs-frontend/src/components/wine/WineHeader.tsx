'use client';

import Link from 'next/link';
import { useState } from 'react';
import { Search, ShoppingCart, ChevronDown, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { useCart } from '@/lib/cart/context';

const categories = [
  { label: 'Wine',    slug: 'WINE'    },
  { label: 'Beer',    slug: 'BEER'    },
  { label: 'Spirits', slug: 'SPIRITS' },
  { label: 'Sake',    slug: 'SAKE'    },
  { label: 'Cider',   slug: 'CIDER'   },
];

export default function WineHeader() {
  const [search, setSearch] = useState('');
  const { totalItems, openCart } = useCart();

  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    if (search.trim()) {
      window.location.href = `/wine/products?search=${encodeURIComponent(search.trim())}`;
    }
  }

  return (
    <header className="bg-[#6b0f1a] text-white">
      {/* Top bar */}
      <div className="bg-[#4a0a12] text-xs py-1.5">
        <div className="max-w-7xl mx-auto px-4 flex justify-between items-center">
          <span>Free shipping on orders over $49</span>
          <div className="flex gap-4">
            <Link href="/wine" className="hover:underline">Wine Store</Link>
            <Link href="/jobs" className="hover:underline">Job Board</Link>
          </div>
        </div>
      </div>

      {/* Main header */}
      <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-6">
        {/* Logo */}
        <Link href="/wine" className="shrink-0">
          <span className="text-2xl font-bold tracking-tight">
            Total<span className="text-yellow-400">Wine</span>
          </span>
          <span className="block text-[10px] tracking-widest text-white/60 uppercase">
            &amp; More
          </span>
        </Link>

        {/* Search */}
        <form onSubmit={handleSearch} className="flex-1 max-w-2xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search wines, beers, spirits..."
              className="pl-9 bg-white text-slate-900 border-0 h-10"
            />
          </div>
        </form>

        {/* Cart controls */}
        <div className="flex items-center gap-1 shrink-0">
          {/* Cart icon + badge → links to full cart page */}
          <Link
            href="/wine/cart"
            className="relative flex items-center gap-1.5 hover:text-yellow-300 transition-colors"
            aria-label="View cart"
          >
            <span className="relative">
              <ShoppingCart className="w-5 h-5" aria-hidden="true" />
              {totalItems > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-yellow-400 text-[#6b0f1a] text-[10px] font-black rounded-full min-w-[18px] h-[18px] flex items-center justify-center px-1 leading-none shadow">
                  {totalItems > 99 ? '99+' : totalItems}
                </span>
              )}
            </span>
            <span className="text-sm font-medium">Cart</span>
          </Link>

          {/* Arrow button → opens the cart drawer */}
          <button
            onClick={openCart}
            className="ml-1 p-1 rounded hover:text-yellow-300 transition-colors"
            aria-label="Open cart drawer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Category nav */}
      <nav className="border-t border-white/20">
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex">
            {categories.map((cat) => (
              <li key={cat.slug}>
                <Link
                  href={`/wine/category/${cat.slug}`}
                  className="flex items-center gap-1 px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
                >
                  {cat.label}
                  <ChevronDown className="w-3 h-3 opacity-60" />
                </Link>
              </li>
            ))}
            <li>
              <Link
                href="/wine/products"
                className="flex items-center px-4 py-2.5 text-sm font-medium hover:bg-white/10 transition-colors"
              >
                All Products
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </header>
  );
}
