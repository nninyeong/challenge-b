'use client';
import UnexpectedError from '@/components/errors/UnexpectedError';
import { useEffect } from 'react';
import * as Sentry from '@sentry/nextjs';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  useEffect(() => {
    Sentry.captureException(error);
    console.error(error);
  }, [error]);

  return (
    <UnexpectedError
      error={error}
      reset={reset}
    />
  );
};
export default Error;
