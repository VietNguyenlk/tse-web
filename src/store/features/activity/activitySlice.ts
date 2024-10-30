import {
  ActionReducerMapBuilder,
  createSlice,
  PayloadAction,
} from "@reduxjs/toolkit";
import { fetchAllActivities } from "./activityThunk";
import { BaseEntity } from "../../../configs/api.config";
import dayjs from "dayjs";

export enum ActivityType {
  CONTEST,
  SEMINAR,
  TRAINING,
}

export enum ActivityStatus {
  PLANED,
  OPENED,
  CLOSED,
  CANCELED,
}

export enum ActivityScope {}

export interface Activity extends BaseEntity {
  activityId: number;
  title: string;
  description: string;
  limitPeople: number;
  timeOpenRegister: dayjs.Dayjs;
  timeCloseRegister: dayjs.Dayjs;
  startTime: dayjs.Dayjs;
  // need endTime
  venue: string;
  activityType: keyof typeof ActivityType;
  activityStatus: keyof typeof ActivityStatus;
  activityScope: keyof typeof ActivityScope;
}

interface ActivityState {
  activities: Activity[];
  totalPages: number;
  totalItems: number;
  pageSize: number;
  currentPage: number;
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null;
}

const initialState: ActivityState = {
  activities: [],
  totalItems: 0,
  totalPages: 0,
  pageSize: 10,
  currentPage: 1,
  status: "idle",
  error: null,
};

export const activitySlice = createSlice({
  name: "activity",
  initialState,
  reducers: {
    setPageSize: (state, action: PayloadAction<number>) => {
      state.pageSize = action.payload;
      state.currentPage = 1;
    },
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<ActivityState>) => {
    builder
      .addCase(fetchAllActivities.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllActivities.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.activities = action.payload.items;
        state.totalItems = action.payload.totalItems;
        state.totalPages = action.payload.totalPages;
      })
      .addCase(fetchAllActivities.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || null;
      });
  },
});
