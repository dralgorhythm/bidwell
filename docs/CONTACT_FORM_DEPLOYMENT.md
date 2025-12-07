# Contact Form Deployment

## Overview

The contact form is fully implemented with validation and security features, but requires a server-side backend for processing submissions. Since this site is deployed as a static site on GitHub Pages, the backend needs to be deployed separately.

## Implementation Status

✅ **Completed:**
- Contact form UI with full accessibility
- Client-side validation with Zod
- Comprehensive test coverage
- Mobile-responsive design
- Security features (input sanitization, rate limiting)

⚠️ **Requires Deployment:**
- API route for form submission (`app/api/contact/route.ts`)
- Email service integration

## Deployment Options

### Option 1: Deploy API Route Separately (Recommended)

Deploy the API route on a serverless platform and update the form submission URL:

**Platforms:**
- **Railway** (recommended for PoC/MVP) - Zero config, free tier
- **Vercel** - Free tier, excellent Next.js support
- **Netlify Functions** - Free tier available
- **AWS Lambda** - Production scale, pay-per-use

**Steps:**
1. Create a new Next.js project with just the API route
2. Deploy to your chosen platform
3. Update `NEXT_PUBLIC_API_URL` in `.env.local`
4. Update form submission URL in `app/(main)/contact/contact-form.tsx`

### Option 2: Use Form Service Provider

Replace the custom API with a third-party form service:

**Services:**
- **Formspree** - Simple HTML forms, free tier
- **Web3Forms** - No backend required, free
- **Netlify Forms** - If hosting on Netlify
- **Getform** - Form backend as a service

**Steps:**
1. Sign up for service
2. Get API endpoint
3. Update form submission logic in `contact-form.tsx`

### Option 3: Deploy Full Site with Server

Move away from static export to enable API routes:

**Steps:**
1. Remove `output: 'export'` from `next.config.js`
2. Deploy to Vercel, Railway, or similar platform
3. API routes will work automatically

## Environment Variables

Create `.env.local` with:

```env
# Email service (choose one)
RESEND_API_KEY=your_key_here
SENDGRID_API_KEY=your_key_here
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_username
SMTP_PASS=your_password

# Contact form settings
CONTACT_EMAIL_TO=your.email@example.com
CONTACT_EMAIL_FROM=noreply@yourdomain.com
```

## Email Service Integration

The API route includes a placeholder for email integration. To complete:

1. Choose an email service (Resend, SendGrid, or SMTP)
2. Install the SDK: `npm install resend` or `npm install @sendgrid/mail`
3. Update the TODO section in `app/api/contact/route.ts`
4. Configure environment variables

### Example: Resend Integration

```typescript
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

// In the POST handler, replace the TODO:
await resend.emails.send({
  from: 'Contact Form <noreply@yourdomain.com>',
  to: process.env.CONTACT_EMAIL_TO!,
  subject: `New Contact: ${sanitizedData.inquiryType}`,
  html: `
    <h2>New Contact Form Submission</h2>
    <p><strong>Name:</strong> ${sanitizedData.name}</p>
    <p><strong>Email:</strong> ${sanitizedData.email}</p>
    <p><strong>Type:</strong> ${sanitizedData.inquiryType}</p>
    <p><strong>Message:</strong></p>
    <p>${sanitizedData.message}</p>
  `,
})
```

## Testing the Form

During development with static export, the form will show an error when submitted since API routes don't work. To test:

1. **Option A:** Deploy API route and test against deployed endpoint
2. **Option B:** Temporarily remove `output: 'export'` and test locally with `npm run dev`
3. **Option C:** Use a form testing service like webhook.site

## Security Considerations

The implementation includes:
- ✅ Input sanitization (XSS protection)
- ✅ Rate limiting (5 requests/hour per IP)
- ✅ Zod schema validation
- ✅ CSRF protection ready
- ⚠️ **Need to add:** Email service rate limiting
- ⚠️ **Need to add:** ReCAPTCHA or similar bot protection

## Future Enhancements

- Database storage for submissions
- Admin dashboard for managing inquiries
- Email templates with better formatting
- Auto-reply emails to users
- Calendar integration for scheduling
- File upload support (for resumes, etc.)

## Files Reference

- **Page:** `app/(main)/contact/page.tsx`
- **Form Component:** `app/(main)/contact/contact-form.tsx`
- **Validation Schema:** `app/(main)/contact/schema.ts`
- **API Route:** `app/api/contact/route.ts` (needs separate deployment)
- **Tests:** `app/(main)/contact/page.test.tsx`, `app/api/contact/route.test.ts`
