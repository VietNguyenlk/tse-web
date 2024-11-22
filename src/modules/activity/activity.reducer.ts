import { createAsyncThunk, isFulfilled, isPending } from "@reduxjs/toolkit";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
  SortDirection,
} from "../../configs/api";
import { defaultValue, IActivity } from "../../shared/models/activity.model";
import {
  convertDateFromServer,
  convertDateTimeFromServer,
  extractTimeFromDateTime,
} from "../../shared/utils/date-utils";
import {
  createEntitySlice,
  EntityState,
  serializeAxiosError,
} from "../../shared/utils/reducers.utils";

const apiUrl = "/activities";

const initState: EntityState<IActivity> = {
  entities: [],
  entity: defaultValue,
  loading: false,
  updating: false,
  updateSuccess: false,
  errorMessage: null,
  totalItems: 0,
  totalPages: 0,
};

export type ActivityState = Readonly<typeof initState>;

// Async actions

export const getActivities = createAsyncThunk(
  "activity/fetchAllActivities",
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

export const createActivity = createAsyncThunk(
  "activity/createActivity",
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

// Slice
export const ActivitySlice = createEntitySlice({
  name: "activity",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(createActivity.rejected, (state, action) => {
        console.log({ action });
      })
      .addCase(createActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.entities.unshift(action.payload.data.data);
        state.updateSuccess = true;
        state.totalItems += 1;
        state.updateSuccess = true;
      })
      .addMatcher(isPending(getActivities, createActivity), (state) => {
        state.loading = true;
        state.errorMessage = null;
        state.updateSuccess = false;
      })
      .addMatcher(isFulfilled(getActivities), (state, action) => {
        state.loading = false;
        state.entities = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
      });
  },
});
export const { reset } = ActivitySlice.actions;
export default ActivitySlice.reducer;
