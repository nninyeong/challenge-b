import './globals.css';
import type { Metadata } from 'next';
import localFont from 'next/font/local';
import Providers from '@/app/provider';
import Script from 'next/script';
import { ReviewBottomSheetProvider } from '@/provider/reviewBottomSheetProvider';
import DndProviderWrapper from '@/components/layouts/DndProvider';
import InitClientSettings from '@/utils/settings/InitClientSettings';

const SUIT = localFont({
  src: '../../public/assets/fonts/SUIT-Variable.ttf',
  variable: '--font-suit',
  weight: '100 900',
});

export const metadata: Metadata = {
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
          content='width=device-width, initial-scale=1.0, maximun-scale=1.0, user-scalable=no'
        />
      </head>
      <body
        className={`${SUIT.variable} font-main antialiased flex flex-col min-h-[calc(var(--vh)_*_100)] mobile:max-w-mobile desktop:max-w-desktop mx-auto bg-gray-100`}
      >
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
