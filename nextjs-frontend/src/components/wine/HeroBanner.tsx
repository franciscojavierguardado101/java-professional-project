import Link from 'next/link';
import { HeroBannerFields, getAssetUrl } from '@/lib/contentful';

interface HeroBannerProps {
  data: HeroBannerFields | null;
}

// Static fallback content shown when Contentful has no entry yet
const FALLBACK = {
  title: 'Discover Your Perfect Bottle',
  subtitle: "Over 8,000 wines, 3,000 spirits, and 2,500 beers. Expert staff. Unbeatable selection.",
  ctaText: 'Shop All',
  ctaLink: '/wine/products',
};

export default function HeroBanner({ data }: HeroBannerProps) {
  const title = data?.title ?? FALLBACK.title;
  const subtitle = data?.subtitle ?? FALLBACK.subtitle;
  const ctaText = data?.ctaText ?? FALLBACK.ctaText;
  const ctaLink = data?.ctaLink ?? FALLBACK.ctaLink;
  const imageUrl = getAssetUrl(data?.backgroundImage ?? undefined);

  return (
    <section
      className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden"
      style={imageUrl ? { backgroundImage: `url(${imageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' } : {}}
    >
      {/* Dark overlay so text is always readable over any image */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Gradient fallback shown when there is no background image */}
      {!imageUrl && (
        <div className="absolute inset-0 bg-gradient-to-r from-[#4a0a12] to-[#6b0f1a]" />
      )}

      {/* Content — sits above the overlay */}
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center text-white">
        <p className="text-yellow-400 text-sm font-semibold uppercase tracking-widest mb-4">
          America's Largest Wine Retailer
        </p>
        <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
          {title}
        </h1>
        <p className="text-white/80 text-xl mb-10 max-w-xl mx-auto">
          {subtitle}
        </p>
        <div className="flex gap-4 justify-center">
          <Link
            href={ctaLink}
            className="bg-yellow-400 text-[#4a0a12] font-bold px-8 py-4 rounded text-lg hover:bg-yellow-300 transition-colors"
          >
            {ctaText}
          </Link>
          <Link
            href="/wine/category/WINE"
            className="border-2 border-white text-white font-bold px-8 py-4 rounded text-lg hover:bg-white/10 transition-colors"
          >
            Browse Wine
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50 text-xs">
        <span>Scroll to explore</span>
        <div className="w-px h-8 bg-white/30" />
      </div>
    </section>
  );
}
