import Link from 'next/link'
import type React from 'react'

import { serviceEntries } from '../config/services'

const siteLinks = [
  { name: 'About', href: '/about' },
  { name: 'Blog', href: '/blog' },
  { name: 'Experiments', href: '/experiments' },
  { name: 'Contact', href: '/contact' },
]

const socialLinks = [
  { name: 'linkedin', href: 'https://www.linkedin.com/in/wintersjordan/' },
  { name: 'github', href: 'https://github.com/dralgorhythm' },
  { name: 'soundcloud', href: 'https://soundcloud.com/dralgorhythm' },
]

function ArrowIcon(): React.JSX.Element {
  return (
    <svg width='12' height='12' viewBox='0 0 12 12' fill='none' xmlns='http://www.w3.org/2000/svg'>
      <title>Arrow</title>
      <path
        d='M2.07102 11.3494L0.963068 10.2415L9.2017 1.98864H2.83807L2.85227 0.454545H11.8438V9.46023H10.2955L10.3097 3.09659L2.07102 11.3494Z'
        fill='currentColor'
      />
    </svg>
  )
}

export default function Footer(): React.JSX.Element {
  return (
    <footer className='mb-16 mt-8'>
      <nav
        aria-label='Footer'
        className='grid gap-8 sm:grid-cols-3 border-t border-neutral-200 dark:border-neutral-800 pt-8 text-sm'
      >
        <div>
          <p className='mb-3 font-medium text-neutral-900 dark:text-neutral-100'>Services</p>
          <ul className='space-y-2 text-neutral-600 dark:text-neutral-300'>
            {serviceEntries.map(service => (
              <li key={service.href}>
                <Link
                  href={service.href}
                  className='transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
                >
                  {service.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className='mb-3 font-medium text-neutral-900 dark:text-neutral-100'>Site</p>
          <ul className='space-y-2 text-neutral-600 dark:text-neutral-300'>
            {siteLinks.map(link => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className='transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
                >
                  {link.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className='mb-3 font-medium text-neutral-900 dark:text-neutral-100'>Connect</p>
          <ul className='space-y-2 text-neutral-600 dark:text-neutral-300'>
            {socialLinks.map(link => (
              <li key={link.href}>
                <a
                  className='flex items-center transition-all hover:text-neutral-800 dark:hover:text-neutral-100'
                  rel='noopener noreferrer'
                  target='_blank'
                  href={link.href}
                >
                  <ArrowIcon />
                  <p className='ml-2 h-7'>{link.name}</p>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </nav>
      <p className='mt-8 text-sm text-neutral-600 dark:text-neutral-400'>
        Bidwell Consulting · Minneapolis, MN · Serving the Twin Cities metro
      </p>
    </footer>
  )
}
