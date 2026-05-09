'use client';

// WineShell owns the CartProvider and CartDrawer in a single client boundary.
// This guarantees WineHeader, CartDrawer, AddToCart, and the cart page
// all read from and write to the same CartContext instance.

import { ReactNode } from 'react';
import { CartProvider } from '@/lib/cart/context';
import CartDrawer from '@/components/wine/cart/CartDrawer';

export default function WineShell({ children }: { children: ReactNode }) {
  return (
    <CartProvider>
      {children}
      <CartDrawer />
    </CartProvider>
  );
}
