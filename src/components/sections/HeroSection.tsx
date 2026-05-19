'use client'
import Link from 'next/link'

export default function HeroSection() {
  return (
    <section style={{
      position: 'relative', minHeight: '100vh',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      textAlign: 'center', overflow: 'hidden',
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0,
        background: `
          radial-gradient(ellipse 80% 60% at 50% 40%, rgba(192,57,43,0.12) 0%, transparent 60%),
          radial-gradient(ellipse 60% 40% at 20% 80%, rgba(212,175,55,0.07) 0%, transparent 50%),
          #0A0A0A
        `,
      }}/>
      {/* Grid */}
      <div style={{
        position: 'absolute', inset: 0,
        backgroundImage: `linear-gradient(rgba(212,175,55,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.04) 1px, transparent 1px)`,
        backgroundSize: '60px 60px',
        maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black, transparent)',
      }}/>

      {/* Content */}
      <div style={{
        position: 'relative', zIndex: 1, maxWidth: '900px', padding: '2rem',
        animation: 'fadeInUp 1s ease forwards',
      }}>
        {/* Badge */}
        <div style={{
          display: 'inline-block', border: '1px solid #D4AF37',
          color: '#D4AF37', fontSize: '0.7rem', letterSpacing: '4px',
          textTransform: 'uppercase', padding: '0.4rem 1.5rem',
          marginBottom: '2rem', fontFamily: "'Cinzel', serif",
        }}>
          ✦ GOOD FOOD • GOOD MOOD ✦
        </div>

        {/* Title */}
        <h1 style={{ lineHeight: 1, marginBottom: '0.5rem' }}>
          <span style={{
            display: 'block', fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(1.5rem, 4vw, 3rem)', color: '#E74C3C',
            letterSpacing: '10px', marginBottom: '0.3em',
          }}>MR.</span>
          <span className="gold-text" style={{
            display: 'block', fontFamily: "'Cinzel Decorative', serif",
            fontSize: 'clamp(4rem, 12vw, 9rem)', fontWeight: 900, lineHeight: 0.9,
          }}>MARVEL</span>
        </h1>

        <p style={{
          fontFamily: "'Cinzel', serif", fontSize: 'clamp(0.7rem, 1.5vw, 0.95rem)',
          letterSpacing: '6px', color: '#888', textTransform: 'uppercase',
          margin: '1.5rem 0',
        }}>RESTAURANT</p>

        <div className="section-divider" style={{ margin: '0 auto 2rem' }}/>

        <p style={{ fontSize: 'clamp(0.9rem, 2vw, 1.1rem)', color: '#ccc', marginBottom: '3rem', fontWeight: 300 }}>
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>بيتزا</span> •{' '}
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>ساندويتشات</span> •{' '}
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>مشويات</span> •{' '}
          <span style={{ color: '#D4AF37', fontWeight: 600 }}>سلطات</span>
        </p>

        <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/order" className="btn-clip" style={{
            background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
            color: '#fff', padding: '1rem 2.5rem',
            fontFamily: "'Cairo', sans-serif", fontSize: '1rem',
            fontWeight: 700, textDecoration: 'none',
            letterSpacing: '1px', transition: 'all 0.3s',
          }}>
            اطلب الآن
          </Link>
          <Link href="/reservations" className="btn-clip" style={{
            background: 'transparent', color: '#D4AF37',
            border: '1px solid #D4AF37', padding: '1rem 2.5rem',
            fontFamily: "'Cairo', sans-serif", fontSize: '1rem',
            fontWeight: 700, textDecoration: 'none',
            letterSpacing: '1px', transition: 'all 0.3s',
          }}>
            احجز طاولتك
          </Link>
        </div>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute', bottom: '2.5rem', left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem',
        color: '#666', fontSize: '0.7rem', letterSpacing: '3px',
        animation: 'bounceY 2s infinite',
      }}>
        <span>SCROLL</span>
        <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, #D4AF37, transparent)' }}/>
      </div>
    </section>
  )
}
