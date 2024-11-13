import { MetadataRoute } from 'next';

const robots = (): MetadataRoute.Robots => {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/mypage/', '/card/'],
    },
    sitemap: 'http://www.dream-card.co.kr/sitemap.xml',
  };
};

export default robots;
