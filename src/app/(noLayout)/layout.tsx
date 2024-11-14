import Providers from '@/app/provider';
import Header from '@/components/layouts/Header';

export default function CreateCardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <Providers>
      <Header />
      <main>{children}</main>
    </Providers>
  );
}
