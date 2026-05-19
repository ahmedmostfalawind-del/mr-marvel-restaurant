'use client'

interface ToastProps { message: string; show: boolean }

export default function Toast({ message, show }: ToastProps) {
  return (
    <div style={{
      position: 'fixed', top: '5.5rem', right: '2rem', zIndex: 9999,
      background: '#1A1A1A', border: '1px solid #D4AF37',
      color: '#D4AF37', padding: '0.9rem 1.5rem',
      fontSize: '0.88rem', fontWeight: 600,
      transform: show ? 'translateX(0)' : 'translateX(150%)',
      transition: 'transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
      whiteSpace: 'nowrap', pointerEvents: 'none',
      fontFamily: "'Cairo', sans-serif",
    }}>
      {message}
    </div>
  )
}
