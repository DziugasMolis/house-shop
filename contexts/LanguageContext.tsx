'use client'

import React, { createContext, useContext, useState, useEffect } from 'react'

type Language = 'en' | 'lt'

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguageState] = useState<Language>('en')
  const [translations, setTranslations] = useState({})

  useEffect(() => {
    // Load translations based on current language
    const loadTranslations = async () => {
      try {
        const translationModule = await import(`../locales/${language}.json`)
        setTranslations(translationModule.default)
      } catch (error) {
        console.error('Failed to load translations:', error)
        // Fallback to English
        const fallbackModule = await import('../locales/en.json')
        setTranslations(fallbackModule.default)
      }
    }

    loadTranslations()
  }, [language])

  const setLanguage = (lang: Language) => {
    setLanguageState(lang)
    // Store in localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('preferred-language', lang)
    }
  }

  useEffect(() => {
    // Load preferred language from localStorage on mount
    if (typeof window !== 'undefined') {
      const savedLanguage = localStorage.getItem('preferred-language') as Language
      if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'lt')) {
        setLanguageState(savedLanguage)
      }
    }
  }, [])

  const t = (key: string): string => {
    const keys = key.split('.')
    let value: any = translations

    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k]
      } else {
        return key // Return key if translation not found
      }
    }

    return typeof value === 'string' ? value : key
  }

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
} 