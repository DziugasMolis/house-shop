import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import { LanguageProvider } from '@/contexts/LanguageContext'
import { FilterProvider } from '@/contexts/FilterContext'

const inter = Inter({ subsets: ['latin'] })

// Static metadata for better SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://dziugasmolis.github.io'),
  title: 'Individualūs Namų Projektai | Individual House Projects',
  description: 'Naršykite mūsų visą premium namų projektų kolekciją. Filtruokite pagal stilių, dydį ir kainą, kad rastumėte tobulą dizainą savo poreikiams.',
  keywords: 'namų projektai, individualūs namų projektai, namų dizainas, architektūra, namų planai, statyba',
  openGraph: {
    title: 'Individualūs Namų Projektai',
    description: 'Premium namų projektų kolekcija',
    type: 'website',
  },
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