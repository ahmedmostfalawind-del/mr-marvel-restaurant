export default function FloatingButtons() {
  return (
    <div style={{ position: 'fixed', bottom: '2rem', right: '2rem', zIndex: 999, display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
      <a href="https://wa.me/201096837872?text=مرحباً، أريد الطلب من MR. MARVEL" target="_blank"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          background: '#1A1A1A', border: '1px solid rgba(37,211,102,0.3)',
          color: '#F5F0E8', padding: '0.75rem 1.1rem',
          fontFamily: "'Cairo', sans-serif", fontSize: '0.83rem',
          fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#25d366'; el.style.borderColor = '#25d366'; el.style.color = '#fff' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#1A1A1A'; el.style.borderColor = 'rgba(37,211,102,0.3)'; el.style.color = '#F5F0E8' }}>
        <span style={{ fontSize: '1.1rem' }}>💬</span>
        اطلب عبر واتساب
      </a>
      <a href="tel:01096837872"
        style={{
          display: 'flex', alignItems: 'center', gap: '0.8rem',
          background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.3)',
          color: '#F5F0E8', padding: '0.75rem 1.1rem',
          fontFamily: "'Cairo', sans-serif", fontSize: '0.83rem',
          fontWeight: 600, textDecoration: 'none', transition: 'all 0.3s',
          whiteSpace: 'nowrap',
        }}
        onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#D4AF37'; el.style.color = '#0A0A0A' }}
        onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#1A1A1A'; el.style.color = '#F5F0E8' }}>
        <span style={{ fontSize: '1.1rem' }}>📞</span>
        اتصل بنا
      </a>
    </div>
  )
}
