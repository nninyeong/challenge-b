'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
type GreetingPropType = Pick<InvitationFormType, 'greetingMessage' | 'fontInfo'>;
const Greeting = ({ greetingMessage, fontInfo }: GreetingPropType) => {
  const { size, color } = fontInfo;
  const rgbaColor = `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;

  return (
    <div
      style={{ fontSize: `${16 + size}px`, color: `${rgbaColor}` }}
      className={`  flex flex-col justify-center items-center mt-13 gap-6 mb-[89px]`}
    >
      {!greetingMessage.title ? <p>제목을 입력해주세요</p> : <p>{greetingMessage.title}</p>}
      <div
        className='leading-9'
        dangerouslySetInnerHTML={{
          __html: greetingMessage?.content || '대표문구를 작성해주세요',
        }}
      ></div>
    </div>
  );
};

export default Greeting;
