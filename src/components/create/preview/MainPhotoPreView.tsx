import { InvitationFormType } from '@/types/invitationFormType.type';
import { Control, useWatch } from 'react-hook-form';
import MainPhoto from '@/components/card/MainPhoto';
import { useEffect, useRef } from 'react';
import { supabase } from '@/utils/supabase/createClient';
import EventBus from '@/utils/EventBus';
import { createClient } from '@/utils/supabase/client';
import { toPng } from 'html-to-image';

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
      const client = createClient();
      const { data, error } = await client.auth.getUser();

      if (!mainPhotoRef.current) {
        console.log('mainPhotoRef 없음');
        return;
      }

      const originalZindex = mainPhotoRef.current.style.zIndex;
      mainPhotoRef.current.style.zIndex = '9999';
      mainPhotoRef.current.scrollIntoView({ behavior: 'auto', block: 'start' });

      try {
        const dataUrl = await toPng(mainPhotoRef.current, {
          cacheBust: true,
          backgroundColor: 'rgba(0, 0, 0, 0)',
          width: mainPhotoRef.current.offsetWidth,
          height: mainPhotoRef.current.offsetHeight,
          pixelRatio: 1,
        });
        const { error } = await supabase.from('thumbnails').upsert({ url: dataUrl }).eq('user_id', data.user?.id);

        if (error) {
          console.error(error);
        }
      } catch (error) {
        console.error(error);
      } finally {
        mainPhotoRef.current.style.zIndex = originalZindex;
      }
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
