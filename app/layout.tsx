import type { Metadata } from 'next'
import { Inter, Space_Grotesk } from 'next/font/google'
import './globals.css'

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
})

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export const metadata: Metadata = {
  title: "Orizonix — Revenue Growth Systems Partner",
  description: "We design and execute scalable growth systems that help ambitious brands acquire customers, increase ROI, and grow sustainably. Performance marketing, automation, and brand strategy.",
  keywords: ["growth systems", "performance marketing", "lead generation", "revenue growth", "digital marketing agency", "marketing automation", "paid ads", "conversion optimization"],
  openGraph: {
    title: "Orizonix — Revenue Growth Systems Partner",
    description: "Scalable growth systems for ambitious brands. Paid media, automation, CRO, and brand strategy.",
    type: "website",
  },
  icons: {
    icon: [{ url: "/favicon.ico", sizes: "any" }],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${spaceGrotesk.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}
