import { createClient, ContentfulClientApi, EntrySkeletonType, Asset, Entry } from 'contentful';

// Only create the client when credentials are present.
// Returns null when CONTENTFUL_SPACE_ID / CONTENTFUL_ACCESS_TOKEN are not set,
// so every page that uses Contentful falls back to its static defaults gracefully.
function makeClient(): ContentfulClientApi<undefined> | null {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) return null;
  return createClient({ space, accessToken });
}

const contentfulClient = makeClient();

// ── Content model types ───────────────────────────────────────────────────────

export interface HeroBannerFields {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: Asset;
}

// Extracts a usable https:// URL from a Contentful Asset
// Contentful returns protocol-relative URLs like //images.ctfassets.net/...
export function getAssetUrl(asset?: Asset): string | null {
  if (!asset) return null;
  const url = (asset.fields?.file as { url?: string })?.url;
  if (!url) return null;
  return url.startsWith('//') ? `https:${url}` : url;
}

export interface AboutPageFields {
  title: string;
  body: string;
}

interface HeroBannerSkeleton extends EntrySkeletonType {
  contentTypeId: 'heroBanner';
  fields: HeroBannerFields;
}

interface AboutPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutPage';
  fields: AboutPageFields;
}

// ── Fetch helpers ─────────────────────────────────────────────────────────────

export async function getHeroBanner(): Promise<HeroBannerFields | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<HeroBannerSkeleton>({
      content_type: 'heroBanner',
      limit: 1,
      include: 1,
    });
    if (entries.items.length === 0) return null;
    return entries.items[0].fields as HeroBannerFields;
  } catch {
    return null;
  }
}

// ── Product Categories ────────────────────────────────────────────────────────
// Managed in Contentful so editors can rename, reorder, or add categories
// without touching code. apiValue maps to the Spring Boot ProductCategory enum.

export interface ProductCategoryFields {
  label: string;
  apiValue: string;
  sortOrder?: number;
}

// Shown when Contentful is unavailable or has no entries yet
const FALLBACK_CATEGORIES: ProductCategoryFields[] = [
  { label: 'Wine',          apiValue: 'WINE',          sortOrder: 1 },
  { label: 'Beer',          apiValue: 'BEER',          sortOrder: 2 },
  { label: 'Spirits',       apiValue: 'SPIRITS',       sortOrder: 3 },
  { label: 'Sake',          apiValue: 'SAKE',          sortOrder: 4 },
  { label: 'Cider',         apiValue: 'CIDER',         sortOrder: 5 },
  { label: 'Non-Alcoholic', apiValue: 'NON_ALCOHOLIC', sortOrder: 6 },
];

interface ProductCategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'productCategory';
  fields: ProductCategoryFields;
}

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

// ── Page (component-based landing pages) ─────────────────────────────────────
// Equivalent of a Drupal node with field_components (Paragraphs field).
// The components array holds entries of any component content type.

export interface PageFields {
  title: string;
  slug: string;
  // Each item is an Entry whose contentType can be heroBanner, promoSection, etc.
  // We type it as Entry<EntrySkeletonType> and switch on sys.contentType.sys.id at render time.
  components?: Entry<EntrySkeletonType>[];
}

interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: 'page';
  fields: PageFields;
}

export async function getPageBySlug(slug: string): Promise<PageFields | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<PageSkeleton>({
      content_type: 'page',
      limit: 100,
      include: 2, // resolve linked component entries (like Drupal's entity_reference depth)
    });
    if (entries.items.length === 0) return null;
    const match = entries.items.find(
      (item) => (item.fields as PageFields).slug === slug
    );
    if (!match) return null;
    return match.fields as PageFields;
  } catch {
    return null;
  }
}

export async function getAboutPage(): Promise<AboutPageFields | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<AboutPageSkeleton>({
      content_type: 'aboutPage',
      limit: 1,
    });
    if (entries.items.length === 0) return null;
    return entries.items[0].fields as AboutPageFields;
  } catch {
    return null;
  }
}
