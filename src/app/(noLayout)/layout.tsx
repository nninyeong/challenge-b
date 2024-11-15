import Header from '@/components/layouts/Header';
import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/hooks/queries/queryKeys';
import { fetchAllStickerImages } from '@/hooks/queries/useGetCategorizedStickers';

export default async function CreateCardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        staleTime: 60 * 60 * 24 * 1000,
      },
    },
  });

  await queryClient.prefetchQuery({
    queryKey: QUERY_KEYS.stickerImages(),
    queryFn: fetchAllStickerImages,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Header />
      <main>{children}</main>
    </HydrationBoundary>
  );
}
