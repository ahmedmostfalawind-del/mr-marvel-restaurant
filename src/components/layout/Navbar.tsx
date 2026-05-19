'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

const links = [
  { href: '/#about', label: 'عن المطعم' },
  { href: '/#menu', label: 'القائمة' },
  { href: '/order', label: 'اطلب الآن' },
  { href: '/reservations', label: 'احجز طاولة' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000,
      padding: '0 3rem', height: '76px',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      background: scrolled ? 'rgba(10,10,10,0.97)' : 'linear-gradient(to bottom, rgba(0,0,0,0.9), transparent)',
      borderBottom: scrolled ? '1px solid rgba(212,175,55,0.12)' : 'none',
      backdropFilter: scrolled ? 'blur(12px)' : 'none',
      transition: 'all 0.3s',
    }}>
      {/* Logo */}
      <Link href="/" style={{ textDecoration: 'none' }}>
        <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.2rem', letterSpacing: '2px' }}>
          <span style={{ color: '#E74C3C' }}>MR.</span>
          <span style={{ color: '#D4AF37' }}> MARVEL</span>
        </span>
      </Link>

      {/* Desktop Links */}
      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none', alignItems: 'center' }}
          className="hidden md:flex">
        {links.map(l => (
          <li key={l.href}>
            <Link href={l.href} style={{
              color: '#F5F0E8', textDecoration: 'none',
              fontFamily: "'Cairo', sans-serif", fontSize: '0.88rem',
              fontWeight: 600, letterSpacing: '0.5px',
              transition: 'color 0.3s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#D4AF37')}
            onMouseLeave={e => (e.currentTarget.style.color = '#F5F0E8')}>
              {l.label}
            </Link>
          </li>
        ))}
      </ul>

      {/* CTA */}
      <Link href="/order"
        className="hidden md:block"
        style={{
          background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
          color: '#fff', padding: '0.55rem 1.4rem',
          fontFamily: "'Cairo', sans-serif", fontSize: '0.85rem',
          fontWeight: 700, textDecoration: 'none',
          clipPath: 'polygon(8px 0%, 100% 0%, calc(100% - 8px) 100%, 0% 100%)',
          transition: 'all 0.3s',
          letterSpacing: '0.5px',
        }}>
        اطلب الآن
      </Link>

      {/* Mobile hamburger */}
      <button onClick={() => setOpen(!open)}
        style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', flexDirection: 'column', gap: '5px' }}
        className="md:hidden">
        {[0,1,2].map(i => (
          <span key={i} style={{
            display: 'block', width: '24px', height: '2px',
            background: '#D4AF37', transition: 'all 0.3s',
            transform: open && i === 0 ? 'rotate(45deg) translate(5px, 5px)' :
                       open && i === 1 ? 'scaleX(0)' :
                       open && i === 2 ? 'rotate(-45deg) translate(5px, -5px)' : 'none',
          }}/>
        ))}
      </button>

      {/* Mobile menu */}
      {open && (
        <div style={{
          position: 'absolute', top: '76px', left: 0, right: 0,
          background: 'rgba(10,10,10,0.98)', padding: '1.5rem 2rem',
          borderBottom: '1px solid rgba(212,175,55,0.1)',
          display: 'flex', flexDirection: 'column', gap: '1.2rem',
        }}>
          {links.map(l => (
            <Link key={l.href} href={l.href}
              onClick={() => setOpen(false)}
              style={{
                color: '#F5F0E8', textDecoration: 'none',
                fontFamily: "'Cairo', sans-serif", fontSize: '1rem', fontWeight: 600,
              }}>
              {l.label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
