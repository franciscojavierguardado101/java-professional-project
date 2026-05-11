'use client';

import { useState } from 'react';

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
  const [failed, setFailed] = useState(false);

  if (logoUrl && !failed) {
    return (
      // Plain <img> (not Next.js Image) so onError works without 'use client' restrictions
      // and so we can handle broken URLs gracefully
      <img
        src={logoUrl}
        alt={name}
        width={size}
        height={size}
        onError={() => setFailed(true)}
        style={{
          width: size,
          height: size,
          borderRadius: 8,
          objectFit: 'contain',
          flexShrink: 0,
          border: '1px solid #e2e8f0',
          backgroundColor: '#f8fafc',
        }}
      />
    );
  }

  // Fallback: colored circle with company initial
  return (
    <div
      aria-label={name}
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        backgroundColor: colorForName(name),
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 700,
        color: '#ffffff',
        flexShrink: 0,
        letterSpacing: '-0.5px',
      }}
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
