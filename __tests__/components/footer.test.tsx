import Footer from '../../app/components/footer'
import { axeTest, render, screen } from '../utils/test-utils'

describe('Footer Component', () => {
  it('renders navigation links', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /linkedin/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /github/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /soundcloud/i })).toBeInTheDocument()
  })

  it('has correct href attributes', () => {
    render(<Footer />)

    expect(screen.getByRole('link', { name: /linkedin/i })).toHaveAttribute(
      'href',
      'https://www.linkedin.com/in/wintersjordan/'
    )
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
    render(<Footer />)
    const links = screen.getAllByRole('link')

    for (const link of links) {
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    }
  })

  it('is accessible', async () => {
    const { container } = render(<Footer />)
    await axeTest(container)
  })
})
