'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'

const filters = [
  {
    id: 'category',
    name: 'Category',
    options: [
      { value: 'modern', label: 'Modern' },
      { value: 'traditional', label: 'Traditional' },
      { value: 'scandinavian', label: 'Scandinavian' },
      { value: 'contemporary', label: 'Contemporary' },
      { value: 'luxury', label: 'Luxury' },
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
    id: 'area',
    name: 'Area (m²)',
    options: [
      { value: '0-150', label: 'Under 150 m²' },
      { value: '150-200', label: '150 - 200 m²' },
      { value: '200-250', label: '200 - 250 m²' },
      { value: '250+', label: 'Over 250 m²' },
    ],
  },
]

export default function FilterSidebar() {
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({})
  const { t } = useLanguage()

  const handleFilterChange = (filterId: string, value: string, checked: boolean) => {
    setSelectedFilters(prev => {
      const currentValues = prev[filterId] || []
      if (checked) {
        return {
          ...prev,
          [filterId]: [...currentValues, value]
        }
      } else {
        return {
          ...prev,
          [filterId]: currentValues.filter(v => v !== value)
        }
      }
    })
  }

  return (
    <div className="lg:col-span-1">
      <div className="border-b border-gray-200 py-6">
        <h3 className="flow-root -my-3">
          <span className="font-medium text-gray-900">{t('filters.title')}</span>
        </h3>
      </div>

      <div className="border-b border-gray-200 py-6">
        {filters.map((filter) => (
          <div key={filter.id} className="py-6">
            <h3 className="flow-root -my-3">
              <span className="font-medium text-gray-900">{filter.name}</span>
            </h3>
            <div className="pt-6">
              <div className="space-y-4">
                {filter.options.map((option) => (
                  <div key={option.value} className="flex items-center">
                    <input
                      id={`filter-${filter.id}-${option.value}`}
                      name={`${filter.id}[]`}
                      value={option.value}
                      type="checkbox"
                      checked={selectedFilters[filter.id]?.includes(option.value) || false}
                      onChange={(e) => handleFilterChange(filter.id, option.value, e.target.checked)}
                      className="h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500"
                    />
                    <label
                      htmlFor={`filter-${filter.id}-${option.value}`}
                      className="ml-3 text-sm text-gray-600"
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

      <div className="py-6">
        <button
          type="button"
          onClick={() => setSelectedFilters({})}
          className="text-sm font-medium text-primary-600 hover:text-primary-500"
        >
          {t('filters.clearAll')}
        </button>
      </div>
    </div>
  )
} 