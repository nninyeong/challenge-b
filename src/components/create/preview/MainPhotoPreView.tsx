import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import MainPhoto from '@/components/card/MainPhoto';
import { useEffect, useRef } from 'react';
import EventBus from '@/utils/EventBus';
import captureMainPhotoToPng from '@/utils/captureMainPhotoToPng';

const MainPhotoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const mainPhotoInfo = useWatch({
    control,
    name: 'mainPhotoInfo',
  });

  const svgBgColor = useWatch({
    control,
    name: 'bgColor',
  });

  const mainViewType = useWatch({
    control,
    name: 'mainView',
  });

  const stickers = useWatch({
    control,
    name: 'stickers',
  });

  const mainPhotoRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const captureAndSendImage = async () => {
      await captureMainPhotoToPng(mainPhotoRef);
    };

    EventBus.subscribe('invitationSaved', captureAndSendImage);

    return () => {
      EventBus.unsubscribe('invitationSaved', captureAndSendImage);
    };
  }, []);

  return (
    <MainPhoto
      ref={mainPhotoRef}
      mainPhotoInfo={mainPhotoInfo}
      bgColor={svgBgColor}
      mainView={mainViewType}
      stickers={stickers}
    />
  );
};

export default MainPhotoPreView;
