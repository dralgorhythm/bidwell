import { z } from 'zod'

export const inquiryTypes = [
  'Career Coaching Consultation',
  'Resume Review Services',
  'Interview Preparation',
  'Leadership Development',
  'General Website Feedback',
  'Technical Support',
  'Business Partnership',
  'Media/Speaking Inquiries',
  'Other',
] as const

export const contactMethodOptions = ['Email', 'Phone', 'Either'] as const

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().email('Please enter a valid email address'),
  phone: z.string().optional(),
  inquiryType: z.enum(inquiryTypes),
  message: z
    .string()
    .min(10, 'Message must be at least 10 characters')
    .max(2000, 'Message must be less than 2000 characters'),
  company: z.string().max(100, 'Company name is too long').optional(),
  preferredContactMethod: z.enum(contactMethodOptions).default('Email'),
  bestTimeToContact: z.string().max(100, 'Time preference is too long').optional(),
  otherDetails: z.string().max(500, 'Additional details are too long').optional(),
})

export type ContactFormData = z.infer<typeof contactFormSchema>

export interface ContactFormResponse {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}
