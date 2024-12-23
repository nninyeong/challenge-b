type MessageIconProps = {
  color: string;
};

const MessageIcon = ({ color }: MessageIconProps) => {
  return (
    <svg
      width='24'
      height='24'
      viewBox='0 0 24 24'
      fill={color}
      xmlns='http://www.w3.org/2000/svg'
    >
      <path
        d='M3.6875 5.76838L12 12.7445L20.9062 5.76838M9.52566 12.0001L3.6875 18.4522M20.3125 17.9237L14.4736 12.0001M4.875 19.5C3.56332 19.5 2.5 18.3643 2.5 16.9632V7.03677C2.5 5.63575 3.56332 4.5 4.875 4.5H19.125C20.4367 4.5 21.5 5.63575 21.5 7.03676V16.9632C21.5 18.3643 20.4367 19.5 19.125 19.5H4.875Z'
        stroke={color}
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </svg>
  );
};

export default MessageIcon;
