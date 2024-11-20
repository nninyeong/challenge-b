'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import colorConverter from '@/utils/colorConverter';
type GreetingPropType = Pick<InvitationFormType, 'greetingMessage' | 'fontInfo'>;
const Greeting = ({ greetingMessage, fontInfo }: GreetingPropType) => {
  const { size, color } = fontInfo;
  const rgbaColor = colorConverter(color);

  return (
    <div
      style={{ fontSize: `${20 + size}px`, color: `${rgbaColor}` }}
      className={`flex flex-col justify-center items-center mt-13 gap-6 mb-[89px] font-medium`}
    >
      {!greetingMessage.title ? <p>제목을 입력해주세요</p> : <p>{greetingMessage.title}</p>}
      <div
        style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
        className='leading-9'
        dangerouslySetInnerHTML={{
          __html: greetingMessage?.content || '대표문구를 작성해주세요',
        }}
      ></div>
    </div>
  );
};

export default Greeting;
