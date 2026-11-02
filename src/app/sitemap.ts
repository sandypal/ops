import { MetadataRoute } from 'next';
import { allTeamSlugs } from '@/data/teamsData';

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://operationsindoorcricketcup.com';

  const teamUrls: MetadataRoute.Sitemap = allTeamSlugs.map((slug) => ({
    url: `${baseUrl}/teams/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/registration`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...teamUrls,
  ];
}
