'use client'

const stats = [
  { num: '+50', label: 'صنف في القائمة' },
  { num: '5★', label: 'تقييم العملاء' },
  { num: '30\'', label: 'توصيل سريع' },
  { num: '100%', label: 'مكونات طازجة' },
]

const features = [
  'مكونات طازجة 100% يومياً',
  'طهاة محترفون بخبرة واسعة',
  'توصيل سريع لكل أنحاء المدينة',
  'حجز طاولات للمجموعات والمناسبات',
  'خدمة تيك أواي وديلفري',
]

export default function AboutSection() {
  return (
    <section id="about" style={{ padding: '8rem 0', background: 'linear-gradient(to bottom, #0A0A0A, #1A1A1A, #0A0A0A)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '5rem' }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#E74C3C', display: 'block', marginBottom: '1rem' }}>من نحن</span>
          <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            قصة <span className="gold-text">مارفل</span>
          </h2>
          <div className="section-divider" />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '5rem', alignItems: 'center' }}>
          {/* Stats visual */}
          <div style={{ position: 'relative', padding: '2rem', border: '1px solid rgba(212,175,55,0.15)' }}>
            <div style={{
              position: 'absolute', top: '-14px', left: '50%', transform: 'translateX(-50%)',
              background: '#1A1A1A', color: '#D4AF37',
              fontFamily: "'Cinzel', serif", fontSize: '0.65rem', letterSpacing: '4px',
              padding: '0 1rem', whiteSpace: 'nowrap',
            }}>✦ MR. MARVEL ✦</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              {stats.map((s, i) => (
                <div key={i} style={{
                  textAlign: 'center', padding: '1.8rem 1rem',
                  border: '1px solid rgba(212,175,55,0.1)',
                  background: 'rgba(212,175,55,0.02)',
                  transition: 'border-color 0.3s',
                }}>
                  <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '2.2rem', color: '#D4AF37', display: 'block' }}>{s.num}</span>
                  <span style={{ fontSize: '0.75rem', letterSpacing: '1px', textTransform: 'uppercase', color: '#888', marginTop: '0.4rem', display: 'block' }}>{s.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Text */}
          <div>
            <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', color: '#D4AF37', fontStyle: 'italic', marginBottom: '1.5rem' }}>
              حيث يلتقي الطعم الرائع بالجو المميز
            </h3>
            <p style={{ color: '#aaa', lineHeight: 2, marginBottom: '1.2rem', fontSize: '0.97rem' }}>
              مطعم MR. MARVEL وجهتك المثالية لتجربة طعام استثنائية — من البيتزا الإيطالية الأصيلة إلى الساندويتشات الحارة والمشويات الفاخرة والسلطات الطازجة.
            </p>
            <p style={{ color: '#aaa', lineHeight: 2, marginBottom: '2rem', fontSize: '0.97rem' }}>
              نستخدم أجود المكونات الطازجة ونعدّ كل وجبة بعناية واهتمام، لتحصل دائماً على تجربة <span style={{ color: '#D4AF37', fontWeight: 700 }}>Good Food • Good Mood</span>.
            </p>
            <ul style={{ listStyle: 'none' }}>
              {features.map((f, i) => (
                <li key={i} style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)',
                  fontSize: '0.93rem', color: '#ccc',
                }}>
                  <span style={{ color: '#D4AF37', fontSize: '0.65rem', flexShrink: 0 }}>✦</span>
                  {f}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
