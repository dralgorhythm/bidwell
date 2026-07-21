import type {
  AdministrativeArea,
  BlogPosting,
  BreadcrumbList,
  City,
  FAQPage,
  Person,
  ProfessionalService,
  Service,
  WebSite,
  WithContext,
} from 'schema-dts'
import { absoluteUrl, baseUrl, siteConfig } from './site-config'

/**
 * JSON-LD builders for every schema the site emits, linked into one entity
 * graph via stable `@id`s. All facts come from `siteConfig` — never inline
 * name/location/contact literals in a schema.
 */
const ORGANIZATION_ID = `${baseUrl}/#organization`
const PERSON_ID = `${baseUrl}/#person`
const WEBSITE_ID = `${baseUrl}/#website`

const SCHEMA_CONTEXT = 'https://schema.org'

function areaServed(): (City | AdministrativeArea)[] {
  return siteConfig.location.areaServed.map(name =>
    name.includes('metro') ? { '@type': 'AdministrativeArea', name } : { '@type': 'City', name }
  )
}

export function websiteSchema(): WithContext<WebSite> {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'WebSite',
    '@id': WEBSITE_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export function organizationSchema(): WithContext<ProfessionalService> {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'ProfessionalService',
    '@id': ORGANIZATION_ID,
    name: siteConfig.name,
    description: siteConfig.description,
    url: baseUrl,
    email: siteConfig.email,
    foundingDate: '2024',
    address: {
      '@type': 'PostalAddress',
      addressLocality: siteConfig.location.locality,
      addressRegion: siteConfig.location.region,
      addressCountry: siteConfig.location.country,
    },
    areaServed: areaServed(),
    founder: { '@id': PERSON_ID },
    sameAs: [...siteConfig.sameAs],
    // Organization types have no serviceType property (that lives on Service,
    // emitted per service page) — knowsAbout is the entity-level equivalent.
    knowsAbout: [
      'Software Consulting',
      'AI Consulting',
      'Engineering Practice Improvement',
      'Career Coaching',
    ],
  }
}

export function personSchema(): WithContext<Person> {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Person',
    '@id': PERSON_ID,
    name: siteConfig.founder.name,
    jobTitle: siteConfig.founder.jobTitle,
    url: absoluteUrl('/about'),
    worksFor: { '@id': ORGANIZATION_ID },
    sameAs: [...siteConfig.founder.sameAs],
    knowsAbout: [
      'Software Engineering',
      'System Architecture',
      'AI & Agent Engineering',
      'Engineering Practice Improvement',
      'Organizational Consulting',
    ],
    workLocation: {
      '@type': 'Place',
      address: {
        '@type': 'PostalAddress',
        addressLocality: siteConfig.location.locality,
        addressRegion: siteConfig.location.region,
        addressCountry: siteConfig.location.country,
      },
    },
  }
}

export interface BlogPostInput {
  slug: string
  title: string
  description: string
  publishedAt: string
}

export function blogPostingSchema(post: BlogPostInput): WithContext<BlogPosting> {
  const url = absoluteUrl(`/blog/${post.slug}`)
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.description,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    url,
    mainEntityOfPage: url,
    author: { '@id': PERSON_ID },
    publisher: { '@id': ORGANIZATION_ID },
  }
}

export interface FaqItem {
  question: string
  answer: string
}

export function faqSchema(faqs: readonly FaqItem[]): WithContext<FAQPage> {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: { '@type': 'Answer' as const, text: faq.answer },
    })),
  }
}

export interface ServiceInput {
  name: string
  description: string
  path: string
}

export function serviceSchema(service: ServiceInput): WithContext<Service> {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'Service',
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    serviceType: service.name,
    provider: { '@id': ORGANIZATION_ID },
    areaServed: areaServed(),
  }
}

export interface BreadcrumbInput {
  name: string
  path: string
}

export function breadcrumbSchema(items: readonly BreadcrumbInput[]): WithContext<BreadcrumbList> {
  return {
    '@context': SCHEMA_CONTEXT,
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  }
}
