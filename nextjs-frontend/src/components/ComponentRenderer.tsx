import { Entry, EntrySkeletonType } from 'contentful';
import HeroBanner from '@/components/wine/HeroBanner';
import { HeroBannerFields } from '@/lib/contentful';

interface ComponentRendererProps {
  components: Entry<EntrySkeletonType>[];
}

// This is the Next.js equivalent of Drupal's switch ($paragraph->bundle()).
// Each case maps a Contentful content type ID to its React component.
// To add a new component type:
//   1. Create the content type in Contentful
//   2. Create the React component in /components
//   3. Add a case here
export default function ComponentRenderer({ components }: ComponentRendererProps) {
  return (
    <>
      {components.map((entry) => {
        const type = entry.sys.contentType.sys.id;

        switch (type) {
          case 'heroBanner':
            return (
              <HeroBanner
                key={entry.sys.id}
                data={entry.fields as HeroBannerFields}
              />
            );

          // Add new component cases here as you create them in Contentful:
          // case 'promoSection':
          //   return <PromoSection key={entry.sys.id} data={entry.fields as PromoSectionFields} />;
          // case 'featureStack':
          //   return <FeatureStack key={entry.sys.id} data={entry.fields as FeatureStackFields} />;

          default:
            // Shows a placeholder in development so you know a component is unmapped
            if (process.env.NODE_ENV === 'development') {
              return (
                <div key={entry.sys.id} className="bg-yellow-50 border border-yellow-300 p-4 text-sm text-yellow-800">
                  No component mapped for content type: <strong>{type}</strong>
                </div>
              );
            }
            return null;
        }
      })}
    </>
  );
}
