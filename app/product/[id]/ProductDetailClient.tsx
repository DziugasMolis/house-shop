'use client'

import { useState } from 'react'
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
import { useProductTranslation } from '@/utils/productTranslations'
import ProductInquiryForm from '@/components/ProductInquiryForm'
import { Product } from '@/contexts/FilterContext'

interface ProductDetailClientProps {
  product: Product
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState(0)
  const [isInquiryOpen, setIsInquiryOpen] = useState(false)
  const { addToRemembered, removeFromRemembered, isRemembered } = useRememberedProjectsStore()
  const { t } = useLanguage()
  const productTranslation = useProductTranslation(product.id)

  const toggleRemember = () => {
    if (isRemembered(product.id)) {
      removeFromRemembered(product.id)
    } else {
      addToRemembered({
        id: product.id,
        name: productTranslation.name,
        price: product.price,
        image: product.image,
        description: productTranslation.description,
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
    { label: t('products.specLabels.totalArea'), value: `${product.area} m²`, icon: Square3Stack3DIcon },
    { label: t('products.specLabels.bedrooms'), value: product.bedrooms.toString(), icon: HomeIcon },
    { label: t('products.specLabels.bathrooms'), value: product.bathrooms.toString(), icon: UserGroupIcon },
    { label: t('products.specLabels.floors'), value: product.floors.toString(), icon: Square3Stack3DIcon },
    { label: t('products.specLabels.garage'), value: '2 Cars', icon: HomeIcon },
    { label: t('products.specLabels.yearBuilt'), value: '2024', icon: CalendarIcon },
  ]

  // Mock features
  const features = [
    t('products.features.openFloorPlan'),
    t('products.features.energyEfficient'),
    t('products.features.smartHomeReady'),
    t('products.features.hardwoodFloors'),
    t('products.features.stainlessSteelAppliances'),
    t('products.features.walkInClosets'),
    t('products.features.fireplace'),
    t('products.features.deckPatio'),
    t('products.features.centralAirConditioning'),
    t('products.features.securitySystem'),
  ]

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pt-24">
        {/* Breadcrumb */}
        <nav className="flex mb-8" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-4">
            <li>
              <a href="/" className="text-gray-500 hover:text-gray-700">
                {t('breadcrumb.home')}
              </a>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <a href="/shop" className="ml-4 text-gray-500 hover:text-gray-700">
                  {t('breadcrumb.shop')}
                </a>
              </div>
            </li>
            <li>
              <div className="flex items-center">
                <span className="text-gray-400">/</span>
                <span className="ml-4 text-gray-900">{productTranslation.name}</span>
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
                alt={productTranslation.name}
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
                    alt={`${productTranslation.name} view ${index + 1}`}
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
                {productTranslation.name}
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
                {productTranslation.description}
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

              {/* Contact Information */}
              <div className="border-t border-gray-200 pt-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">{t('contact.getInTouch')}</h3>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                    </svg>
                    <a className="text-gray-600 hover:text-gray-900" href="tel:+1 (555) 234-5678">
                      +1 (555) 234-5678
                    </a>
                  </div>
                  <div className="flex items-center">
                    <svg className="h-5 w-5 text-gray-400 mr-3" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                    <a className="text-gray-600 hover:text-gray-900" href="mailto:email@gmail.com">
                      email@gmail.com
                    </a>
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
              <h2 className="text-2xl font-bold text-gray-900 mb-6">{t('products.featuresLabel')}</h2>
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