const reviews = [
  { name: 'أحمد محمود', initial: 'أح', note: 'عميل منتظم ⭐', stars: 5, text: 'أفضل بيتزا أكلتها في حياتي! العجينة مثالية والمكونات طازجة. خدمة الديلفري سريعة جداً.' },
  { name: 'سارة علي', initial: 'سا', note: 'زيارة مناسبة خاصة 🎂', stars: 5, text: 'جو المطعم رائع والمشويات بتجنن! حجزنا طاولة لاحتفال عيد ميلاد وكانت تجربة لا تُنسى.' },
  { name: 'محمد حسن', initial: 'مح', note: 'عميل VIP 🏆', stars: 5, text: 'الساندويتشات هنا مش موجودة في أي مكان تاني. والسلطات طازجة 100%. بنطلب منهم أسبوعياً.' },
]

export default function TestimonialsSection() {
  return (
    <section id="testimonials" style={{ padding: '8rem 0', background: 'linear-gradient(to bottom, #1A1A1A, #0A0A0A)' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#E74C3C', display: 'block', marginBottom: '1rem' }}>آراء العملاء</span>
          <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            ماذا قالوا <span className="gold-text">عنّا</span>
          </h2>
          <div className="section-divider" />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
          {reviews.map((r, i) => (
            <div key={i} style={{
              background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)',
              padding: '2rem', position: 'relative', transition: 'all 0.3s',
            }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.2)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(-4px)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.08)'; (e.currentTarget as HTMLElement).style.transform = 'translateY(0)' }}>
              <div style={{ position: 'absolute', top: '1rem', left: '1.5rem', fontFamily: "'Playfair Display', serif", fontSize: '5rem', color: 'rgba(212,175,55,0.08)', lineHeight: 1 }}>"</div>
              <div style={{ color: '#D4AF37', fontSize: '0.9rem', letterSpacing: '2px', marginBottom: '1rem' }}>{'★'.repeat(r.stars)}</div>
              <p style={{ fontSize: '0.93rem', color: '#bbb', lineHeight: 1.8, marginBottom: '1.5rem', fontStyle: 'italic' }}>{r.text}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1rem' }}>
                <div style={{
                  width: '44px', height: '44px', borderRadius: '50%',
                  background: 'linear-gradient(135deg, #C0392B, #D4AF37)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: "'Cinzel', serif", fontWeight: 700, fontSize: '0.85rem', color: '#fff',
                  flexShrink: 0,
                }}>{r.initial}</div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#F5F0E8' }}>{r.name}</div>
                  <div style={{ fontSize: '0.75rem', color: '#888', marginTop: '0.2rem' }}>{r.note}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
