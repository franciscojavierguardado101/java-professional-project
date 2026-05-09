import { contentfulClient } from '@/lib/contentful/client';
import { Bio, BioSkeleton } from './types';

export async function getBio(): Promise<Bio | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<BioSkeleton>({
      content_type: 'bio',
      limit: 1,
    });
    if (!entries.items.length) return null;
    const f = entries.items[0].fields;
    return {
      name:        String(f.name ?? ''),
      description: String(f.description ?? ''),
      stack:       Array.isArray(f.stack) ? f.stack.map(String) : [],
      color:       (f.color as Bio['color']) ?? 'Gold Dark',
    };
  } catch {
    return null;
  }
}
