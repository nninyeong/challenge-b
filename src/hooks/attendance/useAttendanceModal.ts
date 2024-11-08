import { attendanceSchema } from '@/lib/zod/attendanceSchema';
import { AttendanceFormData } from '@/types/guestInfo.types';
import browserClient from '@/utils/supabase/client';
import { zodResolver } from '@hookform/resolvers/zod';
import { Notify } from 'notiflix';
import { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';

const useAttendanceModal = (invitationId: string, closeModal: () => void, isCreate: boolean) => {
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<AttendanceFormData>({
    resolver: zodResolver(attendanceSchema),
    defaultValues: {
      personType: '신랑',
      mealOption: false,
      name: '',
      attendanceCount: undefined,
    },
  });

  const [selected, setSelected] = useState('신랑');

  const handleSelection = (value: string) => {
    setSelected(value);
  };

  const handleAttendanceModalSubmit: SubmitHandler<AttendanceFormData> = async (data) => {
    if (isCreate) {
      Notify.info('제작 페이지에서는 참석여부 작성이 불가능합니다');
      return;
    }

    const { personType, mealOption, name, attendanceCount } = data;

    const { error } = await browserClient.from('attendance').insert([
      {
        invitation_id: invitationId,
        division: personType,
        name,
        person_count: attendanceCount,
        whether_food: mealOption,
      },
    ]);

    if (error) {
      console.error('Error inserting data:', error);
      Notify.failure('참석 정보를 저장하는 중 오류가 발생했습니다.');
    } else {
      Notify.success('참석 정보가 저장되었습니다.');
      closeModal();
    }
  };

  return {
    selected,
    register,
    setValue,
    handleSubmit,
    watch,
    handleAttendanceModalSubmit,
    handleSelection,
    errors,
  };
};

export default useAttendanceModal;
