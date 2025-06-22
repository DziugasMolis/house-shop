'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'
import { useProductTranslation } from '@/utils/productTranslations'
import MaterialInput from './MaterialInput'

interface ProductInquiryFormProps {
  isOpen: boolean
  onClose: () => void
  product: {
    id: string
    name: string
    price: number
    image: string
    description: string
  }
}

export default function ProductInquiryForm({ isOpen, onClose, product }: ProductInquiryFormProps) {
  const { t } = useLanguage()
  const productTranslation = useProductTranslation(product.id)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [fieldErrors, setFieldErrors] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear field error when user starts typing
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors(prev => ({
        ...prev,
        [name]: ''
      }))
    }
  }

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : t('inquiry.nameRequired')
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return t('inquiry.emailInvalid')
        }
        return ''
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
          return t('inquiry.phoneInvalid')
        }
        return ''
      default:
        return ''
    }
  }

  const validateForm = (): boolean => {
    const errors = {
      name: validateField('name', formData.name),
      email: validateField('email', formData.email),
      phone: validateField('phone', formData.phone),
      message: ''
    }

    // Check if at least one contact method is provided
    if (!formData.email.trim() && !formData.phone.trim()) {
      if (!formData.email.trim()) {
        errors.email = t('inquiry.contactRequired')
      }
      if (!formData.phone.trim()) {
        errors.phone = t('inquiry.contactRequired')
      }
    }

    setFieldErrors(errors)
    return !Object.values(errors).some(error => error !== '')
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')

    try {
      // Using Formspree - a free service for sending emails from forms
      // You need to create a form at https://formspree.io/ and get your form endpoint
      const formEndpoint = 'https://formspree.io/f/xnnvbzee' // Replace with your actual Formspree form endpoint
      
      const formDataToSend = new FormData()
      formDataToSend.append('email', 'svilinuks@gmail.com') // This will be the recipient
      formDataToSend.append('subject', `Product Inquiry: ${productTranslation.name}`)
      formDataToSend.append('message', `
Product Inquiry Form Submission

Product Details:
- Name: ${productTranslation.name}
- Price: $${product.price}
- ID: ${product.id}
- Description: ${productTranslation.description}

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message || 'No additional message provided'}

---
This inquiry was sent from the House Shop website.
      `.trim())

      const response = await fetch(formEndpoint, {
        method: 'POST',
        body: formDataToSend,
        headers: {
          'Accept': 'application/json'
        }
      })

      if (response.ok) {
        setSubmitStatus('success')
        setTimeout(() => {
          onClose()
          setFormData({ name: '', email: '', phone: '', message: '' })
          setFieldErrors({ name: '', email: '', phone: '', message: '' })
          setSubmitStatus('idle')
        }, 2000)
      } else {
        throw new Error('Failed to send email')
      }
    } catch (error) {
      console.error('Error sending inquiry:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" onClick={onClose}></div>

        <div className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6">
          <div className="absolute right-0 top-0 pr-4 pt-4">
            <button
              type="button"
              className="rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
              onClick={onClose}
            >
              <span className="sr-only">Close</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>

          <div className="sm:flex sm:items-start">
            <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left w-full">
              <h3 className="text-lg font-semibold leading-6 text-gray-900 mb-4">
                {t('inquiry.title')}
              </h3>
              
              <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                <h4 className="font-medium text-gray-900">{productTranslation.name}</h4>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                <MaterialInput
                  id="name"
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleInputChange}
                  label={t('inquiry.name')}
                  required={true}
                  error={fieldErrors.name}
                />

                <MaterialInput
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  label={t('inquiry.email')}
                  error={fieldErrors.email}
                />

                <MaterialInput
                  id="phone"
                  name="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={handleInputChange}
                  label={t('inquiry.phone')}
                  error={fieldErrors.phone}
                />

                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  {t('inquiry.contactNote')}
                </div>

                <MaterialInput
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  label={t('inquiry.message')}
                  placeholder={t('inquiry.messagePlaceholder')}
                  multiline={true}
                  rows={4}
                  error={fieldErrors.message}
                />

                {submitStatus === 'success' && (
                  <div className="rounded-md bg-green-50 p-4">
                    <div className="text-sm text-green-700">
                      {t('inquiry.success')}
                    </div>
                  </div>
                )}

                {submitStatus === 'error' && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">
                      {t('inquiry.error')}
                    </div>
                  </div>
                )}

                <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex w-full justify-center rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 sm:ml-3 sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? t('inquiry.sending') : t('inquiry.send')}
                  </button>
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    onClick={onClose}
                  >
                    {t('inquiry.cancel')}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
} 