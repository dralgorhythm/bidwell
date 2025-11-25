import { baseUrl } from '../sitemap'

interface StructuredDataProps {
  type: 'website' | 'person' | 'organization' | 'article' | 'breadcrumb'
  data?: Record<string, unknown> | Array<Record<string, unknown>>
}

export default function StructuredData({ type, data }: StructuredDataProps) {
  const getStructuredData = () => {
    switch (type) {
      case 'website':
        return {
          '@context': 'https://schema.org',
          '@type': 'WebSite',
          name: 'Bidwell Consulting',
          description: 'Expert software engineering and organizational consulting services',
          url: baseUrl,
          potentialAction: {
            '@type': 'SearchAction',
            target: {
              '@type': 'EntryPoint',
              urlTemplate: `${baseUrl}/search?q={search_term_string}`,
            },
            'query-input': 'required name=search_term_string',
          },
          author: {
            '@type': 'Person',
            name: 'Bidwell Consulting',
          },
          publisher: {
            '@type': 'Organization',
            name: 'Bidwell Consulting',
            url: baseUrl,
          },
        }

      case 'person':
        return {
          '@context': 'https://schema.org',
          '@type': 'Person',
          name: 'Bidwell Consulting',
          jobTitle: 'Software Engineer & Organizational Consultant',
          description:
            'Expert in software engineering, system architecture, and organizational consulting',
          url: baseUrl,
          sameAs: ['https://github.com/dralgorhythm', 'https://soundcloud.com/dralgorhythm'],
          knowsAbout: [
            'Software Engineering',
            'System Architecture',
            'Organizational Consulting',
            'Technical Problem Solving',
            'Business Optimization',
            'Full Stack Development',
          ],
          hasOccupation: {
            '@type': 'Occupation',
            name: 'Software Engineer & Consultant',
            occupationLocation: {
              '@type': 'Place',
              name: 'Remote',
            },
          },
        }

      case 'organization':
        return {
          '@context': 'https://schema.org',
          '@type': 'Organization',
          name: 'Bidwell Consulting',
          description: 'Software engineering and organizational consulting services',
          url: baseUrl,
          foundingDate: '2024',
          sameAs: ['https://github.com/dralgorhythm', 'https://soundcloud.com/dralgorhythm'],
          contactPoint: {
            '@type': 'ContactPoint',
            contactType: 'Professional',
            url: baseUrl,
          },
          areaServed: 'Worldwide',
          serviceType: [
            'Software Engineering',
            'Organizational Consulting',
            'System Architecture',
            'Technical Consulting',
          ],
        }

      case 'breadcrumb':
        return {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          itemListElement: data || [],
        }

      case 'article':
        return {
          '@context': 'https://schema.org',
          '@type': 'Article',
          ...data,
        }

      default:
        return null
    }
  }

  const structuredData = getStructuredData()

  if (!structuredData) return null

  return (
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(structuredData),
      }}
    />
  )
}
