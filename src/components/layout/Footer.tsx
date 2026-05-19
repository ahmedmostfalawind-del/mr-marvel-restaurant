import Link from 'next/link'

export default function Footer() {
  return (
    <footer style={{ background: '#0A0A0A', borderTop: '1px solid rgba(212,175,55,0.1)', padding: '4rem 0 2rem' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.4rem', marginBottom: '0.3rem' }}>
              <span style={{ color: '#E74C3C' }}>MR.</span>
              <span style={{ color: '#D4AF37' }}> MARVEL</span>
            </div>
            <p style={{ fontSize: '0.72rem', letterSpacing: '4px', color: '#888', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Good Food • Good Mood</p>
            <p style={{ fontSize: '0.88rem', color: '#666', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              مطعمك المفضل في دمياط للبيتزا والساندويتشات والمشويات والسلطات.
            </p>
            <div style={{ display: 'flex', gap: '0.7rem' }}>
              {[
                { icon: '💬', href: `https://wa.me/201096837872` },
                { icon: '📞', href: 'tel:01096837872' },
                { icon: '📘', href: '#' },
                { icon: '📸', href: '#' },
              ].map((s, i) => (
                <a key={i} href={s.href} target="_blank" style={{
                  width: '36px', height: '36px',
                  border: '1px solid rgba(212,175,55,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  textDecoration: 'none', fontSize: '0.95rem',
                  transition: 'all 0.3s',
                }}>
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Links */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '1.5rem' }}>روابط سريعة</h4>
            <ul style={{ listStyle: 'none' }}>
              {[
                { href: '/#about', label: 'عن المطعم' },
                { href: '/#menu', label: 'القائمة' },
                { href: '/order', label: 'اطلب الآن' },
                { href: '/reservations', label: 'احجز طاولة' },
              ].map(l => (
                <li key={l.href} style={{ marginBottom: '0.7rem' }}>
                  <Link href={l.href} style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem', transition: 'color 0.3s' }}>
                    › {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Menu cats */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '1.5rem' }}>القائمة</h4>
            <ul style={{ listStyle: 'none' }}>
              {['🍕 بيتزا', '🥪 ساندويتشات', '🔥 مشويات', '🥗 سلطات', '🍽️ وجبات'].map(c => (
                <li key={c} style={{ marginBottom: '0.7rem' }}>
                  <Link href="/order" style={{ color: '#666', textDecoration: 'none', fontSize: '0.9rem' }}>
                    › {c}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: "'Cinzel', serif", fontSize: '0.8rem', letterSpacing: '3px', color: '#D4AF37', textTransform: 'uppercase', marginBottom: '1.5rem' }}>مواعيد العمل</h4>
            <ul style={{ listStyle: 'none' }}>
              <li style={{ marginBottom: '0.8rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#D4AF37', fontWeight: 700 }}>السبت — الخميس</span>
                <br /><span style={{ color: '#666' }}>12:00 ظ — 2:00 ص</span>
              </li>
              <li style={{ marginBottom: '0.8rem', fontSize: '0.88rem' }}>
                <span style={{ color: '#D4AF37', fontWeight: 700 }}>الجمعة</span>
                <br /><span style={{ color: '#666' }}>2:00 م — 2:00 ص</span>
              </li>
              <li style={{ fontSize: '0.88rem', color: '#888', marginTop: '1rem' }}>
                📞 <a href="tel:01096837872" style={{ color: '#D4AF37', textDecoration: 'none' }}>01096837872</a>
              </li>
              <li style={{ fontSize: '0.88rem', color: '#666', marginTop: '0.5rem' }}>📍 المنصوره، مصر</li>
            </ul>
          </div>
        </div>

        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.05)',
          paddingTop: '2rem', display: 'flex',
          justifyContent: 'space-between', alignItems: 'center',
          flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontSize: '0.78rem', color: '#444' }}>© 2025 MR. MARVEL Restaurant. جميع الحقوق محفوظة.</p>
          <p style={{ fontSize: '0.78rem', color: '#444' }}>صُنع بـ <span style={{ color: '#E74C3C' }}>♥</span> في المنصوره</p>
        </div>
      </div>
    </footer>
  )
}
