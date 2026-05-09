import { getContentfulProductsByCategory, getProductCategories } from '@/lib/contentful';
import { WineProduct } from '@/lib/contentful';
import { notFound } from 'next/navigation';
import ProductCard from '@/components/wine/ProductCard';
import ProductFilters from '@/components/wine/ProductFilters';
import Link from 'next/link';

interface PageProps {
  params: Promise<{ slug: string }>;
}

const VALID_CATEGORIES = new Set(['WINE', 'BEER', 'SPIRITS', 'SAKE', 'CIDER', 'NON_ALCOHOLIC']);

const CATEGORY_LABELS: Record<string, string> = {
  WINE:          'Wine',
  BEER:          'Beer',
  SPIRITS:       'Spirits',
  SAKE:          'Sake',
  CIDER:         'Cider',
  NON_ALCOHOLIC: 'Non-Alcoholic',
};

const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  WINE:          'Red, white, rosé, sparkling, and dessert wines from around the world.',
  BEER:          'Domestic craft beers, international imports, and everything in between.',
  SPIRITS:       'Whiskey, tequila, vodka, gin, rum, and other premium spirits.',
  SAKE:          'Premium Japanese sake — junmai, ginjo, daiginjo, and more.',
  CIDER:         'Hard cider, perry, and fruit wines crafted from fresh fruit.',
  NON_ALCOHOLIC: 'Alcohol-free wines, beers, and specialty beverages.',
};

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const category = slug.toUpperCase();

  if (!VALID_CATEGORIES.has(category)) notFound();

  const [categories, products] = await Promise.all([
    getProductCategories(),
    getContentfulProductsByCategory(category),
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href="/wine" className="hover:text-slate-900 transition-colors">Wine Store</Link>
        <span>/</span>
        <span className="text-slate-800">{CATEGORY_LABELS[category]}</span>
      </nav>

      <div className="mb-8">
        <h1 className="text-3xl font-bold text-slate-900">{CATEGORY_LABELS[category]}</h1>
        <p className="text-slate-500 mt-2">{CATEGORY_DESCRIPTIONS[category]}</p>
      </div>

      <div className="flex items-start gap-8">
        <aside className="w-48 shrink-0 hidden md:block">
          <ProductFilters activeCategory={category} categories={categories} />
        </aside>

        <div className="flex-1">
          <p className="text-sm text-slate-500 mb-4">{products.length} products</p>

          {products.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium">No {CATEGORY_LABELS[category].toLowerCase()} products yet</p>
              <p className="text-sm mt-1">Check back soon or browse our other categories.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {products.map((product: WineProduct) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
