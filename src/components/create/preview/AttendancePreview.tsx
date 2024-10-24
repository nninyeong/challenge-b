"use client"

import AttendanceButton from "@/app/components/AttendanceButton";
import { FormType } from "@/app/create/card/page";
import { Control, useWatch } from "react-hook-form";

const AttendancePreview = ({ control }: { control: Control<FormType> }) => {
  const showAttendanceButton = useWatch({
    control,
    name: 'showAttendanceButton',
  });
  return <>{showAttendanceButton && <AttendanceButton />}</>;
};

export default AttendancePreview;