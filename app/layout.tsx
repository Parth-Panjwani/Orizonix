import type { Metadata } from 'next'
import { Inter, Cinzel } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/contexts/ThemeContext'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
})

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
  variable: '--font-cinzel',
})

export const metadata: Metadata = {
  title: 'Orizonix - Creative-Tech Agency',
  description: 'We Craft Brands. Build Systems. Automate Growth.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} ${cinzel.variable}`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  )
}

