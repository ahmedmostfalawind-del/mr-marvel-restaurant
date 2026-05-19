'use client'
import { useState } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'

export default function ReservationsPage() {
  const [form, setForm] = useState({ name: '', phone: '', date: '', time: '', guests: '2 شخص', occasion: 'عشاء عادي', notes: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)

  const set = (k: string, v: string) => setForm(f => ({ ...f, [k]: v }))

  const submit = async () => {
    if (!form.name || !form.phone || !form.date || !form.time) return alert('يرجى ملء جميع الحقول المطلوبة')
    setLoading(true)
    try {
      await supabase.from('reservations').insert({
        customer_name: form.name, customer_phone: form.phone,
        reservation_date: form.date, reservation_time: form.time,
        guests_count: form.guests, occasion: form.occasion,
        notes: form.notes, status: 'pending',
      })
    } catch (_) {}
    const msg = encodeURIComponent(`🪑 طلب حجز طاولة — MR. MARVEL\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nالتاريخ: ${form.date}\nالوقت: ${form.time}\nعدد الأشخاص: ${form.guests}\nالمناسبة: ${form.occasion}${form.notes ? `\nملاحظات: ${form.notes}` : ''}`)
    window.open(`https://wa.me/201096837872?text=${msg}`, '_blank')
    setDone(true)
    setLoading(false)
  }

  const inputStyle = {
    width: '100%', background: 'rgba(255,255,255,0.03)',
    border: '1px solid rgba(212,175,55,0.15)', color: '#F5F0E8',
    padding: '0.9rem 1rem', fontFamily: "'Cairo', sans-serif",
    fontSize: '0.93rem', outline: 'none', transition: 'border-color 0.3s',
  } as React.CSSProperties

  const labelStyle = { display: 'block', fontSize: '0.72rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#888', marginBottom: '0.5rem', fontFamily: "'Cinzel', serif" }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #0A0A0A, #1A1A1A)', paddingTop: '76px' }}>
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '5rem 2rem' }}>
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#E74C3C', display: 'block', marginBottom: '1rem' }}>الحجز</span>
            <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2rem, 5vw, 3.5rem)', marginBottom: '1rem' }}>
              احجز <span className="gold-text">طاولتك</span>
            </h1>
            <div className="section-divider" />
            <p style={{ color: '#888', marginTop: '1.5rem', fontSize: '0.95rem', lineHeight: 1.8 }}>
              احجز طاولتك مسبقاً للأفراد أو المجموعات والمناسبات الخاصة
            </p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '4rem', alignItems: 'start' }}>
            {/* Info */}
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.5rem', color: '#D4AF37', fontStyle: 'italic', marginBottom: '1.5rem' }}>نحن هنا لخدمتك</h3>
              <p style={{ color: '#888', lineHeight: 2, marginBottom: '2rem', fontSize: '0.9rem' }}>نضمن لك تجربة لا تُنسى في أجواء MR. MARVEL الفاخرة.</p>
              {[
                { icon: '📞', label: 'تليفون / واتساب', value: '01096837872' },
                { icon: '🕐', label: 'ساعات العمل', value: 'يومياً 12:00 ظ — 2:00 ص' },
                { icon: '📍', label: 'الموقع', value: 'دمياط، مصر' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem 0', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                  <div style={{ width: '44px', height: '44px', border: '1px solid rgba(212,175,55,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', flexShrink: 0 }}>{item.icon}</div>
                  <div>
                    <small style={{ display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginBottom: '0.2rem' }}>{item.label}</small>
                    <strong style={{ fontSize: '0.93rem', color: '#F5F0E8', fontWeight: 600 }}>{item.value}</strong>
                  </div>
                </div>
              ))}
            </div>

            {/* Form */}
            {done ? (
              <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.2)', padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '4rem', marginBottom: '1.5rem' }}>🎉</div>
                <h3 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1.1rem', letterSpacing: '2px', marginBottom: '1rem' }}>تم إرسال طلب الحجز!</h3>
                <p style={{ color: '#888', lineHeight: 2, marginBottom: '2rem', fontSize: '0.9rem' }}>سيتواصل معك فريقنا عبر واتساب لتأكيد الحجز.</p>
                <button onClick={() => setDone(false)} style={{ background: '#C0392B', border: 'none', color: '#fff', padding: '0.8rem 2rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>حجز آخر</button>
              </div>
            ) : (
              <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.12)', padding: '2.5rem', position: 'relative' }}>
                <div style={{ position: 'absolute', top: '-13px', right: '2rem', background: '#1A1A1A', color: '#D4AF37', fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '3px', padding: '0 1rem' }}>احجز طاولتك</div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div><label style={labelStyle}>الاسم *</label><input style={inputStyle} placeholder="اسمك الكريم" value={form.name} onChange={e => set('name', e.target.value)} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                  <div><label style={labelStyle}>الهاتف *</label><input style={inputStyle} placeholder="01xxxxxxxxx" value={form.phone} onChange={e => set('phone', e.target.value)} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div><label style={labelStyle}>التاريخ *</label><input type="date" style={inputStyle} min={new Date().toISOString().split('T')[0]} value={form.date} onChange={e => set('date', e.target.value)} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                  <div><label style={labelStyle}>الوقت *</label><input type="time" style={inputStyle} value={form.time} onChange={e => set('time', e.target.value)} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                  <div><label style={labelStyle}>عدد الأشخاص</label>
                    <select style={{ ...inputStyle, appearance: 'none' } as React.CSSProperties} value={form.guests} onChange={e => set('guests', e.target.value)}>
                      {['1 شخص','2 شخص','3-4 أشخاص','5-6 أشخاص','7-10 أشخاص','+10 أشخاص'].map(g => <option key={g}>{g}</option>)}
                    </select>
                  </div>
                  <div><label style={labelStyle}>المناسبة</label>
                    <select style={{ ...inputStyle, appearance: 'none' } as React.CSSProperties} value={form.occasion} onChange={e => set('occasion', e.target.value)}>
                      {['عشاء عادي','عيد ميلاد','احتفال خاص','اجتماع عمل','خطوبة'].map(o => <option key={o}>{o}</option>)}
                    </select>
                  </div>
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={labelStyle}>ملاحظات خاصة</label>
                  <textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '90px' } as React.CSSProperties} placeholder="أي طلبات أو ملاحظات خاصة..." value={form.notes} onChange={e => set('notes', e.target.value)} onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(212,175,55,0.15)'} />
                </div>
                <button onClick={submit} disabled={loading} style={{
                  width: '100%', background: loading ? '#888' : 'linear-gradient(135deg, #C0392B, #E74C3C)',
                  border: 'none', color: '#fff', padding: '1.1rem',
                  fontFamily: "'Cairo', sans-serif", fontSize: '1rem',
                  fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer',
                  letterSpacing: '1px', transition: 'all 0.3s',
                }}>
                  {loading ? 'جاري الإرسال...' : 'تأكيد الحجز عبر واتساب ✦'}
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
