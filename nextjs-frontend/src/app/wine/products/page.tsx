import { getContentfulProducts, searchContentfulProducts, getProductCategories } from '@/lib/contentful';
import { WineProduct } from '@/lib/contentful';
import ProductCard from '@/components/wine/ProductCard';
import ProductFilters from '@/components/wine/ProductFilters';

interface PageProps {
  searchParams: Promise<{ search?: string; category?: string }>;
}

export default async function ProductsPage({ searchParams }: PageProps) {
  const params = await searchParams;
  const keyword = params.search ?? '';
  const categoryFilter = params.category;

  const [categories, products] = await Promise.all([
    getProductCategories(),
    keyword ? searchContentfulProducts(keyword) : getContentfulProducts(),
  ]);

  const filtered: WineProduct[] = categoryFilter
    ? products.filter((p) => p.category === categoryFilter)
    : products;

  const activeLabel = categories.find((c) => c.apiValue === categoryFilter)?.label;
  const heading = keyword
    ? `Results for "${keyword}"`
    : activeLabel ?? 'All Products';

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="flex items-start gap-8">
        <aside className="w-48 shrink-0 hidden md:block">
          <ProductFilters activeCategory={categoryFilter} categories={categories} />
        </aside>

        <div className="flex-1">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-2xl font-bold text-slate-900">{heading}</h1>
              <p className="text-sm text-slate-500 mt-1">{filtered.length} products</p>
            </div>
          </div>

          {filtered.length === 0 ? (
            <div className="text-center py-20 text-slate-400">
              <p className="text-lg font-medium">No products found</p>
              <p className="text-sm mt-1">Try a different search or browse all products.</p>
            </div>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {filtered.map((product) => (
                <ProductCard key={product.slug} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
