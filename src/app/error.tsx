'use client';
import UnexpectedError from '@/components/errors/UnexpectedError';

const Error = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  return (
    <UnexpectedError
      error={error}
      reset={reset}
    />
  );
};
export default Error;
