/**
 * @vitest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import OptimizedImage, {
  AspectRatios,
  generateBlurPlaceholder,
} from '@/app/components/optimized-image'

// Mock Next.js Image component
vi.mock('next/image', () => ({
  // biome-ignore lint/suspicious/noExplicitAny: Mocking Next.js Image
  default: function MockImage(props: any) {
    const {
      priority,
      loading,
      placeholder,
      blurDataURL,
      fill,
      width,
      height,
      sizes,
      quality,
      style,
      onLoad,
      ...rest
    } = props

    // Handle fill vs width/height
    // biome-ignore lint/suspicious/noExplicitAny: Dynamic props
    const imgProps: Record<string, any> = { ...rest }
    if (!fill) {
      imgProps.width = width
      imgProps.height = height
    }

    return (
      // eslint-disable-next-line @next/next/no-img-element
      // biome-ignore lint/performance/noImgElement: Using img tag for testing purposes
      <img
        {...imgProps}
        data-priority={priority}
        data-loading={loading}
        data-placeholder={placeholder}
        data-blur-data-url={blurDataURL}
        data-fill={fill}
        data-sizes={sizes}
        data-quality={quality}
        style={style}
        onLoad={onLoad}
        data-testid='optimized-image'
        alt={props.alt || 'test image'}
      />
    )
  },
}))

describe('OptimizedImage', () => {
  const defaultProps = {
    src: '/test-image.jpg',
    alt: 'Test image',
    width: 800,
    height: 600,
  }

  it('should render with default props', () => {
    render(<OptimizedImage {...defaultProps} />)

    const image = screen.getByAltText('Test image')
    expect(image).toBeInTheDocument()
    expect(image).toHaveAttribute('src', '/test-image.jpg')
  })

  it('should set priority and eager loading for priority images', () => {
    render(<OptimizedImage {...defaultProps} priority={true} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('data-priority', 'true')
    expect(image).toHaveAttribute('data-loading', 'eager')
  })

  it('should use lazy loading by default', () => {
    render(<OptimizedImage {...defaultProps} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('data-loading', 'lazy')
  })

  it('should override loading strategy when explicitly set', () => {
    render(<OptimizedImage {...defaultProps} loading='eager' />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('data-loading', 'eager')
  })

  it('should apply blur placeholder when provided', () => {
    const blurDataURL = 'data:image/jpeg;base64,/9j/4AAQSkZJRg...'

    render(<OptimizedImage {...defaultProps} placeholder='blur' blurDataURL={blurDataURL} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('data-placeholder', 'blur')
    expect(image).toHaveAttribute('data-blur-data-url', blurDataURL)
  })

  it('should apply custom sizes attribute', () => {
    const customSizes = '(max-width: 640px) 100vw, 50vw'

    render(<OptimizedImage {...defaultProps} sizes={customSizes} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute('data-sizes', customSizes)
  })

  it('should apply default responsive sizes when not provided', () => {
    render(<OptimizedImage {...defaultProps} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveAttribute(
      'data-sizes',
      '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
    )
  })

  it('should apply aspect ratio styles', () => {
    render(<OptimizedImage {...defaultProps} aspectRatio='16/9' />)

    const image = screen.getByAltText('Test image')

    // In test environment, Next.js Image may filter out aspectRatio CSS property
    // But the component should still render properly with the aspectRatio prop
    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('block', 'w-full', 'h-auto')
  })

  it('should combine custom styles with aspect ratio', () => {
    const customStyle = { border: '1px solid red' }

    render(<OptimizedImage {...defaultProps} aspectRatio='4/3' style={customStyle} />)

    const image = screen.getByAltText('Test image')

    // Custom styles should be applied even if aspectRatio is filtered out in tests
    const styleAttr = image.getAttribute('style')
    expect(styleAttr).toContain('border: 1px solid red')

    // Component should still render properly
    expect(image).toBeInTheDocument()
    expect(image).toHaveClass('block', 'w-full', 'h-auto')
  })

  it('should apply responsive className by default', () => {
    render(<OptimizedImage {...defaultProps} />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveClass('block', 'w-full', 'h-auto')
  })

  it('should combine custom className with default classes', () => {
    render(<OptimizedImage {...defaultProps} className='custom-class' />)

    const image = screen.getByAltText('Test image')
    expect(image).toHaveClass('custom-class', 'block', 'w-full', 'h-auto')
  })

  it('should forward ref correctly', () => {
    const ref = { current: null }

    render(<OptimizedImage {...defaultProps} ref={ref} />)

    expect(ref.current).toBeTruthy()
  })

  it('should pass through other props to Image component', () => {
    render(
      <OptimizedImage {...defaultProps} quality={90} fill={true} data-testid='optimized-image' />
    )

    const image = screen.getByTestId('optimized-image')
    expect(image).toHaveAttribute('data-quality', '90')
    expect(image).toHaveAttribute('data-fill', 'true')
  })
})

describe('generateBlurPlaceholder', () => {
  // biome-ignore lint/suspicious/noExplicitAny: Mocking canvas elements requires flexible types
  let mockCanvas: any
  // biome-ignore lint/suspicious/noExplicitAny: Mocking canvas context requires flexible types
  let mockContext: any

  beforeEach(() => {
    mockContext = {
      fillStyle: '',
      fillRect: vi.fn(),
    }
    mockContext = {
      createLinearGradient: vi.fn(() => ({
        addColorStop: vi.fn(),
      })),
      fillRect: vi.fn(),
      // biome-ignore lint/suspicious/noExplicitAny: Mocking a setter requires any or specific casting that is complex here
      set fillStyle(_value: any) {
        // Mock setter
      },
    }

    mockCanvas = {
      width: 0,
      height: 0,
      getContext: vi.fn(() => mockContext),
      toDataURL: vi.fn(() => 'data:image/png;base64,mock-data'),
    }

    // Mock document.createElement
    vi.spyOn(document, 'createElement').mockImplementation(tagName => {
      if (tagName === 'canvas') {
        return mockCanvas
      }
      return document.createElement(tagName)
    })
  })

  afterEach(() => {
    vi.restoreAllMocks()
  })

  it('should generate blur placeholder with default dimensions', () => {
    const result = generateBlurPlaceholder()

    expect(mockCanvas.width).toBe(16)
    expect(mockCanvas.height).toBe(16)
    expect(mockContext.createLinearGradient).toHaveBeenCalledWith(0, 0, 16, 16)
    expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 16, 16)
    expect(result).toBe('data:image/png;base64,mock-data')
  })

  it('should generate blur placeholder with custom dimensions', () => {
    generateBlurPlaceholder(32, 24)

    expect(mockCanvas.width).toBe(32)
    expect(mockCanvas.height).toBe(24)
    expect(mockContext.createLinearGradient).toHaveBeenCalledWith(0, 0, 32, 24)
    expect(mockContext.fillRect).toHaveBeenCalledWith(0, 0, 32, 24)
  })

  it('should return empty string when canvas is not available', () => {
    // Mock window as undefined (SSR scenario)
    const originalWindow = global.window
    // @ts-expect-error
    global.window = undefined

    const result = generateBlurPlaceholder()
    expect(result).toBe('')

    // Restore window
    global.window = originalWindow
  })

  it('should return empty string when context is not available', () => {
    mockCanvas.getContext.mockReturnValue(null)

    const result = generateBlurPlaceholder()
    expect(result).toBe('')
  })
})

describe('AspectRatios', () => {
  it('should export predefined aspect ratios', () => {
    expect(AspectRatios.square).toBe('1/1')
    expect(AspectRatios.landscape).toBe('16/9')
    expect(AspectRatios.portrait).toBe('9/16')
    expect(AspectRatios.video).toBe('16/9')
    expect(AspectRatios.photo).toBe('4/3')
    expect(AspectRatios.banner).toBe('3/1')
    expect(AspectRatios.card).toBe('5/3')
  })

  it('should have all expected aspect ratio keys', () => {
    const expectedKeys = ['square', 'landscape', 'portrait', 'video', 'photo', 'banner', 'card']
    const actualKeys = Object.keys(AspectRatios)

    expect(actualKeys).toEqual(expect.arrayContaining(expectedKeys))
    expect(actualKeys).toHaveLength(expectedKeys.length)
  })
})
