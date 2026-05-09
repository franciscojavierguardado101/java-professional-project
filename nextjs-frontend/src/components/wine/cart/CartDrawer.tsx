'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import { X } from 'lucide-react';
import { useCart } from '@/lib/cart/context';
import CartItemRow from './CartItemRow';

const FREE_SHIPPING_THRESHOLD = 49;

function formatPrice(price: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
}

export default function CartDrawer() {
  const { items, totalItems, totalPrice, isOpen, closeCart } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const progress = Math.min((totalPrice / FREE_SHIPPING_THRESHOLD) * 100, 100);
  const remaining = Math.max(0, FREE_SHIPPING_THRESHOLD - totalPrice);
  const freeShipping = totalPrice >= FREE_SHIPPING_THRESHOLD;

  if (!mounted) return null;

  return createPortal(
    <>
      {/* Dark overlay */}
      <div
        aria-hidden="true"
        onClick={closeCart}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 40,
          opacity: isOpen ? 1 : 0,
          pointerEvents: isOpen ? 'auto' : 'none',
          transition: 'opacity 300ms',
        }}
      />

      {/* Drawer panel */}
      <div
        role="dialog"
        aria-label="Shopping cart"
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          height: '100%',
          width: '100%',
          maxWidth: '28rem',
          backgroundColor: 'white',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-4px 0 24px rgba(0,0,0,0.15)',
          transform: isOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 300ms ease-in-out',
          pointerEvents: isOpen ? 'auto' : 'none',
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-slate-100">
          <h2 className="text-lg font-bold text-slate-900">
            Your Cart
            {totalItems > 0 && (
              <span className="ml-2 text-sm font-normal text-slate-400">
                ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
            )}
          </h2>
          <button
            onClick={closeCart}
            className="p-1.5 rounded-md hover:bg-slate-100 transition-colors"
            aria-label="Close cart"
          >
            <X className="w-5 h-5 text-slate-600" />
          </button>
        </div>

        {/* Free shipping progress bar */}
        <div className="px-5 py-3 bg-slate-50 border-b border-slate-100">
          {freeShipping ? (
            <p className="text-sm text-green-700 font-semibold text-center mb-2">
              You&apos;ve unlocked FREE SHIPPING!
            </p>
          ) : (
            <p className="text-xs text-slate-600 text-center mb-2">
              Add <strong>{formatPrice(remaining)}</strong> more to unlock free shipping
            </p>
          )}
          <div className="h-1.5 bg-slate-200 rounded-full overflow-hidden">
            <div
              style={{
                height: '100%',
                width: `${progress}%`,
                borderRadius: '9999px',
                backgroundColor: freeShipping ? '#22c55e' : '#6b0f1a',
                transition: 'width 500ms',
              }}
            />
          </div>
        </div>

        {/* Items list */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-16">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" className="w-16 h-16 text-slate-200 mb-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z" />
              </svg>
              <p className="font-semibold text-slate-600 mb-1">Your cart is empty</p>
              <p className="text-sm text-slate-400 mb-6">Add some bottles to get started</p>
              <button
                onClick={closeCart}
                className="text-sm font-semibold text-[#6b0f1a] hover:underline"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {items.map((item) => (
                <CartItemRow key={item.slug} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer — only shown when cart has items */}
        {items.length > 0 && (
          <div className="border-t border-slate-100 px-5 pt-4 pb-6 space-y-3 bg-white">
            <div className="flex items-center justify-between">
              <span className="text-sm text-slate-600">
                Subtotal ({totalItems} {totalItems === 1 ? 'item' : 'items'})
              </span>
              <span className="text-xl font-bold text-slate-900">{formatPrice(totalPrice)}</span>
            </div>
            <p className="text-xs text-slate-400">
              {freeShipping ? 'Free shipping applied' : 'Shipping calculated at checkout'}
            </p>
            <button className="w-full bg-[#6b0f1a] text-white font-bold py-3 rounded-lg hover:bg-[#8b1421] transition-colors text-sm tracking-wide">
              Proceed to Checkout
            </button>
            <Link
              href="/wine/cart"
              onClick={closeCart}
              className="block w-full text-center border border-slate-200 text-slate-700 font-medium py-2.5 rounded-lg hover:bg-slate-50 transition-colors text-sm"
            >
              View Full Cart
            </Link>
          </div>
        )}
      </div>
    </>,
    document.body
  );
}
