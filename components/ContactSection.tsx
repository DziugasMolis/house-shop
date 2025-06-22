'use client'

import { useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import MaterialInput from './MaterialInput'

export default function ContactSection() {
  const { t } = useLanguage()
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
      formDataToSend.append('subject', 'Contact Form Submission - House Shop')
      formDataToSend.append('message', `
Contact Form Submission

Customer Information:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Message:
${formData.message}

---
This message was sent from the House Shop contact form.
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
        setFormData({ name: '', email: '', phone: '', message: '' })
        setFieldErrors({ name: '', email: '', phone: '', message: '' })
        setTimeout(() => {
          setSubmitStatus('idle')
        }, 3000)
      } else {
        throw new Error('Failed to send message')
      }
    } catch (error) {
      console.error('Error sending contact form:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  const validateField = (name: string, value: string): string => {
    switch (name) {
      case 'name':
        return value.trim() ? '' : t('contact.errors.nameRequired')
      case 'email':
        if (value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          return t('contact.errors.emailInvalid')
        }
        return ''
      case 'message':
        return value.trim() ? '' : t('contact.errors.messageRequired')
      case 'phone':
        if (value && !/^[\+]?[1-9][\d]{0,15}$/.test(value.replace(/\s/g, ''))) {
          return t('contact.errors.phoneInvalid')
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
      message: validateField('message', formData.message)
    }

    // Check if at least one contact method is provided
    if (!formData.email.trim() && !formData.phone.trim()) {
      errors.email = t('contact.errors.contactRequired')
      errors.phone = t('contact.errors.contactRequired')
    }

    setFieldErrors(errors)
    const isValid = !Object.values(errors).some(error => error !== '')
    return isValid
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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
    // Clear error status when user starts typing
    if (submitStatus === 'error') {
      setSubmitStatus('idle')
    }
  }

  return (
    <div className="bg-white">
      <div className="mx-auto max-w-7xl px-6 py-24 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-2xl lg:mx-0">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">{t('contact.title')}</h2>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            {t('contact.description')}
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{t('contact.getInTouch')}</h3>
            <dl className="mt-6 space-y-6 text-base leading-7 text-gray-600">
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{t('contact.address')}</span>
                  <svg className="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 21h19.5m-18-18v18m10.5-18v18m6-13.5V21M6.75 6.75h.75m-.75 3h.75m-.75 3h.75m3-6h.75m-.75 3h.75m-.75 3h.75M6.75 21v-3.375c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21M3 3h12m-.75 4.5H21m-3.75 3.75h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008zm0 3h.008v.008h-.008v-.008z" />
                  </svg>
                </dt>
                <dd>
                  {t('contact.addressText')}
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{t('contact.phone')}</span>
                  <svg className="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="tel:+1 (555) 234-5678">
                    +1 (555) 234-5678
                  </a>
                </dd>
              </div>
              <div className="flex gap-x-4">
                <dt className="flex-none">
                  <span className="sr-only">{t('contact.email')}</span>
                  <svg className="h-7 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </dt>
                <dd>
                  <a className="hover:text-gray-900" href="mailto:email@gmail.com">
                  email@gmail.com
                  </a>
                </dd>
              </div>
            </dl>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6" noValidate>
            <MaterialInput
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              label={t('contact.form.name')}
              required={true}
              error={fieldErrors.name}
            />

            <MaterialInput
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              label={t('contact.form.email')}
              error={fieldErrors.email}
            />

            <MaterialInput
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              label={t('contact.form.phone')}
              error={fieldErrors.phone}
            />

            <div className="text-xs text-gray-500 bg-blue-50 p-2 rounded">
              {t('inquiry.contactNote')}
            </div>

            <MaterialInput
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              label={t('contact.form.message')}
              required={true}
              multiline={true}
              rows={4}
              error={fieldErrors.message}
            />

            {submitStatus === 'success' && (
              <div className="rounded-md bg-green-50 p-4">
                <div className="text-sm text-green-700">
                  Your message has been sent successfully! We'll get back to you soon.
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="rounded-md bg-red-50 p-4">
                <div className="text-sm text-red-700">
                  There was an error sending your message. Please try again.
                </div>
              </div>
            )}

            <div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="rounded-md bg-primary-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-primary-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Sending...' : t('contact.form.submit')}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 