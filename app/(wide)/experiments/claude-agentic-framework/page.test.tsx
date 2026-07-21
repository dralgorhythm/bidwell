import { axeTest, render, screen } from 'lib/test-utils'
import ClaudeAgenticFrameworkPage from './page'

const githubUrl = 'https://github.com/dralgorhythm/claude-agentic-framework'

describe('Claude Agentic Framework Experiment Page', () => {
  describe('hero', () => {
    it('renders the page title', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(
        screen.getByRole('heading', { level: 1, name: /claude agentic framework/i })
      ).toBeInTheDocument()
    })

    it('renders the experiment badge', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getByText(/active experiment · agentic engineering/i)).toBeInTheDocument()
    })

    it('renders the subtitle', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getByText('The Governed Swarm')).toBeInTheDocument()
    })

    it('renders the terminal transcript with the full cycle', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getByText(/add an experiments page/)).toBeInTheDocument()
      expect(screen.getByText(/work isn't done until it's pushed/i)).toBeInTheDocument()
    })

    it('links to the GitHub repository with a safe external link', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const link = screen.getByRole('link', { name: 'View on GitHub' })
      expect(link).toHaveAttribute('href', githubUrl)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })

    it('links to the cycle section anchor', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const anchor = screen.getByRole('link', { name: /how it works/i })
      expect(anchor).toHaveAttribute('href', '#the-cycle')
    })
  })

  describe('the pitch', () => {
    it('renders the pitch section heading', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /why govern an agent at all/i })
      ).toBeInTheDocument()
    })

    it('renders all three design principles', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(
        screen.getByRole('heading', { name: /speed and stability reinforce each other/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /ai amplifies existing discipline/i })
      ).toBeInTheDocument()
      expect(
        screen.getByRole('heading', { name: /small changesets, many reviewers/i })
      ).toBeInTheDocument()
    })
  })

  describe('the cycle', () => {
    it('renders the cycle section heading', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(
        screen.getByRole('heading', {
          level: 2,
          name: /one agent thinks\. many agents build\. many agents review\./i,
        })
      ).toBeInTheDocument()
    })

    it('renders all four phases', () => {
      render(<ClaudeAgenticFrameworkPage />)
      for (const phase of ['Think', 'Build', 'Review', 'Ship']) {
        expect(screen.getByRole('heading', { level: 3, name: phase })).toBeInTheDocument()
      }
    })

    it('renders the orchestrator command chips', () => {
      render(<ClaudeAgenticFrameworkPage />)
      // These commands also appear in the hero terminal transcript, so allow multiples
      for (const command of ['/swarm-plan', '/swarm-execute', '/swarm-review']) {
        expect(screen.getAllByText(command).length).toBeGreaterThan(0)
      }
    })
  })

  describe('technical explainer', () => {
    it('renders the six component cards', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const cardTitles = [
        '10 commands',
        '5 worker types',
        '24 skills',
        'Layered rules',
        'Fail-soft safety hooks',
        '4 MCP servers',
      ]
      for (const title of cardTitles) {
        expect(screen.getByRole('heading', { level: 3, name: title })).toBeInTheDocument()
      }
    })

    it('renders the enforcement ladder from advisory to binding', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /the enforcement ladder/i })
      ).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /prose rules/i })).toBeInTheDocument()
      expect(screen.getByRole('heading', { name: /permission denials \+ ci/i })).toBeInTheDocument()
      for (const strength of ['Advisory', 'On demand', 'Deterministic', 'Binding']) {
        expect(screen.getByText(strength)).toBeInTheDocument()
      }
    })

    it('renders the stats strip labels', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getByText('Commands')).toBeInTheDocument()
      expect(screen.getByText('Worker types')).toBeInTheDocument()
      expect(screen.getByText('MCP servers')).toBeInTheDocument()
      // 'Skills' is both a stats label and an enforcement-ladder rung
      expect(screen.getAllByText('Skills')).toHaveLength(2)
    })
  })

  describe('dogfooding', () => {
    it('renders the dogfooding section with the framework version', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(
        screen.getByRole('heading', { level: 2, name: /this site is the lab/i })
      ).toBeInTheDocument()
      expect(screen.getByText(/v3\.1\.0/)).toBeInTheDocument()
    })

    it('lists the quality gates', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getByText(/tsc --noEmit/)).toBeInTheDocument()
      expect(screen.getByText(/next build/)).toBeInTheDocument()
    })

    it('links to the related blog post', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const link = screen.getByRole('link', { name: /agent coordination structure/i })
      expect(link).toHaveAttribute('href', '/blog/agent-coordination')
    })
  })

  describe('installation', () => {
    it('renders the drop-in install commands', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getAllByText(/init-framework\.sh/).length).toBeGreaterThan(0)
    })

    it('mentions the plugin install alternative', () => {
      render(<ClaudeAgenticFrameworkPage />)
      expect(screen.getAllByText(/plugin install agentic-framework/i).length).toBeGreaterThan(0)
    })

    it('renders a second safe external link to the repository', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const link = screen.getByRole('link', { name: 'Explore the repository' })
      expect(link).toHaveAttribute('href', githubUrl)
      expect(link).toHaveAttribute('target', '_blank')
      expect(link).toHaveAttribute('rel', 'noopener noreferrer')
    })
  })

  describe('navigation', () => {
    it('renders the back to experiments hub link', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const backLink = screen.getByRole('link', { name: /back to experiments hub/i })
      expect(backLink).toBeInTheDocument()
      expect(backLink).toHaveAttribute('href', '/experiments')
    })
  })

  describe('accessibility', () => {
    it('is accessible', async () => {
      const { container } = render(<ClaudeAgenticFrameworkPage />)
      await axeTest(container)
    })

    it('has a single h1 heading', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const h1Elements = screen.getAllByRole('heading', { level: 1 })
      expect(h1Elements).toHaveLength(1)
    })

    it('all links have accessible names', () => {
      render(<ClaudeAgenticFrameworkPage />)
      const links = screen.getAllByRole('link')
      for (const link of links) {
        expect(link).toHaveAccessibleName()
      }
    })
  })
})
