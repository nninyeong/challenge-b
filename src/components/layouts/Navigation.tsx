'use client';
import Link from 'next/link';

const Navigation = ({ isAuthenticated }: { isAuthenticated: boolean }) => {
  return (
    <div>
      <Link href='/review'>후기</Link>
      {isAuthenticated ? (
        <>
          <Link href='/mypage'>마이페이지</Link>
        </>
      ) : (
        <Link href='/signin'>로그인</Link>
      )}
    </div>
  );
};

export default Navigation;
