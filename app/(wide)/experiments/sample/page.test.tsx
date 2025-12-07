import { axeTest, render, screen } from 'lib/test-utils'
import SampleExperimentPage from './page'

describe('Sample Experiment Page', () => {
    describe('rendering', () => {
        it('renders the hero section with title', () => {
            render(<SampleExperimentPage />)
            expect(
                screen.getByRole('heading', { level: 1, name: /full-width layouts/i })
            ).toBeInTheDocument()
        })

        it('renders the experiment framework demo badge', () => {
            render(<SampleExperimentPage />)
            expect(screen.getByText(/experiment framework demo/i)).toBeInTheDocument()
        })

        it('renders the feature cards section', () => {
            render(<SampleExperimentPage />)
            expect(
                screen.getByRole('heading', { level: 2, name: /what's different here/i })
            ).toBeInTheDocument()
        })

        it('displays all three feature cards', () => {
            render(<SampleExperimentPage />)
            expect(screen.getByText(/full-width canvas/i)).toBeInTheDocument()
            expect(screen.getByText(/custom layouts/i)).toBeInTheDocument()
            expect(screen.getByText(/isolated space/i)).toBeInTheDocument()
        })

        it('renders the interactive demo section', () => {
            render(<SampleExperimentPage />)
            expect(
                screen.getByRole('heading', { level: 2, name: /interactive element demo/i })
            ).toBeInTheDocument()
        })

        it('renders the stats section', () => {
            render(<SampleExperimentPage />)
            expect(screen.getByText('100%')).toBeInTheDocument()
            expect(screen.getByText('Width Available')).toBeInTheDocument()
        })

        it('renders the back to experiments hub link', () => {
            render(<SampleExperimentPage />)
            const backLink = screen.getByRole('link', { name: /back to experiments hub/i })
            expect(backLink).toBeInTheDocument()
            expect(backLink).toHaveAttribute('href', '/experiments')
        })
    })

    describe('interactive elements', () => {
        it('renders interactive tile buttons', () => {
            render(<SampleExperimentPage />)
            const tileButtons = screen.getAllByRole('button', { name: /interactive tile/i })
            expect(tileButtons).toHaveLength(4)
        })

        it('interactive tiles have type button', () => {
            render(<SampleExperimentPage />)
            const tileButtons = screen.getAllByRole('button', { name: /interactive tile/i })
            for (const button of tileButtons) {
                expect(button).toHaveAttribute('type', 'button')
            }
        })
    })

    describe('accessibility', () => {
        it('is accessible', async () => {
            const { container } = render(<SampleExperimentPage />)
            await axeTest(container)
        })

        it('has a valid heading hierarchy', () => {
            render(<SampleExperimentPage />)
            // Should have exactly one h1
            const h1Elements = screen.getAllByRole('heading', { level: 1 })
            expect(h1Elements).toHaveLength(1)
        })

        it('all interactive elements have accessible names', () => {
            render(<SampleExperimentPage />)
            const buttons = screen.getAllByRole('button')
            for (const button of buttons) {
                expect(button).toHaveAccessibleName()
            }
        })
    })
})
