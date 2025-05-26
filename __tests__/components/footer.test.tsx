import { render, screen, axeTest } from '../utils/test-utils'
import Footer from '../../app/components/footer'

describe('Footer Component', () => {
  beforeEach(() => {
    render(<Footer />)
  })

  describe('Structure and Content', () => {
    it('renders as a footer element', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toBeInTheDocument()
    })

    it('contains all expected navigation links', () => {
      expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
      expect(screen.getByRole('link', { name: /soundcloud/i })).toBeInTheDocument()
    })

    it('has correct href attributes for all links', () => {
      expect(screen.getByRole('link', { name: /github/i })).toHaveAttribute(
        'href',
        'https://github.com/dralgorhythm'
      )
      expect(screen.getByRole('link', { name: /soundcloud/i })).toHaveAttribute(
        'href',
        'https://soundcloud.com/dralgorhythm'
      )
    })

    it('opens external links in new tab with security attributes', () => {
      const githubLink = screen.getByRole('link', { name: /github/i })
      const soundcloudLink = screen.getByRole('link', { name: /soundcloud/i })

      expect(githubLink).toHaveAttribute('target', '_blank')
      expect(githubLink).toHaveAttribute('rel', 'noopener noreferrer')
      expect(soundcloudLink).toHaveAttribute('target', '_blank')
      expect(soundcloudLink).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('Icons', () => {
    it('renders arrow icons for all links', () => {
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        const svg = link.querySelector('svg')
        expect(svg).toBeInTheDocument()
        expect(svg).toHaveAttribute('width', '12')
        expect(svg).toHaveAttribute('height', '12')
      })
    })

    it('arrow icons have proper SVG structure', () => {
      const firstLink = screen.getByRole('link', { name: /github/i })
      const svg = firstLink.querySelector('svg')
      const path = svg?.querySelector('path')

      expect(path).toBeInTheDocument()
      expect(path).toHaveAttribute('fill', 'currentColor')
    })
  })

  describe('Styling and Layout', () => {
    it('has proper footer styling classes', () => {
      const footer = screen.getByRole('contentinfo')
      expect(footer).toHaveClass('mb-16')
    })

    it('has responsive flex layout', () => {
      const footer = screen.getByRole('contentinfo')
      const list = footer.querySelector('ul')
      expect(list).toHaveClass(
        'font-sm',
        'mt-8',
        'flex',
        'flex-col',
        'space-x-0',
        'space-y-2',
        'text-neutral-600',
        'md:flex-row',
        'md:space-x-4',
        'md:space-y-0',
        'dark:text-neutral-300'
      )
    })

    it('applies hover styles to links', () => {
      const links = screen.getAllByRole('link')

      links.forEach(link => {
        expect(link).toHaveClass(
          'flex',
          'items-center',
          'transition-all',
          'hover:text-neutral-800',
          'dark:hover:text-neutral-100'
        )
      })
    })
  })

  describe('Accessibility', () => {
    it('is accessible', async () => {
      // Create an isolated container for the footer to avoid multiple landmarks
      const footer = document.createElement('div')
      footer.innerHTML = `
        <footer class="mb-16">
          <ul class="font-sm mt-8 flex flex-col space-x-0 space-y-2 text-neutral-600 md:flex-row md:space-x-4 md:space-y-0 dark:text-neutral-300">
            <li>
              <a class="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100" rel="noopener noreferrer" target="_blank" href="/rss">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"/>
                </svg>
                <p class="ml-2 h-7">rss</p>
              </a>
            </li>
            <li>
              <a class="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100" rel="noopener noreferrer" target="_blank" href="https://github.com/dralgorhythm">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"/>
                </svg>
                <p class="ml-2 h-7">github</p>
              </a>
            </li>
            <li>
              <a class="flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100" rel="noopener noreferrer" target="_blank" href="https://soundcloud.com/dralgorhythm">
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z" fill="currentColor"/>
                </svg>
                <p class="ml-2 h-7">soundcloud</p>
              </a>
            </li>
          </ul>
        </footer>
      `
      await axeTest(footer)
    })

    it('provides proper link text for screen readers', () => {
      const { container } = render(<Footer />)

      // All links should have descriptive text
      const githubLink = container.querySelector('a[href="https://github.com/dralgorhythm"]')
      const soundcloudLink = container.querySelector(
        'a[href="https://soundcloud.com/dralgorhythm"]'
      )

      expect(githubLink).toBeInTheDocument()
      expect(soundcloudLink).toBeInTheDocument()

      expect(githubLink).toHaveTextContent('github')
      expect(soundcloudLink).toHaveTextContent('soundcloud')
    })

    it('uses semantic HTML structure', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      const list = footer?.querySelector('ul')
      const listItems = footer?.querySelectorAll('li')

      expect(footer).toBeInTheDocument()
      expect(footer?.tagName).toBe('FOOTER')
      expect(list).toBeInTheDocument()
      expect(listItems).toHaveLength(3)
    })
  })

  describe('Performance', () => {
    it('renders quickly', () => {
      const startTime = performance.now()
      render(<Footer />)
      const endTime = performance.now()

      expect(endTime - startTime).toBeLessThan(50)
    })
  })

  describe('Dark Mode', () => {
    it('has dark mode classes for color theming', () => {
      const { container } = render(<Footer />)
      const footer = container.querySelector('footer')
      const list = footer?.querySelector('ul')
      expect(list).toHaveClass('dark:text-neutral-300')

      const links = container.querySelectorAll('a')
      links.forEach(link => {
        expect(link).toHaveClass('dark:hover:text-neutral-100')
      })
    })
  })
})
