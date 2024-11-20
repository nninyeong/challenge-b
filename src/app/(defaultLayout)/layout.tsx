import Header from '@/components/layouts/Header';
import Footer from '@/components/layouts/Footer';
import { ReviewBottomSheetProvider } from '@/provider/reviewBottomSheetProvider';

export default function DefaultLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReviewBottomSheetProvider isReviewBottomSheetOpen={false}>
      <Header />
      <main className='desktop:mt-[86px] mt-[64px]'>{children}</main>
      <div id='modal'></div>
      <Footer />
    </ReviewBottomSheetProvider>
  );
}
