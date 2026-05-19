'use client'
import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { Order, Reservation, MenuItem, OrderStatus, ReservationStatus } from '@/types'

const STATUS_AR: Record<string, string> = {
  pending: '⏳ قيد الانتظار', confirmed: '✅ مؤكد',
  preparing: '👨‍🍳 يتحضر', ready: '🔔 جاهز',
  delivered: '✔️ تم التسليم', cancelled: '❌ ملغي',
}
const STATUS_COLORS: Record<string, string> = {
  pending: '#f39c12', confirmed: '#27ae60', preparing: '#3498db',
  ready: '#9b59b6', delivered: '#2ecc71', cancelled: '#E74C3C',
}

type Tab = 'dashboard' | 'orders' | 'reservations' | 'menu'

export default function AdminPage() {
  const [tab, setTab] = useState<Tab>('dashboard')
  const [orders, setOrders] = useState<Order[]>([])
  const [reservations, setReservations] = useState<Reservation[]>([])
  const [menuItems, setMenuItems] = useState<MenuItem[]>([])
  const [orderFilter, setOrderFilter] = useState('all')
  const [menuFilter, setMenuFilter] = useState('all')
  const [toast, setToast] = useState('')

  const showToast = (msg: string) => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const loadAll = useCallback(async () => {
    const [o, r, m] = await Promise.all([
      supabase.from('orders').select('*').order('created_at', { ascending: false }),
      supabase.from('reservations').select('*').order('created_at', { ascending: false }),
      supabase.from('menu_items').select('*').order('category').order('sort_order'),
    ])
    if (o.data) setOrders(o.data)
    if (r.data) setReservations(r.data)
    if (m.data) setMenuItems(m.data)
  }, [])

  useEffect(() => {
    loadAll()
    const ch = supabase.channel('admin').on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => loadAll()).subscribe()
    return () => { supabase.removeChannel(ch) }
  }, [loadAll])

  const updateOrderStatus = async (id: string, status: OrderStatus) => {
    await supabase.from('orders').update({ status }).eq('id', id)
    setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o))
    showToast('✅ تم تحديث الحالة')
  }

  const updateResStatus = async (id: string, status: ReservationStatus) => {
    await supabase.from('reservations').update({ status }).eq('id', id)
    setReservations(prev => prev.map(r => r.id === id ? { ...r, status } : r))
    showToast('✅ تم تحديث الحالة')
  }

  const toggleMenu = async (id: number, current: boolean) => {
    await supabase.from('menu_items').update({ is_available: !current }).eq('id', id)
    setMenuItems(prev => prev.map(m => m.id === id ? { ...m, is_available: !current } : m))
    showToast(current ? '⛔ تم إيقاف الصنف' : '✅ تم تفعيل الصنف')
  }

  const today = new Date().toDateString()
  const todayOrders = orders.filter(o => new Date(o.created_at).toDateString() === today)
  const todayRevenue = todayOrders.filter(o => o.status !== 'cancelled').reduce((s, o) => s + Number(o.total_price), 0)
  const todayRes = reservations.filter(r => r.reservation_date === new Date().toISOString().split('T')[0])
  const pendingCount = orders.filter(o => o.status === 'pending').length
  const pendingRes = reservations.filter(r => r.status === 'pending').length

  const filteredOrders = orderFilter === 'all' ? orders : orders.filter(o => o.status === orderFilter)
  const filteredMenu = menuFilter === 'all' ? menuItems : menuItems.filter(m => m.category === menuFilter)

  const timeAgo = (d: string) => {
    const diff = (Date.now() - new Date(d).getTime()) / 1000
    if (diff < 60) return 'الآن'
    if (diff < 3600) return `${Math.floor(diff / 60)} د`
    if (diff < 86400) return `${Math.floor(diff / 3600)} س`
    return new Date(d).toLocaleDateString('ar-EG')
  }

  const s = {
    sidebar: { width: '220px', background: '#0A0A0A', borderLeft: '1px solid rgba(212,175,55,0.1)', display: 'flex', flexDirection: 'column' as const, position: 'fixed' as const, top: 0, right: 0, bottom: 0, zIndex: 100 },
    main: { marginRight: '220px', padding: '2rem', minHeight: '100vh', background: '#111' },
    navItem: (active: boolean) => ({ display: 'flex', alignItems: 'center', gap: '0.8rem', padding: '0.9rem 1.5rem', cursor: 'pointer', color: active ? '#D4AF37' : '#888', background: active ? 'rgba(212,175,55,0.05)' : 'transparent', borderRight: `3px solid ${active ? '#D4AF37' : 'transparent'}`, fontSize: '0.88rem', fontWeight: 600, fontFamily: "'Cairo', sans-serif", transition: 'all 0.2s', userSelect: 'none' as const }),
    card: { background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)', padding: '1.5rem', position: 'relative' as const, overflow: 'hidden' as const },
    th: { padding: '0.75rem 1rem', textAlign: 'right' as const, fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase' as const, color: '#888', borderBottom: '1px solid rgba(212,175,55,0.08)', background: 'rgba(212,175,55,0.02)', fontWeight: 600 },
    td: { padding: '0.85rem 1rem', fontSize: '0.86rem', color: '#ccc', borderBottom: '1px solid rgba(255,255,255,0.03)' },
    select: { background: '#222', border: '1px solid rgba(212,175,55,0.15)', color: '#F5F0E8', padding: '4px 8px', fontFamily: "'Cairo', sans-serif", fontSize: '0.78rem', cursor: 'pointer', outline: 'none' },
  }

  return (
    <div style={{ display: 'flex', direction: 'rtl', fontFamily: "'Cairo', sans-serif" }}>
      {/* Sidebar */}
      <aside style={s.sidebar}>
        <div style={{ padding: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)', textAlign: 'center' }}>
          <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1rem', color: '#D4AF37' }}><span style={{ color: '#E74C3C' }}>MR.</span> MARVEL</div>
          <div style={{ fontSize: '0.65rem', letterSpacing: '3px', color: '#888', marginTop: '0.3rem', textTransform: 'uppercase' }}>Admin Panel</div>
        </div>
        <nav style={{ flex: 1, padding: '1rem 0' }}>
          {([
            { id: 'dashboard', icon: '📊', label: 'لوحة التحكم' },
            { id: 'orders', icon: '🛒', label: 'الطلبات', badge: pendingCount },
            { id: 'reservations', icon: '🪑', label: 'الحجوزات', badge: pendingRes },
            { id: 'menu', icon: '🍽️', label: 'القائمة' },
          ] as {id: Tab; icon: string; label: string; badge?: number}[]).map(item => (
            <div key={item.id} style={s.navItem(tab === item.id)} onClick={() => setTab(item.id)}>
              <span>{item.icon}</span>
              <span>{item.label}</span>
              {item.badge ? <span style={{ marginRight: 'auto', background: '#C0392B', color: '#fff', fontSize: '0.65rem', fontWeight: 700, padding: '2px 7px', borderRadius: '10px', minWidth: '20px', textAlign: 'center' }}>{item.badge}</span> : null}
            </div>
          ))}
        </nav>
        <div style={{ padding: '1rem 1.5rem', borderTop: '1px solid rgba(212,175,55,0.08)', fontSize: '0.78rem', color: '#888' }}>
          <span style={{ display: 'inline-block', width: '8px', height: '8px', borderRadius: '50%', background: '#27ae60', marginLeft: '0.5rem' }}/>
          متصل • Real-time
        </div>
      </aside>

      {/* Main */}
      <main style={s.main}>
        {/* Toast */}
        {toast && <div style={{ position: 'fixed', top: '1.5rem', left: '50%', transform: 'translateX(-50%)', background: '#1A1A1A', border: '1px solid #D4AF37', color: '#D4AF37', padding: '0.8rem 1.5rem', zIndex: 9999, fontWeight: 600, fontSize: '0.88rem' }}>{toast}</div>}

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1.2rem' }}>📊 لوحة التحكم</h2>
              <button onClick={loadAll} style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.25)', color: '#D4AF37', padding: '0.55rem 1.2rem', fontFamily: "'Cairo', sans-serif", fontSize: '0.83rem', fontWeight: 700, cursor: 'pointer' }}>🔄 تحديث</button>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.5rem', marginBottom: '2rem' }}>
              {[
                { label: 'إيرادات اليوم', val: `${todayRevenue.toLocaleString()} ج.م`, color: '#D4AF37', icon: '💰' },
                { label: 'طلبات اليوم', val: todayOrders.length, color: '#E74C3C', icon: '🛒' },
                { label: 'حجوزات اليوم', val: todayRes.length, color: '#27ae60', icon: '🪑' },
                { label: 'قيد الانتظار', val: pendingCount, color: '#3498db', icon: '⏳' },
              ].map((c, i) => (
                <div key={i} style={{ ...s.card, borderTop: `2px solid ${c.color}` }}>
                  <div style={{ fontSize: '0.7rem', letterSpacing: '2px', textTransform: 'uppercase', color: '#888', marginBottom: '0.8rem' }}>{c.label}</div>
                  <div style={{ fontFamily: "'Cinzel', serif", fontSize: '1.8rem', color: '#F5F0E8' }}>{c.val}</div>
                  <div style={{ position: 'absolute', top: '1rem', left: '1rem', fontSize: '1.8rem', opacity: 0.1 }}>{c.icon}</div>
                </div>
              ))}
            </div>
            {/* Recent orders */}
            <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)' }}>
              <div style={{ padding: '1.2rem 1.5rem', borderBottom: '1px solid rgba(212,175,55,0.08)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '0.88rem', letterSpacing: '2px' }}>آخر الطلبات</h3>
                <button onClick={() => setTab('orders')} style={{ background: 'transparent', border: '1px solid rgba(212,175,55,0.2)', color: '#D4AF37', padding: '4px 12px', fontFamily: "'Cairo', sans-serif", fontSize: '0.78rem', cursor: 'pointer' }}>عرض الكل</button>
              </div>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr><th style={s.th}>العميل</th><th style={s.th}>المبلغ</th><th style={s.th}>الحالة</th><th style={s.th}>الوقت</th></tr></thead>
                <tbody>
                  {orders.slice(0, 8).map(o => (
                    <tr key={o.id}>
                      <td style={s.td}>{o.customer_name}</td>
                      <td style={{ ...s.td, color: '#D4AF37', fontWeight: 700 }}>{o.total_price} ج.م</td>
                      <td style={s.td}><span style={{ background: `${STATUS_COLORS[o.status]}22`, color: STATUS_COLORS[o.status], fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', letterSpacing: '0.5px' }}>{STATUS_AR[o.status]}</span></td>
                      <td style={{ ...s.td, color: '#888', fontSize: '0.8rem' }}>{timeAgo(o.created_at)}</td>
                    </tr>
                  ))}
                  {orders.length === 0 && <tr><td colSpan={4} style={{ ...s.td, textAlign: 'center', padding: '3rem', color: '#888' }}>لا توجد طلبات بعد</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* ORDERS */}
        {tab === 'orders' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1.2rem' }}>🛒 الطلبات</h2>
            </div>
            <div style={{ display: 'flex', gap: 0, flexWrap: 'wrap', marginBottom: '1.5rem' }}>
              {['all','pending','confirmed','preparing','ready','delivered','cancelled'].map(f => (
                <button key={f} onClick={() => setOrderFilter(f)} style={{ background: orderFilter === f ? '#D4AF37' : 'transparent', color: orderFilter === f ? '#0A0A0A' : '#888', border: '1px solid rgba(212,175,55,0.2)', padding: '0.5rem 1rem', margin: '-1px', fontFamily: "'Cairo', sans-serif", fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer' }}>
                  {f === 'all' ? 'الكل' : STATUS_AR[f]}
                </button>
              ))}
            </div>
            <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)', overflow: 'hidden' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  <th style={s.th}>العميل</th><th style={s.th}>الهاتف</th>
                  <th style={s.th}>الأصناف</th><th style={s.th}>المبلغ</th>
                  <th style={s.th}>الحالة</th><th style={s.th}>الوقت</th><th style={s.th}>إجراء</th>
                </tr></thead>
                <tbody>
                  {filteredOrders.map(o => (
                    <tr key={o.id}>
                      <td style={{ ...s.td, fontWeight: 600 }}>{o.customer_name}</td>
                      <td style={s.td}><a href={`tel:${o.customer_phone}`} style={{ color: '#D4AF37', textDecoration: 'none' }}>{o.customer_phone}</a></td>
                      <td style={{ ...s.td, color: '#888', fontSize: '0.8rem' }}>{Array.isArray(o.items) ? o.items.slice(0,2).map((i: { name: string; qty: number }) => `${i.name}×${i.qty}`).join('، ') : '-'}</td>
                      <td style={{ ...s.td, color: '#D4AF37', fontWeight: 700 }}>{o.total_price} ج.م</td>
                      <td style={s.td}>
                        <select style={s.select} value={o.status} onChange={e => updateOrderStatus(o.id, e.target.value as OrderStatus)}>
                          {['pending','confirmed','preparing','ready','delivered','cancelled'].map(st => <option key={st} value={st}>{STATUS_AR[st]}</option>)}
                        </select>
                      </td>
                      <td style={{ ...s.td, color: '#888', fontSize: '0.8rem' }}>{timeAgo(o.created_at)}</td>
                      <td style={s.td}>
                        <a href={`https://wa.me/${o.customer_phone?.replace(/^0/,'20')}`} target="_blank" style={{ background: '#27ae60', color: '#fff', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>💬</a>
                      </td>
                    </tr>
                  ))}
                  {filteredOrders.length === 0 && <tr><td colSpan={7} style={{ ...s.td, textAlign: 'center', padding: '3rem', color: '#888' }}>لا توجد طلبات</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* RESERVATIONS */}
        {tab === 'reservations' && (
          <div>
            <div style={{ marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1.2rem' }}>🪑 الحجوزات</h2>
            </div>
            <div style={{ background: '#1A1A1A', border: '1px solid rgba(212,175,55,0.08)' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead><tr>
                  <th style={s.th}>الاسم</th><th style={s.th}>الهاتف</th>
                  <th style={s.th}>التاريخ</th><th style={s.th}>الوقت</th>
                  <th style={s.th}>الأشخاص</th><th style={s.th}>المناسبة</th>
                  <th style={s.th}>الحالة</th><th style={s.th}>إجراء</th>
                </tr></thead>
                <tbody>
                  {reservations.map(r => (
                    <tr key={r.id}>
                      <td style={{ ...s.td, fontWeight: 600 }}>{r.customer_name}</td>
                      <td style={s.td}><a href={`tel:${r.customer_phone}`} style={{ color: '#D4AF37', textDecoration: 'none' }}>{r.customer_phone}</a></td>
                      <td style={s.td}>{r.reservation_date}</td>
                      <td style={s.td}>{r.reservation_time}</td>
                      <td style={{ ...s.td, textAlign: 'center' }}>{r.guests_count}</td>
                      <td style={s.td}>{r.occasion}</td>
                      <td style={s.td}>
                        <select style={s.select} value={r.status} onChange={e => updateResStatus(r.id, e.target.value as ReservationStatus)}>
                          {['pending','confirmed','cancelled'].map(st => <option key={st} value={st}>{STATUS_AR[st]}</option>)}
                        </select>
                      </td>
                      <td style={s.td}>
                        <a href={`https://wa.me/${r.customer_phone?.replace(/^0/,'20')}?text=${encodeURIComponent(`مرحباً ${r.customer_name}، تم تأكيد حجزك في MR. MARVEL بتاريخ ${r.reservation_date} الساعة ${r.reservation_time} 🎉`)}`} target="_blank" style={{ background: '#D4AF37', color: '#0A0A0A', padding: '4px 10px', fontSize: '0.75rem', fontWeight: 700, textDecoration: 'none', display: 'inline-block' }}>تأكيد</a>
                      </td>
                    </tr>
                  ))}
                  {reservations.length === 0 && <tr><td colSpan={8} style={{ ...s.td, textAlign: 'center', padding: '3rem', color: '#888' }}>لا توجد حجوزات</td></tr>}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* MENU */}
        {tab === 'menu' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', paddingBottom: '1.5rem', borderBottom: '1px solid rgba(212,175,55,0.1)' }}>
              <h2 style={{ fontFamily: "'Cinzel', serif", color: '#D4AF37', fontSize: '1.2rem' }}>🍽️ إدارة القائمة</h2>
              <div style={{ display: 'flex', gap: 0 }}>
                {['all','pizza','sandwich','grill','salad','meal'].map(f => (
                  <button key={f} onClick={() => setMenuFilter(f)} style={{ background: menuFilter === f ? '#D4AF37' : 'transparent', color: menuFilter === f ? '#0A0A0A' : '#888', border: '1px solid rgba(212,175,55,0.2)', padding: '0.5rem 1rem', margin: '-1px', fontFamily: "'Cairo', sans-serif", fontSize: '0.78rem', fontWeight: 700, cursor: 'pointer' }}>
                    {{ all:'الكل', pizza:'🍕', sandwich:'🥪', grill:'🔥', salad:'🥗', meal:'🍽️' }[f]}
                  </button>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '1.5rem' }}>
              {filteredMenu.map(item => (
                <div key={item.id} style={{ ...s.card, opacity: item.is_available ? 1 : 0.55, transition: 'all 0.3s' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.8rem' }}>
                    <div>
                      <div style={{ fontFamily: "'Cinzel', serif", fontSize: '0.88rem', color: '#F5F0E8', marginBottom: '0.2rem' }}>{item.name}</div>
                      <div style={{ fontSize: '0.68rem', letterSpacing: '2px', color: '#888', textTransform: 'uppercase' }}>{item.category}{item.badge ? ` • ${item.badge}` : ''}</div>
                    </div>
                    <div style={{ fontFamily: "'Cinzel Decorative', serif", fontSize: '1.1rem', color: '#D4AF37', flexShrink: 0 }}>{item.price} ج</div>
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#888', lineHeight: 1.6, marginBottom: '1rem' }}>{item.description}</div>
                  <button onClick={() => toggleMenu(item.id, item.is_available)} style={{
                    width: '100%', padding: '0.5rem',
                    background: item.is_available ? 'rgba(39,174,96,0.1)' : 'rgba(192,57,43,0.1)',
                    border: `1px solid ${item.is_available ? '#27ae60' : '#C0392B'}`,
                    color: item.is_available ? '#27ae60' : '#E74C3C',
                    fontFamily: "'Cairo', sans-serif", fontSize: '0.8rem', fontWeight: 700, cursor: 'pointer',
                  }}>
                    {item.is_available ? '✓ متاح' : '✗ غير متاح'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  )
}
