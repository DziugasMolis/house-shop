'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { useProductTranslation } from '@/utils/productTranslations'

const featuredProducts = [
  {
    id: '1',
    name: 'Modern Minimalist Villa',
    price: 2500,
    image: '/images/products/product-1.jpg',
    description: 'Contemporary 3-bedroom villa with open floor plan and sustainable features.',
    category: 'Modern',
    bedrooms: 3,
    bathrooms: 2,
    area: 180,
    floors: 2,
    rating: 4.8,
    reviewCount: 124,
  },
  {
    id: '2',
    name: 'Classic Family Home',
    price: 3200,
    image: '/images/products/product-2.jpg',
    description: 'Traditional 4-bedroom family home with spacious kitchen and backyard.',
    category: 'Traditional',
    bedrooms: 4,
    bathrooms: 3,
    area: 220,
    floors: 2,
    rating: 4.6,
    reviewCount: 89,
  },
  {
    id: '3',
    name: 'Luxury Penthouse Design',
    price: 4500,
    image: '/images/products/product-3.jpg',
    description: 'Premium penthouse with panoramic views and high-end finishes.',
    category: 'Luxury',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    floors: 1,
    rating: 4.9,
    reviewCount: 67,
  },
]

export default function FeaturedProducts() {
  const { t } = useLanguage()

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('featured.title')}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('featured.description')}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {featuredProducts.map((product) => {
            const productTranslation = useProductTranslation(product.id)
            
            return (
              <Link key={product.id} href={`/product/${product.id}`} className="flex flex-col items-start group focus:outline-none" tabIndex={0} aria-label={productTranslation.name}>
                <article className="w-full">
                  <div className="relative w-full">
                    <img
                      src={product.image}
                      alt={productTranslation.name}
                      className="aspect-[16/9] w-full rounded-2xl bg-gray-100 object-cover sm:aspect-[2/1] lg:aspect-[3/2] group-hover:opacity-80 transition-opacity"
                    />
                    <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-gray-900/10" />
                  </div>
                  <div className="mt-8 flex items-center gap-x-4 text-xs">
                    <time className="text-gray-500">
                      {product.category}
                    </time>
                    <span className="relative z-10 rounded-full bg-gray-50 px-3 py-1.5 font-medium text-gray-600 group-hover:bg-gray-100">
                      ${product.price.toLocaleString()}
                    </span>
                  </div>
                  <div className="mt-3 text-lg font-semibold leading-6 text-gray-900 group-hover:text-gray-600">
                    {productTranslation.name}
                  </div>
                  <div className="mt-4 flex items-center gap-4 text-sm text-gray-600">
                    <span>{product.bedrooms} {t('featured.bedrooms')}</span>
                    <span>{product.bathrooms} {t('featured.bathrooms')}</span>
                    <span>{product.area}m²</span>
                  </div>
                </article>
              </Link>
            )
          })}
        </div>
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="rounded-md bg-primary-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600"
          >
            {t('featured.viewAll')}
          </Link>
        </div>
      </div>
    </div>
  )
} 