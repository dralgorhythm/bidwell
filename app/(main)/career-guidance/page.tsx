import { redirectMetadata } from 'lib/redirects'
import RedirectPage from '../../components/redirect-page'

export const metadata = redirectMetadata('/career-guidance')

export default function CareerGuidanceRedirect() {
  return <RedirectPage from='/career-guidance' />
}
