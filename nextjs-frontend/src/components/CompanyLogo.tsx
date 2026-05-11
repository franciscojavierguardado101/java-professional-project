'use client';

import { useState, useEffect } from 'react';

interface Props {
  name: string;
  logoUrl: string | null | undefined;
  size?: number;
}

const COLORS = [
  '#1e40af', '#065f46', '#7c2d12', '#4c1d95', '#1e3a5f',
  '#713f12', '#134e4a', '#1a1a2e', '#3b0764', '#052e16',
];

function colorForName(name: string): string {
  let hash = 0;
  for (let i = 0; i < name.length; i++) hash = name.charCodeAt(i) + ((hash << 5) - hash);
  return COLORS[Math.abs(hash) % COLORS.length];
}

export default function CompanyLogo({ name, logoUrl, size = 40 }: Props) {
  const [mounted, setMounted] = useState(false);
  const [imgLoaded, setImgLoaded] = useState(false);
  const [imgFailed, setImgFailed] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  const bg = colorForName(name);
  const initial = name.charAt(0).toUpperCase();

  const avatarStyle: React.CSSProperties = {
    width: size,
    height: size,
    borderRadius: 8,
    backgroundColor: bg,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: size * 0.4,
    fontWeight: 700,
    color: '#ffffff',
    flexShrink: 0,
    letterSpacing: '-0.5px',
    position: 'absolute',
    inset: 0,
  };

  return (
    // Wrapper holds both layers at the same position.
    // The initial avatar is always underneath.
    // The <img> sits on top but starts invisible — only becomes visible on successful load.
    // This means a broken URL never flashes a broken icon: the img is invisible until proven good.
    <div style={{ position: 'relative', width: size, height: size, flexShrink: 0 }}>
      {/* Layer 1: initial avatar — always rendered (SSR + client) */}
      <div style={avatarStyle} aria-label={name}>
        {initial}
      </div>

      {/* Layer 2: actual logo — only mounted client-side, starts with opacity 0 */}
      {mounted && logoUrl && !imgFailed && (
        <img
          src={logoUrl}
          alt={name}
          width={size}
          height={size}
          onLoad={() => setImgLoaded(true)}
          onError={() => setImgFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: size,
            height: size,
            borderRadius: 8,
            objectFit: 'contain',
            border: '1px solid #e2e8f0',
            backgroundColor: '#f8fafc',
            // Only visible after a successful load — broken URLs stay invisible
            opacity: imgLoaded ? 1 : 0,
            transition: 'opacity 0.15s ease',
          }}
        />
      )}
    </div>
  );
}
