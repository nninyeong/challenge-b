import { InvitationFormType } from '@/types/invitationFormType.type';

type GreetingPropType = Pick<InvitationFormType, 'greetingMessage'>;
const Greeting = ({ greetingMessage }: GreetingPropType) => {
  return (
    <div className={`text-black  flex flex-col justify-center items-center mt-13 gap-6`}>
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
