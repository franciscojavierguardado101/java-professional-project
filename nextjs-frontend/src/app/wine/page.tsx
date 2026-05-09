import Link from 'next/link';
import { getHeroBanner, getContentfulFeaturedProducts, getContentfulProducts } from '@/lib/contentful';
import { WineProduct } from '@/lib/contentful';
import ProductCard from '@/components/wine/ProductCard';
import HeroBanner from '@/components/wine/HeroBanner';

const categories = [
  { label: 'Wine',    slug: 'WINE',    description: 'Red, white, rosé & sparkling', color: 'bg-purple-700' },
  { label: 'Beer',    slug: 'BEER',    description: 'Craft, imports & classics',    color: 'bg-amber-600'  },
  { label: 'Spirits', slug: 'SPIRITS', description: 'Whiskey, tequila, gin & more', color: 'bg-orange-700' },
  { label: 'Sake',    slug: 'SAKE',    description: 'Premium Japanese sake',         color: 'bg-pink-600'   },
  { label: 'Cider',   slug: 'CIDER',   description: 'Hard cider & fruit wines',      color: 'bg-green-600'  },
];

export default async function WineHomePage() {
  const [heroBanner, featured, allProducts] = await Promise.all([
    getHeroBanner(),
    getContentfulFeaturedProducts(),
    getContentfulProducts(),
  ]);

  return (
    <div>
      <HeroBanner data={heroBanner} />

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
            {featured.map((product: WineProduct) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      )}

      {/* New Arrivals */}
      {allProducts.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-12 border-t border-slate-100">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-slate-900">New Arrivals</h2>
            <Link href="/wine/products" className="text-sm text-[#6b0f1a] font-medium hover:underline">
              View all {allProducts.length} products
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {allProducts.slice(0, 6).map((product: WineProduct) => (
              <ProductCard key={product.slug} product={product} />
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
