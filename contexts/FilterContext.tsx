'use client'

import { createContext, useContext, useState, ReactNode } from 'react'

export interface Product {
  id: string
  name: string
  price: number
  rating: number
  reviewCount: number
  image: string
  description: string
  bedrooms: number
  bathrooms: number
  area: number
  floors: number
  category?: string
}

export interface FilterState {
  category: string[]
  bedrooms: string[]
  bathrooms: string[]
  area: string[]
  floors: string[]
}

interface FilterContextType {
  selectedFilters: FilterState
  setSelectedFilters: (filters: FilterState) => void
  updateFilter: (filterType: keyof FilterState, value: string, checked: boolean) => void
  clearAllFilters: () => void
  filteredProducts: Product[]
  allProducts: Product[]
}

const FilterContext = createContext<FilterContextType | undefined>(undefined)

const allProducts: Product[] = [
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
    area: 223,
    floors: 2,
    category: 'modern',
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
    area: 297,
    floors: 2,
    category: 'traditional',
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
    area: 260,
    floors: 1,
    category: 'luxury',
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
    area: 130,
    floors: 1,
    category: 'traditional',
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
    area: 186,
    floors: 2,
    category: 'scandinavian',
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
    area: 242,
    floors: 3,
    category: 'contemporary',
  },
]

export function FilterProvider({ children }: { children: ReactNode }) {
  const [selectedFilters, setSelectedFilters] = useState<FilterState>({
    category: [],
    bedrooms: [],
    bathrooms: [],
    area: [],
    floors: [],
  })

  const updateFilter = (filterType: keyof FilterState, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterType] || []
      if (checked) {
        return {
          ...prev,
          [filterType]: [...currentValues, value]
        }
      } else {
        return {
          ...prev,
          [filterType]: currentValues.filter(v => v !== value)
        }
      }
    })
  }

  const clearAllFilters = () => {
    setSelectedFilters({
      category: [],
      bedrooms: [],
      bathrooms: [],
      area: [],
      floors: [],
    })
  }

  const filteredProducts = allProducts.filter(product => {
    // Category filter
    if (selectedFilters.category.length > 0 && product.category) {
      if (!selectedFilters.category.includes(product.category)) {
        return false
      }
    }

    // Bedrooms filter
    if (selectedFilters.bedrooms.length > 0) {
      const bedroomMatch = selectedFilters.bedrooms.some(filter => {
        if (filter === '4+') {
          return product.bedrooms >= 4
        }
        return product.bedrooms === parseInt(filter)
      })
      if (!bedroomMatch) {
        return false
      }
    }

    // Bathrooms filter
    if (selectedFilters.bathrooms.length > 0) {
      const bathroomMatch = selectedFilters.bathrooms.some(filter => {
        if (filter === '4+') {
          return product.bathrooms >= 4
        }
        return product.bathrooms === parseInt(filter)
      })
      if (!bathroomMatch) {
        return false
      }
    }

    // Area filter
    if (selectedFilters.area.length > 0) {
      const areaMatch = selectedFilters.area.some(filter => {
        switch (filter) {
          case '0-150':
            return product.area < 150
          case '150-200':
            return product.area >= 150 && product.area < 200
          case '200-250':
            return product.area >= 200 && product.area < 250
          case '250+':
            return product.area >= 250
          default:
            return false
        }
      })
      if (!areaMatch) {
        return false
      }
    }

    // Floors filter
    if (selectedFilters.floors.length > 0) {
      const floorMatch = selectedFilters.floors.some(filter => {
        if (filter === '3+') {
          return product.floors >= 3
        }
        return product.floors === parseInt(filter)
      })
      if (!floorMatch) {
        return false
      }
    }

    return true
  })

  return (
    <FilterContext.Provider value={{
      selectedFilters,
      setSelectedFilters,
      updateFilter,
      clearAllFilters,
      filteredProducts,
      allProducts,
    }}>
      {children}
    </FilterContext.Provider>
  )
}

export function useFilter() {
  const context = useContext(FilterContext)
  if (context === undefined) {
    throw new Error('useFilter must be used within a FilterProvider')
  }
  return context
} 