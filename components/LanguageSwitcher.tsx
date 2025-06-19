'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸' },
  { code: 'lt', name: 'Lietuvių', flag: '🇱🇹' },
]

export default function LanguageSwitcher() {
  const { language, setLanguage } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)

  const currentLanguage = languages.find(lang => lang.code === language)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 px-3 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md"
      >
        <span className="text-lg">{currentLanguage?.flag}</span>
        <span className="hidden sm:block">{currentLanguage?.name}</span>
        <ChevronDownIcon className="h-4 w-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1" role="menu">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code as 'en' | 'lt')
                  setIsOpen(false)
                }}
                className={`${
                  language === lang.code
                    ? 'bg-primary-100 text-primary-900'
                    : 'text-gray-700 hover:bg-gray-100'
                } flex items-center w-full px-4 py-2 text-sm`}
                role="menuitem"
              >
                <span className="text-lg mr-3">{lang.flag}</span>
                {lang.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
} 