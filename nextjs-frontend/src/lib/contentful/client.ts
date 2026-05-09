import { createClient, ContentfulClientApi, Asset } from 'contentful';

function makeClient(): ContentfulClientApi<undefined> | null {
  const space = process.env.CONTENTFUL_SPACE_ID;
  const accessToken = process.env.CONTENTFUL_ACCESS_TOKEN;
  if (!space || !accessToken) return null;
  return createClient({ space, accessToken });
}

export const contentfulClient = makeClient();

// Contentful returns protocol-relative URLs like //images.ctfassets.net/...
// This converts them to proper https:// URLs usable in <img> tags.
export function getAssetUrl(asset?: Asset): string | null {
  if (!asset) return null;
  const url = (asset.fields?.file as { url?: string })?.url;
  if (!url) return null;
  return url.startsWith('//') ? `https:${url}` : url;
}
