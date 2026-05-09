'use client';

import Link from 'next/link';
import { ShoppingCart } from 'lucide-react';
import { useCart } from '@/lib/cart/context';
import CartItemRow from '@/components/wine/cart/CartItemRow';

const FREE_SHIPPING_THRESHOLD = 49;

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const freeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingCost = freeShipping ? 0 : totalItems > 0 ? 9.99 : 0;
  const orderTotal = totalPrice + shippingCost;

  if (items.length === 0) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <ShoppingCart className="w-16 h-16 text-slate-200 mx-auto mb-4" />
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8">Looks like you haven&apos;t added anything yet.</p>
        <Link
          href="/wine/products"
          className="inline-block bg-[#6b0f1a] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#8b1421] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-slate-900">Your Cart</h1>
        <button
          onClick={clearCart}
          className="text-sm text-slate-400 hover:text-red-500 transition-colors"
        >
          Clear cart
        </button>
      </div>

      <div className="grid lg:grid-cols-3 gap-10">
        {/* Items column */}
        <div className="lg:col-span-2">
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <p className="text-sm font-medium text-slate-600">
                {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
              </p>
            </div>
            <div className="px-6 divide-y divide-slate-100">
              {items.map((item) => (
                <CartItemRow key={item.slug} item={item} />
              ))}
            </div>
          </div>

          <div className="mt-4">
            <Link
              href="/wine/products"
              className="text-sm text-[#6b0f1a] font-semibold hover:underline"
            >
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order summary */}
        <div className="lg:col-span-1">
          <div className="bg-white border border-slate-100 rounded-xl overflow-hidden sticky top-4">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-100">
              <h2 className="text-base font-bold text-slate-900">Order Summary</h2>
            </div>

            <div className="px-6 py-5 space-y-3">
              <div className="flex justify-between text-sm text-slate-600">
                <span>Subtotal</span>
                <span>{formatPrice(totalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm text-slate-600">
                <span>Shipping</span>
                <span className={freeShipping ? 'text-green-600 font-medium' : ''}>
                  {freeShipping ? 'FREE' : formatPrice(shippingCost)}
                </span>
              </div>

              {!freeShipping && (
                <div className="pt-1">
                  <p className="text-xs text-slate-500 mb-1.5">
                    Add {formatPrice(FREE_SHIPPING_THRESHOLD - totalPrice)} more for free shipping
                  </p>
                  <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-[#6b0f1a] rounded-full transition-all duration-500"
                      style={{ width: `${Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              )}

              <div className="border-t border-slate-100 pt-3 flex justify-between font-bold text-slate-900">
                <span>Total</span>
                <span className="text-lg">{formatPrice(orderTotal)}</span>
              </div>
            </div>

            <div className="px-6 pb-6 space-y-3">
              <button className="w-full bg-[#6b0f1a] text-white font-bold py-3.5 rounded-lg hover:bg-[#8b1421] transition-colors text-sm tracking-wide">
                Proceed to Checkout
              </button>
              <p className="text-xs text-slate-400 text-center">
                Must be 21+ to purchase alcohol
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
