import Image from 'next/image';
import type { Metadata } from 'next';
import { getApod }                       from '@/lib/nasa/apod';
import { getNeoFeed }                    from '@/lib/nasa/neows';
import { getEpicImages }                 from '@/lib/nasa/epic';
import { getExoplanetDiscoveriesByYear } from '@/lib/nasa/exoplanets';
import NeoChart                          from '@/components/space/NeoChart';
import ExoplanetChart                    from '@/components/space/ExoplanetChart';

export const metadata: Metadata = {
  title:       'Space — NASA Open Data',
  description: 'Live space data: asteroid tracking, exoplanet discoveries, and Earth from 1.5M km away.',
};

export default async function SpacePage() {
  const [apodResult, neoResult, epicResult, exoResult] = await Promise.allSettled([
    getApod(),
    getNeoFeed(),
    getEpicImages(6),
    getExoplanetDiscoveriesByYear(),
  ]);

  const apod       = apodResult.status   === 'fulfilled' ? apodResult.value   : null;
  const neo        = neoResult.status    === 'fulfilled' ? neoResult.value    : null;
  const epicImages = epicResult.status   === 'fulfilled' ? epicResult.value   : [];
  const exoData    = exoResult.status    === 'fulfilled' ? exoResult.value    : [];

  const hazardousCount = neo?.asteroids.filter((a) => a.hazardous).length ?? 0;
  const totalExoplanets = exoData.reduce((sum, d) => sum + d.total, 0);

  return (
    <div className="min-h-screen bg-[#04071a] text-white">

      {/* ── APOD Hero ─────────────────────────────────────────────────────────── */}
      <section className="relative w-full h-[70vh] min-h-[460px] overflow-hidden">
        {apod?.media_type === 'image' && apod.url ? (
          <Image
            src={apod.hdurl ?? apod.url}
            alt={apod.title}
            fill
            className="object-cover"
            priority
            unoptimized
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-950 via-slate-900 to-black" />
        )}
        {/* Gradient overlay so text is always legible */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#04071a] via-[#04071a]/60 to-transparent" />

        <div className="absolute bottom-0 left-0 right-0 px-6 pb-10 max-w-4xl">
          <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm text-white/80 text-xs font-medium px-3 py-1 rounded-full mb-3 uppercase tracking-wide">
            Astronomy Picture of the Day
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight tracking-tight">
            {apod?.title ?? 'The Universe'}
          </h1>
          {apod?.date && (
            <p className="mt-1 text-slate-400 text-sm">{apod.date}</p>
          )}
          {apod?.explanation && (
            <p className="mt-3 text-slate-300 text-sm sm:text-base leading-relaxed line-clamp-3 max-w-2xl">
              {apod.explanation}
            </p>
          )}
          {apod?.copyright && (
            <p className="mt-2 text-slate-500 text-xs">© {apod.copyright}</p>
          )}
        </div>
      </section>

      {/* ── Stats Strip ───────────────────────────────────────────────────────── */}
      <section className="border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-2 sm:grid-cols-4 gap-6">
          <SpaceStat value={neo?.totalCount ?? '—'} label="Asteroids passing Earth this week" accent="text-blue-400" />
          <SpaceStat value={hazardousCount || '—'} label="Potentially hazardous" accent="text-red-400" />
          <SpaceStat value={totalExoplanets.toLocaleString() || '—'} label="Confirmed exoplanets" accent="text-purple-400" />
          <SpaceStat value={epicImages.length || '—'} label="Earth photos from 1.5M km" accent="text-emerald-400" />
        </div>
      </section>

      <div className="max-w-6xl mx-auto px-4 py-12 space-y-14">

        {/* ── Near-Earth Objects ──────────────────────────────────────────────── */}
        {neo ? (
          <section>
            <SectionHeader
              badge="Live · 7-Day Window"
              title="Near-Earth Asteroid Tracker"
              description="Every asteroid NASA tracked passing within 0.5 AU of Earth this week. Red bars = potentially hazardous objects (PHOs) — those large enough and close enough to warrant monitoring."
            />
            <div className="mt-6 grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Chart */}
              <div className="lg:col-span-3 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-slate-400 mb-4">Asteroids per day</p>
                <NeoChart data={neo.dayCounts} />
              </div>

              {/* Closest approaches table */}
              <div className="lg:col-span-2 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
                <p className="text-sm text-slate-400 mb-4">10 closest approaches</p>
                <div className="space-y-3">
                  {neo.asteroids.map((a) => (
                    <div key={a.id} className="flex items-start justify-between gap-2 text-xs border-b border-white/5 pb-3 last:border-0 last:pb-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-1.5 flex-wrap">
                          <span className="text-white font-medium truncate">{a.name}</span>
                          {a.hazardous && (
                            <span className="shrink-0 bg-red-500/20 text-red-400 text-[10px] px-1.5 py-0.5 rounded font-semibold">PHO</span>
                          )}
                        </div>
                        <span className="text-slate-500 mt-0.5 block">Ø {a.diameterM.toLocaleString()} m · {a.velocityKph.toLocaleString()} km/h</span>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-amber-400 font-semibold">{a.distanceLunar.toFixed(1)} LD</span>
                        <span className="block text-slate-500">{a.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
                <p className="text-[10px] text-slate-600 mt-4">LD = Lunar Distance (384,400 km)</p>
              </div>
            </div>
          </section>
        ) : <SectionError title="Near-Earth Object data unavailable" />}

        {/* ── Exoplanet Timeline ──────────────────────────────────────────────── */}
        {exoData.length > 0 ? (
          <section>
            <SectionHeader
              badge="NASA Exoplanet Archive"
              title="Exoplanet Discoveries Over Time"
              description="Confirmed exoplanets found each year. The Kepler Space Telescope (2009) and TESS (2018) missions drove exponential growth. We've now confirmed over 5,500 worlds beyond our solar system."
            />
            <div className="mt-6 bg-white/[0.03] border border-white/10 rounded-2xl p-6">
              <ExoplanetChart data={exoData} />
              <div className="mt-4 flex flex-wrap gap-4 text-xs text-slate-500">
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-amber-400 inline-block rounded" />Kepler launch (2009)</span>
                <span className="flex items-center gap-1.5"><span className="w-3 h-0.5 bg-emerald-400 inline-block rounded" />TESS launch (2018)</span>
              </div>
            </div>
          </section>
        ) : <SectionError title="Exoplanet data unavailable" />}

        {/* ── EPIC Earth Gallery ──────────────────────────────────────────────── */}
        {epicImages.length > 0 ? (
          <section>
            <SectionHeader
              badge="NASA EPIC · DSCOVR Satellite"
              title="Earth from 1.5 Million Kilometres"
              description="Photos captured by NASA's EPIC camera aboard the DSCOVR spacecraft sitting at the L1 Lagrange point between Earth and the Sun — giving a full-disk view of our planet that no other instrument provides."
            />
            <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
              {epicImages.map((img) => (
                <div key={img.identifier} className="relative aspect-square rounded-xl overflow-hidden border border-white/10 group">
                  <Image
                    src={img.imageUrl}
                    alt={`Earth from space — ${img.date}`}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                    <p className="text-white text-xs font-medium">{img.date}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        ) : <SectionError title="EPIC Earth imagery unavailable" />}

      </div>

      {/* ── Footer attribution ────────────────────────────────────────────────── */}
      <div className="max-w-6xl mx-auto px-4 pb-16">
        <p className="text-xs text-slate-600 text-center leading-relaxed">
          Data sourced from{' '}
          <a href="https://api.nasa.gov" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline">NASA Open APIs</a>
          {' '}and the{' '}
          <a href="https://exoplanetarchive.ipac.caltech.edu" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline">NASA Exoplanet Archive</a>.
          {' '}All data is publicly available. Charts rendered with{' '}
          <a href="https://recharts.org" target="_blank" rel="noopener noreferrer" className="text-slate-500 hover:text-slate-400 underline">Recharts</a>.
        </p>
      </div>

    </div>
  );
}

// ── Shared local components ───────────────────────────────────────────────────

function SpaceStat({ value, label, accent }: { value: string | number; label: string; accent: string }) {
  return (
    <div>
      <p className={`text-2xl sm:text-3xl font-bold ${accent}`}>{value}</p>
      <p className="text-xs text-slate-500 mt-1 leading-snug">{label}</p>
    </div>
  );
}

function SectionHeader({ badge, title, description }: { badge: string; title: string; description: string }) {
  return (
    <div>
      <span className="inline-flex items-center bg-white/5 text-slate-400 text-xs font-medium px-3 py-1 rounded-full uppercase tracking-wide">
        {badge}
      </span>
      <h2 className="mt-3 text-xl sm:text-2xl font-bold text-white">{title}</h2>
      <p className="mt-2 text-slate-400 text-sm leading-relaxed max-w-3xl">{description}</p>
    </div>
  );
}

function SectionError({ title }: { title: string }) {
  return (
    <div className="bg-white/[0.02] border border-white/10 rounded-2xl p-10 text-center text-slate-600 text-sm">
      {title} — try refreshing the page.
    </div>
  );
}
