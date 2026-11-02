import { MetadataRoute } from 'next';

export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = 'https://operationsindoorcricketcup.com';

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/registration/fail', '/registration/success'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
