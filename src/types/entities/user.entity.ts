import dayjs from "dayjs";
import { UserFaculty, UserStatus, UserType } from "../enums/user.enum";

export interface UserEntity {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: keyof typeof UserStatus | null;
  registerDate: dayjs.Dayjs;
  phoneNumber: string | null;
  userType: keyof typeof UserType | null;
  faculty: keyof typeof UserFaculty | null;
  className: string | null;
  cumulativeScore: number;
}
