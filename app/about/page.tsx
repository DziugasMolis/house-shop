'use client'

import AboutSection from '@/components/AboutSection'
import { useLanguage } from '@/contexts/LanguageContext'

export default function AboutPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('about.title')}</h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('about.description')}
          </p>
        </div>
        
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 text-base leading-7 sm:grid-cols-2 sm:gap-y-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          <div>
            <h3 className="border-l border-primary-600 pl-6 font-semibold text-gray-900">{t('about.mission')}</h3>
            <div className="border-l border-gray-200 pl-6 pt-2">
              <p className="text-gray-600">
                {t('about.missionText')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="border-l border-primary-600 pl-6 font-semibold text-gray-900">{t('about.vision')}</h3>
            <div className="border-l border-gray-200 pl-6 pt-2">
              <p className="text-gray-600">
                {t('about.visionText')}
              </p>
            </div>
          </div>
          <div>
            <h3 className="border-l border-primary-600 pl-6 font-semibold text-gray-900">{t('about.values')}</h3>
            <div className="border-l border-gray-200 pl-6 pt-2">
              <p className="text-gray-600">
                {t('about.valuesText')}
              </p>
            </div>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-2xl lg:mx-0 lg:max-w-none">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">500+</div>
              <div className="text-sm text-gray-600">{t('about.stats.projects')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">50+</div>
              <div className="text-sm text-gray-600">{t('about.stats.architects')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">10+</div>
              <div className="text-sm text-gray-600">{t('about.stats.experience')}</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-primary-600">98%</div>
              <div className="text-sm text-gray-600">{t('about.stats.satisfaction')}</div>
            </div>
          </div>
        </div>
      </div>
      
      <AboutSection />
    </div>
  )
} 