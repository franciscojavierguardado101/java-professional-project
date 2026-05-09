import { contentfulClient } from '@/lib/contentful/client';
import { Introduction, IntroductionSkeleton } from './types';

export async function getIntroduction(): Promise<Introduction | null> {
  if (!contentfulClient) return null;
  try {
    const entries = await contentfulClient.getEntries<IntroductionSkeleton>({
      content_type: 'introduction',
      limit: 1,
    });
    if (!entries.items.length) return null;

    const f = entries.items[0].fields;
    return {
      name:         String(f.name ?? ''),
      stackDetails: String(f.stackDetails ?? ''),
      color:        (f.color as Introduction['color']) ?? 'Dark Gold',
      nameLink:     f.nameLink ? String(f.nameLink) : null,
    };
  } catch {
    return null;
  }
}
