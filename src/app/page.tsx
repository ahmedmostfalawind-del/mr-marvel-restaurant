'use client'
import { useState, useCallback } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import HeroSection from '@/components/sections/HeroSection'
import AboutSection from '@/components/sections/AboutSection'
import MenuSection from '@/components/sections/MenuSection'
import TestimonialsSection from '@/components/sections/TestimonialsSection'
import Cart from '@/components/ui/Cart'
import Toast from '@/components/ui/Toast'
import FloatingButtons from '@/components/ui/FloatingButtons'
import type { CartItem } from '@/types'
import Link from 'next/link'

export default function Home() {
  const [cart, setCart] = useState<CartItem[]>([])
  const [toast, setToast] = useState({ show: false, message: '' })

  const showToast = useCallback((msg: string) => {
    setToast({ show: true, message: msg })
    setTimeout(() => setToast(t => ({ ...t, show: false })), 2500)
  }, [])

  return (
    <main>
      <Navbar />
      <HeroSection />
      <AboutSection />
      <MenuSection cart={cart} setCart={setCart} showToast={showToast} />

      {/* Order CTA */}
      <section style={{ padding: '7rem 0', background: '#0A0A0A' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#E74C3C', display: 'block', marginBottom: '1rem' }}>اطلب الآن</span>
            <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
              وصّلنا <span className="gold-text">لبيتك</span>
            </h2>
            <div className="section-divider" />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '2rem' }}>
            {[
              { icon: '📱', title: 'واتساب', desc: 'اطلب مباشرة عبر واتساب، سهل وسريع وبدون تعقيد', href: 'https://wa.me/201096837872', label: 'اطلب الآن', external: true },
              { icon: '📞', title: 'اتصل بنا', desc: 'تحدث مباشرة مع فريقنا لأي استفسار أو طلب خاص', href: 'tel:01096837872', label: 'اتصل الآن', external: false },
              { icon: '🪑', title: 'احجز طاولة', desc: 'احجز طاولتك للعشاء أو مناسباتك الخاصة مسبقاً', href: '/reservations', label: 'احجز الآن', external: false },
            ].map((card, i) => (
              <div key={i} style={{
                background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)',
                padding: '3rem 2rem', textAlign: 'center', transition: 'all 0.35s',
              }}
              onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.3)'; el.style.transform = 'translateY(-6px)' }}
              onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.08)'; el.style.transform = 'translateY(0)' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1.5rem' }}>{card.icon}</div>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1.05rem', color: '#D4AF37', marginBottom: '0.8rem', letterSpacing: '2px' }}>{card.title}</div>
                <p style={{ fontSize: '0.87rem', color: '#888', lineHeight: 1.8, marginBottom: '2rem' }}>{card.desc}</p>
                {card.external ? (
                  <a href={card.href} target="_blank" className="btn-clip" style={{ background: 'linear-gradient(135deg, #C0392B, #E74C3C)', color: '#fff', padding: '0.8rem 2rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>{card.label}</a>
                ) : (
                  <Link href={card.href} className="btn-clip" style={{ background: 'transparent', color: '#D4AF37', border: '1px solid #D4AF37', padding: '0.8rem 2rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.9rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>{card.label}</Link>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestimonialsSection />
      <Footer />
      <Cart cart={cart} setCart={setCart} />
      <Toast message={toast.message} show={toast.show} />
      <FloatingButtons />
    </main>
  )
}
