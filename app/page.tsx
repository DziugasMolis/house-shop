'use client'

import Hero from '@/components/Hero'
import FeaturedProducts from '@/components/FeaturedProducts'
import AboutSection from '@/components/AboutSection'
import ContactSection from '@/components/ContactSection'

export default function HomePage() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <AboutSection />
      <ContactSection />
    </main>
  )
} 