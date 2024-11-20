import Link from 'next/link';
import { usePathname } from 'next/navigation';

const LinkToReviewPage = () => {
  const path = usePathname();

  return (
    <Link href='/review'>
      <button
        className={`w-[24px] h-[24px] desktop:w-[32px] desktop:h-[32px] ${path === '/review' ? 'bg-edit-contained-selected' : 'bg-edit-contained'} bg-cover`}
      />
    </Link>
  );
};

export default LinkToReviewPage;
