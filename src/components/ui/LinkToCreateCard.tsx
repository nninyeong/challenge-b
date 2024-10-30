import Link from 'next/link';
import Button from '@/components/ui/Button';

const LinkToCreateCard = ({ buttonStyle }: { buttonStyle?: string }) => {
  return (
    <Link href='/create/card'>
      <Button
        type='button'
        className={`${buttonStyle} rounded-[12px]`}
      >
        청첩장 제작하기
      </Button>
    </Link>
  );
};

export default LinkToCreateCard;
