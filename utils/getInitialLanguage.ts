export function getInitialLanguage(pathname?: string): 'en' | 'lt' {
  // Server-side: detect from pathname
  if (pathname) {
    if (pathname.startsWith('/lt')) return 'lt'
    if (pathname.startsWith('/en')) return 'en'
  }

  // Client-side: check localStorage and browser language
  if (typeof window !== 'undefined') {
    const savedLanguage = localStorage.getItem('preferred-language') as 'en' | 'lt' | null
    if (savedLanguage && (savedLanguage === 'en' || savedLanguage === 'lt')) {
      return savedLanguage
    }
    const browserLang = navigator.language || (navigator.languages && navigator.languages[0]) || 'en'
    if (browserLang.toLowerCase().startsWith('lt')) {
      return 'lt'
    }
  }
  return 'en'
} 