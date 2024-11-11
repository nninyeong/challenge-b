'use client';

import * as Sentry from '@sentry/nextjs';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Button from '@/components/ui/Button';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const { refresh } = useRouter();

  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{`:(`}</h2>
      <h3>에러 메시지: {error.message}</h3>
      <Button
        onClick={() => {
          reset();
          refresh();
        }}
      >
        다시 시도
      </Button>
    </div>
  );
};

export default GlobalError;
