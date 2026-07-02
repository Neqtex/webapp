import { MetadataRoute } from 'next';
import { INDUSTRIES } from '@/lib/constants';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://neqtex.com';
  const lastModified = new Date().toISOString().split('T')[0];

  const primary: MetadataRoute.Sitemap = [
    { url: baseUrl, changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/solutions`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/private-ai`, changeFrequency: 'monthly', priority: 0.9 },
    {
      url: `${baseUrl}/small-language-models`,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    { url: `${baseUrl}/industries`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/research`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${baseUrl}/how-it-works`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/assessment`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/contact`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/request-form`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${baseUrl}/terms`, changeFrequency: 'yearly', priority: 0.3 },
  ];

  const industryRoutes: MetadataRoute.Sitemap = INDUSTRIES.map((industry) => ({
    url: `${baseUrl}/industries/${industry.slug}`,
    changeFrequency: 'monthly',
    priority: 0.7,
  }));

  return [...primary, ...industryRoutes].map((entry) => ({
    ...entry,
    lastModified,
  }));
}
