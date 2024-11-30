import {
  createAsyncThunk,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../../configs/api";
import { defaultValue, IActivity } from "../../../shared/models/activity.model";
import {
  convertDateFromServer,
  convertDateTimeFromServer,
  extractTimeFromDateTime,
} from "../../../shared/utils/date-utils";
import { cleanEntity } from "../../../shared/utils/entity-utils";
import {
  createEntitySlice,
  EntityState,
  serializeAxiosError,
} from "../../../shared/utils/reducers.utils";

const apiUrl = "/activities";

export interface ISearchActivity {
  searchText?: string;
  activityTypes?: string[];
  sortBy?: string;
}

const initState: EntityState<IActivity> = {
  entities: [],
  entity: defaultValue,
  loading: false,
  updating: false,
  updateSuccess: false,
  errorMessage: null,
  successMessage: null,
  totalItems: 0,
  totalPages: 0,
};

export type ActivityState = Readonly<typeof initState>;

// Async actions

export const getActivities = createAsyncThunk(
  "activity-management/fetchAllActivities",
  async (paginationParams?: PaginationRequestParams) => {
    const activityPaginationParams: PaginationRequestParams = {
      ...paginationParams,
      sortBy: "updatedAt",
      sortDirection: "DESC",
    };

    return await axiosInstance.get<ApiResponse<PaginatedResponse<IActivity>>>(
      apiUrl,
      { params: activityPaginationParams },
    );
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const searchActivities = createAsyncThunk(
  "activity-management/searchActivities",
  async (model: {
    searchActivityModel: ISearchActivity;
    pagingParams?: PaginationRequestParams;
  }) => {
    const activityPaginationParams: PaginationRequestParams = {
      sortDirection: "DESC",
      ...model.pagingParams,
    };
    return await axiosInstance.post<ApiResponse<PaginatedResponse<IActivity>>>(
      `${apiUrl}/list`,
      model.searchActivityModel,
      { params: activityPaginationParams },
    );
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const createActivity = createAsyncThunk(
  "activity-management/createActivity",
  async (activity: IActivity, thunkAPI) => {
    const copy: Partial<IActivity> = {
      ...activity,
      startTime: extractTimeFromDateTime(activity.startTime),
      endTime: extractTimeFromDateTime(activity.endTime),
      timeOpenRegister: convertDateTimeFromServer(activity.timeOpenRegister),
      timeCloseRegister: convertDateTimeFromServer(activity.timeCloseRegister),
      occurDate: convertDateFromServer(activity.occurDate),
    };
    const createdActivity = await axiosInstance.post<ApiResponse<IActivity>>(
      apiUrl,
      copy,
    );
    return createdActivity;
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const updateActivity = createAsyncThunk(
  "activity-management/updateActivity",
  async (activity: IActivity) => {
    const copy = {
      ...activity,
      startTime: extractTimeFromDateTime(activity.startTime),
      endTime: extractTimeFromDateTime(activity.endTime),
      timeOpenRegister: convertDateFromServer(activity.timeOpenRegister),
      timeCloseRegister: convertDateFromServer(activity.timeCloseRegister),
      occurDate: convertDateFromServer(activity.occurDate),
    };
    const updatedActivity = await axiosInstance.put<ApiResponse<IActivity>>(
      `${apiUrl}/${activity.activityId}`,
      cleanEntity(copy),
    );
    return updatedActivity;
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const deleteActivity = createAsyncThunk(
  "activity-management/deleteActivity",
  async (activityId: number) => {
    const deletedActivity = await axiosInstance.delete<ApiResponse<any>>(
      `${apiUrl}/${activityId}`,
    );
    return deletedActivity;
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice
export const ActivityManagementSlice = createEntitySlice({
  name: "activity",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(updateActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.updateSuccess = true;
        state.successMessage = action.payload.data.message;
        state.updating = false;
        console.log({ action });
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.unshift(action.payload.data.data);
        state.totalItems += 1;
        state.successMessage = action.payload.data.message;
        state.updateSuccess = true;
      })
      .addCase(searchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
      })
      .addCase(deleteActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.updating = false;
        state.successMessage = action.payload.data.message;
        state.updateSuccess = true;
      })
      .addMatcher(
        isPending(searchActivities, createActivity, updateActivity, deleteActivity),
        (state) => {
          state.loading = true;
          state.errorMessage = null;
          state.updateSuccess = false;
          state.updating = true;
        },
      )

      .addMatcher(
        isRejected(createActivity, searchActivities, updateActivity, deleteActivity),
        (state, action) => {
          console.log({ action });
          state.loading = false;
          state.errorMessage = action.error.message;
        },
      );
  },
});
export const { reset: resetActivityManagementState } =
  ActivityManagementSlice.actions;
export default ActivityManagementSlice.reducer;
