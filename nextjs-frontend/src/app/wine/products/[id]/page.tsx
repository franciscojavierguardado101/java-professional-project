import { getProduct, getProductsByCategory } from '@/lib/api';
import { getProductDetail, getAssetUrl } from '@/lib/contentful';
import { Product } from '@/types';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import ProductCard from '@/components/wine/ProductCard';
import AddToCart from '@/components/wine/AddToCart';

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

  // Contentful overlay — fetched in parallel with related products above;
  // null when Contentful is not configured or has no entry for this productId.
  const detail = await getProductDetail(productId);

  // Image: Contentful upload first, then Spring Boot imageUrl, then SVG placeholder
  const imageUrl = getAssetUrl(detail?.productImage) ?? product.imageUrl ?? null;

  // "Available to Purchase" controls whether Add to Cart is shown.
  // Defaults to true when the Contentful entry doesn't exist yet so products
  // are always purchasable before a content editor explicitly disables them.
  const availableToPurchase = detail?.availableToPurchase ?? true;

  // "PRODUCER" label is editable from Contentful; falls back to the hard label.
  const producerLabel = detail?.producerLabel ?? 'Producer';

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <nav className="text-sm text-slate-500 mb-6 flex gap-2 items-center">
        <Link href="/wine" className="hover:text-slate-900 transition-colors">Wine Store</Link>
        <span>/</span>
        <Link href={`/wine/category/${product.category.toLowerCase()}`} className="hover:text-slate-900 transition-colors">
          {CATEGORY_LABELS[product.category] ?? product.category}
        </Link>
        <span>/</span>
        <span className="text-slate-800">{product.name}</span>
      </nav>

      <div className="grid md:grid-cols-2 gap-12">
        {/* Product image */}
        <div className="bg-slate-50 rounded-xl flex items-center justify-center aspect-square">
          {imageUrl ? (
            <img
              src={imageUrl}
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

          {/* Add to Cart — controlled by Contentful "Available to Purchase" boolean */}
          {availableToPurchase ? (
            <div>
              <AddToCart productName={product.name} />
              {product.inventory <= 5 && product.inventory > 0 && (
                <p className="text-orange-600 text-sm mt-3 font-medium">
                  Only {product.inventory} left in stock
                </p>
              )}
              {product.inventory === 0 && (
                <p className="text-red-600 text-sm mt-3 font-medium">Out of stock</p>
              )}
            </div>
          ) : (
            <p className="text-slate-500 text-sm italic">
              This item is not currently available for online purchase. Contact your local store.
            </p>
          )}

          {/* Producer section */}
          {product.brandName && (
            <div className="mt-8 pt-6 border-t border-slate-100">
              <p className="text-xs text-slate-500 uppercase tracking-wide mb-1">{producerLabel}</p>
              <p className="font-medium text-slate-900">{product.brandName}</p>
              {product.brandCountry && (
                <p className="text-sm text-slate-500">{product.brandCountry}</p>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Details */}
      <section className="mt-12 border-t border-slate-100 pt-10">
        <h2 className="text-lg font-bold text-slate-900 mb-4">Details</h2>
        <dl className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-4">
          <div>
            <dt className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Category</dt>
            <dd className="text-sm font-medium text-slate-900">{CATEGORY_LABELS[product.category]}</dd>
          </div>
          {product.varietal && (
            <div>
              <dt className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Varietal</dt>
              <dd className="text-sm font-medium text-slate-900">{product.varietal}</dd>
            </div>
          )}
          {product.region && (
            <div>
              <dt className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Region</dt>
              <dd className="text-sm font-medium text-slate-900">{product.region}</dd>
            </div>
          )}
          {product.brandCountry && (
            <div>
              <dt className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Country</dt>
              <dd className="text-sm font-medium text-slate-900">{product.brandCountry}</dd>
            </div>
          )}
          {product.size && (
            <div>
              <dt className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Size</dt>
              <dd className="text-sm font-medium text-slate-900">{product.size}</dd>
            </div>
          )}
          {product.abv && (
            <div>
              <dt className="text-xs text-slate-500 uppercase tracking-wide mb-0.5">Alcohol Content</dt>
              <dd className="text-sm font-medium text-slate-900">{product.abv}% ABV</dd>
            </div>
          )}
        </dl>
      </section>

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
