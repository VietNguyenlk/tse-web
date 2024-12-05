import dayjs from "dayjs";
import { IBaseModel } from "./base.model";
import {
  ActivityScope,
  ActivityStatus,
  ActivityType,
  VenueType,
} from "./enums/activity.enum";

export interface IActivity extends IBaseModel {
  activityId?: number;
  name?: string;
  description?: string | null;
  capacity?: number;
  hostName?: string;
  registeredNumber?: number;
  timeOpenRegister?: dayjs.Dayjs | null | string;
  timeCloseRegister?: dayjs.Dayjs | null | string;
  occurDate?: dayjs.Dayjs | null | string;
  startTime?: dayjs.Dayjs | null | string;
  endTime?: dayjs.Dayjs | null | string;
  venueType?: keyof typeof VenueType | null;
  venue?: string;
  activityType?: keyof typeof ActivityType | null;
  activityStatus?: keyof typeof ActivityStatus | null;
  activityScope?: keyof typeof ActivityScope | null;
}

export const activityFields: Record<keyof IActivity, string | null> = {
  activityId: null,
  name: null,
  description: null,
  capacity: null,
  hostName: null,
  registeredNumber: null,
  timeOpenRegister: null,
  timeCloseRegister: "Ngày đóng đăng ký",
  occurDate: "Ngày tổ chức",
  startTime: null,
  endTime: null,
  venueType: null,
  venue: null,
  activityType: null,
  activityStatus: null,
  activityScope: null,
  isDeleted: null,
  createdAt: null,
  createdBy: null,
  deletedAt: null,
  updatedBy: null,
  updatedAt: "Cập nhật lần cuối",
};

export const defaultValue: Readonly<IActivity> = {};
