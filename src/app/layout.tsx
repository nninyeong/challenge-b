import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/app/provider';
import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import Script from 'next/script';
import SetScreenHeight from '@/components/layouts/SetScreenHeight';
import { ReviewBottomSheetProvider } from '@/provider/reviewBottomSheetProvider';
import DndProviderWrapper from '@/components/layouts/DndProvider';
import { MOBILE_VIEW_WIDTH } from '@/constants/screenSize';

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
    <html lang='en'>
      <head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximun-scale=1.0, user-scalable=no'
        />
      </head>
      <body
        className={`${SUIT.variable} font-main antialiased flex flex-col min-h-[calc(var(--vh)_*_100)] max-w-[${MOBILE_VIEW_WIDTH}] mx-auto bg-gray-100 overflow-x-hidden`}
      >
        <Script
          src={`//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.NEXT_KAKAOAPP_KEY}&libraries=services&autoload=false`}
          strategy='beforeInteractive'
        />
        <SetScreenHeight />
        <Providers>
          <ReviewBottomSheetProvider isReviewBottomSheetOpen={false}>
            <div className='w-full h-full flex-1 bg-white'>
              <DndProviderWrapper>{children}</DndProviderWrapper>
            </div>
            <div id='modal'></div>
          </ReviewBottomSheetProvider>
        </Providers>
      </body>
    </html>
  );
}
