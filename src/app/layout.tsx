import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'MR. MARVEL Restaurant | Good Food • Good Mood',
  description: 'مطعم MR. MARVEL — بيتزا، ساندويتشات، مشويات وسلطات. اطلب أونلاين أو احجز طاولتك الآن.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel+Decorative:wght@700;900&family=Cinzel:wght@400;600;700&family=Cairo:wght@300;400;600;700;900&family=Playfair+Display:ital,wght@0,700;1,400&display=swap" rel="stylesheet" />
      </head>
      <body>
        {children}
      </body>
    </html>
  )
}
