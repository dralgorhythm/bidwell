import { render, screen } from '@testing-library/react'
import { Navbar } from '../../app/components/nav'

// Mock Next.js Link component
jest.mock('next/link', () => {
  return function MockLink({ children, href, ...props }: any) {
    return (
      <a href={href} {...props}>
        {children}
      </a>
    )
  }
})

describe('Navbar', () => {
  it('renders all navigation items', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /comparison/i })).toBeInTheDocument()
  })

  it('has correct href attributes for navigation links', () => {
    render(<Navbar />)

    expect(screen.getByRole('link', { name: /home/i })).toHaveAttribute('href', '/')
    expect(screen.getByRole('link', { name: /comparison/i })).toHaveAttribute('href', '/comparison')
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
    links.forEach(link => {
      expect(link).toHaveClass('transition-all', 'hover:text-neutral-800', 'dark:hover:text-neutral-200')
    })
  })

  it('includes the comparison navigation item', () => {
    render(<Navbar />)

    const comparisonLink = screen.getByRole('link', { name: /comparison/i })
    expect(comparisonLink).toBeInTheDocument()
    expect(comparisonLink).toHaveAttribute('href', '/comparison')
  })
})

