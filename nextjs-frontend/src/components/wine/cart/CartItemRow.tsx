'use client';

import Link from 'next/link';
import { Trash2 } from 'lucide-react';
import { CartItem } from '@/lib/cart/types';
import { useCart } from '@/lib/cart/context';

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export default function CartItemRow({ item }: { item: CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-4 py-4 border-b border-slate-100 last:border-0">
      {/* Thumbnail */}
      <Link href={`/wine/products/${item.slug}`} className="shrink-0">
        <div className="w-16 h-20 bg-slate-50 rounded overflow-hidden flex items-center justify-center">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="w-full h-full object-contain p-1"
            />
          ) : (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 text-slate-200">
              <path d="M20 3H4v10c0 3.87 3.13 7 7 7s7-3.13 7-7V8h2V3zm-2 10c0 2.76-2.24 5-5 5s-5-2.24-5-5V5h10v8z"/>
            </svg>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex-1 min-w-0">
        <Link href={`/wine/products/${item.slug}`}>
          <h4 className="text-sm font-semibold text-slate-900 leading-snug hover:text-[#6b0f1a] transition-colors line-clamp-2">
            {item.title}
          </h4>
        </Link>
        {item.brandName && (
          <p className="text-xs text-slate-500 mt-0.5">{item.brandName}</p>
        )}
        {item.size && (
          <p className="text-xs text-slate-400">{item.size}</p>
        )}

        <div className="flex items-center justify-between mt-3">
          {/* Quantity stepper */}
          <div className="flex items-center border border-slate-200 rounded overflow-hidden">
            <button
              onClick={() => updateQuantity(item.slug, item.quantity - 1)}
              className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-medium"
              aria-label="Decrease quantity"
            >
              -
            </button>
            <span className="w-8 h-8 flex items-center justify-center text-sm font-medium border-x border-slate-200 select-none">
              {item.quantity}
            </span>
            <button
              onClick={() => updateQuantity(item.slug, item.quantity + 1)}
              className="w-8 h-8 flex items-center justify-center text-slate-600 hover:bg-slate-50 transition-colors font-medium"
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>

          {/* Price + remove */}
          <div className="flex items-center gap-3">
            <span className="text-sm font-bold text-slate-900">
              {formatPrice(item.price * item.quantity)}
            </span>
            <button
              onClick={() => removeItem(item.slug)}
              className="text-slate-300 hover:text-red-500 transition-colors"
              aria-label={`Remove ${item.title} from cart`}
            >
              <Trash2 className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
