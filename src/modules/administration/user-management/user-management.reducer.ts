import {
  ActionReducerMapBuilder,
  createAsyncThunk,
  createSlice,
  isRejected,
} from "@reduxjs/toolkit";
import { defaultValue, IUser } from "../../../shared/models/user.model";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../../configs/api";
import { serializeAxiosError } from "../../../shared/utils/reducers.utils";
const apiUrl = "/users";

const initState = {
  users: [] as ReadonlyArray<IUser>,
  user: defaultValue,
  roles: [] as any[],
  totalItems: 0,
  totalPages: 0,
  loading: false,
  updating: false,
  errorMessage: null,
  updateSuccess: false,
};

export type UserManagementState = Readonly<typeof initState>;
// Async actions
export const getUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (paginationParams: PaginationRequestParams) => {
    return await axiosInstance.get<ApiResponse<PaginatedResponse<IUser>>>(apiUrl, {
      params: paginationParams,
    });
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice
export const UserManagementSlice = createSlice({
  name: "userManagement",
  initialState: initState as UserManagementState,
  reducers: {
    reset: () => {
      return initState;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<UserManagementState>) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.errorMessage = null;
        state.updateSuccess = false;
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
      })
      .addMatcher(isRejected(getUsers), (state, action) => {
        state.loading = false;
        state.updating = false;
        state.updateSuccess = false;
        state.errorMessage = action.error.message;
      });
  },
});

export const { reset } = UserManagementSlice.actions;
export default UserManagementSlice.reducer;
