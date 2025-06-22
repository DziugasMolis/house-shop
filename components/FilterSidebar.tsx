'use client'

import { useState, useEffect } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { useFilter } from '@/contexts/FilterContext'

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'brick', label: 'Brick' },
      { value: 'frame', label: 'Frame' },
    ],
  },
  {
    id: 'bedrooms',
    name: 'Bedrooms',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4+' },
    ],
  },
  {
    id: 'bathrooms',
    name: 'Bathrooms',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3' },
      { value: '4', label: '4+' },
    ],
  },
  {
    id: 'floors',
    name: 'Floors',
    options: [
      { value: '1', label: '1' },
      { value: '2', label: '2' },
      { value: '3', label: '3+' },
    ],
  },
  {
    id: 'area',
    name: 'Area (m²)',
    options: [
      { value: '0-100', label: 'Under 100 m²' },
      { value: '100-150', label: '100 - 150 m²' },
      { value: '150-200', label: '150 - 200 m²' },
      { value: '200+', label: 'Over 200 m²' },
    ],
  },
]

export default function FilterSidebar() {
  const [openFilters, setOpenFilters] = useState<Record<string, boolean>>({})
  const [isMobile, setIsMobile] = useState(false)
  const [mounted, setMounted] = useState(false)
  const { t } = useLanguage()
  const { selectedFilters, updateFilter, clearAllFilters } = useFilter()

  // Initialize filter states based on screen size
  useEffect(() => {
    setMounted(true)
    
    const checkScreenSize = () => {
      const mobile = window.innerWidth < 1024 // lg breakpoint
      setIsMobile(mobile)
      
      // Set initial filter states based on screen size
      const initialStates = filters.reduce((acc, filter) => {
        acc[filter.id] = !mobile // true for desktop, false for mobile
        return acc
      }, {} as Record<string, boolean>)
      
      setOpenFilters(initialStates)
    }

    // Check on mount
    checkScreenSize()

    // Add resize listener
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  // Don't render until mounted to prevent hydration mismatch
  if (!mounted) {
    return (
      <div className="lg:col-span-1">
        <div className="border-b border-gray-200 py-6">
          <h3 className="flow-root -my-3">
            <span className="font-medium text-gray-900">{t('filters.title')}</span>
          </h3>
        </div>
        <div className="border-b border-gray-200">
          {filters.map((filter) => (
            <div key={filter.id} className="py-6 border-b border-gray-100 last:border-b-0">
              <div className="flex items-center justify-between w-full text-left p-2 -m-2">
                <h3 className="font-medium text-gray-900">{filter.id === 'category' ? t('filters.category') : t(`filters.${filter.id}`)}</h3>
                <div className="w-6 h-6"></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    updateFilter(filterId as keyof typeof selectedFilters, value, checked)
  }

  const toggleFilter = (filterId: string) => {
    setOpenFilters(prev => ({
      ...prev,
      [filterId]: !prev[filterId]
    }))
  }

  // Get translated filter options
  const getTranslatedFilters = () => {
    return filters.map(filter => {
      if (filter.id === 'category') {
        return {
          ...filter,
          name: t('filters.category'),
          options: filter.options.map(option => ({
            ...option,
            label: t(`filters.${option.value}`)
          }))
        }
      }
      if (filter.id === 'area') {
        return {
          ...filter,
          name: t('filters.area'),
          options: filter.options.map(option => ({
            ...option,
            label: t(`filters.areaOptions.${option.value}`)
          }))
        }
      }
      return {
        ...filter,
        name: t(`filters.${filter.id}`)
      }
    })
  }

  const translatedFilters = getTranslatedFilters()

  return (
    <div className="lg:col-span-1">
      <div className="border-b border-gray-200 py-6">
        <div className="flex items-center justify-between">
          <h3 className="flow-root -my-3">
            <span className="font-medium text-gray-900">{t('filters.title')}</span>
          </h3>
          <button
            type="button"
            onClick={clearAllFilters}
            className="text-sm font-medium text-primary-600 hover:text-primary-500 transition-colors"
          >
            {t('filters.clearAll')}
          </button>
        </div>
      </div>

      <div className="border-b border-gray-200">
        {translatedFilters.map((filter) => (
          <div key={filter.id} className="py-6 border-b border-gray-100 last:border-b-0">
            <button
              onClick={() => toggleFilter(filter.id)}
              className="flex items-center justify-between w-full text-left focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 rounded-md p-2 -m-2"
            >
              <h3 className="font-medium text-gray-900">{filter.name}</h3>
              <div className="flex items-center">
                {/* Selected count badge */}
                {selectedFilters[filter.id as keyof typeof selectedFilters]?.length > 0 && (
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-primary-100 text-primary-800 mr-2">
                    {selectedFilters[filter.id as keyof typeof selectedFilters].length}
                  </span>
                )}
                {/* Hamburger icon */}
                <div className="relative w-6 h-6">
                  <span 
                    className={`absolute inset-0 transform transition-transform duration-200 ease-in-out ${
                      openFilters[filter.id] ? 'rotate-45 translate-y-0' : '-translate-y-1'
                    }`}
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </span>
                  <span 
                    className={`absolute inset-0 transform transition-transform duration-200 ease-in-out ${
                      openFilters[filter.id] ? 'rotate-45 translate-y-0' : 'translate-y-1'
                    }`}
                  >
                    <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                    </svg>
                  </span>
                </div>
              </div>
            </button>
            
            {/* Collapsible content */}
            <div 
              className={`overflow-hidden transition-all duration-300 ease-in-out ${
                openFilters[filter.id] ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
              }`}
            >
              <div className="pt-4 space-y-3">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${filter.id}-${option.value}`}
                      name={`${filter.id}[]`}
                      value={option.value}
                      type="checkbox"
                      checked={selectedFilters[filter.id as keyof typeof selectedFilters]?.includes(option.value) || false}
                      onChange={(e) => handleFilterChange(filter.id, option.value, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`filter-${filter.id}-${option.value}`}
                      className="ml-3 text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                    >
                      {option.label}
                    </label>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
} 