import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

const SelectBox = ({
  onSelect,
  optionList,
  value,
  width,
  limitOptionHeight,
  backgroundColor,
}: {
  onSelect: (value: string) => void;
  optionList: string[];
  value: string;
  width: string;
  limitOptionHeight?: string;
  backgroundColor?: string;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const selectBoxRef = useRef<HTMLDivElement>(null);

  const handleSelect = (value: string) => {
    onSelect(value);
    setIsOpen(false);
  };

  const handleToggleSelect = () => {
    setIsOpen(!isOpen);
  };

  const handleClickOutside = (event: MouseEvent | TouchEvent) => {
    const isClickOutside = selectBoxRef.current && !selectBoxRef.current.contains(event.target as Node);
    if (isClickOutside) setIsOpen(false);
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, []);

  return (
    <>
      {isOpen && (
        <div
          className={`fixed inset-0 z-10`}
          style={{ backgroundColor: `${backgroundColor}`, opacity: 0.6 }}
          onClick={() => setIsOpen(false)}
        />
      )}
      <div
        ref={selectBoxRef}
        className={`relative ${width} border-[.5px] border-gray-300 ${isOpen ? 'rounded-t-[8px] bg-white z-50' : 'rounded-[8px]'} text-[12px] text-gray-400`}
      >
        <div
          onClick={handleToggleSelect}
          className='flex items-center justify-between w-full h-[32px] px-[8px]'
        >
          <span>{value}</span>
          <Image
            src='/assets/images/icons/expand_more.png'
            alt=''
            width={24}
            height={24}
          />
        </div>
        <ul
          className={`${isOpen ? 'block' : 'hidden'} absolute w-full overflow-y-auto rounded-b-[8px] border-x-[.5px] border-b-[.5px]`}
          style={{ height: `${limitOptionHeight}` }}
        >
          {optionList.map((option) => (
            <li
              key={option}
              onClick={() => {
                handleSelect(option);
              }}
              className={`${value === option ? 'bg-primary-300 text-white' : 'bg-white text-gray-400'} flex items-center w-full h-[32px] px-[8px] border-t-[.5px] border-t-gray-300`}
            >
              {option}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default SelectBox;
