'use client';

import Link from 'next/link';
import { ShoppingCart, ArrowLeft } from 'lucide-react';
import { useCart } from '@/lib/cart/context';
import CartItemRow from '@/components/wine/cart/CartItemRow';

const FREE_SHIPPING_THRESHOLD = 49;

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export default function CartPage() {
  const { items, totalItems, totalPrice, clearCart } = useCart();

  const freeShipping    = totalPrice >= FREE_SHIPPING_THRESHOLD;
  const shippingCost    = freeShipping || totalItems === 0 ? 0 : 9.99;
  const orderTotal      = totalPrice + shippingCost;
  const progressPct     = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining       = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);

  if (items.length === 0) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center px-6 text-center">
        <div className="bg-slate-50 rounded-full p-6 mb-6">
          <ShoppingCart className="w-12 h-12 text-slate-300" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900 mb-2">Your cart is empty</h1>
        <p className="text-slate-500 mb-8 max-w-sm">
          Looks like you haven&apos;t added anything yet. Browse our selection to get started.
        </p>
        <Link
          href="/wine/products"
          className="inline-flex items-center gap-2 bg-[#6b0f1a] text-white font-semibold px-8 py-3 rounded-lg hover:bg-[#8b1421] transition-colors"
        >
          Browse Products
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-slate-50 min-h-screen">
      <div className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-12 py-10">

        {/* Page header */}
        <div className="flex items-start justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">Shopping Cart</h1>
            <p className="text-slate-500 mt-1 text-sm">
              {totalItems} {totalItems === 1 ? 'item' : 'items'} in your cart
            </p>
          </div>
          <button
            onClick={clearCart}
            className="text-sm text-slate-400 hover:text-red-500 transition-colors mt-1"
          >
            Clear cart
          </button>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-start">

          {/* ── Left column: items ─────────────────────────── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Free shipping progress */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm px-6 py-4">
              {freeShipping ? (
                <p className="text-sm font-semibold text-green-700 text-center">
                  You&apos;ve unlocked FREE SHIPPING!
                </p>
              ) : (
                <p className="text-sm text-slate-600 text-center mb-2">
                  Add <span className="font-semibold text-[#6b0f1a]">{formatPrice(remaining)}</span> more to unlock free shipping
                </p>
              )}
              <div className="mt-2 h-2 bg-slate-100 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    freeShipping ? 'bg-green-500' : 'bg-[#6b0f1a]'
                  }`}
                  style={{ width: `${progressPct}%` }}
                />
              </div>
            </div>

            {/* Items card */}
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden">
              <div className="px-6 py-4 border-b border-slate-50">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Items
                </h2>
              </div>
              <div className="px-6 divide-y divide-slate-50">
                {items.map((item) => (
                  <CartItemRow key={item.slug} item={item} />
                ))}
              </div>
            </div>

            {/* Continue shopping */}
            <Link
              href="/wine/products"
              className="inline-flex items-center gap-2 text-sm text-[#6b0f1a] font-semibold hover:underline"
            >
              <ArrowLeft className="w-4 h-4" />
              Continue Shopping
            </Link>
          </div>

          {/* ── Right column: order summary ─────────────────── */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl border border-slate-100 shadow-sm overflow-hidden sticky top-6">

              <div className="px-6 py-4 border-b border-slate-50">
                <h2 className="text-sm font-semibold text-slate-500 uppercase tracking-wide">
                  Order Summary
                </h2>
              </div>

              <div className="px-6 py-5 space-y-3">
                <div className="flex justify-between text-sm text-slate-600">
                  <span>Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})</span>
                  <span className="font-medium text-slate-900">{formatPrice(totalPrice)}</span>
                </div>

                <div className="flex justify-between text-sm text-slate-600">
                  <span>Shipping</span>
                  {freeShipping ? (
                    <span className="text-green-600 font-semibold">FREE</span>
                  ) : (
                    <span className="font-medium text-slate-900">{formatPrice(shippingCost)}</span>
                  )}
                </div>

                <div className="flex justify-between text-sm text-slate-400">
                  <span>Tax</span>
                  <span>Calculated at checkout</span>
                </div>

                <div className="border-t border-slate-100 pt-4 flex justify-between">
                  <span className="font-bold text-slate-900">Estimated Total</span>
                  <span className="text-xl font-bold text-slate-900">{formatPrice(orderTotal)}</span>
                </div>
              </div>

              <div className="px-6 pb-6 space-y-3">
                <button className="w-full bg-[#6b0f1a] text-white font-bold py-3.5 rounded-lg hover:bg-[#8b1421] transition-colors text-sm tracking-wide shadow-sm">
                  Proceed to Checkout
                </button>
                <p className="text-xs text-slate-400 text-center leading-relaxed">
                  Must be 21+ to purchase alcohol.
                  <br />Taxes and fees calculated at checkout.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
