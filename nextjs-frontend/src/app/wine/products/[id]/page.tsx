import { getProduct, getProductsByCategory } from '@/lib/api';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/wine/ProductCard';

interface PageProps {
  params: Promise<{ id: string }>;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

const CATEGORY_LABELS: Record<string, string> = {
  WINE: 'Wine',
  BEER: 'Beer',
  SPIRITS: 'Spirits',
  SAKE: 'Sake',
  CIDER: 'Cider',
  NON_ALCOHOLIC: 'Non-Alcoholic',
};

export default async function ProductDetailPage({ params }: PageProps) {
  const { id } = await params;
  const productId = parseInt(id, 10);

  if (isNaN(productId)) notFound();

  let product: Product;
  let related: Product[] = [];

  try {
    product = await getProduct(productId);
    const categoryProducts = await getProductsByCategory(product.category);
    related = categoryProducts.filter((p) => p.id !== product.id).slice(0, 5);
  } catch (err: unknown) {
    const status = (err as { status?: number })?.status;
    if (status === 404) notFound();
    throw err;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href="/wine" className="hover:text-slate-900 transition-colors">Wine Store</Link>
        <span>/</span>
        <Link href={`/wine/category/${product.category}`} className="hover:text-slate-900 transition-colors">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product image */}
        <div className="bg-slate-50 rounded-xl flex items-center justify-center aspect-square">
          {product.imageUrl ? (
            <img
              src={product.imageUrl}
              alt={product.name}
              className="w-full h-full object-contain p-8"
            />
          ) : (
            <div className="flex flex-col items-center gap-3 text-slate-300">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 opacity-20">
                <path d="M20 3H4v10c0 3.87 3.13 7 7 7s7-3.13 7-7V8h2V3zm-2 10c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h10v8z"/>
              </svg>
              <span className="text-sm text-slate-400">{product.varietal ?? product.category}</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div>
          {product.brandName && (
            <p className="text-sm font-semibold text-[#6b0f1a] uppercase tracking-wide mb-2">
              {product.brandName}
            </p>
          )}
          <h1 className="text-3xl font-bold text-slate-900 mb-3">{product.name}</h1>

          {/* Meta tags */}
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
              {CATEGORY_LABELS[product.category]}
            </span>
            {product.varietal && (
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                {product.varietal}
              </span>
            )}
            {product.region && (
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                {product.region}
              </span>
            )}
            {product.size && (
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                {product.size}
              </span>
            )}
            {product.abv && (
              <span className="text-xs bg-slate-100 text-slate-700 px-2 py-1 rounded">
                {product.abv}% ABV
              </span>
            )}
          </div>

          <div className="text-4xl font-bold text-slate-900 mb-6">
            {formatPrice(product.price)}
          </div>

          {product.description && (
            <p className="text-slate-600 leading-relaxed mb-8">{product.description}</p>
          )}

          {/* Add to cart */}
          <div className="flex gap-3">
            <div className="flex items-center border border-slate-200 rounded">
              <button className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors">-</button>
              <span className="px-4 py-2 text-sm font-medium border-x border-slate-200">1</span>
              <button className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors">+</button>
            </div>
            <button className="flex-1 bg-[#6b0f1a] text-white font-semibold py-2 px-6 rounded hover:bg-[#8b1421] transition-colors">
              Add to Cart
            </button>
          </div>

          {product.inventory <= 5 && product.inventory > 0 && (
            <p className="text-orange-600 text-sm mt-3 font-medium">
              Only {product.inventory} left in stock
            </p>
          )}
          {product.inventory === 0 && (
            <p className="text-red-600 text-sm mt-3 font-medium">Out of stock</p>
          )}

          {/* Brand info */}
          {product.brandName && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">Producer</p>
              <p className="font-medium text-slate-900">{product.brandName}</p>
              {product.brandCountry && (
                <p className="text-sm text-slate-500">{product.brandCountry}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Related Products */}
      {related.length > 0 && (
        <section className="mt-16">
          <h2 className="text-xl font-bold text-slate-900 mb-6">
            More {CATEGORY_LABELS[product.category]}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
