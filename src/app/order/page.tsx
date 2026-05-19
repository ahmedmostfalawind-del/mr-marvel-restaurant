'use client'
import { useState, useEffect } from 'react'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import { supabase } from '@/lib/supabase'
import type { MenuItem, CartItem } from '@/types'

const EMOJI: Record<string, string> = { pizza:'🍕', sandwich:'🥪', grill:'🔥', salad:'🥗', meal:'🍽️', drink:'🥤' }
const TABS = [
  { key: 'all', label: 'الكل' },
  { key: 'pizza', label: '🍕 بيتزا' },
  { key: 'sandwich', label: '🥪 ساندويتشات' },
  { key: 'grill', label: '🔥 مشويات' },
  { key: 'salad', label: '🥗 سلطات' },
  { key: 'meal', label: '🍽️ وجبات' },
]

const STATIC: MenuItem[] = [
  { id:1, name:'بيتزا مارفل الخاصة', description:'بيتزا بصوص خاص، جبنة موزاريلا، فلفل ملون، مشروم وزيتون', price:85, category:'pizza', badge:'الأكثر طلباً', is_available:true, is_featured:true, sort_order:0 },
  { id:2, name:'بيتزا بيبروني', description:'بيتزا إيطالية كلاسيكية بالبيبروني وجبنة موزاريلا', price:75, category:'pizza', is_available:true, is_featured:false, sort_order:1 },
  { id:3, name:'بيتزا دجاج بارباكيو', description:'دجاج مشوي، صوص باربيكيو، بصل مكرمل وجبنة', price:80, category:'pizza', badge:'جديد', is_available:true, is_featured:false, sort_order:2 },
  { id:4, name:'ساندويتش كريسبي', description:'فيلية دجاج مقرمشة، خس، طماطم، مايونيز خاص', price:45, category:'sandwich', is_available:true, is_featured:false, sort_order:0 },
  { id:5, name:'ساندويتش مارفل برجر', description:'لحم بقري 150جم، جبنة شيدر، مخلل، صوص سري', price:65, category:'sandwich', badge:'الأفضل', is_available:true, is_featured:true, sort_order:1 },
  { id:6, name:'ساندويتش شاورما', description:'شاورما دجاج أو لحم مع صوص الثوم والخضروات', price:50, category:'sandwich', is_available:true, is_featured:false, sort_order:2 },
  { id:7, name:'مشاوي مكسطة', description:'تشكيلة من كفتة، تيكاواي ودجاج مشوي مع خبز ومقبلات', price:120, category:'grill', badge:'للمجموعات', is_available:true, is_featured:true, sort_order:0 },
  { id:8, name:'كفتة مشوية', description:'كفتة لحم طازج مشوية على الفحم مع بهارات خاصة', price:70, category:'grill', is_available:true, is_featured:false, sort_order:1 },
  { id:9, name:'دجاج تيكاواي', description:'قطع دجاج مشوية متبلة بتوابل MR.MARVEL الخاصة', price:80, category:'grill', is_available:true, is_featured:false, sort_order:2 },
  { id:10, name:'سلطة سيزر', description:'خس روماني، دجاج مشوي، جبنة بارميزان وصوص سيزر', price:40, category:'salad', is_available:true, is_featured:false, sort_order:0 },
  { id:11, name:'سلطة يونانية', description:'طماطم، خيار، زيتون، جبنة فيتا وزيت زيتون', price:35, category:'salad', is_available:true, is_featured:false, sort_order:1 },
  { id:12, name:'سلطة مارفل المميزة', description:'تشكيلة خضروات طازجة بصوص الخل البلسمي', price:38, category:'salad', badge:'صحي', is_available:true, is_featured:false, sort_order:2 },
  { id:13, name:'وجبة عائلية', description:'بيتزا كبيرة + 4 ساندويتشات + سلطتين + مشروبات', price:250, category:'meal', badge:'وفر 30%', is_available:true, is_featured:true, sort_order:0 },
  { id:14, name:'وجبة فردية', description:'ساندويتش + بطاطس + مشروب', price:65, category:'meal', is_available:true, is_featured:false, sort_order:1 },
  { id:15, name:'وجبة كوبل', description:'2 ساندويتش أو بيتزا صغيرة + مشروبين', price:110, category:'meal', badge:'رومانسي', is_available:true, is_featured:false, sort_order:2 },
]

export default function OrderPage() {
  const [items, setItems] = useState<MenuItem[]>(STATIC)
  const [cart, setCart] = useState<CartItem[]>([])
  const [filter, setFilter] = useState('all')
  const [orderType, setOrderType] = useState<'delivery'|'pickup'>('delivery')
  const [step, setStep] = useState<'menu'|'checkout'|'done'>('menu')
  const [form, setForm] = useState({ name: '', phone: '', address: '', notes: '' })
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    supabase.from('menu_items').select('*').eq('is_available', true).order('sort_order')
      .then(({ data }) => { if (data && data.length > 0) setItems(data) })
  }, [])

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const addToCart = (item: MenuItem) => {
    const existing = cart.find(c => c.id === item.id)
    if (existing) setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
    else setCart([...cart, { id: item.id, name: item.name, price: item.price, qty: 1, emoji: EMOJI[item.category] || '🍴' }])
  }

  const removeFromCart = (id: number) => setCart(cart.filter(i => i.id !== id))
  const inc = (id: number) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  const dec = (id: number) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0))

  const placeOrder = async () => {
    if (!form.name || !form.phone) return alert('يرجى إدخال الاسم ورقم الهاتف')
    if (orderType === 'delivery' && !form.address) return alert('يرجى إدخال عنوان التوصيل')
    setLoading(true)
    try {
      await supabase.from('orders').insert({
        customer_name: form.name, customer_phone: form.phone,
        items: cart, total_price: total,
        order_type: orderType, address: form.address,
        notes: form.notes, status: 'pending',
      })
    } catch (_) {}
    const lines = cart.map(i => `${i.emoji} ${i.name} × ${i.qty} = ${i.price * i.qty} ج.م`).join('\n')
    const msg = encodeURIComponent(`🍽️ طلب جديد — MR. MARVEL\n\nالاسم: ${form.name}\nالهاتف: ${form.phone}\nنوع الطلب: ${orderType === 'delivery' ? '🛵 توصيل' : '🏃 استلام'}\n${form.address ? `العنوان: ${form.address}\n` : ''}\n${lines}\n\n💰 الإجمالي: ${total} ج.م${form.notes ? `\nملاحظات: ${form.notes}` : ''}`)
    window.open(`https://wa.me/201096837872?text=${msg}`, '_blank')
    setStep('done')
    setLoading(false)
  }

  const inputStyle = { width: '100%', background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(212,175,55,0.15)', color: '#F5F0E8', padding: '0.85rem 1rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.92rem', outline: 'none' } as React.CSSProperties
  const labelStyle = { display: 'block', fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#888', marginBottom: '0.5rem', fontFamily: "'Cinzel', serif" }

  return (
    <>
      <Navbar />
      <main style={{ minHeight: '100vh', background: '#111', paddingTop: '76px' }}>
        <div style={{ maxWidth: '1300px', margin: '0 auto', padding: '4rem 2rem' }}>
          <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
            <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#E74C3C', display: 'block', marginBottom: '1rem' }}>الطلبات</span>
            <h1 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(2rem, 5vw, 3rem)', marginBottom: '0.5rem' }}>
              اطلب <span className="gold-text">الآن</span>
            </h1>
            <div className="section-divider" />
          </div>

          {step === 'done' ? (
            <div style={{ textAlign: 'center', maxWidth: '500px', margin: '0 auto', background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.2)', padding: '4rem 2rem' }}>
              <div style={{ fontSize: '5rem', marginBottom: '1.5rem' }}>✅</div>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '1rem' }}>تم إرسال طلبك!</h2>
              <p style={{ color: '#888', lineHeight: 2, marginBottom: '2rem' }}>سيتواصل معك فريقنا عبر واتساب لتأكيد الطلب وتحديد وقت التوصيل.</p>
              <button onClick={() => { setStep('menu'); setCart([]); setForm({ name:'', phone:'', address:'', notes:'' }) }} style={{ background: '#C0392B', border: 'none', color: '#fff', padding: '0.9rem 2.5rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.95rem', fontWeight: 700, cursor: 'pointer' }}>طلب جديد</button>
            </div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 380px', gap: '2.5rem', alignItems: 'start' }}>
              {/* Menu */}
              <div>
                {step === 'menu' && (
                  <>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0, marginBottom: '2rem' }}>
                      {TABS.map(t => (
                        <button key={t.key} onClick={() => setFilter(t.key)} style={{
                          background: filter === t.key ? '#D4AF37' : 'transparent',
                          color: filter === t.key ? '#0A0A0A' : '#888',
                          border: '1px solid rgba(212,175,55,0.2)', padding: '0.65rem 1.3rem',
                          margin: '-1px', fontFamily: "'Cairo', sans-serif", fontSize: '0.85rem',
                          fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s',
                        }}>{t.label}</button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                      {filtered.map(item => (
                        <div key={item.id} style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)', overflow: 'hidden', transition: 'all 0.3s', position: 'relative' }}
                          onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.3)'; el.style.transform = 'translateY(-4px)' }}
                          onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.borderColor = 'rgba(212,175,55,0.08)'; el.style.transform = 'translateY(0)' }}>
                          {item.badge && <div style={{ position: 'absolute', top: '0.8rem', right: '0.8rem', background: '#C0392B', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 8px', textTransform: 'uppercase', zIndex: 2 }}>{item.badge}</div>}
                          <div style={{ height: '160px', background: 'linear-gradient(135deg, #1a1a1a, #2a1a1a)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem', position: 'relative' }}>
                            {EMOJI[item.category]}
                            <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}/>
                          </div>
                          <div style={{ padding: '1.1rem' }}>
                            <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.9rem', color: '#F5F0E8', marginBottom: '0.4rem' }}>{item.name}</div>
                            <div style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>{item.description}</div>
                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                              <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.05rem', color: '#D4AF37' }}>{item.price} <small style={{ fontSize: '0.6em', color: '#888', fontFamily: "'Cairo', sans-serif" }}>ج.م</small></span>
                              <button onClick={() => addToCart(item)} style={{ background: 'transparent', border: '1px solid #C0392B', color: '#C0392B', width: '34px', height: '34px', borderRadius: '50%', fontSize: '1.3rem', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'all 0.3s' }}
                                onMouseEnter={e => { const el = e.currentTarget as HTMLElement; el.style.background = '#C0392B'; el.style.color = '#fff' }}
                                onMouseLeave={e => { const el = e.currentTarget as HTMLElement; el.style.background = 'transparent'; el.style.color = '#C0392B' }}>+</button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {step === 'checkout' && (
                  <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.12)', padding: '2.5rem' }}>
                    <h3 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1rem', letterSpacing: '2px', marginBottom: '2rem' }}>✦ بيانات الطلب</h3>
                    <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
                      {(['delivery', 'pickup'] as const).map(t => (
                        <button key={t} onClick={() => setOrderType(t)} style={{
                          flex: 1, padding: '0.9rem',
                          background: orderType === t ? 'rgba(212,175,55,0.1)' : 'transparent',
                          border: `1px solid ${orderType === t ? '#D4AF37' : 'rgba(212,175,55,0.15)'}`,
                          color: orderType === t ? '#D4AF37' : '#888',
                          fontFamily: "'Cairo', sans-serif", fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer',
                        }}>
                          {t === 'delivery' ? '🛵 توصيل' : '🏃 استلام'}
                        </button>
                      ))}
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <div><label style={labelStyle}>الاسم *</label><input style={inputStyle} placeholder="اسمك الكريم" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                      <div><label style={labelStyle}>الهاتف *</label><input style={inputStyle} placeholder="01xxxxxxxxx" value={form.phone} onChange={e => setForm(f => ({ ...f, phone: e.target.value }))} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                    </div>
                    {orderType === 'delivery' && <div style={{ marginBottom: '1rem' }}><label style={labelStyle}>العنوان *</label><input style={inputStyle} placeholder="عنوان التوصيل بالتفصيل" value={form.address} onChange={e => setForm(f => ({ ...f, address: e.target.value }))} onFocus={e => (e.target as HTMLInputElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLInputElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>}
                    <div style={{ marginBottom: '1.5rem' }}><label style={labelStyle}>ملاحظات</label><textarea style={{ ...inputStyle, resize: 'vertical', minHeight: '80px' } as React.CSSProperties} placeholder="أي طلبات خاصة..." value={form.notes} onChange={e => setForm(f => ({ ...f, notes: e.target.value }))} onFocus={e => (e.target as HTMLTextAreaElement).style.borderColor = '#D4AF37'} onBlur={e => (e.target as HTMLTextAreaElement).style.borderColor = 'rgba(212,175,55,0.15)'} /></div>
                    <div style={{ display: 'flex', gap: '1rem' }}>
                      <button onClick={() => setStep('menu')} style={{ flex: 1, background: 'transparent', border: '1px solid rgba(212,175,55,0.2)', color: '#888', padding: '1rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.9rem', fontWeight: 700, cursor: 'pointer' }}>← رجوع</button>
                      <button onClick={placeOrder} disabled={loading} style={{ flex: 2, background: loading ? '#888' : 'linear-gradient(135deg, #C0392B, #E74C3C)', border: 'none', color: '#fff', padding: '1rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.95rem', fontWeight: 700, cursor: loading ? 'not-allowed' : 'pointer' }}>
                        {loading ? 'جاري الإرسال...' : '💬 تأكيد الطلب عبر واتساب'}
                      </button>
                    </div>
                  </div>
                )}
              </div>

              {/* Cart Sidebar */}
              <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.12)', position: 'sticky', top: '100px' }}>
                <div style={{ padding: '1.3rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <h3 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '0.9rem', letterSpacing: '2px' }}>✦ طلبك</h3>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>{count} صنف</span>
                </div>
                <div style={{ maxHeight: '350px', overflowY: 'auto', padding: '0.5rem 1.5rem' }}>
                  {cart.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '3rem 0', color: '#888', fontSize: '0.88rem' }}>
                      <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🛒</div>
                      أضف أصناف من القائمة
                    </div>
                  ) : cart.map(item => (
                    <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.8rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
                      <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '0.82rem', color: '#ccc', fontWeight: 600, marginBottom: '0.2rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#D4AF37' }}>{item.price * item.qty} ج.م</div>
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                        <button onClick={() => dec(item.id)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#ccc', width: '24px', height: '24px', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '3px' }}>−</button>
                        <span style={{ fontSize: '0.85rem', color: '#fff', minWidth: '18px', textAlign: 'center' }}>{item.qty}</span>
                        <button onClick={() => inc(item.id)} style={{ background: 'rgba(212,175,55,0.15)', border: 'none', color: '#D4AF37', width: '24px', height: '24px', cursor: 'pointer', fontSize: '0.9rem', borderRadius: '3px' }}>+</button>
                        <button onClick={() => removeFromCart(item.id)} style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.8rem', padding: '2px' }}>✕</button>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 && (
                  <div style={{ padding: '1.2rem 1.5rem', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem' }}>
                      <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.85rem', color: '#888' }}>الإجمالي</span>
                      <span style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.1rem', color: '#D4AF37' }}>{total} ج.م</span>
                    </div>
                    <button onClick={() => setStep('checkout')} style={{
                      width: '100%', background: 'linear-gradient(135deg, #C0392B, #E74C3C)',
                      border: 'none', color: '#fff', padding: '1rem',
                      fontFamily: "'Cairo', sans-serif", fontSize: '0.95rem',
                      fontWeight: 700, cursor: 'pointer', letterSpacing: '1px',
                    }}>
                      إتمام الطلب ←
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </>
  )
}
