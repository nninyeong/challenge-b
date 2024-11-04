import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import Greeting from '@/components/card/Greeting';

const GreetingPreview = ({ control }: { control: Control<InvitationFormType> }) => {
  const greetingMessage = useWatch({
    control,
    name: 'greetingMessage',
  });

  return <Greeting greetingMessage={greetingMessage} />;
};

export default GreetingPreview;
