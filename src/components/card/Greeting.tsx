'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { useFontStore, useFontColorStore } from '@/store/useFontStore';
type GreetingPropType = Pick<InvitationFormType, 'greetingMessage'>;
const Greeting = ({ greetingMessage }: GreetingPropType) => {
  const fontSize = useFontStore((state) => state.fontSize);
  const fontColor = useFontColorStore((state) => state.fontColor);
  const rgbaColor = `rgba(${fontColor.r}, ${fontColor.g}, ${fontColor.b}, ${fontColor.a})`;
  return (
    <div
      style={{ fontSize: `${16 + fontSize}px`, color: `${rgbaColor}` }}
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
