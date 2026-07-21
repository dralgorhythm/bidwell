import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Navbar } from './nav'

// Mock Next.js Link component
vi.mock('next/link', () => {
  return {
    default: function MockLink({
      children,
      href,
      ...props
    }: {
      children: React.ReactNode
      href: string
      [key: string]: unknown
    }) {
      return (
        <a href={href} {...props}>
          {children}
        </a>
      )
    },
  }
})

describe('Navbar', () => {
  it('renders navigation links', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /^services$/i })).toHaveAttribute('href', '/services')
    expect(screen.getByRole('link', { name: /coaching/i })).toHaveAttribute(
      'href',
      '/services/career-coaching'
    )
    expect(screen.getByRole('link', { name: /blog/i })).toHaveAttribute('href', '/blog')
    expect(screen.getByRole('link', { name: /about/i })).toHaveAttribute('href', '/about')
    expect(screen.getByRole('link', { name: /contact/i })).toHaveAttribute('href', '/contact')
  })

  it('does not link experiments from the primary nav (footer only)', () => {
    render(<Navbar />)

    expect(screen.queryByRole('link', { name: /experiments/i })).not.toBeInTheDocument()
  })

  it('has proper navigation structure', () => {
    render(<Navbar />)
    expect(screen.getByRole('navigation')).toBeInTheDocument()
  })
})
