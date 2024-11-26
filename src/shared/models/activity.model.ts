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
  isDeleted?: boolean;
}

export const activityFields: Record<keyof IActivity, string | null> = {
  activityId: null,
  name: "Tên hoạt động",
  description: null,
  capacity: null,
  hostName: "Người chủ trì",
  registeredNumber: null,
  timeOpenRegister: "Thời gian mở đăng ký",
  timeCloseRegister: "Thời gian đóng đăng ký",
  occurDate: "Ngày tổ chức",
  startTime: null,
  endTime: null,
  venueType: "Loại địa điểm",
  venue: null,
  activityType: "Loại hoạt động",
  activityStatus: "Trạng thái",
  activityScope: "Phạm vi",
  isDeleted: null,
  createdAt: "Thời gian tạo",
  deletedAt: null,
  updatedAt: "Cập nhật lần cuối",
};

export const defaultValue: Readonly<IActivity> = {};
