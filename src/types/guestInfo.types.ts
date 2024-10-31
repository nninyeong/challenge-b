import { attendanceSchema } from "@/lib/zod/attendanceSchema";
import { guestBookSchema } from "@/lib/zod/guestBookSchema";
import { z } from "zod";

export type GuestBookFormData = z.infer<typeof guestBookSchema>;
export type AttendanceFormData = z.infer<typeof attendanceSchema>;