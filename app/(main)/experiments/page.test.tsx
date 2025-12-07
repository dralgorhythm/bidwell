import { axeTest, render, screen } from 'lib/test-utils'
import ExperimentsPage from './page'

describe('Experiments Hub Page', () => {
    describe('rendering', () => {
        it('renders the page title', () => {
            render(<ExperimentsPage />)
            expect(screen.getByRole('heading', { level: 1, name: /experiments/i })).toBeInTheDocument()
        })

        it('renders the page description', () => {
            render(<ExperimentsPage />)
            expect(
                screen.getByText(/a collection of interactive experiments/i)
            ).toBeInTheDocument()
        })

        it('renders experiment cards when experiments exist', () => {
            render(<ExperimentsPage />)
            expect(screen.getByText(/sample experiment/i)).toBeInTheDocument()
        })

        it('displays experiment descriptions', () => {
            render(<ExperimentsPage />)
            expect(
                screen.getByText(/demonstration of the experiments framework/i)
            ).toBeInTheDocument()
        })

        it('shows Active status badge for active experiments', () => {
            render(<ExperimentsPage />)
            expect(screen.getByText('Active')).toBeInTheDocument()
        })
    })

    describe('experiment cards', () => {
        it('renders experiment cards as links', () => {
            render(<ExperimentsPage />)
            const experimentLink = screen.getByRole('link', { name: /sample experiment/i })
            expect(experimentLink).toBeInTheDocument()
            expect(experimentLink).toHaveAttribute('href', '/experiments/sample')
        })

        it('shows Explore call-to-action for active experiments', () => {
            render(<ExperimentsPage />)
            expect(screen.getByText('Explore')).toBeInTheDocument()
        })

        it('displays category when present', () => {
            render(<ExperimentsPage />)
            expect(screen.getByText('Demo')).toBeInTheDocument()
        })
    })

    describe('accessibility', () => {
        it('is accessible', async () => {
            const { container } = render(<ExperimentsPage />)
            await axeTest(container)
        })

        it('has a valid heading hierarchy', () => {
            render(<ExperimentsPage />)
            const h1Elements = screen.getAllByRole('heading', { level: 1 })
            expect(h1Elements).toHaveLength(1)
        })

        it('experiment cards have appropriate aria attributes for disabled state', () => {
            render(<ExperimentsPage />)
            // Active experiments should not be disabled
            const activeLink = screen.getByRole('link', { name: /sample experiment/i })
            expect(activeLink).not.toHaveAttribute('aria-disabled', 'true')
        })
    })
})
