import { render, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { Navbar } from '../../app/components/nav'

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
  it('renders all navigation items', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /experiments/i })).toBeInTheDocument()
  })

  it('has correct href attributes for navigation links', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /experiments/i })).toHaveAttribute(
      'href',
      '/experiments'
    )
  })

  it('has proper navigation structure with nav element', () => {
    render(<Navbar />)

    const nav = screen.getByRole('navigation')
    expect(nav).toBeInTheDocument()
    expect(nav).toHaveAttribute('id', 'nav')
  })

  it('applies hover styles correctly', () => {
    render(<Navbar />)

    const links = screen.getAllByRole('link')
    for (const link of links) {
      expect(link).toHaveClass(
        'transition-all',
        'hover:text-neutral-800',
        'dark:hover:text-neutral-200'
      )
    }
  })

  it('includes the experiments navigation item', () => {
    render(<Navbar />)

    const experimentsLink = screen.getByRole('link', { name: /experiments/i })
    expect(experimentsLink).toBeInTheDocument()
    expect(experimentsLink).toHaveAttribute('href', '/experiments')
  })
})
