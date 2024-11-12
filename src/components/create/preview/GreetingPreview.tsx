import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import Greeting from '@/components/card/Greeting';

const GreetingPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const [greetingMessage, fontInfo] = useWatch({
    control,
    name: ['greetingMessage', 'fontInfo'],
  });

  return (
    <Greeting
      greetingMessage={greetingMessage}
      fontInfo={fontInfo}
    />
  );
};

export default GreetingPreview;
