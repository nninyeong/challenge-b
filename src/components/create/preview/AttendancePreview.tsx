"use client"

import AttendanceButton from "@/app/components/AttendanceButton";
import GuestBook from "@/app/components/GuestBook";
import { FormType } from "@/app/create/card/page";
import { Control, useWatch } from "react-hook-form";

const AttendancePreview = ({ control }: { control: Control<FormType> }) => {
  const attendanceButton = useWatch({
    control,
    name: 'attendance',
  });
  const guestBookButton = useWatch({
    control,
    name: 'guestbook',
  });
  return (
  <>
    {attendanceButton && <AttendanceButton />}
    {guestBookButton && <GuestBook />}
  </>
);
};

export default AttendancePreview;