'use client'

import { useState } from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { useLanguage } from '@/contexts/LanguageContext'

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
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    message: ''
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [validationError, setValidationError] = useState('')

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
    // Clear validation error when user starts typing
    if (validationError) {
      setValidationError('')
    }
  }

  const validateForm = () => {
    if (!formData.name.trim()) {
      setValidationError(t('inquiry.nameRequired'))
      return false
    }
    if (!formData.address.trim()) {
      setValidationError(t('inquiry.addressRequired'))
      return false
    }
    if (!formData.email.trim() && !formData.phone.trim()) {
      setValidationError(t('inquiry.contactRequired'))
      return false
    }
    return true
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setSubmitStatus('idle')
    setValidationError('')

    try {
      // Using Formspree - a free service for sending emails from forms
      // You need to create a form at https://formspree.io/ and get your form endpoint
      const formEndpoint = 'https://formspree.io/f/xnnvbzee' // Replace with your actual Formspree form endpoint
      
      const formDataToSend = new FormData()
      formDataToSend.append('email', 'svilinuks@gmail.com') // This will be the recipient
      formDataToSend.append('subject', `Product Inquiry: ${product.name}`)
      formDataToSend.append('message', `
Product Inquiry Form Submission

Product Details:
- Name: ${product.name}
- Price: $${product.price}
- ID: ${product.id}
- Description: ${product.description}

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email || 'Not provided'}
- Phone: ${formData.phone || 'Not provided'}
- Address: ${formData.address}

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
          setFormData({ name: '', email: '', phone: '', address: '', message: '' })
          setSubmitStatus('idle')
          setValidationError('')
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
                <h4 className="font-medium text-gray-900">{product.name}</h4>
                <p className="text-sm text-gray-600">${product.price}</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    {t('inquiry.name')} *
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    {t('inquiry.email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                    {t('inquiry.phone')}
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    id="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
                  {t('inquiry.contactNote')}
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                    {t('inquiry.address')} *
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                    {t('inquiry.message')}
                  </label>
                  <textarea
                    name="message"
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder={t('inquiry.messagePlaceholder')}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary-500 focus:ring-primary-500 sm:text-sm"
                  />
                </div>

                {validationError && (
                  <div className="rounded-md bg-red-50 p-4">
                    <div className="text-sm text-red-700">
                      {validationError}
                    </div>
                  </div>
                )}

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