'use client'

import { useState } from 'react'
import Link from 'next/link'
import { StarIcon, HeartIcon } from '@heroicons/react/20/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { useCartStore } from '@/store/cartStore'
import { useLanguage } from '@/contexts/LanguageContext'

const products = [
  {
    id: '1',
    name: 'Modern Minimalist Villa',
    price: 2999,
    rating: 4.9,
    reviewCount: 127,
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Contemporary 3-bedroom villa with open floor plan and sustainable features.',
    bedrooms: 3,
    bathrooms: 2,
    area: 223, // 2400 sqft ≈ 223 m²
  },
  {
    id: '2',
    name: 'Classic Family Home',
    price: 2499,
    rating: 4.8,
    reviewCount: 89,
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2053&q=80',
    description: 'Traditional 4-bedroom family home with spacious kitchen and backyard.',
    bedrooms: 4,
    bathrooms: 3,
    area: 297, // 3200 sqft ≈ 297 m²
  },
  {
    id: '3',
    name: 'Luxury Penthouse Design',
    price: 4999,
    rating: 5.0,
    reviewCount: 45,
    image: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Premium penthouse with panoramic views and high-end finishes.',
    bedrooms: 3,
    bathrooms: 3,
    area: 260, // 2800 sqft ≈ 260 m²
  },
  {
    id: '4',
    name: 'Cozy Cottage',
    price: 1799,
    rating: 4.7,
    reviewCount: 156,
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Charming 2-bedroom cottage perfect for small families or couples.',
    bedrooms: 2,
    bathrooms: 1,
    area: 130, // 1400 sqft ≈ 130 m²
  },
  {
    id: '5',
    name: 'Scandinavian Style House',
    price: 3299,
    rating: 4.9,
    reviewCount: 78,
    image: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Clean and functional design with natural materials and plenty of light.',
    bedrooms: 3,
    bathrooms: 2,
    area: 186, // 2000 sqft ≈ 186 m²
  },
  {
    id: '6',
    name: 'Contemporary Urban Home',
    price: 3899,
    rating: 4.8,
    reviewCount: 92,
    image: 'https://images.unsplash.com/photo-1600607687926-6e2ee3f8f7b0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80',
    description: 'Modern urban dwelling with smart home features and rooftop garden.',
    bedrooms: 4,
    bathrooms: 3,
    area: 242, // 2600 sqft ≈ 242 m²
  },
]

export default function ProductGrid() {
  const [favorites, setFavorites] = useState<string[]>([])
  const addToCart = useCartStore((state) => state.addItem)
  const { t } = useLanguage()

  const toggleFavorite = (productId: string) => {
    setFavorites(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    )
  }

  return (
    <div className="lg:col-span-3">
      <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
        {products.map((product) => (
          <div key={product.id} className="group relative">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200">
              <img
                src={product.image}
                alt={product.name}
                className="h-full w-full object-cover object-center group-hover:opacity-75"
              />
              <button
                onClick={() => toggleFavorite(product.id)}
                className="absolute top-2 right-2 p-1 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                {favorites.includes(product.id) ? (
                  <HeartIcon className="h-5 w-5 text-red-500" />
                ) : (
                  <HeartOutlineIcon className="h-5 w-5 text-gray-600" />
                )}
              </button>
            </div>
            <div className="mt-4 flex justify-between">
              <div>
                <h3 className="text-sm text-gray-700">
                  <Link href={`/product/${product.id}`}>
                    <span aria-hidden="true" className="absolute inset-0" />
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
            <button
              onClick={() => addToCart({
                id: product.id,
                name: product.name,
                price: product.price,
                image: product.image,
                description: product.description,
              })}
              className="mt-4 w-full btn-primary"
            >
              {t('products.addToCart')}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
} 