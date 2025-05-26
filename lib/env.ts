import { z } from 'zod'

// Environment variables schema
const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  NEXT_PUBLIC_VERCEL_ENV: z.enum(['development', 'preview', 'production']).optional(),
  
  // Email service (will be added when implementing contact form)
  EMAIL_SERVICE_API_KEY: z.string().optional(),
  EMAIL_FROM: z.string().email().optional(),
  EMAIL_TO: z.string().email().optional(),
  
  // Security
  NEXTAUTH_SECRET: z.string().min(32).optional(),
  NEXTAUTH_URL: z.string().url().optional(),
})

// Validate environment variables
export function validateEnv() {
  try {
    const env = envSchema.parse(process.env)
    return env
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Invalid environment variables:')
      error.errors.forEach((err) => {
        console.error(`  ${err.path.join('.')}: ${err.message}`)
      })
      process.exit(1)
    }
    throw error
  }
}

// Export validated env (run validation in production/staging)
export const env = process.env.NODE_ENV === 'development' 
  ? process.env 
  : validateEnv()

// Helper to check if we're in a secure environment
export const isSecureEnvironment = () => {
  return process.env.NODE_ENV === 'production' || 
         process.env.VERCEL_ENV === 'production'
}
