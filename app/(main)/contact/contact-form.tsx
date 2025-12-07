'use client'

import type React from 'react'
import { useState } from 'react'
import type { ContactFormData, ContactFormResponse } from './schema'
import { contactFormSchema, contactMethodOptions, inquiryTypes } from './schema'

export default function ContactForm(): React.JSX.Element {
  const [formData, setFormData] = useState<Partial<ContactFormData>>({
    preferredContactMethod: 'Email',
  })
  const [errors, setErrors] = useState<Record<string, string[]>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev }
        delete newErrors[name]
        return newErrors
      })
    }
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setErrors({})
    setSubmitStatus({ type: null, message: '' })
    setIsSubmitting(true)

    try {
      // Validate form data
      const validatedData = contactFormSchema.parse(formData)

      // Submit to API
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(validatedData),
      })

      // Handle 404 - API route not available (static export)
      if (response.status === 404) {
        // TODO: Extract contact email to configuration when backend is deployed
        setSubmitStatus({
          type: 'error',
          message:
            'Contact form backend is not yet configured. Please email directly at contact@bidwell.consulting or see deployment documentation.',
        })
        return
      }

      const result: ContactFormResponse = await response.json()

      if (response.ok && result.success) {
        setSubmitStatus({
          type: 'success',
          message: result.message || 'Thank you! Your message has been sent successfully.',
        })
        // Reset form
        setFormData({ preferredContactMethod: 'Email' })
      } else {
        if (result.errors) {
          setErrors(result.errors)
        }
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.',
        })
      }
    } catch (error) {
      // Client-side validation error from Zod
      setSubmitStatus({
        type: 'error',
        message: 'Please check the form for errors.',
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const getFieldError = (fieldName: string): string | undefined => {
    return errors[fieldName]?.[0]
  }

  const messageLength = (formData.message || '').length
  const maxMessageLength = 2000

  return (
    <form onSubmit={handleSubmit} className='max-w-2xl' noValidate aria-label='Contact form'>
      {/* Status Messages */}
      {submitStatus.type && (
        <div
          role='alert'
          aria-live='polite'
          className={`mb-6 rounded-lg border p-4 ${
            submitStatus.type === 'success'
              ? 'border-green-500 bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-300'
              : 'border-red-500 bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-300'
          }`}
        >
          {submitStatus.message}
        </div>
      )}

      {/* Name Field */}
      <div className='mb-4'>
        <label htmlFor='name' className='mb-2 block text-sm font-medium'>
          Name <span className='text-red-500'>*</span>
        </label>
        <input
          type='text'
          id='name'
          name='name'
          value={formData.name || ''}
          onChange={handleChange}
          required
          aria-required='true'
          aria-invalid={!!getFieldError('name')}
          aria-describedby={getFieldError('name') ? 'name-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('name')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        />
        {getFieldError('name') && (
          <p id='name-error' className='mt-1 text-sm text-red-600 dark:text-red-400'>
            {getFieldError('name')}
          </p>
        )}
      </div>

      {/* Email Field */}
      <div className='mb-4'>
        <label htmlFor='email' className='mb-2 block text-sm font-medium'>
          Email <span className='text-red-500'>*</span>
        </label>
        <input
          type='email'
          id='email'
          name='email'
          value={formData.email || ''}
          onChange={handleChange}
          required
          aria-required='true'
          aria-invalid={!!getFieldError('email')}
          aria-describedby={getFieldError('email') ? 'email-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('email')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        />
        {getFieldError('email') && (
          <p id='email-error' className='mt-1 text-sm text-red-600 dark:text-red-400'>
            {getFieldError('email')}
          </p>
        )}
      </div>

      {/* Phone Field */}
      <div className='mb-4'>
        <label htmlFor='phone' className='mb-2 block text-sm font-medium'>
          Phone <span className='text-gray-500 text-xs'>(optional)</span>
        </label>
        <input
          type='tel'
          id='phone'
          name='phone'
          value={formData.phone || ''}
          onChange={handleChange}
          aria-invalid={!!getFieldError('phone')}
          aria-describedby={getFieldError('phone') ? 'phone-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('phone')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        />
        {getFieldError('phone') && (
          <p id='phone-error' className='mt-1 text-sm text-red-600 dark:text-red-400'>
            {getFieldError('phone')}
          </p>
        )}
      </div>

      {/* Company Field */}
      <div className='mb-4'>
        <label htmlFor='company' className='mb-2 block text-sm font-medium'>
          Company/Organization <span className='text-gray-500 text-xs'>(optional)</span>
        </label>
        <input
          type='text'
          id='company'
          name='company'
          value={formData.company || ''}
          onChange={handleChange}
          aria-invalid={!!getFieldError('company')}
          aria-describedby={getFieldError('company') ? 'company-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('company')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        />
        {getFieldError('company') && (
          <p id='company-error' className='mt-1 text-sm text-red-600 dark:text-red-400'>
            {getFieldError('company')}
          </p>
        )}
      </div>

      {/* Inquiry Type Field */}
      <div className='mb-4'>
        <label htmlFor='inquiryType' className='mb-2 block text-sm font-medium'>
          What can I help you with? <span className='text-red-500'>*</span>
        </label>
        <select
          id='inquiryType'
          name='inquiryType'
          value={formData.inquiryType || ''}
          onChange={handleChange}
          required
          aria-required='true'
          aria-invalid={!!getFieldError('inquiryType')}
          aria-describedby={getFieldError('inquiryType') ? 'inquiryType-error' : undefined}
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('inquiryType')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        >
          <option value=''>Select an inquiry type</option>
          {inquiryTypes.map(type => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        {getFieldError('inquiryType') && (
          <p id='inquiryType-error' className='mt-1 text-sm text-red-600 dark:text-red-400'>
            {getFieldError('inquiryType')}
          </p>
        )}
      </div>

      {/* Message Field */}
      <div className='mb-4'>
        <label htmlFor='message' className='mb-2 block text-sm font-medium'>
          Message <span className='text-red-500'>*</span>
        </label>
        <textarea
          id='message'
          name='message'
          rows={6}
          value={formData.message || ''}
          onChange={handleChange}
          required
          aria-required='true'
          aria-invalid={!!getFieldError('message')}
          aria-describedby={
            getFieldError('message') ? 'message-error message-counter' : 'message-counter'
          }
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('message')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        />
        <div className='mt-1 flex items-center justify-between'>
          {getFieldError('message') && (
            <p id='message-error' className='text-sm text-red-600 dark:text-red-400'>
              {getFieldError('message')}
            </p>
          )}
          <p
            id='message-counter'
            className={`ml-auto text-xs ${
              messageLength > maxMessageLength
                ? 'text-red-600 dark:text-red-400'
                : 'text-gray-500 dark:text-gray-400'
            }`}
          >
            {messageLength}/{maxMessageLength}
          </p>
        </div>
      </div>

      {/* Preferred Contact Method */}
      <div className='mb-4'>
        <fieldset>
          <legend className='mb-2 block text-sm font-medium'>Preferred Contact Method</legend>
          <div className='flex gap-4'>
            {contactMethodOptions.map(method => (
              <label key={method} className='flex items-center'>
                <input
                  type='radio'
                  name='preferredContactMethod'
                  value={method}
                  checked={formData.preferredContactMethod === method}
                  onChange={handleChange}
                  className='mr-2'
                />
                <span className='text-sm'>{method}</span>
              </label>
            ))}
          </div>
        </fieldset>
      </div>

      {/* Best Time to Contact */}
      <div className='mb-6'>
        <label htmlFor='bestTimeToContact' className='mb-2 block text-sm font-medium'>
          Best Time to Contact <span className='text-gray-500 text-xs'>(optional)</span>
        </label>
        <input
          type='text'
          id='bestTimeToContact'
          name='bestTimeToContact'
          value={formData.bestTimeToContact || ''}
          onChange={handleChange}
          placeholder='e.g., Weekday afternoons, Mornings EST'
          aria-invalid={!!getFieldError('bestTimeToContact')}
          aria-describedby={
            getFieldError('bestTimeToContact') ? 'bestTimeToContact-error' : undefined
          }
          className={`w-full rounded-lg border px-4 py-2 focus:outline-none focus:ring-2 ${
            getFieldError('bestTimeToContact')
              ? 'border-red-500 focus:ring-red-500'
              : 'border-gray-300 focus:ring-blue-500 dark:border-gray-600'
          } bg-white dark:bg-gray-800`}
        />
        {getFieldError('bestTimeToContact') && (
          <p id='bestTimeToContact-error' className='mt-1 text-sm text-red-600 dark:text-red-400'>
            {getFieldError('bestTimeToContact')}
          </p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type='submit'
        disabled={isSubmitting}
        className='w-full rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-500 dark:hover:bg-blue-600'
      >
        {isSubmitting ? 'Sending...' : 'Send Message'}
      </button>

      <p className='mt-4 text-sm text-gray-600 dark:text-gray-400'>
        Fields marked with <span className='text-red-500'>*</span> are required.
      </p>
    </form>
  )
}
