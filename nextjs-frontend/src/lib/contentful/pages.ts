import { contentfulClient } from './client';
import { AboutPageFields, AboutPageSkeleton, PageFields, PageSkeleton } from './types';

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

export async function getPageBySlug(slug: string): Promise<PageFields | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<PageSkeleton>({
      content_type: 'page',
      limit: 100,
      include: 2,
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
