'use client'

import { useState } from 'react'
import { useParams, notFound } from 'next/navigation'
import { StarIcon, HeartIcon } from '@heroicons/react/20/solid'
import { HeartIcon as HeartOutlineIcon } from '@heroicons/react/24/outline'
import { 
  HomeIcon, 
  UserGroupIcon, 
  Square3Stack3DIcon,
  MapPinIcon,
  CalendarIcon,
  CheckCircleIcon,
  EnvelopeIcon
} from '@heroicons/react/24/outline'
import { useRememberedProjectsStore } from '@/store/rememberedProjectsStore'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFilter } from '@/contexts/FilterContext'
import ProductInquiryForm from '@/components/ProductInquiryForm'

export default function ProductDetailPage() {
  const params = useParams()
  const productId = params.id as string
  const [selectedImage, setSelectedImage] = useState(0)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const { addToRemembered, removeFromRemembered, isRemembered } = useRememberedProjectsStore()
  const { t } = useLanguage()
  const { allProducts } = useFilter()

  const product = allProducts.find(p => p.id === productId)

  if (!product) {
    notFound()
  }

  const toggleRemember = () => {
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

  // Mock additional images for the product
  const productImages = [
    product.image,
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2053&q=80',
    'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  ]

  // Mock specifications
  const specifications = [
    { label: 'Total Area', value: `${product.area} m²`, icon: Square3Stack3DIcon },
    { label: 'Bedrooms', value: product.bedrooms.toString(), icon: HomeIcon },
    { label: 'Bathrooms', value: product.bathrooms.toString(), icon: UserGroupIcon },
    { label: 'Floors', value: product.floors.toString(), icon: Square3Stack3DIcon },
    { label: 'Garage', value: '2 Cars', icon: HomeIcon },
    { label: 'Year Built', value: '2024', icon: CalendarIcon },
  ]

  // Mock features
  const features = [
    'Open floor plan',
    'Energy efficient',
    'Smart home ready',
    'Hardwood floors',
    'Stainless steel appliances',
    'Walk-in closets',
    'Fireplace',
    'Deck/Patio',
    'Central air conditioning',
    'Security system',
  ]

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                Home
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <a href="/shop" className="ml-4 text-gray-500 hover:text-gray-700">
                  Shop
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <span className="ml-4 text-gray-900">{product.name}</span>
              </div>
            </li>
          </ol>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-x-8 gap-y-10">
          {/* Product Images */}
          <div className="lg:col-span-1">
            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 mb-4">
              <img
                src={productImages[selectedImage]}
                alt={product.name}
                className="h-full w-full object-cover object-center"
              />
              <button
                onClick={toggleRemember}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/80 hover:bg-white transition-colors"
              >
                {isRemembered(product.id) ? (
                  <HeartIcon className="h-6 w-6 text-red-500" />
                ) : (
                  <HeartOutlineIcon className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>
            
            {/* Thumbnail Images */}
            <div className="grid grid-cols-4 gap-2">
              {productImages.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 ${
                    selectedImage === index ? 'ring-2 ring-primary-500' : ''
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} view ${index + 1}`}
                    className="h-full w-full object-cover object-center"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="lg:col-span-1">
            <div className="lg:pl-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">
                {product.name}
              </h1>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  {[0, 1, 2, 3, 4].map((rating) => (
                    <StarIcon
                      key={rating}
                      className={`h-5 w-5 flex-shrink-0 ${
                        product.rating > rating ? 'text-yellow-400' : 'text-gray-200'
                      }`}
                      aria-hidden="true"
                    />
                  ))}
                </div>
                <p className="ml-2 text-sm text-gray-500">({product.reviewCount} reviews)</p>
              </div>

              <p className="text-2xl font-bold text-gray-900 mb-6">
                ${product.price.toLocaleString()}
              </p>

              <p className="text-gray-700 mb-6 leading-relaxed">
                {product.description}
              </p>

              {/* Key Specifications */}
              <div className="grid grid-cols-2 gap-4 mb-8">
                {specifications.slice(0, 4).map((spec) => (
                  <div key={spec.label} className="flex items-center">
                    <spec.icon className="h-5 w-5 text-gray-400 mr-2" />
                    <div>
                      <p className="text-sm text-gray-500">{spec.label}</p>
                      <p className="font-medium text-gray-900">{spec.value}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="space-y-4 mb-8">
                <button
                  onClick={toggleRemember}
                  className={`w-full py-3 px-6 rounded-lg font-medium transition-colors ${
                    isRemembered(product.id)
                      ? 'bg-red-600 text-white hover:bg-red-700'
                      : 'bg-primary-600 text-white hover:bg-primary-700'
                  }`}
                >
                  {isRemembered(product.id) ? t('remembered.remove') : t('remembered.add')}
                </button>
                
                <button
                  onClick={() => setIsInquiryOpen(true)}
                  className="w-full py-3 px-6 rounded-lg font-medium bg-gray-600 text-white hover:bg-gray-700 transition-colors flex items-center justify-center"
                >
                  <EnvelopeIcon className="h-5 w-5 mr-2" />
                  {t('products.inquiry')}
                </button>
              </div>

              {/* Quick Info */}
              <div className="border-t border-gray-200 pt-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-2" />
                    <span className="text-gray-600">{t('products.inStock')}</span>
                  </div>
                  <div className="flex items-center">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-gray-600">{t('products.freeShipping')}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Information */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Specifications */}
            <div className="lg:col-span-1">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('products.specifications')}</h2>
              <div className="space-y-4">
                {specifications.map((spec) => (
                  <div key={spec.label} className="flex items-center justify-between py-3 border-b border-gray-100">
                    <div className="flex items-center">
                      <spec.icon className="h-5 w-5 text-gray-400 mr-3" />
                      <span className="text-gray-700">{spec.label}</span>
                    </div>
                    <span className="font-medium text-gray-900">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Features */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('products.features')}</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <div key={feature} className="flex items-center">
                    <CheckCircleIcon className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                    <span className="text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-16 border-t border-gray-200 pt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('products.aboutDesign')}</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-700 leading-relaxed mb-4">
              This meticulously designed house project combines modern aesthetics with practical functionality. 
              The open floor plan creates a seamless flow between living spaces, while large windows maximize 
              natural light throughout the home.
            </p>
            <p className="text-gray-700 leading-relaxed mb-4">
              The kitchen features premium appliances and ample storage, perfect for both everyday cooking and 
              entertaining. The master suite includes a spacious walk-in closet and an en-suite bathroom with 
              modern fixtures.
            </p>
            <p className="text-gray-700 leading-relaxed">
              Built with energy efficiency in mind, this design includes high-quality insulation, energy-efficient 
              windows, and smart home technology integration. The exterior combines durable materials with 
              contemporary styling for a timeless appeal.
            </p>
          </div>
        </div>
      </div>
      
      {/* Product Inquiry Form Modal */}
      <ProductInquiryForm
        isOpen={isInquiryOpen}
        onClose={() => setIsInquiryOpen(false)}
        product={product}
      />
    </div>
  )
} 