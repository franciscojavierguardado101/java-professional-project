'use client';

import { useState } from 'react';

interface AddToCartProps {
  productName: string;
}

export default function AddToCart({ productName }: AddToCartProps) {
  const [quantity, setQuantity] = useState(1);

  function decrement() {
    setQuantity((q) => Math.max(1, q - 1));
  }

  function increment() {
    setQuantity((q) => q + 1);
  }

  function handleAddToCart() {
    alert(`Added ${quantity} × "${productName}" to cart`);
  }

  return (
    <div className="flex gap-3">
      <div className="flex items-center border border-slate-200 rounded">
        <button
          onClick={decrement}
          className="px-3 py-2 text-slate-600 hover:bg-slate-50 transition-colors select-none"
          aria-label="Decrease quantity"
        >
          -
        </button>
        <span className="px-4 py-2 text-sm font-medium border-x border-slate-200 min-w-[2.5rem] text-center">
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
      <button
        onClick={handleAddToCart}
        className="flex-1 bg-[#6b0f1a] text-white font-semibold py-2 px-6 rounded hover:bg-[#8b1421] transition-colors"
      >
        Add to Cart
      </button>
    </div>
  );
}
