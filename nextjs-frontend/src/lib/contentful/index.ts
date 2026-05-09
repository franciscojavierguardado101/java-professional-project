// Barrel export — all existing imports ( @/lib/contentful ) resolve here unchanged.

export { getAssetUrl } from './client';

export type {
  HeroBannerFields,
  AboutPageFields,
  ProductCategoryFields,
  PageFields,
  ContentfulProductFields,
  WineProduct,
} from './types';

export { getHeroBanner } from './hero';

export { getProductCategories, FALLBACK_CATEGORIES } from './categories';

export {
  getContentfulProducts,
  getContentfulProductBySlug,
  getContentfulFeaturedProducts,
  getContentfulProductsByCategory,
  searchContentfulProducts,
} from './products';

export { getAboutPage, getPageBySlug } from './pages';
