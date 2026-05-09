import { contentfulClient, getAssetUrl } from './client';
import { ContentfulProductFields, ContentfulProductSkeleton, WineProduct } from './types';

// Maps a raw Contentful entry to the normalized WineProduct shape
// used by all wine store pages and components.
function normalize(fields: ContentfulProductFields): WineProduct {
  return {
    slug:                fields.slug,
    title:               fields.title,
    description:         fields.description ?? null,
    price:               fields.price,
    category:            fields.category,
    imageUrl:            getAssetUrl(fields.productImage) ?? null,
    varietal:            fields.varietal ?? null,
    region:              fields.region ?? null,
    brandName:           fields.brandName ?? null,
    brandCountry:        fields.brandCountry ?? null,
    size:                fields.size ?? null,
    abv:                 fields.abv ?? null,
    inventory:           fields.inventory ?? 0,
    isFeatured:          fields.isFeatured ?? false,
    availableToPurchase: fields.availableToPurchase ?? true,
    producerLabel:       fields.producerLabel ?? null,
  };
}

export async function getContentfulProducts(): Promise<WineProduct[]> {
  if (!contentfulClient) return [];
  try {
    const entries = await contentfulClient.getEntries<ContentfulProductSkeleton>({
      content_type: 'product',
      limit: 200,
      include: 1,
    });
    return entries.items.map((item) => normalize(item.fields as ContentfulProductFields));
  } catch {
    return [];
  }
}

export async function getContentfulProductBySlug(slug: string): Promise<WineProduct | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<ContentfulProductSkeleton>({
      content_type: 'product',
      limit: 200,
      include: 1,
    });
    const match = entries.items.find(
      (item) => (item.fields as ContentfulProductFields).slug === slug
    );
    if (!match) return null;
    return normalize(match.fields as ContentfulProductFields);
  } catch {
    return null;
  }
}

export async function getContentfulFeaturedProducts(): Promise<WineProduct[]> {
  const all = await getContentfulProducts();
  return all.filter((p) => p.isFeatured);
}

export async function getContentfulProductsByCategory(category: string): Promise<WineProduct[]> {
  const all = await getContentfulProducts();
  return all.filter((p) => p.category === category);
}

export async function searchContentfulProducts(keyword: string): Promise<WineProduct[]> {
  const all = await getContentfulProducts();
  const q = keyword.toLowerCase();
  return all.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      (p.varietal ?? '').toLowerCase().includes(q) ||
      (p.region ?? '').toLowerCase().includes(q) ||
      (p.brandName ?? '').toLowerCase().includes(q)
  );
}
