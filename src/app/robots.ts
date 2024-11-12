import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage/', '/card/'],
    },
    sitemap: 'http://www.dream-card.co.kr/sitemap.xml',
  };
}
