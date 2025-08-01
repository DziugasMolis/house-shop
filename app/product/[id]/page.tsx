import { notFound } from 'next/navigation'
import ProductDetailClient from './ProductDetailClient'
import { allProducts } from '@/data/products'

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
  const product = allProducts.find(p => p.id === productId)

  if (!product) {
    notFound()
  }

  return <ProductDetailClient product={product} />
} 