import { siteConfig } from 'lib/site-config'
import {
  blogPostingSchema,
  breadcrumbSchema,
  faqSchema,
  organizationSchema,
  personSchema,
  serviceSchema,
  websiteSchema,
} from 'lib/structured-data'
import { render } from 'lib/test-utils'
import JsonLd from './structured-data'

type Json = Record<string, unknown>

// schema-dts types are `Leaf | string` unions, so property access on builder
// output doesn't type-check directly. Round-tripping through JSON both fixes
// that and proves each schema serializes cleanly.
const json = (schema: object): Json => JSON.parse(JSON.stringify(schema)) as Json

describe('structured-data builders', () => {
  describe('websiteSchema', () => {
    it('describes the site without a SearchAction', () => {
      const schema = websiteSchema()

      expect(schema['@context']).toBe('https://schema.org')
      expect(schema['@type']).toBe('WebSite')
      expect(schema.name).toBe('Bidwell Consulting')
      expect(schema.url).toBe('https://bidwell.info')
      expect(schema).not.toHaveProperty('potentialAction')
    })

    it('links to the organization entity by @id', () => {
      expect(websiteSchema().publisher).toEqual({ '@id': 'https://bidwell.info/#organization' })
    })
  })

  describe('organizationSchema', () => {
    it('is a ProfessionalService with a city-level Minneapolis address', () => {
      const schema = json(organizationSchema())

      expect(schema['@type']).toBe('ProfessionalService')
      expect(schema['@id']).toBe('https://bidwell.info/#organization')
      expect(schema.address).toEqual({
        '@type': 'PostalAddress',
        addressLocality: 'Minneapolis',
        addressRegion: 'MN',
        addressCountry: 'US',
      })
    })

    it('serves the Twin Cities, not Worldwide', () => {
      const areas = json(organizationSchema()).areaServed as { '@type': string; name: string }[]
      const names = areas.map(area => area.name)

      expect(names).toContain('Minneapolis')
      expect(names).toContain('Saint Paul')
      expect(names.some(name => name.includes('metro'))).toBe(true)
      expect(areas.find(area => area.name === 'Saint Paul')?.['@type']).toBe('City')
      expect(areas.some(area => area['@type'] === 'AdministrativeArea')).toBe(true)
    })

    it('links founder to the person entity and lists social profiles', () => {
      const schema = json(organizationSchema())

      expect(schema.founder).toEqual({ '@id': 'https://bidwell.info/#person' })
      expect(schema.sameAs).toContain('https://www.linkedin.com/in/wintersjordan/')
      expect(schema.sameAs).toContain('https://github.com/dralgorhythm')
    })

    it('does not publish an email until the forwarding alias exists', () => {
      expect(json(organizationSchema())).not.toHaveProperty('email')
    })
  })

  describe('personSchema', () => {
    it('describes Jordan Winters, not the company', () => {
      const schema = json(personSchema())

      expect(schema['@type']).toBe('Person')
      expect(schema['@id']).toBe('https://bidwell.info/#person')
      expect(schema.name).toBe('Jordan Winters')
      expect(schema.url).toBe('https://bidwell.info/about')
      expect(schema.worksFor).toEqual({ '@id': 'https://bidwell.info/#organization' })
      expect(schema.sameAs).toContain('https://www.linkedin.com/in/wintersjordan/')
    })

    it('works from Minneapolis, not Remote', () => {
      const workLocation = json(personSchema()).workLocation as {
        address: { addressLocality: string; addressRegion: string }
      }

      expect(workLocation.address.addressLocality).toBe('Minneapolis')
      expect(workLocation.address.addressRegion).toBe('MN')
      expect(JSON.stringify(personSchema())).not.toContain('Remote')
    })
  })

  describe('blogPostingSchema', () => {
    const post = {
      slug: 'agent-coordination',
      title: 'Agent Coordination Structure',
      description: 'A framework for managing AI agents.',
      publishedAt: '2025-11-27',
    }

    it('builds canonical-domain URLs and stable dates', () => {
      const schema = blogPostingSchema(post)

      expect(schema.url).toBe('https://bidwell.info/blog/agent-coordination')
      expect(schema.mainEntityOfPage).toBe('https://bidwell.info/blog/agent-coordination')
      expect(schema.datePublished).toBe('2025-11-27')
      expect(schema.dateModified).toBe('2025-11-27')
    })

    it('attributes authorship via the person entity', () => {
      const schema = blogPostingSchema(post)

      expect(schema.author).toEqual({ '@id': 'https://bidwell.info/#person' })
      expect(schema.publisher).toEqual({ '@id': 'https://bidwell.info/#organization' })
    })
  })

  describe('faqSchema', () => {
    it('maps question/answer pairs to FAQPage entities', () => {
      const schema = faqSchema([
        { question: 'How long are sessions?', answer: '60 minutes.' },
        { question: 'Remote work?', answer: 'Definitely.' },
      ])

      expect(schema['@type']).toBe('FAQPage')
      const questions = schema.mainEntity as {
        '@type': string
        name: string
        acceptedAnswer: { text: string }
      }[]
      expect(questions).toHaveLength(2)
      expect(questions[0]?.['@type']).toBe('Question')
      expect(questions[0]?.name).toBe('How long are sessions?')
      expect(questions[0]?.acceptedAnswer.text).toBe('60 minutes.')
    })
  })

  describe('serviceSchema', () => {
    it('links the service to the organization and service area', () => {
      const schema = serviceSchema({
        name: 'Software Consulting',
        description: 'Hands-on software consulting.',
        path: '/services/software-consulting',
      })

      expect(schema['@type']).toBe('Service')
      expect(schema.url).toBe('https://bidwell.info/services/software-consulting')
      expect(schema.provider).toEqual({ '@id': 'https://bidwell.info/#organization' })
      const areas = json(schema).areaServed as { name: string }[]
      expect(areas.map(area => area.name)).toContain('Minneapolis')
    })
  })

  describe('breadcrumbSchema', () => {
    it('emits absolute item URLs with 1-based positions', () => {
      const schema = breadcrumbSchema([
        { name: 'Home', path: '/' },
        { name: 'Blog', path: '/blog' },
      ])

      expect(schema['@type']).toBe('BreadcrumbList')
      expect(schema.itemListElement).toEqual([
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bidwell.info' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://bidwell.info/blog' },
      ])
    })
  })

  it('drives every schema from siteConfig facts', () => {
    expect(json(organizationSchema()).name).toBe(siteConfig.name)
    expect(json(personSchema()).name).toBe(siteConfig.founder.name)
    expect(json(websiteSchema()).url).toBe(siteConfig.baseUrl)
  })
})

describe('JsonLd component', () => {
  beforeEach(() => {
    for (const script of document.querySelectorAll('script[type="application/ld+json"]')) {
      script.remove()
    }
  })

  it('renders a JSON-LD script tag with the given data', () => {
    render(<JsonLd data={websiteSchema()} />)

    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script).toBeInTheDocument()
    const parsed = JSON.parse(script?.textContent || '{}')
    expect(parsed['@type']).toBe('WebSite')
  })

  it('escapes angle brackets to prevent script breakout', () => {
    render(<JsonLd data={{ name: '</script><script>alert(1)</script>' }} />)

    const script = document.querySelector('script[type="application/ld+json"]')
    expect(script?.innerHTML).not.toContain('</script><script>')
    expect(script?.innerHTML).toContain('\\u003c')
    const parsed = JSON.parse(script?.textContent || '{}')
    expect(parsed.name).toBe('</script><script>alert(1)</script>')
  })
})
