'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getStaticImagePath } from '@/utils/imagePath'

const featuredProducts = [
  {
    id: '1',
    name: 'Modern Minimalist Villa',
    price: 2500,
    image: getStaticImagePath('/images/products/product-1.jpg'),
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
    image: getStaticImagePath('/images/products/product-2.jpg'),
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
    image: getStaticImagePath('/images/products/product-3.jpg'),
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
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">{t('featured.title')}</h2>
        <p className="mt-4 text-gray-500">{t('featured.description')}</p>

        <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {featuredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-full w-full object-cover object-center group-hover:opacity-75"
                />
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.id}`}>
                      <span aria-hidden="true" className="absolute inset-0" />
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.category}</p>
                </div>
                <p className="text-sm font-medium text-gray-900">€{product.price}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-10 text-center">
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