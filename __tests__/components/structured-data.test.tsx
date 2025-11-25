import StructuredData from '../../app/components/structured-data'
import { render } from '../utils/test-utils'

describe('StructuredData Component', () => {
  beforeEach(() => {
    // Clear any existing structured data scripts
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      script.remove()
    }
  })

  describe('Website Schema', () => {
    it('renders website structured data correctly', () => {
      render(<StructuredData type='website' />)

      const script = document.querySelector('script[type="application/ld+json"]')
      expect(script).toBeInTheDocument()

      const structuredData = JSON.parse(script?.textContent || '{}')
      expect(structuredData['@context']).toBe('https://schema.org')
      expect(structuredData['@type']).toBe('WebSite')
      expect(structuredData.name).toBe('Bidwell Consulting')
      expect(structuredData.url).toBe('https://bidwell.info')
    })

    it('includes search action in website schema', () => {
      render(<StructuredData type='website' />)

      const script = document.querySelector('script[type="application/ld+json"]')
      const structuredData = JSON.parse(script?.textContent || '{}')

      expect(structuredData.potentialAction).toBeDefined()
      expect(structuredData.potentialAction['@type']).toBe('SearchAction')
    })
  })

  describe('Person Schema', () => {
    it('renders person structured data correctly', () => {
      render(<StructuredData type='person' />)

      const script = document.querySelector('script[type="application/ld+json"]')
      const structuredData = JSON.parse(script?.textContent || '{}')

      expect(structuredData['@type']).toBe('Person')
      expect(structuredData.name).toBe('Bidwell Consulting')
      expect(structuredData.jobTitle).toBe('Software Engineer & Organizational Consultant')
      expect(structuredData.sameAs).toContain('https://github.com/dralgorhythm')
    })

    it('includes knowledge areas in person schema', () => {
      render(<StructuredData type='person' />)

      const script = document.querySelector('script[type="application/ld+json"]')
      const structuredData = JSON.parse(script?.textContent || '{}')

      expect(structuredData.knowsAbout).toContain('Software Engineering')
      expect(structuredData.knowsAbout).toContain('System Architecture')
      expect(structuredData.knowsAbout).toContain('Organizational Consulting')
    })
  })

  describe('Organization Schema', () => {
    it('renders organization structured data correctly', () => {
      render(<StructuredData type='organization' />)

      const script = document.querySelector('script[type="application/ld+json"]')
      const structuredData = JSON.parse(script?.textContent || '{}')

      expect(structuredData['@type']).toBe('Organization')
      expect(structuredData.name).toBe('Bidwell Consulting')
      expect(structuredData.areaServed).toBe('Worldwide')
      expect(structuredData.serviceType).toContain('Software Engineering')
    })
  })

  describe('Breadcrumb Schema', () => {
    it('renders breadcrumb structured data correctly', () => {
      const breadcrumbData = [
        { '@type': 'ListItem', position: 1, name: 'Home', item: '/' },
        { '@type': 'ListItem', position: 2, name: 'About', item: '/about' },
      ]

      render(<StructuredData type='breadcrumb' data={breadcrumbData} />)

      const script = document.querySelector('script[type="application/ld+json"]')
      const structuredData = JSON.parse(script?.textContent || '{}')

      expect(structuredData['@type']).toBe('BreadcrumbList')
      expect(structuredData.itemListElement).toEqual(breadcrumbData)
    })
  })

  describe('Invalid Types', () => {
    it('returns null for invalid schema type', () => {
      // Test the default case by mocking the component to receive an invalid type
      // biome-ignore lint/suspicious/noExplicitAny: Testing invalid props
      const InvalidStructuredData = (props: any) => <StructuredData {...props} />
      const { container } = render(<InvalidStructuredData type='invalid' />)

      const script = container.querySelector('script[type="application/ld+json"]')
      expect(script).not.toBeInTheDocument()
    })
  })

  describe('Article Schema', () => {
    it('renders article structured data with custom data', () => {
      const articleData = {
        headline: 'Test Article',
        datePublished: '2024-01-01',
        author: { '@type': 'Person', name: 'Test Author' },
      }

      render(<StructuredData type='article' data={articleData} />)

      const script = document.querySelector('script[type="application/ld+json"]')
      const structuredData = JSON.parse(script?.textContent || '{}')

      expect(structuredData['@type']).toBe('Article')
      expect(structuredData.headline).toBe('Test Article')
      expect(structuredData.author.name).toBe('Test Author')
    })
  })
})
