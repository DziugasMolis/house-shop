'use client'

import ProductGrid from '@/components/ProductGrid'
import FilterSidebar from '@/components/FilterSidebar'
import { useLanguage } from '@/contexts/LanguageContext'

export default function ShopPage() {
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">{t('shop.title')}</h1>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">
            Products
          </h2>

          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            <FilterSidebar />
            <ProductGrid />
          </div>
        </section>
      </div>
    </div>
  )
} 