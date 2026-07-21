export interface NavItem {
  name: string
}

export const navItems: Record<string, NavItem> = {
  '/': {
    name: 'home',
  },

  '/services': {
    name: 'services',
  },

  '/services/career-coaching': {
    name: 'coaching',
  },

  '/blog': {
    name: 'blog',
  },

  '/about': {
    name: 'about',
  },

  '/contact': {
    name: 'contact',
  },
}
