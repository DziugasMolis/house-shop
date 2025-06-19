'use client'

import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function HomePage() {
  const { t } = useLanguage()

  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
    </main>
  )
} 