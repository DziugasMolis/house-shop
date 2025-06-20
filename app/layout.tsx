import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { FilterProvider } from '@/contexts/FilterContext'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'House Shop - Premium House Projects',
  description: 'Discover beautiful and innovative house projects. From modern designs to classic architecture, find your perfect home blueprint.',
  keywords: 'house projects, home design, architecture, house plans, construction',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <LanguageProvider>
          <FilterProvider>
            <div className="min-h-screen flex flex-col">
              <Header />
              <main className="flex-grow">
                {children}
              </main>
              <Footer />
            </div>
          </FilterProvider>
        </LanguageProvider>
      </body>
    </html>
  )
} 