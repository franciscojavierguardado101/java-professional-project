import { getBio } from './contentful';
import { BioColor } from './types';

const GRADIENTS: Record<BioColor, string> = {
  'Gold Dark':    'linear-gradient(135deg, #2a1f00 0%, #7a5c00 30%, #c9a227 60%, #ffca28 100%)',
  'Red Dark':     'linear-gradient(135deg, #1a0000 0%, #3b0000 30%, #6e0b0b 60%, #b31217 100%)',
  'Dark Brown':   'linear-gradient(135deg, #1a1208 0%, #3b2412 30%, #6b4423 60%, #a06a3b 100%)',
  'Dark Blue':    'linear-gradient(135deg, #00121f 0%, #003b5c 30%, #0a6ea8 60%, #4db8ff 100%)',
  'Dark White':   'linear-gradient(135deg, #1a1a1a 0%, #5c5c5c 30%, #bfbfbf 60%, #ffffff 100%)',
  'Just White':   '#FFFFFF',
  'Dark Forest':  'linear-gradient(135deg, #0b1f0b 0%, #144d14 30%, #1f8a1f 60%, #5cff5c 100%)',
  'Dark Sapphire':'linear-gradient(135deg, #04140a 0%, #062a14 30%, #0a3d1f 60%, #1f6b3a 100%)',
};

export default async function BioHero() {
  const bio = await getBio();
  if (!bio) return null;

  const isLight    = bio.color === 'Just White';
  const gradient   = GRADIENTS[bio.color];
  const textColor  = isLight ? '#000000' : '#ffffff';
  const subColor   = isLight ? 'rgba(0,0,0,0.6)' : 'rgb(204, 204, 204)';
  const labelColor = isLight ? 'rgba(0,0,0,0.45)' : 'rgb(170, 170, 170)';
  const outlineBorder = isLight
    ? '2px solid rgba(0,0,0,0.35)'
    : '2px solid rgba(255,255,255,0.5)';

  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'flex-end',
        overflow: 'hidden',
      }}
    >
      {/* Gradient background from Contentful Color field */}
      <div style={{ position: 'absolute', inset: 0, background: gradient, zIndex: 0 }} />

      {/* Dark cinematic overlays — skipped for Just White so the light bg stays readable */}
      {!isLight && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'linear-gradient(to right, rgba(0,0,0,0.85) 40%, rgba(0,0,0,0.2) 100%), ' +
              'linear-gradient(to top, rgba(0,0,0,0.6) 0%, transparent 60%)',
            zIndex: 1,
          }}
        />
      )}

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 2,
          maxWidth: '1280px',
          margin: '0 auto',
          padding: '80px 32px',
          width: '100%',
        }}
      >
        {/* Label */}
        <p
          style={{
            color: labelColor,
            fontSize: '11px',
            fontWeight: 700,
            textTransform: 'uppercase',
            letterSpacing: '3px',
            marginBottom: '12px',
          }}
        >
          Full Stack Developer
        </p>

        {/* Name */}
        <h1
          style={{
            color: textColor,
            fontSize: 'clamp(36px, 5vw, 64px)',
            fontWeight: 800,
            lineHeight: 1.05,
            marginBottom: '16px',
            maxWidth: '600px',
          }}
        >
          {bio.name}
        </h1>

        {/* Description */}
        <p
          style={{
            color: subColor,
            fontSize: '16px',
            lineHeight: 1.6,
            marginBottom: '32px',
            maxWidth: '850px',
          }}
        >
          {bio.description}
        </p>

        {/* Stack tags — alternating filled blue / transparent outline */}
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
          {bio.stack.map((item, i) =>
            i % 2 === 0 ? (
              <span
                key={i}
                style={{
                  backgroundColor: 'rgb(0, 102, 204)',
                  color: '#ffffff',
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  padding: '14px 28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                }}
              >
                {item}
              </span>
            ) : (
              <span
                key={i}
                style={{
                  backgroundColor: 'transparent',
                  color: textColor,
                  fontSize: '13px',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  letterSpacing: '1.5px',
                  padding: '14px 28px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  border: outlineBorder,
                }}
              >
                {item}
              </span>
            )
          )}
        </div>
      </div>
    </section>
  );
}
