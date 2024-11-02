import { attendanceSchema } from "@/lib/zod/attendanceSchema";
import { AttendanceFormData } from "@/types/guestInfo.types";
import browserClient from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";

const useAttendanceModal = (invitationId: string, closeModal: () => void) => {
  const {
    register,
    handleSubmit,
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

  const handleAttendanceModalSubmit: SubmitHandler<AttendanceFormData> = async (data) => {
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
      alert('참석 정보를 저장하는 중 오류가 발생했습니다.');
    } else {
      alert('참석 정보가 저장되었습니다.');
      closeModal();
    }
  };

  return {
    register,
    handleSubmit,
    handleAttendanceModalSubmit,
    errors
  }
}

export default useAttendanceModal;