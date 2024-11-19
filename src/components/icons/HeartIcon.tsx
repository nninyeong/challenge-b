type HeartIconProps = {
  isLiked: boolean;
  signedUserId: string | undefined;
};

const HeartIcon = ({ isLiked, signedUserId }: HeartIconProps) => {
  return (
    <svg
      className='desktop:w-[18px] desktop:h-[18px] w-[16px] h-[17px]'
      viewBox='0 0 16 15'
      fill={`${signedUserId && isLiked ? '#ff6666' : '#ffffff'}`}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M1.85481 2.6547C2.52991 1.97981 3.44542 1.60067 4.40001 1.60067C5.3546 1.60067 6.27011 1.97981 6.94521 2.6547L7.29321 3.0024C7.68366 3.39252 8.31636 3.39252 8.70682 3.0024L9.05481 2.6547C9.3869 2.31086 9.78414 2.03661 10.2234 1.84794C10.6626 1.65926 11.135 1.55995 11.613 1.5558C12.091 1.55165 12.565 1.64273 13.0074 1.82374C13.4499 2.00475 13.8518 2.27207 14.1898 2.61008C14.5278 2.94809 14.7952 3.35004 14.9762 3.79247C15.1572 4.23489 15.2483 4.70894 15.2441 5.18695C15.24 5.66495 15.1406 6.13734 14.952 6.57656C14.7633 7.01577 14.489 7.41301 14.1452 7.7451L8.70717 13.1839C8.31663 13.5745 7.68339 13.5745 7.29285 13.1839L1.85481 7.7451C1.17992 7.07 0.800781 6.15449 0.800781 5.1999C0.800781 4.24531 1.17992 3.3298 1.85481 2.6547Z'
        stroke='url(#paint0_linear_2183_10102)'
        strokeWidth='1.5'
        strokeLinejoin='round'
      />
      <defs>
        <linearGradient
          id='paint0_linear_2183_10102'
          x1='8.02259'
          y1='0.97742'
          x2='8.02259'
          y2='14.4694'
          gradientUnits='userSpaceOnUse'
        >
          <stop stopColor='#FF9999' />
          <stop
            offset='1'
            stopColor='#FF6666'
          />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default HeartIcon;
