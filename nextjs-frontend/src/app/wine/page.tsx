import Link from 'next/link';
import { getFeaturedProducts, getProducts } from '@/lib/api';
import { Product } from '@/types';
import ProductCard from '@/components/wine/ProductCard';

const categories = [
  { label: 'Wine', slug: 'WINE', description: 'Red, white, rosé & sparkling', color: 'bg-purple-700' },
  { label: 'Beer', slug: 'BEER', description: 'Craft, imports & classics', color: 'bg-amber-600' },
  { label: 'Spirits', slug: 'SPIRITS', description: 'Whiskey, tequila, gin & more', color: 'bg-orange-700' },
  { label: 'Sake', slug: 'SAKE', description: 'Premium Japanese sake', color: 'bg-pink-600' },
  { label: 'Cider', slug: 'CIDER', description: 'Hard cider & fruit wines', color: 'bg-green-600' },
];

export default async function WineHomePage() {
  let featured: Product[] = [];
  let allProducts: Product[] = [];
  let apiAvailable = true;

  try {
    [featured, allProducts] = await Promise.all([
      getFeaturedProducts(),
      getProducts(),
    ]);
  } catch {
    apiAvailable = false;
  }

  return (
    <div>
      {/* Hero Banner */}
      <section className="bg-gradient-to-r from-[#4a0a12] to-[#6b0f1a] text-white">
        <div className="max-w-7xl mx-auto px-4 py-20 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-yellow-400 text-sm font-semibold uppercase tracking-wider mb-3">
              America's Largest Wine Retailer
            </p>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
              Discover Your Perfect Bottle
            </h1>
            <p className="text-white/70 text-lg mb-8 max-w-md">
              Over 8,000 wines, 3,000 spirits, and 2,500 beers. Expert staff. Unbeatable selection.
            </p>
            <div className="flex gap-3">
              <Link
                href="/wine/products"
                className="bg-yellow-400 text-[#4a0a12] font-semibold px-6 py-3 rounded hover:bg-yellow-300 transition-colors"
              >
                Shop All
              </Link>
              <Link
                href="/wine/category/WINE"
                className="border border-white/40 text-white font-semibold px-6 py-3 rounded hover:bg-white/10 transition-colors"
              >
                Browse Wine
              </Link>
            </div>
          </div>
          <div className="flex-1 hidden md:flex justify-center">
            <div className="w-64 h-64 bg-white/10 rounded-full flex items-center justify-center">
              <svg viewBox="0 0 24 24" fill="white" className="w-32 h-32 opacity-40">
                <path d="M20 3H4v10c0 3.87 3.13 7 7 7s7-3.13 7-7V8h2V3zm-2 10c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h10v8z"/>
              </svg>
            </div>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-7xl mx-auto px-4 py-12">
        <h2 className="text-2xl font-bold text-slate-900 mb-6">Shop by Category</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/wine/category/${cat.slug}`}
              className={`${cat.color} text-white rounded-lg p-5 hover:opacity-90 transition-opacity`}
            >
              <h3 className="font-bold text-lg mb-1">{cat.label}</h3>
              <p className="text-white/70 text-xs">{cat.description}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* API unavailable notice */}
      {!apiAvailable && (
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-amber-800">
            Products are unavailable — the Spring Boot API is not running.
            Start it with: <code className="font-mono bg-amber-100 px-1 rounded">cd spring-boot-api && ./mvnw spring-boot:run</code>
          </div>
        </div>
      )}

      {/* Featured Products */}
      {featured.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">Featured Selections</h2>
            <Link href="/wine/products" className="text-sm text-[#6b0f1a] font-medium hover:underline">
              View all
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {featured.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* All Products Preview */}
      {allProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">New Arrivals</h2>
            <Link href="/wine/products" className="text-sm text-[#6b0f1a] font-medium hover:underline">
              View all {allProducts.length} products
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts.slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* Promo Banner */}
      <section className="bg-slate-900 text-white mt-12">
        <div className="max-w-7xl mx-auto px-4 py-12 text-center">
          <h2 className="text-2xl font-bold mb-2">Free Shipping on Orders $49+</h2>
          <p className="text-white/60 mb-6">Delivered to your door. Available in most states.</p>
          <Link
            href="/wine/products"
            className="bg-[#6b0f1a] text-white font-semibold px-8 py-3 rounded hover:bg-[#8b1421] transition-colors"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    </div>
  );
}
