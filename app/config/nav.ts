export interface NavItem {
  name: string
}

export const navItems: Record<string, NavItem> = {
  '/': {
    name: 'home',
  },

  '/blog': {
    name: 'blog',
  },

  '/experiments': {
    name: 'experiments',
  },

  '/career-guidance': {
    name: 'career',
  },
}
