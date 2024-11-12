'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';
import Error from 'next/error';
import Button from '@/components/ui/Button';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const { refresh } = useRouter();
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <html>
      <body>
        <div>
          <h2>{`:(`}</h2>
          <h3>에러 메세지: {error.digest}</h3>
          <Button
            onClick={() => {
              reset();
              refresh();
            }}
          >
            다시 시도
          </Button>
        </div>
      </body>
    </html>
  );
};
export default GlobalError;
