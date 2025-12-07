import type React from 'react'

import Footer from '../components/footer'
import { Navbar } from '../components/nav'

export default function MainLayout({ children }: { children: React.ReactNode }): React.JSX.Element {
  return (
    <div className='antialiased max-w-xl mx-4 mt-8 lg:mx-auto'>
      <main className='flex-auto min-w-0 mt-6 flex flex-col px-2 md:px-0'>
        <Navbar />
        {children}
        <Footer />
      </main>
    </div>
  )
}
