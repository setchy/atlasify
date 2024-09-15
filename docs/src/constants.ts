export const SITE_URL = import.meta.env.SITE_URL || 'http://localhost:3000';

export const siteMetadata = {
  title: 'Atlasify',
  description: 'Your Atlassian notifications on your menu bar.',
  keywords:
    'atlasify,desktop,application,atlassian,notifications,unread,menu bar,electron,open source,setchy,mac,osx',
  author: '@setchy',
  menuLinks: [
    {
      name: 'Home',
      path: '/',
    },
    {
      name: 'FAQ',
      path: '/faq',
    },
  ],
};

export const manifest = {
  name: 'Atlasify',
  short_name: 'starter',
  themeColor: '#24292e',
  display: 'minimal-ui',
};
