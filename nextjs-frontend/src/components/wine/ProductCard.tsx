import Link from 'next/link';
import { Product } from '@/types';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

const CATEGORY_COLORS: Record<string, string> = {
  WINE: 'bg-purple-100 text-purple-800',
  BEER: 'bg-amber-100 text-amber-800',
  SPIRITS: 'bg-orange-100 text-orange-800',
  SAKE: 'bg-pink-100 text-pink-800',
  CIDER: 'bg-green-100 text-green-800',
  NON_ALCOHOLIC: 'bg-blue-100 text-blue-800',
};

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Link
      href={`/wine/products/${product.id}`}
      className="group flex flex-col bg-white border border-slate-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      {/* Image placeholder */}
      <div className="aspect-[3/4] bg-slate-50 flex items-center justify-center relative overflow-hidden">
        {product.imageUrl ? (
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="flex flex-col items-center gap-2 text-slate-300 p-6">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-16 h-16 opacity-30">
              <path d="M20 3H4v10c0 3.87 3.13 7 7 7s7-3.13 7-7V8h2V3zm-2 10c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h10v8z"/>
            </svg>
            <span className="text-xs text-slate-400 text-center">{product.varietal ?? product.category}</span>
          </div>
        )}
        {product.isFeatured && (
          <span className="absolute top-2 left-2 bg-[#6b0f1a] text-white text-xs font-medium px-2 py-0.5 rounded">
            Featured
          </span>
        )}
      </div>

      {/* Info */}
      <div className="p-3 flex flex-col gap-1 flex-1">
        <span className={`text-xs font-medium px-1.5 py-0.5 rounded self-start ${CATEGORY_COLORS[product.category] ?? 'bg-slate-100 text-slate-700'}`}>
          {product.category}
        </span>
        <h3 className="text-sm font-semibold text-slate-900 leading-snug line-clamp-2 group-hover:text-[#6b0f1a] transition-colors">
          {product.name}
        </h3>
        {product.brandName && (
          <p className="text-xs text-slate-500">{product.brandName}</p>
        )}
        {product.varietal && (
          <p className="text-xs text-slate-400">{product.varietal}</p>
        )}
        {product.size && (
          <p className="text-xs text-slate-400">{product.size}</p>
        )}
        <div className="mt-auto pt-2 flex items-center justify-between">
          <span className="text-base font-bold text-slate-900">
            {formatPrice(product.price)}
          </span>
          {product.abv && (
            <span className="text-xs text-slate-400">{product.abv}% ABV</span>
          )}
        </div>
      </div>
    </Link>
  );
}
