'use client';

import { usePathname, useRouter } from 'next/navigation';

export default function BackButton({ className }: { className?: string }) {
  const pathname = usePathname();
  const router   = useRouter();

  if (pathname !== '/bio') return null;

  return (
    <div className={className}>
      <button
        onClick={() => router.back()}
        aria-label="Go back"
        style={{
          width: '36px',
          height: '36px',
          borderRadius: '50%',
          backgroundColor: '#000000',
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
          transition: 'background-color 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.backgroundColor = '#222')}
        onMouseLeave={e => (e.currentTarget.style.backgroundColor = '#000')}
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="#ffffff"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          aria-hidden="true"
        >
          <path d="M19 12H5" />
          <path d="M12 19l-7-7 7-7" />
        </svg>
      </button>
    </div>
  );
}
