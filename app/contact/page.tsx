'use client'

import ContactSection from '@/components/ContactSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ContactPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      {/* <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('contact.title')}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('contact.description')}
          </p>
        </div>
      </div> */}
      
      <ContactSection />
    </div>
  )
} 