'use client';

import { useState } from 'react';
import { useCart } from '@/lib/cart/context';

interface ProductForCart {
  slug: string;
  title: string;
  price: number;
  imageUrl: string | null;
  size: string | null;
  brandName: string | null;
}

interface AddToCartProps {
  product: ProductForCart;
}

export default function AddToCart({ product }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);
  const { addItem, openCart } = useCart();

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => q + 1);
  }

  function handleAddToCart() {
    addItem(
      {
        slug:      product.slug,
        title:     product.title,
        price:     product.price,
        imageUrl:  product.imageUrl,
        size:      product.size,
        brandName: product.brandName,
      },
      quantity
    );
    openCart();
    setQuantity(1);
  }

  return (
    <div className="flex gap-3">
      {/* Quantity stepper */}
      <div className="flex items-center border border-slate-200 rounded">
        <button
          onClick={decrement}
          className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors select-none"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-4 py-2 text-sm font-medium border-x border-slate-200 min-w-[2.5rem] text-center select-none">
          {quantity}
        </span>
        <button
          onClick={increment}
          className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors select-none"
          aria-label="Increase quantity"
        >
          +
        </button>
      </div>

      {/* Add to Cart */}
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-[#6b0f1a] text-white font-semibold py-2 px-6 rounded hover:bg-[#8b1421] transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
