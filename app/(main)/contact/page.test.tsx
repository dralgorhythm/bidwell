import { axeTest, render, screen, userEvent, waitFor } from 'lib/test-utils'
import { vi } from 'vitest'
import ContactPage from './page'

// Mock the fetch function
global.fetch = vi.fn()

describe('Contact Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('renders the contact page heading', () => {
    render(<ContactPage />)
    expect(screen.getByRole('heading', { level: 1, name: /get in touch/i })).toBeInTheDocument()
  })

  it('displays introductory text about response time', () => {
    render(<ContactPage />)
    expect(screen.getByText(/24-48 hours/i)).toBeInTheDocument()
  })

  it('renders the contact form', () => {
    render(<ContactPage />)
    expect(screen.getByRole('form', { name: /contact form/i })).toBeInTheDocument()
  })

  it('has all required form fields', () => {
    render(<ContactPage />)

    expect(screen.getByRole('textbox', { name: /name/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /email/i })).toBeInTheDocument()
    expect(screen.getByRole('combobox', { name: /what can i help you with/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /message/i })).toBeInTheDocument()
  })

  it('has optional form fields', () => {
    render(<ContactPage />)

    expect(screen.getByRole('textbox', { name: /phone/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /company/i })).toBeInTheDocument()
    expect(screen.getByRole('textbox', { name: /best time to contact/i })).toBeInTheDocument()
  })

  it('shows validation errors when submitting empty form', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    // Zod shows validation errors for empty form
    await waitFor(() => {
      // At least one error should be visible
      const errors = screen.queryAllByText(/invalid|required|expected/i)
      expect(errors.length).toBeGreaterThan(0)
    })
  })

  it('submits form successfully with valid data', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Thank you! Your message has been sent successfully.',
      }),
    } as Response)

    render(<ContactPage />)

    // Fill out the form
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe')
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com')
    await user.selectOptions(
      screen.getByRole('combobox', { name: /what can i help you with/i }),
      'Career Coaching Consultation'
    )
    await user.type(
      screen.getByRole('textbox', { name: /message/i }),
      'I need help with my career transition.'
    )

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(
        /thank you! your message has been sent successfully/i
      )
    })

    // Verify fetch was called correctly
    expect(mockFetch).toHaveBeenCalledWith(
      '/api/contact',
      expect.objectContaining({
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
      })
    )
  })

  it('displays error message on submission failure', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValueOnce({
      ok: false,
      json: async () => ({
        success: false,
        message: 'Something went wrong. Please try again.',
      }),
    } as Response)

    render(<ContactPage />)

    // Fill out the form
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe')
    await user.type(screen.getByRole('textbox', { name: /email/i }), 'john@example.com')
    await user.selectOptions(
      screen.getByRole('combobox', { name: /what can i help you with/i }),
      'Career Coaching Consultation'
    )
    await user.type(screen.getByRole('textbox', { name: /message/i }), 'Test message')

    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent(/something went wrong/i)
    })
  })

  it('shows character count for message field', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    const messageField = screen.getByRole('textbox', { name: /message/i })
    await user.type(messageField, 'Hello world')

    expect(screen.getByText(/11\/2000/i)).toBeInTheDocument()
  })

  it('clears field error when user starts typing', async () => {
    const user = userEvent.setup()
    render(<ContactPage />)

    // Submit empty form to trigger validation
    const submitButton = screen.getByRole('button', { name: /send message/i })
    await user.click(submitButton)

    await waitFor(() => {
      const errors = screen.queryAllByText(/invalid|required|expected/i)
      expect(errors.length).toBeGreaterThan(0)
    })

    // Fill in name field
    await user.type(screen.getByRole('textbox', { name: /name/i }), 'John Doe')

    // Name field error should be cleared
    await waitFor(() => {
      const nameInput = screen.getByRole('textbox', { name: /name/i })
      expect(nameInput).toHaveAttribute('aria-invalid', 'false')
    })
  })

  it('has proper ARIA attributes for required fields', () => {
    render(<ContactPage />)

    const nameField = screen.getByRole('textbox', { name: /name/i })
    expect(nameField).toHaveAttribute('aria-required', 'true')

    const emailField = screen.getByRole('textbox', { name: /email/i })
    expect(emailField).toHaveAttribute('aria-required', 'true')

    const messageField = screen.getByRole('textbox', { name: /message/i })
    expect(messageField).toHaveAttribute('aria-required', 'true')
  })

  it('is accessible', async () => {
    const { container } = render(<ContactPage />)
    await axeTest(container)
  })

  it('has all inquiry type options', () => {
    render(<ContactPage />)

    const inquirySelect = screen.getByRole('combobox', { name: /what can i help you with/i })

    expect(inquirySelect).toBeInTheDocument()
    expect(
      screen.getByRole('option', { name: /career coaching consultation/i })
    ).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /resume review services/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /interview preparation/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /leadership development/i })).toBeInTheDocument()
    expect(screen.getByRole('option', { name: /business partnership/i })).toBeInTheDocument()
  })

  it('resets form after successful submission', async () => {
    const user = userEvent.setup()
    const mockFetch = vi.mocked(global.fetch)
    mockFetch.mockResolvedValueOnce({
      ok: true,
      json: async () => ({
        success: true,
        message: 'Thank you!',
      }),
    } as Response)

    render(<ContactPage />)

    const nameField = screen.getByRole('textbox', { name: /name/i }) as HTMLInputElement
    const emailField = screen.getByRole('textbox', { name: /email/i }) as HTMLInputElement
    const messageField = screen.getByRole('textbox', { name: /message/i }) as HTMLTextAreaElement

    await user.type(nameField, 'John Doe')
    await user.type(emailField, 'john@example.com')
    await user.selectOptions(
      screen.getByRole('combobox', { name: /what can i help you with/i }),
      'Career Coaching Consultation'
    )
    await user.type(messageField, 'Test message')

    await user.click(screen.getByRole('button', { name: /send message/i }))

    await waitFor(() => {
      expect(screen.getByRole('alert')).toBeInTheDocument()
      expect(nameField.value).toBe('')
      expect(emailField.value).toBe('')
      expect(messageField.value).toBe('')
    })
  })
})
