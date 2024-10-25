import React from 'react';
import AttendanceButton from '../../components/attendance/AttendanceButton';
import GuestBook from '../../components/guestbook/GuestBook';

const ComponentTestpage = () => {
  return (
    <main className='bg-white text-black'>
      <AttendanceButton />
      <GuestBook />
      <div>컴포넌트 테스트 페이지 입니다.</div>
      <div>추후 component 위치가 확정되면 삭제할 예정입니다.</div>
    </main>
  );
};

export default ComponentTestpage;
