'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StarIcon, HeartIcon } from '@heroicons/react/20/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { useLikedProjectsStore } from '@/store/likedProjectsStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFilter } from '@/contexts/FilterContext'

export default function ProductGrid() {
  const { filteredProducts } = useFilter()
  const { addToLiked, removeFromLiked, isLiked } = useLikedProjectsStore()
  const { t } = useLanguage()

  const toggleLike = (product: any) => {
    if (isLiked(product.id)) {
      removeFromLiked(product.id)
    } else {
      addToLiked({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
        description: product.description,
      })
    }
  }

  return (
    <div className="lg:col-span-3">
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <h3 className="text-lg font-medium text-gray-900 mb-2">{t('products.noProductsFound')}</h3>
          <p className="text-gray-500">{t('products.adjustFilters')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative">
              <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
                <Link href={`/product/${product.id}`}>
                  <img
                    src={product.image}
                    alt={product.name}
                    className="h-full w-full object-cover object-center group-hover:opacity-75 transition-opacity"
                  />
                </Link>
                <button
                  onClick={() => toggleLike(product)}
                  className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                >
                  {isLiked(product.id) ? (
                    <HeartIcon className="h-5 w-5 text-red-500" />
                  ) : (
                    <HeartOutlineIcon className="h-5 w-5 text-gray-600" />
                  )}
                </button>
              </div>
              <div className="mt-4 flex justify-between">
                <div>
                  <h3 className="text-sm text-gray-700">
                    <Link href={`/product/${product.id}`} className="hover:text-gray-900 transition-colors">
                      {product.name}
                    </Link>
                  </h3>
                  <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                  <div className="mt-2 flex items-center text-sm text-gray-500">
                    <span>{product.bedrooms} {t('products.bedrooms')}</span>
                    <span className="mx-1">•</span>
                    <span>{product.bathrooms} {t('products.bathrooms')}</span>
                    <span className="mx-1">•</span>
                    <span>{product.area} {t('products.area')}</span>
                  </div>
                </div>
                <p className="text-sm font-medium text-gray-900">${product.price}</p>
              </div>
              <div className="mt-2 flex items-center">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-4 w-4 flex-shrink-0 ${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">({product.reviewCount})</p>
              </div>
              <div className="mt-4 flex gap-2">
                <Link
                  href={`/product/${product.id}`}
                  className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                >
                  {t('products.viewDetails')}
                </Link>
                <button
                  onClick={() => toggleLike(product)}
                  className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    isLiked(product.id)
                      ? 'border border-red-300 text-red-700 hover:bg-red-50'
                      : 'border border-primary-300 text-primary-700 hover:bg-primary-50'
                  }`}
                >
                  {isLiked(product.id) ? t('liked.remove') : t('liked.add')}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
} 