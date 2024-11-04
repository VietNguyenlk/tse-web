import dayjs from "dayjs";
import { IBaseModel } from "./base.model";
import { ActivityScope, ActivityStatus, ActivityType } from "./enums/activity.enum";

export interface IActivity extends IBaseModel {
  activityId?: number;
  title?: string;
  description?: string | null;
  limitPeople?: number;
  timeOpenRegister?: dayjs.Dayjs | null;
  timeCloseRegister?: dayjs.Dayjs | null;
  startTime?: dayjs.Dayjs | null;
  // need endTime
  venue?: string;
  activityType?: keyof typeof ActivityType | null;
  activityStatus?: keyof typeof ActivityStatus | null;
  activityScope?: keyof typeof ActivityScope | null;
}

export const defaultValue: Readonly<IActivity> = {};
