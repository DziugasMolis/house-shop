import { useLanguage } from '@/contexts/LanguageContext'

export interface ProductTranslation {
  name: string
  description: string
}

export function useProductTranslation(productId: string): ProductTranslation {
  const { t } = useLanguage()
  
  try {
    const name = t(`productTranslations.${productId}.name`) as string
    const description = t(`productTranslations.${productId}.description`) as string
    
    return {
      name: name || `Product ${productId}`,
      description: description || 'Product description not available'
    }
  } catch (error) {
    // Fallback to default values if translation is not found
    return {
      name: `Product ${productId}`,
      description: 'Product description not available'
    }
  }
}

export function getTranslatedProductName(productId: string, translations: any): string {
  try {
    return translations.productTranslations?.[productId]?.name || `Product ${productId}`
  } catch (error) {
    return `Product ${productId}`
  }
}

export function getTranslatedProductDescription(productId: string, translations: any): string {
  try {
    return translations.productTranslations?.[productId]?.description || 'Product description not available'
  } catch (error) {
    return 'Product description not available'
  }
} 