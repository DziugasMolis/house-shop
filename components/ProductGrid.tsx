'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { StarIcon, HeartIcon } from '@heroicons/react/20/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { useRememberedProjectsStore } from '@/store/rememberedProjectsStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFilter } from '@/contexts/FilterContext'
import { useProductTranslation } from '@/utils/productTranslations'

export default function ProductGrid() {
  const { filteredProducts } = useFilter()
  const { addToRemembered, removeFromRemembered, isRemembered } = useRememberedProjectsStore()
  const { t } = useLanguage()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const toggleRemember = (product: any) => {
    if (isRemembered(product.id)) {
      removeFromRemembered(product.id)
    } else {
      addToRemembered({
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
          {filteredProducts.map((product) => {
            const productTranslation = useProductTranslation(product.id)
            
            return (
              <div key={product.id} className="group relative flex flex-col h-full">
                <div className="w-full h-64 overflow-hidden rounded-lg bg-gray-200">
                  <Link href={`/product/${product.id}`}>
                    <img
                      src={product.image}
                      alt={productTranslation.name}
                      className="w-full h-full object-cover object-center group-hover:opacity-75 transition-opacity"
                    />
                  </Link>
                  {mounted && (
                    <button
                      onClick={() => toggleRemember(product)}
                      className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
                    >
                      {isRemembered(product.id) ? (
                        <HeartIcon className="h-5 w-5 text-red-500" />
                      ) : (
                        <HeartOutlineIcon className="h-5 w-5 text-gray-600" />
                      )}
                    </button>
                  )}
                </div>
                
                <div className="mt-4 flex flex-col flex-grow">
                  <div className="flex justify-between mb-2">
                    <div className="flex-grow min-w-0">
                      <h3 className="text-sm text-gray-700 font-medium truncate">
                        <Link href={`/product/${product.id}`} className="hover:text-gray-900 transition-colors">
                          {productTranslation.name}
                        </Link>
                      </h3>
                    </div>
                    <p className="text-sm font-medium text-gray-900 ml-2 flex-shrink-0">${product.price}</p>
                  </div>
                  
                  <div className="h-10 overflow-hidden mb-2">
                    <p className="text-sm text-gray-500 leading-5">{productTranslation.description}</p>
                  </div>
                  
                  <div className="flex items-center text-sm text-gray-500 mb-2">
                    <span>{product.bedrooms} {t('products.bedrooms')}</span>
                    <span className="mx-1">•</span>
                    <span>{product.bathrooms} {t('products.bathrooms')}</span>
                    <span className="mx-1">•</span>
                    <span>{product.area} {t('products.area')}</span>
                  </div>
                  
                  <div className="flex items-center mb-4">
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
                  
                  <div className="mt-auto flex gap-2">
                    <Link
                      href={`/product/${product.id}`}
                      className="flex-1 text-center py-2 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
                    >
                      {t('products.viewDetails')}
                    </Link>
                    {mounted && (
                      <button
                        onClick={() => toggleRemember(product)}
                        className={`flex-1 text-center py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                          isRemembered(product.id)
                            ? 'border border-red-300 text-red-700 hover:bg-red-50'
                            : 'border border-primary-300 text-primary-700 hover:bg-primary-50'
                        }`}
                      >
                        {isRemembered(product.id) ? t('remembered.remove') : t('remembered.add')}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
} 