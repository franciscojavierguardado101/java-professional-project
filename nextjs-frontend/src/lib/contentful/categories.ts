import { contentfulClient } from './client';
import { ProductCategoryFields, ProductCategorySkeleton } from './types';

// Used when Contentful is unavailable or has no entries yet.
export const FALLBACK_CATEGORIES: ProductCategoryFields[] = [
  { label: 'Wine',          apiValue: 'WINE',          sortOrder: 1 },
  { label: 'Beer',          apiValue: 'BEER',          sortOrder: 2 },
  { label: 'Spirits',       apiValue: 'SPIRITS',       sortOrder: 3 },
  { label: 'Sake',          apiValue: 'SAKE',          sortOrder: 4 },
  { label: 'Cider',         apiValue: 'CIDER',         sortOrder: 5 },
  { label: 'Non-Alcoholic', apiValue: 'NON_ALCOHOLIC', sortOrder: 6 },
];

export async function getProductCategories(): Promise<ProductCategoryFields[]> {
  if (!contentfulClient) return FALLBACK_CATEGORIES;
  try {
    const entries = await contentfulClient.getEntries<ProductCategorySkeleton>({
      content_type: 'productCategory',
      limit: 50,
    });
    if (entries.items.length === 0) return FALLBACK_CATEGORIES;
    return entries.items
      .map((item) => item.fields as ProductCategoryFields)
      .sort((a, b) => (a.sortOrder ?? 99) - (b.sortOrder ?? 99));
  } catch {
    return FALLBACK_CATEGORIES;
  }
}
