import browserClient from '@/utils/supabase/client';
import { useState } from 'react';

const useAttendanceModal = (invitationId: string, closeModal: () => void) => {
  const [personType, setPersonType] = useState('');
  const [mealOption, setMealOption] = useState('');
  const [name, setName] = useState('');
  const [attendanceCount, setAttendanceCount] = useState<number | ''>('');

  const handlePersonTypeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPersonType(e.target.value);
  };

  const handleMealOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMealOption(e.target.value);
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleAttendanceCountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(e.target.value);
    if (value >= 0 && value <= 100) {
      setAttendanceCount(value);
    } else if (e.target.value === '') {
      setAttendanceCount('');
    }
  };

  const handleAttendanceModalSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!personType || !mealOption || !name || attendanceCount === '') {
      alert('모든 정보를 입력해주세요.');
      return;
    }

    const { error } = await browserClient.from('attendance').insert([
      {
        invitation_id: invitationId,
        division: personType,
        name: name,
        person_count: attendanceCount,
        whether_food: mealOption === '예정',
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
    personType,
    mealOption,
    name,
    attendanceCount,
    handlePersonTypeChange,
    handleMealOptionChange,
    handleNameChange,
    handleAttendanceCountChange,
    handleAttendanceModalSubmit,
  };
};

export default useAttendanceModal;
