/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://jason-tieu.dev',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: ['/server-sitemap.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://jason-tieu.dev/sitemap.xml'],
  },
  transform: async (config, path) => {
    // Custom transform for each URL
    const priority = path === '/' ? 1.0 : path.includes('/projects') ? 0.9 : 0.8;
    const changefreq = path === '/' ? 'weekly' : 'monthly';

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
    };
  },
};
