'use client'
import { useState } from 'react'
import type { CartItem } from '@/types'

interface CartProps {
  cart: CartItem[]
  setCart: (cart: CartItem[]) => void
}

export default function Cart({ cart, setCart }: CartProps) {
  const [open, setOpen] = useState(false)
  const total = cart.reduce((s, i) => s + i.price * i.qty, 0)
  const count = cart.reduce((s, i) => s + i.qty, 0)

  const remove = (id: number) => setCart(cart.filter(i => i.id !== id))
  const increment = (id: number) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty + 1 } : i))
  const decrement = (id: number) => setCart(cart.map(i => i.id === id ? { ...i, qty: i.qty - 1 } : i).filter(i => i.qty > 0))

  const checkout = () => {
    const lines = cart.map(i => `${i.emoji} ${i.name} × ${i.qty} = ${i.price * i.qty} ج.م`).join('\n')
    const msg = encodeURIComponent(`🍽️ طلب جديد من MR. MARVEL\n\n${lines}\n\n💰 الإجمالي: ${total} ج.م`)
    window.open(`https://wa.me/201096837872?text=${msg}`, '_blank')
  }

  return (
    <>
      {/* Cart button */}
      <button onClick={() => setOpen(!open)} style={{
        position: 'fixed', bottom: '2rem', left: '2rem', zIndex: 999,
        background: '#C0392B', color: '#fff',
        width: '56px', height: '56px', borderRadius: '50%',
        border: 'none', fontSize: '1.5rem', cursor: 'pointer',
        boxShadow: '0 4px 20px rgba(192,57,43,0.5)',
        transition: 'all 0.3s', display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}
      onMouseEnter={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1.1)'}
      onMouseLeave={e => (e.currentTarget as HTMLElement).style.transform = 'scale(1)'}>
        🛒
        {count > 0 && (
          <span style={{
            position: 'absolute', top: '-4px', right: '-4px',
            background: '#D4AF37', color: '#0A0A0A',
            fontSize: '0.65rem', fontWeight: 700,
            minWidth: '20px', height: '20px', borderRadius: '10px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontFamily: "'Cairo', sans-serif",
          }}>{count}</span>
        )}
      </button>

      {/* Panel */}
      <div style={{
        position: 'fixed', bottom: '7rem', left: '2rem', zIndex: 998,
        background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.15)',
        width: '300px', maxHeight: '420px', overflow: 'hidden',
        display: 'flex', flexDirection: 'column',
        transform: open ? 'translateY(0)' : 'translateY(20px)',
        opacity: open ? 1 : 0,
        pointerEvents: open ? 'all' : 'none',
        transition: 'all 0.3s',
      }}>
        <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '0.88rem', letterSpacing: '2px' }}>✦ سلة الطلبات</h4>
          <button onClick={() => setOpen(false)} style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1rem' }}>✕</button>
        </div>

        <div style={{ overflowY: 'auto', flex: 1, padding: '0.5rem 1.5rem' }}>
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '2.5rem 0', color: '#888', fontSize: '0.88rem' }}>السلة فارغة</div>
          ) : cart.map(item => (
            <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.7rem 0', borderBottom: '1px solid rgba(255,255,255,0.04)' }}>
              <span style={{ fontSize: '1.3rem' }}>{item.emoji}</span>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: '0.83rem', color: '#ccc', fontWeight: 600 }}>{item.name}</div>
                <div style={{ fontSize: '0.78rem', color: '#D4AF37' }}>{item.price * item.qty} ج.م</div>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                <button onClick={() => decrement(item.id)} style={{ background: 'rgba(255,255,255,0.05)', border: 'none', color: '#ccc', width: '22px', height: '22px', cursor: 'pointer', borderRadius: '3px', fontSize: '0.9rem' }}>−</button>
                <span style={{ fontSize: '0.85rem', color: '#fff', minWidth: '16px', textAlign: 'center' }}>{item.qty}</span>
                <button onClick={() => increment(item.id)} style={{ background: 'rgba(212,175,55,0.15)', border: 'none', color: '#D4AF37', width: '22px', height: '22px', cursor: 'pointer', borderRadius: '3px', fontSize: '0.9rem' }}>+</button>
                <button onClick={() => remove(item.id)} style={{ background: 'none', border: 'none', color: '#666', cursor: 'pointer', fontSize: '0.8rem', marginRight: '0.2rem' }}>✕</button>
              </div>
            </div>
          ))}
        </div>

        {cart.length > 0 && (
          <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(212,175,55,0.1)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1rem', fontFamily: "'Cinzel', serif", fontSize: '0.88rem' }}>
              <span style={{ color: '#888' }}>الإجمالي</span>
              <span style={{ color: '#D4AF37', fontWeight: 700 }}>{total} ج.م</span>
            </div>
            <button onClick={checkout} style={{
              width: '100%', background: '#C0392B', border: 'none',
              color: '#fff', padding: '0.85rem',
              fontFamily: "'Cairo', sans-serif", fontSize: '0.9rem', fontWeight: 700,
              cursor: 'pointer', transition: 'background 0.3s', letterSpacing: '1px',
            }}
            onMouseEnter={e => (e.currentTarget as HTMLElement).style.background = '#E74C3C'}
            onMouseLeave={e => (e.currentTarget as HTMLElement).style.background = '#C0392B'}>
              💬 إتمام الطلب عبر واتساب
            </button>
          </div>
        )}
      </div>
    </>
  )
}
