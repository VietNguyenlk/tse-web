import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../configs/api";
import { IActivity } from "../../shared/models/activity.model";
import { JwtPayload } from "../../shared/utils/jwt-utils";
import { serializeAxiosError } from "../../shared/utils/reducers.utils";
import { ISearchActivity } from "../administration/activity-management/activity-management.reducer";

const initialState = {
  entities: [] as IActivity[],
  registeredActivities: [] as IActivity[],
  entity: undefined,
  loading: false,
  updating: false,
  updateSuccess: false,
  errorMessage: "",
  successMessage: "",
  totalItems: 0,
  totalPages: 0,
};

export type ActivityState = Readonly<typeof initialState>;
const apiUrl = "/activities";
// Async actions

export const searchActivities = createAsyncThunk(
  "activity/searchActivities",
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

export const getRegisteredActivities = createAsyncThunk(
  "activity/getRegisteredActivities",
  async () => {
    const token =
      localStorage.getItem("authToken") !== null
        ? localStorage.getItem("authToken")
        : sessionStorage.getItem("authToken");
    const decodeToken = jwtDecode<JwtPayload>(token);
    const userId = decodeToken?.sub;
    return await axiosInstance.get<ApiResponse<IActivity[]>>(
      `${apiUrl}/registered/${userId}`,
    );
  },
  {
    serializeError: serializeAxiosError,
  },
);

export const registerActivity = createAsyncThunk(
  "activity/registerActivity",
  async (activityId: number) => {
    const token =
      localStorage.getItem("authToken") !== null
        ? localStorage.getItem("authToken")
        : sessionStorage.getItem("authToken");
    const decodeToken = jwtDecode<JwtPayload>(token);
    const userId = decodeToken?.sub;
    return await axiosInstance.post<ApiResponse<IActivity[]>>(`${apiUrl}/register`, {
      activityId,
      userId,
    });
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice
const ActivitySlice = createSlice({
  name: "activity",
  initialState: initialState,
  reducers: {
    reset: () => initialState,
    resetState: (state) => {
      state.loading = false;
      state.updating = false;
      state.updateSuccess = false;
      state.errorMessage = null;
      state.successMessage = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegisteredActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.registeredActivities = action.payload.data.data;
        state.errorMessage = null;
      })
      .addCase(registerActivity.fulfilled, (state, action) => {
        state.loading = false;
        state.errorMessage = null;
        state.successMessage = action.payload.data.message;
        state.updateSuccess = true;
        state.updating = false;
      })
      .addCase(searchActivities.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
        state.errorMessage = null;
        state.successMessage = action.payload.data.message;
      })
      .addMatcher(
        isRejected(searchActivities, registerActivity, getRegisteredActivities),
        (state, action: any) => {
          state.loading = false;
          state.errorMessage = action.error.response.data.message;
          state.successMessage = null;
          state.updateSuccess = false;
          state.updating = false;
        },
      )
      .addMatcher(
        isPending(searchActivities, registerActivity, getRegisteredActivities),
        (state) => {
          state.loading = true;
          state.errorMessage = null;
          state.successMessage = null;
          state.updateSuccess = false;
          state.updating = true;
        },
      );
  },
});

export const { resetState, reset } = ActivitySlice.actions;

export default ActivitySlice.reducer;
