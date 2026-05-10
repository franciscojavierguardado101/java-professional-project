'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const links = [
  { href: '/bio',       label: 'Bio' },
  { href: '/jobs',      label: 'Browse Jobs' },
  { href: '/companies', label: 'Companies' },
  { href: '/about',     label: 'About' },
];

export default function MobileMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      {/* Hamburger button */}
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          gap: '5px',
          width: '36px',
          height: '36px',
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '4px',
          flexShrink: 0,
        }}
      >
        <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#334155', borderRadius: '2px', transition: 'all 0.2s', transform: open ? 'translateY(7px) rotate(45deg)' : 'none' }} />
        <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#334155', borderRadius: '2px', transition: 'all 0.2s', opacity: open ? 0 : 1 }} />
        <span style={{ display: 'block', width: '22px', height: '2px', backgroundColor: '#334155', borderRadius: '2px', transition: 'all 0.2s', transform: open ? 'translateY(-7px) rotate(-45deg)' : 'none' }} />
      </button>

      {/* Dropdown */}
      {open && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#ffffff',
            borderBottom: '1px solid #e2e8f0',
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
            zIndex: 100,
          }}
        >
          <nav style={{ display: 'flex', flexDirection: 'column' }}>
            {links.map(({ href, label }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setOpen(false)}
                style={{
                  padding: '14px 20px',
                  fontSize: '15px',
                  fontWeight: pathname === href ? 700 : 500,
                  color: pathname === href ? '#1e40af' : '#334155',
                  borderBottom: '1px solid #f1f5f9',
                  textDecoration: 'none',
                }}
              >
                {label}
              </Link>
            ))}
            <Link
              href="/wine"
              onClick={() => setOpen(false)}
              style={{
                padding: '14px 20px',
                fontSize: '15px',
                fontWeight: 600,
                color: '#ffffff',
                backgroundColor: '#6b0f1a',
                textDecoration: 'none',
              }}
            >
              Wine Store
            </Link>
          </nav>
        </div>
      )}
    </div>
  );
}
