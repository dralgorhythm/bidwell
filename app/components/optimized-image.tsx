import Image, { type ImageProps } from 'next/image'
import { forwardRef } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'priority' | 'loading'> {
  /**
   * Alt text for accessibility - required for all images
   */
  alt: string

  /**
   * Whether this image is above the fold and should be loaded with high priority
   * Use for hero images, logos, and other critical images
   */
  priority?: boolean

  /**
   * Loading strategy - 'lazy' for below-fold images, 'eager' for critical images
   * Defaults to 'lazy' unless priority is true
   */
  loading?: 'lazy' | 'eager'

  /**
   * Placeholder strategy for better CLS prevention
   */
  placeholder?: 'blur' | 'empty'

  /**
   * Blur data URL for placeholder (use tools like plaiceholder or blurha.sh)
   */
  blurDataURL?: string

  /**
   * Responsive sizes for different breakpoints
   * Example: "(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
   */
  sizes?: string

  /**
   * Aspect ratio to prevent layout shift
   * Example: "16/9", "4/3", "1/1"
   */
  aspectRatio?: string
}

const OptimizedImage = forwardRef<HTMLImageElement, OptimizedImageProps>(
  (
    {
      priority = false,
      loading,
      placeholder = 'empty',
      blurDataURL,
      sizes,
      aspectRatio,
      className,
      style,
      alt,
      ...props
    },
    ref
  ) => {
    // Auto-determine loading strategy based on priority
    const loadingStrategy = loading || (priority ? 'eager' : 'lazy')

    // Combine styles with aspect ratio if provided
    const combinedStyle = {
      ...style,
      ...(aspectRatio && { aspectRatio }),
    }

    // Enhanced className for responsive behavior
    const combinedClassName = [
      className,
      // Add responsive classes if needed
      'block w-full h-auto', // Default responsive behavior
    ]
      .filter(Boolean)
      .join(' ')

    // eslint-disable-next-line jsx-a11y/alt-text
    return (
      <Image
        ref={ref}
        alt={alt}
        priority={priority}
        loading={loadingStrategy}
        placeholder={placeholder}
        blurDataURL={blurDataURL}
        sizes={sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'}
        className={combinedClassName}
        style={combinedStyle}
        {...props}
      />
    )
  }
)

OptimizedImage.displayName = 'OptimizedImage'

export default OptimizedImage

// Utility function to generate blur placeholder
export function generateBlurPlaceholder(width = 16, height = 16): string {
  const canvas = typeof window !== 'undefined' ? document.createElement('canvas') : null
  if (!canvas) return ''

  canvas.width = width
  canvas.height = height

  const ctx = canvas.getContext('2d')
  if (!ctx) return ''

  // Create a simple gradient placeholder
  const gradient = ctx.createLinearGradient(0, 0, width, height)
  gradient.addColorStop(0, '#f3f4f6')
  gradient.addColorStop(1, '#e5e7eb')

  ctx.fillStyle = gradient
  ctx.fillRect(0, 0, width, height)

  return canvas.toDataURL()
}

// Pre-defined aspect ratios for common use cases
export const AspectRatios = {
  square: '1/1',
  landscape: '16/9',
  portrait: '9/16',
  video: '16/9',
  photo: '4/3',
  banner: '3/1',
  card: '5/3',
} as const
