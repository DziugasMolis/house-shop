import { notFound } from 'next/navigation'
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
import { useLanguage } from '@/contexts/LanguageContext'
import { useFilter } from '@/contexts/FilterContext'
import { useProductTranslation } from '@/utils/productTranslations'
import ProductInquiryForm from '@/components/ProductInquiryForm'
import ProductDetailClient from './ProductDetailClient'

// This function is required for static export
export async function generateStaticParams() {
  // Return all possible product IDs
  return [
    { id: '1' },
    { id: '2' },
    { id: '3' },
    { id: '4' },
    { id: '5' },
    { id: '6' },
  ]
}

export default function ProductDetailPage({ params }: { params: { id: string } }) {
  const productId = params.id
  const { allProducts } = useFilter()
  const product = allProducts.find(p => p.id === productId)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
} 