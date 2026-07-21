import type React from 'react'

/**
 * Renders a JSON-LD script tag. Schema objects come from the typed builders
 * in lib/structured-data.ts — this component only serializes.
 */
export default function JsonLd({ data }: { data: object }): React.JSX.Element {
  return (
    <script
      type='application/ld+json'
      // biome-ignore lint/security/noDangerouslySetInnerHtml: JSON-LD requires this
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  )
}
