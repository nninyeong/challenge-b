import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';

const GreetingPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const greetingMessage = useWatch({
    control,
    name: 'greetingMessage',
  });

  return (
    <div className='text-black  flex flex-col justify-center items-center'>
      {!greetingMessage.title ? <p>제목을 입력해주세요</p> : <p>{greetingMessage.title}</p>}
      <div
        dangerouslySetInnerHTML={{
          __html: greetingMessage?.content || '대표문구를 작성해주세요',
        }}
      ></div>
    </div>
  );
};

export default GreetingPreview;
