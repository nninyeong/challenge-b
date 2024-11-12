import { getReview } from '@/utils/getReview';
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const reviews = await getReview({ pageParam: 0, ROW: 100 });

  const dynamicRoutes = reviews.map((review) => ({
    url: `http://www.dream-card.co.kr/review/${review.id}`,
    lastModified: new Date(review.created_at),
    priority: 0.7,
  }));

  return [
    {
      url: 'http://www.dream-card.co.kr',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: 'https://acme.com/create/card',
      lastModified: new Date().toISOString().split('T')[0],
      changeFrequency: 'always',
      priority: 0.5,
    },
    ...dynamicRoutes,
  ];
}
