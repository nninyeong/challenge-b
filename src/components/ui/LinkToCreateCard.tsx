import Link from 'next/link';
import Button from '@/components/ui/Button';

const LinkToCreateCard = ({ buttonStyle }: { buttonStyle?: string }) => {
  return (
    <Link href='/create/card'>
      <button
        type='button'
        className={buttonStyle}
      >
        청첩장 제작하기
      </button>
    </Link>
  );
};

export default LinkToCreateCard;
