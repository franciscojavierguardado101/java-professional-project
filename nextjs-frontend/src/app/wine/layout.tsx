import type { Metadata } from 'next';
import WineHeader from '@/components/wine/WineHeader';
import CartDrawer from '@/components/wine/cart/CartDrawer';
import { CartProvider } from '@/lib/cart/context';

export const metadata: Metadata = {
  title: 'Total Wine & More — Wine, Beer & Spirits',
  description: 'Shop the largest selection of wine, beer, and spirits. Find the perfect bottle for any occasion.',
};

export default function WineLayout({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <div className="min-h-screen flex flex-col bg-white">
        <WineHeader />
        <main className="flex-1">{children}</main>
        <CartDrawer />
        <footer className="bg-[#1a1a1a] text-white py-12">
          <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-sm">
            <div>
              <h4 className="font-semibold text-white mb-3">Shop</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="/wine/category/WINE"    className="hover:text-white transition-colors">Wine</a></li>
                <li><a href="/wine/category/BEER"    className="hover:text-white transition-colors">Beer</a></li>
                <li><a href="/wine/category/SPIRITS" className="hover:text-white transition-colors">Spirits</a></li>
                <li><a href="/wine/category/SAKE"    className="hover:text-white transition-colors">Sake</a></li>
                <li><a href="/wine/category/CIDER"   className="hover:text-white transition-colors">Cider</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Help</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="#" className="hover:text-white transition-colors">FAQ</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Shipping Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Returns</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Store Locator</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">About</h4>
              <ul className="space-y-2 text-white/60">
                <li><a href="/about" className="hover:text-white transition-colors">Our Story</a></li>
                <li><a href="/jobs"  className="hover:text-white transition-colors">Careers</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Total Wine &amp; More</h4>
              <p className="text-white/60 text-xs leading-relaxed">
                America&apos;s largest wine retailer. Over 8,000 wines, 3,000 spirits, and 2,500 beers.
              </p>
            </div>
          </div>
          <div className="max-w-7xl mx-auto px-4 mt-10 pt-6 border-t border-white/10 text-center text-xs text-white/40">
            Must be 21+ to purchase alcohol. Drink responsibly.
          </div>
        </footer>
      </div>
    </CartProvider>
  );
}
