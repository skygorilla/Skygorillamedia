import { MetadataRoute } from 'next';

const routes = [
  { path: '/', priority: 1, changeFreq: 'daily' as const },
  { path: '/pitch', priority: 0.8, changeFreq: 'weekly' as const },
  { path: '/devtools', priority: 0.3, changeFreq: 'monthly' as const },
  { path: '/devtools/sitemap', priority: 0.2, changeFreq: 'monthly' as const },
  { path: '/devtools/console', priority: 0.2, changeFreq: 'monthly' as const },
  { path: '/devtools/network', priority: 0.2, changeFreq: 'monthly' as const },
];

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://glasotoka.com';
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  return routes.map(route => ({
    url: `${baseUrl}${route.path}`,
    lastModified,
    changeFrequency: route.changeFreq,
    priority: route.priority,
  }));
}
