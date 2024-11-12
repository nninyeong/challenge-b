import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from '@/app/provider';
import { ReviewBottomSheetProvider } from '@/provider/reviewBottomSheetProvider';
import DndProviderWrapper from '@/components/layouts/DndProvider';
import InitClientSettings from '@/utils/settings/InitClientSettings';
import Script from 'next/script';

const SUIT = localFont({
  src: '../../public/assets/fonts/SUIT-Variable.ttf',
  variable: '--font-suit',
  weight: '100 900',
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_DOMAIN as string),
  openGraph: {
    images: [
      {
        url: '/opengraph-image',
      },
    ],
  },
  title: '드림카드 | 나만의 모바일 청첩장',
  description: '모바일 청첩장을 직접 제작하고 커스텀할 수 있는 서비스입니다. 소중한 날을 더 특별하게 만들어보세요!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang='en'
      className='overflow-x-hidden'
    >
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
        />
        <meta
          name='google-site-verification'
          content='fZ2v9PdapWDy5-avIG7z7jgsuGEu3iUiwxxgqyGZHEc'
        />
      </head>
      <body
        className={`${SUIT.variable} font-main antialiased flex flex-col min-h-[calc(var(--vh)_*_100)] mobile:max-w-mobile desktop:max-w-desktop mx-auto bg-gray-100`}
      >
        {/* GA4 스크립트 로드 */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_TRACKING_ID}`}
          strategy='afterInteractive'
        />
        {/* GA4 초기화 및 페이지 추적 설정 */}
        <Script
          id='ga-init'
          strategy='afterInteractive'
        >
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '${process.env.NEXT_PUBLIC_GA_TRACKING_ID}', {
              page_path: window.location.pathname,
            });
          `}
        </Script>
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAOAPP_KEY}&libraries=services&autoload=false`}
          strategy='beforeInteractive'
        />
        <Providers>
          <ReviewBottomSheetProvider isReviewBottomSheetOpen={false}>
            <div className='w-full h-full flex-1 bg-white desktop:flex-col desktop:justify-center desktop:items-center'>
              <DndProviderWrapper>
                <InitClientSettings>{children}</InitClientSettings>
              </DndProviderWrapper>
            </div>
            <div id='modal'></div>
          </ReviewBottomSheetProvider>
        </Providers>
      </body>
    </html>
  );
}
