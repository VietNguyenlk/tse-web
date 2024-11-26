import { createAsyncThunk } from "@reduxjs/toolkit";
import { defaultValue, IRole } from "../../../../shared/models/role.model";
import {
  createEntitySlice,
  EntityState,
  serializeAxiosError,
} from "../../../../shared/utils/reducers.utils";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../../../../configs/api";

const apiUrl = "/auth/roles";

const initState: EntityState<IRole> = {
  entities: [],
  entity: defaultValue,
  loading: false,
  updating: false,
  updateSuccess: false,
  errorMessage: null,
  totalItems: 0,
  totalPages: 0,
};

export type RoleState = Readonly<typeof initState>;

// Async actions

export const getAllRolesPaginated = createAsyncThunk(
  "role/fetchAllRoles",
  async (paginationParams?: PaginationRequestParams) => {
    const rs = await axiosInstance.get<ApiResponse<PaginatedResponse<IRole>>>(
      apiUrl,
      {
        params: paginationParams,
      },
    );
    return rs;
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice
const RoleSlice = createEntitySlice({
  name: "role",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(getAllRolesPaginated.pending, (state) => {
        state.loading = true;
        state.errorMessage = null;
      })
      .addCase(getAllRolesPaginated.fulfilled, (state, action) => {
        state.loading = false;
        state.entities = action.payload.data.data.items;
        state.totalItems = action.payload.data.data.totalItems;
        state.totalPages = action.payload.data.data.totalPages;
      })
      .addCase(getAllRolesPaginated.rejected, (state, action) => {
        console.log({ action });
      });
  },
});

export const { reset } = RoleSlice.actions;
export default RoleSlice.reducer;
