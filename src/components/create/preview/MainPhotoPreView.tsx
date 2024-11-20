'use client';
import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import MainPhoto from '@/components/card/MainPhoto';
import { useRef } from 'react';

const MainPhotoPreView = ({ control }: { control: Control<InvitationFormType> }) => {
  const [mainPhotoInfo, svgBgColor, mainViewType, stickers, fontInfo] = useWatch({
    control,
    name: ['mainPhotoInfo', 'bgColor', 'mainView', 'stickers', 'fontInfo'],
  });

  const mainPhotoRef = useRef<HTMLDivElement | null>(null);

  return (
    <MainPhoto
      ref={mainPhotoRef}
      mainPhotoInfo={mainPhotoInfo}
      bgColor={svgBgColor}
      mainView={mainViewType}
      stickers={stickers}
      fontInfo={fontInfo}
    />
  );
};

export default MainPhotoPreView;
