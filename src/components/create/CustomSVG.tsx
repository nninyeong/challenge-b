import { ColorType } from '@/types/invitationFormType.type';
import colorConverter from '@/utils/colorConverter';

export const ArchSvg = ({ color }: { color: ColorType }) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 343 172'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='xMinYMin meet'
      style={{ display: 'block' }}
    >
      <path
        fillRule='evenodd'
        clipRule='evenodd'
        d='M171.5 0C76.7832 0 0 76.7832 0 171.5V0H171.5ZM171.5 0H343V171.5C343 76.7832 266.217 0 171.5 0Z'
        fill={colorConverter(color)}
      />
    </svg>
  );
};

export const EllipseSvg = ({ color }: { color: ColorType }) => {
  return (
    <svg
      width='100%'
      height='100%'
      viewBox='0 0 343 448'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      preserveAspectRatio='none'
    >
      <path
        className='stroke-none'
        fill-rule='evenodd'
        clip-rule='evenodd'
        d='M171.5 0C76.7832 0 0 76.7832 0 171.5V0H171.5ZM343 171.5C343 76.7832 266.217 0 171.5 0H343V171.5ZM343 276.5C343 371.217 266.217 448 171.5 448C76.7832 448 0 371.217 0 276.5V448H171.5H343V276.5Z'
        fill={colorConverter(color)}
      />
    </svg>
  );
};
