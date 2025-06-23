export interface Product {
  id: string
  name: string
  price: number
  image: string
  description: string
  category: string
  bedrooms: number
  bathrooms: number
  area: number
  floors: number
  rating: number
  reviewCount: number
}

// Helper function to get correct image path for production
const getImagePath = (path: string) => {
  const basePath = process.env.NODE_ENV === 'production' ? '/house-shop' : ''
  return `${basePath}${path}`
}

export const allProducts: Product[] = [
  {
    id: '1',
    name: 'Modern Minimalist Villa',
    price: 2500,
    image: getImagePath('/images/products/product-1.jpg'),
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
    image: getImagePath('/images/products/product-2.jpg'),
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
    image: getImagePath('/images/products/product-3.jpg'),
    description: 'Premium penthouse with panoramic views and high-end finishes.',
    category: 'Luxury',
    bedrooms: 3,
    bathrooms: 2,
    area: 160,
    floors: 1,
    rating: 4.9,
    reviewCount: 67,
  },
  {
    id: '4',
    name: 'Cozy Cottage',
    price: 1800,
    image: getImagePath('/images/products/product-4.jpg'),
    description: 'Charming 2-bedroom cottage perfect for small families or couples.',
    category: 'Cottage',
    bedrooms: 2,
    bathrooms: 1,
    area: 120,
    floors: 1,
    rating: 4.7,
    reviewCount: 156,
  },
  {
    id: '5',
    name: 'Scandinavian Style House',
    price: 2800,
    image: getImagePath('/images/products/product-5.jpg'),
    description: 'Clean and functional design with natural materials and plenty of light.',
    category: 'Modern',
    bedrooms: 3,
    bathrooms: 2,
    area: 190,
    floors: 2,
    rating: 4.5,
    reviewCount: 92,
  },
  {
    id: '6',
    name: 'Contemporary Urban Home',
    price: 3500,
    image: getImagePath('/images/products/product-6.jpg'),
    description: 'Modern urban dwelling with smart home features and rooftop garden.',
    category: 'Modern',
    bedrooms: 4,
    bathrooms: 3,
    area: 200,
    floors: 3,
    rating: 4.8,
    reviewCount: 78,
  },
] 