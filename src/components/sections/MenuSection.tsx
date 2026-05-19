'use client'
import { useState, useEffect } from 'react'
import { supabase } from '@/lib/supabase'
import type { MenuItem, CartItem } from '@/types'

const STATIC_MENU: MenuItem[] = [
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

const EMOJI: Record<string, string> = { pizza:'🍕', sandwich:'🥪', grill:'🔥', salad:'🥗', meal:'🍽️', drink:'🥤' }

const TABS = [
  { key: 'all', label: 'الكل' },
  { key: 'pizza', label: '🍕 بيتزا' },
  { key: 'sandwich', label: '🥪 ساندويتشات' },
  { key: 'grill', label: '🔥 مشويات' },
  { key: 'salad', label: '🥗 سلطات' },
  { key: 'meal', label: '🍽️ وجبات' },
]

interface MenuSectionProps {
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
  showToast: (msg: string) => void
}

export default function MenuSection({ cart, setCart, showToast }: MenuSectionProps) {
  const [items, setItems] = useState<MenuItem[]>(STATIC_MENU)
  const [filter, setFilter] = useState('all')

  useEffect(() => {
    supabase.from('menu_items').select('*').eq('is_available', true).order('sort_order')
      .then(({ data }) => { if (data && data.length > 0) setItems(data) })
  }, [])

  const filtered = filter === 'all' ? items : items.filter(i => i.category === filter)

  const addToCart = (item: MenuItem) => {
    const existing = cart.find(c => c.id === item.id)
    if (existing) {
      setCart(cart.map(c => c.id === item.id ? { ...c, qty: c.qty + 1 } : c))
    } else {
      setCart([...cart, { id: item.id, name: item.name, price: item.price, qty: 1, emoji: EMOJI[item.category] || '🍴' }])
    }
    showToast(`✦ أُضيف: ${item.name}`)
  }

  return (
    <section id="menu" style={{ padding: '8rem 0', background: '#111' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 2rem' }}>
        {/* Header */}
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <span style={{ fontFamily: "'Cinzel', serif", fontSize: '0.72rem', letterSpacing: '5px', textTransform: 'uppercase', color: '#E74C3C', display: 'block', marginBottom: '1rem' }}>القائمة</span>
          <h2 style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: 'clamp(1.8rem, 4vw, 3rem)', marginBottom: '1rem' }}>
            أشهى <span className="gold-text">الأطباق</span>
          </h2>
          <div className="section-divider" />
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '3rem', gap: 0 }}>
          {TABS.map(t => (
            <button key={t.key} onClick={() => setFilter(t.key)} style={{
              background: filter === t.key ? '#D4AF37' : 'transparent',
              color: filter === t.key ? '#0A0A0A' : '#888',
              border: '1px solid rgba(212,175,55,0.2)',
              padding: '0.7rem 1.5rem', margin: '-1px',
              fontFamily: "'Cairo', sans-serif", fontSize: '0.88rem',
              fontWeight: 700, cursor: 'pointer', transition: 'all 0.25s',
            }}>
              {t.label}
            </button>
          ))}
        </div>

        {/* Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: '1.8rem' }}>
          {filtered.map(item => (
            <div key={item.id} style={{
              background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)',
              overflow: 'hidden', transition: 'all 0.35s', cursor: 'pointer',
              position: 'relative',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.3)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(-5px)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = '0 20px 40px rgba(0,0,0,0.5)'
            }}
            onMouseLeave={e => {
              ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(212,175,55,0.08)'
              ;(e.currentTarget as HTMLElement).style.transform = 'translateY(0)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}>
              {item.badge && (
                <div style={{
                  position: 'absolute', top: '1rem', right: '1rem',
                  background: '#C0392B', color: '#fff',
                  fontSize: '0.68rem', fontWeight: 700, letterSpacing: '1px',
                  padding: '3px 10px', textTransform: 'uppercase', zIndex: 2,
                }}>{item.badge}</div>
              )}
              {/* Image placeholder */}
              <div style={{
                width: '100%', height: '190px',
                background: 'linear-gradient(135deg, #1a1a1a, #2a1a1a)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '4.5rem', position: 'relative',
              }}>
                {EMOJI[item.category] || '🍴'}
                <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, rgba(0,0,0,0.5), transparent)' }}/>
              </div>
              <div style={{ padding: '1.3rem' }}>
                <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1rem', color: '#F5F0E8', marginBottom: '0.5rem' }}>{item.name}</div>
                <div style={{ fontSize: '0.82rem', color: '#888', lineHeight: 1.7, marginBottom: '1.2rem' }}>{item.description}</div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.15rem', color: '#D4AF37' }}>
                    {item.price} <small style={{ fontSize: '0.65em', color: '#888', fontFamily: "'Cairo', sans-serif" }}>ج.م</small>
                  </div>
                  <button onClick={() => addToCart(item)} style={{
                    background: 'transparent', border: '1px solid #C0392B',
                    color: '#C0392B', width: '36px', height: '36px',
                    borderRadius: '50%', fontSize: '1.4rem', cursor: 'pointer',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    transition: 'all 0.3s', lineHeight: 1,
                  }}
                  onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = '#C0392B'; (e.currentTarget as HTMLElement).style.color = '#fff' }}
                  onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'transparent'; (e.currentTarget as HTMLElement).style.color = '#C0392B' }}>
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
