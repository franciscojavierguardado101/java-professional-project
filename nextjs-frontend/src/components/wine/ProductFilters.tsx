import Link from 'next/link';
import { ProductCategory } from '@/types';

interface ProductFiltersProps {
  activeCategory?: ProductCategory;
}

const categories: { label: string; slug: ProductCategory }[] = [
  { label: 'Wine', slug: 'WINE' },
  { label: 'Beer', slug: 'BEER' },
  { label: 'Spirits', slug: 'SPIRITS' },
  { label: 'Sake', slug: 'SAKE' },
  { label: 'Cider', slug: 'CIDER' },
  { label: 'Non-Alcoholic', slug: 'NON_ALCOHOLIC' },
];

export default function ProductFilters({ activeCategory }: ProductFiltersProps) {
  return (
    <div>
      <h3 className="text-sm font-semibold text-slate-900 mb-3 uppercase tracking-wide">Category</h3>
      <ul className="space-y-1">
        <li>
          <Link
            href="/wine/products"
            className={`block text-sm px-2 py-1.5 rounded transition-colors ${
              !activeCategory
                ? 'bg-[#6b0f1a] text-white font-medium'
                : 'text-slate-600 hover:bg-slate-100'
            }`}
          >
            All Products
          </Link>
        </li>
        {categories.map((cat) => (
          <li key={cat.slug}>
            <Link
              href={`/wine/products?category=${cat.slug}`}
              className={`block text-sm px-2 py-1.5 rounded transition-colors ${
                activeCategory === cat.slug
                  ? 'bg-[#6b0f1a] text-white font-medium'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
