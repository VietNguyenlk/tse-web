import {
  createAsyncThunk,
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { serializeAxiosError } from "../../../shared/utils/reducers.utils";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../../configs/api";
import { IUser } from "../../../shared/models/user.model";

const apiUrl = "/users/activate";

const initialState = {
  loading: false,
  requestActivates: [] as ReadonlyArray<IUser>,
  totalItems: 0,
  totalPages: 0,
  errorMessage: null,
  changeActivationSuccess: false,
  changeActivationFailure: false,
  changeActivationSuccessMessage: null,
  changeActivationErrorMessage: null,
};

export type ActivateState = Readonly<typeof initialState>;

// Async Actions

export const activateUsers = createAsyncThunk(
  "activate/activateUser",
  async (userIds: string[]) => {
    return await axiosInstance.post<ApiResponse<{}>>(apiUrl, { userIds });
  },
  {
    serializeError: serializeAxiosError,
  },
);
//{/api/v1/users/deny-register, POST
// export const denyRegistration = createAsyncThunk(
//   "activate/denyRegistration",
//   async (userIds: string[]) => {
//     return await axiosInstance.post<ApiResponse<{}>>(`/users/deny-register`, { userIds });
//   },
//   {
//     serializeError: serializeAxiosError,
//   },
// );
export const getRegistrationRequests = createAsyncThunk(
  "user/fetchRegistrationRequests",
  async (paginationParams: PaginationRequestParams) => {
    return await axiosInstance.get<ApiResponse<PaginatedResponse<IUser>>>(
      `/users/registers`,
      {
        params: paginationParams,
      },
    );
  },
);

// Slice
const ActivateSlice = createSlice({
  name: "activate",
  initialState,
  reducers: {
    resetState: (state) => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getRegistrationRequests.fulfilled, (state, action) => ({
        ...initialState,
        loading: false,
        requestActivates: action.payload.data.data.items,
        totalItems: action.payload.data.data.totalItems,
        totalPages: action.payload.data.data.totalPages,
      }))
      .addCase(getRegistrationRequests.rejected, (state, action) => ({
        ...initialState,
        loading: false,
        errorMessage: action.error.message,
      }))
      .addMatcher(isPending(activateUsers, getRegistrationRequests), (state) => ({
        ...initialState,
        loading: true,
      }))
      .addMatcher(isFulfilled(activateUsers), (state, action) => ({
        ...initialState,
        loading: false,
        changeActivationSuccess: true,
        changeActivationSuccessMessage: action.payload.data.message,
      }))
      .addMatcher(isRejected(activateUsers), (state, action) => ({
        ...initialState,
        loading: false,
        changeActivationFailure: true,
        changeActivationErrorMessage: action.error.message,
      }));
  },
});

export const { resetState } = ActivateSlice.actions;

export default ActivateSlice.reducer;
