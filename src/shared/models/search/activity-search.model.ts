import { ActivityType } from "../enums/activity.enum";

export interface IActivitySearchModel {
  searchText?: string;
  activityType?: string[];
  sortBy?: string;
}
