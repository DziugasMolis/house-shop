'use client'

import { useState, forwardRef } from 'react'

interface MaterialInputProps {
  id: string
  name: string
  type?: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  label: string
  required?: boolean
  placeholder?: string
  rows?: number
  multiline?: boolean
  error?: string
  onBlur?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  onFocus?: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void
}

const MaterialInput = forwardRef<HTMLInputElement | HTMLTextAreaElement, MaterialInputProps>(
  ({ id, name, type = 'text', value, onChange, label, required = false, placeholder, rows = 4, multiline = false, error, onBlur, onFocus }, ref) => {
    const [isFocused, setIsFocused] = useState(false)
    const [hasValue, setHasValue] = useState(value.length > 0)
    const [isTouched, setIsTouched] = useState(false)

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setHasValue(e.target.value.length > 0)
      onChange(e)
    }

    const handleFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(true)
      onFocus?.(e)
    }

    const handleBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setIsFocused(false)
      setIsTouched(true)
      onBlur?.(e)
    }

    const showError = error && error.length > 0

    const baseClasses = `
      relative w-full bg-transparent border-b-2 transition-all duration-200 ease-in-out
      ${showError 
        ? 'border-red-500' 
        : isFocused 
          ? 'border-primary-500' 
          : hasValue 
            ? 'border-gray-400' 
            : 'border-gray-300'
      }
      ${showError ? 'focus:border-red-500' : 'focus:border-primary-500'}
    `

    const inputClasses = `
      w-full bg-transparent pt-6 pb-2 px-0 text-gray-900 placeholder-transparent
      focus:outline-none focus:ring-0
      ${showError ? 'text-red-900' : 'text-gray-900'}
    `

    const labelClasses = `
      absolute left-0 transition-all duration-200 ease-in-out pointer-events-none
      ${isFocused || hasValue
        ? 'text-xs -translate-y-4'
        : 'text-sm text-gray-500 translate-y-2'
      }
      ${showError && (isFocused || hasValue) ? 'text-red-500' : isFocused || hasValue ? 'text-primary-500' : ''}
    `

    const errorMessageClasses = `
      mt-1 text-xs transition-all duration-200 ease-in-out
      ${showError 
        ? 'text-red-500 opacity-100 transform translate-y-0' 
        : 'text-red-500 opacity-0 transform -translate-y-1 pointer-events-none'
      }
    `

    return (
      <div className="relative mb-6">
        <div className={baseClasses}>
          {multiline ? (
            <textarea
              ref={ref as React.Ref<HTMLTextAreaElement>}
              id={id}
              name={name}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              rows={rows}
              placeholder={placeholder}
              required={required}
              className={`${inputClasses} resize-none`}
            />
          ) : (
            <input
              ref={ref as React.Ref<HTMLInputElement>}
              id={id}
              name={name}
              type={type}
              value={value}
              onChange={handleChange}
              onFocus={handleFocus}
              onBlur={handleBlur}
              placeholder={placeholder}
              required={required}
              className={inputClasses}
            />
          )}
          <label htmlFor={id} className={labelClasses}>
            {label}
            {required && <span className="text-red-500 ml-1">*</span>}
          </label>
        </div>
        <div className={errorMessageClasses}>
          {showError && (
            <div className="flex items-center">
              <svg className="w-3 h-3 mr-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              {error}
            </div>
          )}
        </div>
      </div>
    )
  }
)

MaterialInput.displayName = 'MaterialInput'

export default MaterialInput 