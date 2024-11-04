import dayjs from "dayjs";
import { UserFaculty, UserStatus, UserType } from "./enums/user.enum";
import { IBaseModel } from "./base.model";

export interface IUser extends IBaseModel {
  userId?: any;
  email?: string;
  firstName?: string;
  lastName?: string;
  status?: keyof typeof UserStatus | null;
  registerDate?: dayjs.Dayjs | null;
  phoneNumber?: string | null;
  userType?: keyof typeof UserType | null;
  faculty?: keyof typeof UserFaculty | null;
  className?: string | null;
  cumulativeScore?: number;
}

export const defaultValue: Readonly<IUser> = {
  userId: "",
  email: "",
  firstName: "",
  lastName: "",
  status: null,
  registerDate: null,
  phoneNumber: null,
  userType: null,
  faculty: null,
  className: null,
  cumulativeScore: 0,
  createdAt: null,
  updatedAt: null,
  deletedAt: null,
};
