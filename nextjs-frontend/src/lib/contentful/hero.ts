import { contentfulClient } from './client';
import { HeroBannerFields, HeroBannerSkeleton } from './types';

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
