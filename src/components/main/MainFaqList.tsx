import { useState } from 'react';
import { FaChevronDown, FaChevronUp } from 'react-icons/fa';
import FaqCard from './FaqCard';

const FAQ_LIST = [
  {
    id: 0,
    question: '내가 만든 청첩장 어디서 확인하나요?',
    answer: `
      청첩장은 "마이페이지"의 "미리보기"에서 확인할 수 있습니다.
      로그인 후 확인 가능합니다.
    `.trim(),
  },
  {
    id: 1,
    question: '제작 이후 수정 가능한가요?',
    answer: `
      제작 이후에도 자유롭게 수정이 가능합니다.
      "마이페이지"의 "수정하기"에서 수정할 수 있습니다.
    `.trim(),
  },
  {
    id: 2,
    question: '글씨 크기, 글씨체 변경 가능한가요?',
    answer: `
      제작하기에서 글씨체, 글씨 크기를 변경하실 수 있습니다.
    `.trim(),
  },
  {
    id: 3,
    question: '참석여부 현황은 어디서 확인하나요?',
    answer: `
      "마이페이지"의 "방문객 명단 다운로드"를 통하여 엑셀로 다운 받아서 확인하실 수 있습니다.
      청첩장을 제작하고 그 청첩장에 작성되는 참석여부 현황만 다운로드 하실 수 있습니다.
    `.trim(),
  },
  {
    id: 4,
    question: '사진은 몇장까지 추가 가능한가요?',
    answer: `
      메인사진 1장
      갤러리사진 18장
      
      최대 19장까지 추가 가능합니다:)
    `.trim(),
  },
  {
    id: 5,
    question: '제작중 나가더라도 저장이 되나요?',
    answer: `
      제작하기 페이지에서 3초 이상 입력 없이 머무르거나, 다음 버튼을 누르고 나가면 자동으로 저장됩니다.
    `.trim(),
  },
  {
    id: 6,
    question: '제작 후 소장이 가능한가요?',
    answer: `
      청첩자을 http링크로는 별도 소장이 불가능합니다.
      다만 pdf로 다운로드를 하여 소장은 가능합니다.
    `.trim(),
  },
  {
    id: 7,
    question: '비공개한 청첩장이 왜 보이나요?',
    answer: `
      청첩장을 비공개로 설정하더라도 작성자는 미리보기 페이지에서 청첩장을 확인하실 수 있습니다.
      공개 · 비공개 여부는 작성자 이외 다른 사용자들이 접근할 수 있는지 확인하는 사항입니다.
    `.trim(),
  },
  {
    id: 8,
    question: '청첩장 내용만 보이게 다운받을 수 있나요?',
    answer: `
      디데이 · 참석의사 · RSVP를 잠시 사용안함으로 변경하고 다운로드를 진행하시면 깔끔하게 다운로드가 가능합니다.
      기존에 작성한 참석의사 정보는 삭제되지 않으니 크게 걱정하지 않으셔도 괜찮습니다:)
    `.trim(),
  },
];

const MainFaqList = () => {
  const [expandedIds, setExpandedIds] = useState(new Set());

  const toggleFAQ = (id: number) => {
    setExpandedIds((prevExpandedIds) => {
      const newExpandedIds = new Set(prevExpandedIds);
      if (newExpandedIds.has(id)) {
        newExpandedIds.delete(id);
      } else {
        newExpandedIds.add(id);
      }
      return newExpandedIds;
    });
  };
  return (
    <div className='-mx-4'>
      <div className='text-[20px] font-main font-bold mt-8 py-6 px-4'>드림카드, 자주 묻는 질문</div>
      <ul className='flex flex-col gap-4 items-center'>
        {FAQ_LIST.map((menu) => (
          <li
            key={menu.id}
            className='w-full cursor-pointer flex flex-col items-center'
            onClick={() => toggleFAQ(menu.id)}
          >
            <div className='w-full flex justify-between items-center border border-solid border-l-0 border-r-0 border-t-0 border-gray-200 p-2 px-4'>
              {menu.question}
              {expandedIds.has(menu.id) ? (
                <FaChevronUp className='text-gray-700' />
              ) : (
                <FaChevronDown className='text-gray-700' />
              )}
            </div>
            {expandedIds.has(menu.id) && <FaqCard answer={menu.answer} />}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MainFaqList;