import { getPageBySlug } from '@/lib/contentful';
import ComponentRenderer from '@/components/ComponentRenderer';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// This is the equivalent of Drupal's node--page.html.twig template.
// It fetches a Page entry from Contentful by its slug field and renders
// whatever components the editor attached — just like a Drupal node
// with a Paragraphs field renders whichever paragraph types were added.
export default async function DynamicPage({ params }: PageProps) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) notFound();

  return (
    <div>
      {page.components && page.components.length > 0 ? (
        <ComponentRenderer components={page.components} />
      ) : (
        // Empty page — editor has not added any components yet
        <div className="max-w-4xl mx-auto px-4 py-20 text-center text-slate-400">
          <h1 className="text-2xl font-bold text-slate-900 mb-2">{page.title}</h1>
          <p>No content has been added to this page yet.</p>
        </div>
      )}
    </div>
  );
}
