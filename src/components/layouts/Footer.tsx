const Footer = () => {
  return (
    <footer className='flex flex-col bg-gray-50 gap-[16px] desktop:gap-[24px] desktop:px-[152px] desktop:pt-[24px] desktop:pb-[108px] p-[16px] pb-[96px]'>
      <h1 className='desktop:text-[16px] text-[12px] text-gray-700 font-semibold'>서비스 소개</h1>
      <div className='flex flex-col gap-[8px] desktop:gap-[16px]'>
        <h2 className='desktop:text-[16px] text-[12px] text-gray-600 font-medium'>
          이용약관 ⦁ 개인정보취급방침 ⦁ 제휴ㆍ광고문의 ⦁ 고객센터
        </h2>
        <p className='desktop:text-[14px] text-[10px] text-gray-500'>
          법인명(상호) : 주식회사 드림카드 l 대표 : 도라에몽
          <br />
          사업자등록번호 안내 : 170-88-02659
          <br />
          통신판매업 신고 제 : 2024-라라라구-2322호
        </p>
        <p className='desktop:text-[14px] text-[10px] text-gray-500'>
          전화 : 010-5671-4281 l 이메일 : help@dreamcard.com
          <br /> 주소 : 서울특별시 노진구 퉁이로323번길 10-3, 202호
        </p>
      </div>
      <p className='text-center desktop:text-[14px] text-[10px] text-gray-700 font-medium'>
        Copyright ⓒ 드림카드 2024, All rights reserved
      </p>
    </footer>
  );
};

export default Footer;
