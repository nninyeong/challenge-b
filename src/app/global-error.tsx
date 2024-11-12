'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const GlobalError = ({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) => {
  const { refresh } = useRouter();
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div>
      <h2>{`:(`}</h2>
      <h3>에러 메세지: {error.message}</h3>
      <button
        onClick={() => {
          reset();
          refresh();
        }}
      >
        다시 시도
      </button>
    </div>
  );
};
export default GlobalError;
