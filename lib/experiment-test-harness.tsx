/**
 * Shared test harness for experiment placeholder pages.
 *
 * This module provides reusable test utilities for validating
 * the consistent structure and accessibility of experiment placeholder pages.
 */

import { axeTest, render, screen } from 'lib/test-utils'
import type React from 'react'

interface ExperimentPageTestConfig {
  /**
   * The experiment page component to test
   */
  Component: React.ComponentType
  /**
   * The experiment title (e.g., "Sonic Weather")
   */
  title: string
  /**
   * The experiment subtitle (e.g., "The Atmospheric Synthesizer")
   */
  subtitle: string
  /**
   * A fragment of the description to search for
   */
  descriptionFragment: string
}

/**
 * Creates a test suite for an experiment placeholder page.
 *
 * Usage:
 * ```typescript
 * import { createExperimentPageTests } from '../../../lib/experiment-test-harness';
 * import SonicWeatherPage from './page';
 *
 * createExperimentPageTests({
 *   Component: SonicWeatherPage,
 *   title: 'Sonic Weather',
 *   subtitle: 'The Atmospheric Synthesizer',
 *   descriptionFragment: 'thermodynamic variables',
 * });
 * ```
 */
export function createExperimentPageTests({
  Component,
  title,
  subtitle,
  descriptionFragment,
}: ExperimentPageTestConfig): void {
  describe(`${title} Experiment Page`, () => {
    describe('rendering', () => {
      it('renders the page title', () => {
        render(<Component />)
        expect(
          screen.getByRole('heading', { level: 1, name: new RegExp(title, 'i') })
        ).toBeInTheDocument()
      })

      it('renders the subtitle', () => {
        render(<Component />)
        expect(screen.getByText(new RegExp(subtitle, 'i'))).toBeInTheDocument()
      })

      it('renders the description', () => {
        render(<Component />)
        const matches = screen.getAllByText(new RegExp(descriptionFragment, 'i'))
        expect(matches.length).toBeGreaterThan(0)
      })

      it('displays the under development notice', () => {
        render(<Component />)
        expect(screen.getByText(/currently under development/i)).toBeInTheDocument()
      })
    })

    describe('structure', () => {
      it('has a container div', () => {
        const { container } = render(<Component />)
        const containerDiv = container.querySelector('.container')
        expect(containerDiv).toBeInTheDocument()
      })

      it('has prose styling for readability', () => {
        const { container } = render(<Component />)
        const proseDiv = container.querySelector('.prose')
        expect(proseDiv).toBeInTheDocument()
      })
    })

    describe('accessibility', () => {
      it('is accessible', async () => {
        const { container } = render(<Component />)
        await axeTest(container)
      })

      it('has a single h1 heading', () => {
        render(<Component />)
        const h1Elements = screen.getAllByRole('heading', { level: 1 })
        expect(h1Elements).toHaveLength(1)
      })

      it('has proper text contrast (gray text classes)', () => {
        const { container } = render(<Component />)
        // Check that subtitle and notice have gray styling
        const grayElements = container.querySelectorAll('[class*="gray"]')
        expect(grayElements.length).toBeGreaterThan(0)
      })
    })
  })
}

/**
 * Runs basic smoke tests for all experiment placeholder pages.
 * Useful for CI/CD to ensure no pages are broken.
 */
export function runExperimentSmokeTests(
  experiments: Array<{ name: string; Component: React.ComponentType }>
): void {
  describe('Experiment Placeholder Pages Smoke Tests', () => {
    for (const { name, Component } of experiments) {
      it(`${name} page renders without crashing`, () => {
        expect(() => render(<Component />)).not.toThrow()
      })
    }
  })
}
