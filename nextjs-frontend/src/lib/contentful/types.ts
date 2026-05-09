import { Asset, Entry, EntrySkeletonType } from 'contentful';

// ── Hero Banner ───────────────────────────────────────────────────────────────

export interface HeroBannerFields {
  title?: string;
  subtitle?: string;
  ctaText?: string;
  ctaLink?: string;
  backgroundImage?: Asset;
}

export interface HeroBannerSkeleton extends EntrySkeletonType {
  contentTypeId: 'heroBanner';
  fields: HeroBannerFields;
}

// ── About Page ────────────────────────────────────────────────────────────────

export interface AboutPageFields {
  title: string;
  body: string;
}

export interface AboutPageSkeleton extends EntrySkeletonType {
  contentTypeId: 'aboutPage';
  fields: AboutPageFields;
}

// ── Product Category ──────────────────────────────────────────────────────────

export interface ProductCategoryFields {
  label: string;
  apiValue: string;
  sortOrder?: number;
}

export interface ProductCategorySkeleton extends EntrySkeletonType {
  contentTypeId: 'productCategory';
  fields: ProductCategoryFields;
}

// ── Page (component-based landing pages) ─────────────────────────────────────

export interface PageFields {
  title: string;
  slug: string;
  components?: Entry<EntrySkeletonType>[];
}

export interface PageSkeleton extends EntrySkeletonType {
  contentTypeId: 'page';
  fields: PageFields;
}

// ── Wine Product ──────────────────────────────────────────────────────────────
// Contentful is the source of truth for the wine store product catalog.
// Spring Boot handles inventory updates, orders, and business logic.

export interface ContentfulProductFields {
  title: string;
  slug: string;
  description?: string;
  price: number;
  category: string;
  productImage?: Asset;
  varietal?: string;
  region?: string;
  brandName?: string;
  brandCountry?: string;
  size?: string;
  abv?: number;
  inventory?: number;
  isFeatured?: boolean;
  availableToPurchase?: boolean;
  producerLabel?: string;
}

export interface ContentfulProductSkeleton extends EntrySkeletonType {
  contentTypeId: 'product';
  fields: ContentfulProductFields;
}

// WineProduct is the normalized shape used by all wine store pages and components.
// It is produced by mapping a Contentful entry — no Spring Boot call required.
export interface WineProduct {
  slug: string;
  title: string;
  description: string | null;
  price: number;
  category: string;
  imageUrl: string | null;
  varietal: string | null;
  region: string | null;
  brandName: string | null;
  brandCountry: string | null;
  size: string | null;
  abv: number | null;
  inventory: number;
  isFeatured: boolean;
  availableToPurchase: boolean;
  producerLabel: string | null;
}
