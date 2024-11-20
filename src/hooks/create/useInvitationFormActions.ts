'use client';
import { useEffect, useRef } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { useGetInvitationQuery } from '@/hooks/queries/invitation/useGetInvitationQuery';
import { useUpdateInvitation } from '@/hooks/queries/invitation/useUpdateInvitation';
import { useInsertInvitation } from '@/hooks/queries/invitation/useInsertInvitation';
import { useRouter } from 'next/navigation';
import { Notify } from 'notiflix';
import { debounce } from '@/utils/debounce';
import { InvitationFormType } from '@/types/invitationFormType.type';
import browserClient from '@/utils/supabase/client';
import EventBus from '@/utils/EventBus';
import { loadFormData } from '@/utils/form/loadFormData';
import { INVITATION_DEFAULT_VALUE } from '@/constants/invitaionDefaultValue';
import { useQueryClient } from '@tanstack/react-query';
import { QUERY_KEYS } from '../queries/queryKeys';
import useMediaQuery from '../review/useMediaQuery';

export const DELAY_TIME = 300;
const SAVE_DELAY_TIME = 3000;

export const useInvitationFormActions = ({
  isNavigating,
  methods,
  goToNextStep,
  goToPreviousStep,
}: {
  isNavigating: { current: boolean };
  methods: UseFormReturn<InvitationFormType>;
  goToNextStep: () => void;
  goToPreviousStep: () => void;
}) => {
  const router = useRouter();
  const prevFormDataRef = useRef<string>('');
  const { reset } = methods;
  const { data: existingInvitation } = useGetInvitationQuery();
  const { mutate: updateInvitation } = useUpdateInvitation();
  const { mutate: insertInvitation } = useInsertInvitation();
  const queryClient = useQueryClient();
  const isDesktop = useMediaQuery('(min-width: 1440px)');

  useEffect(() => {
    if (existingInvitation === null) {
      const sessionData = sessionStorage.getItem('invitationFormData');
      if (sessionData) {
        reset(JSON.parse(sessionData));
      } else {
        reset(INVITATION_DEFAULT_VALUE);
      }
    } else {
      loadFormData({ existingInvitation, reset });
    }
  }, [existingInvitation, reset]);

  const onSubmit = async (invitationData: InvitationFormType) => {
    const { data: user } = await browserClient.auth.getUser();
    if (!user || !user.user) {
      sessionStorage.setItem('invitationFormData', JSON.stringify(invitationData));
      Notify.success('생성을 원하시면 로그인 해주세요!');
      router.push('/signin');
      return;
    }

    Notify.success('청첩장 생성을 시작합니다.');
    await EventBus.publish('invitationSaved', null);

    if (existingInvitation === null) {
      insertInvitation(invitationData);
    } else {
      updateInvitation(invitationData);
    }
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation() });
    Notify.success('청첩장이 성공적으로 제출되었습니다.');
    router.push('/mypage');
  };

  const handleDebouncedNext = debounce(async () => {
    isNavigating.current = true;
    const { data: user } = await browserClient.auth.getUser();
    const formData = methods.getValues();
    if (!user || !user.user) {
      sessionStorage.setItem('invitationFormData', JSON.stringify(formData));
    } else {
      if (existingInvitation === null) {
        insertInvitation(formData);
      } else {
        updateInvitation(formData);
      }
    }
    goToNextStep();
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation() });
    if (!isDesktop) isNavigating.current = false;
  }, DELAY_TIME);

  const handleDebouncedPrevious = debounce(() => {
    isNavigating.current = true;
    goToPreviousStep();
    if (!isDesktop) isNavigating.current = false;
  }, DELAY_TIME);

  const handleDebouncedSave = debounce(async () => {
    const { data: user } = await browserClient.auth.getUser();
    const formData = methods.getValues();
    const isInvitationModified = JSON.stringify(formData) !== prevFormDataRef.current;
    if (isInvitationModified) {
      if (!user || !user.user) {
        sessionStorage.setItem('invitationFormData', JSON.stringify(formData));
      } else {
        if (existingInvitation === null) {
          insertInvitation(formData);
        } else {
          updateInvitation(formData);
        }
      }
      prevFormDataRef.current = JSON.stringify(formData);
    }
    queryClient.invalidateQueries({ queryKey: QUERY_KEYS.invitation() });
  }, SAVE_DELAY_TIME);

  return {
    onSubmit,
    handleDebouncedNext,
    handleDebouncedPrevious,
    handleDebouncedSave,
  };
};
