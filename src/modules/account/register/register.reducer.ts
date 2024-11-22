import {
  createAsyncThunk,
  createSlice,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import { serializeAxiosError } from "../../../shared/utils/reducers.utils";
import { ApiResponse, axiosInstance } from "../../../configs/api";

const apiUrl = "auth/register";

const initialState = {
  loading: false,
  registrationSuccess: false,
  registrationFailure: false,
  errorMessage: null,
  successMessage: null,
};

export type RegisterState = Readonly<typeof initialState>;

export interface RegisterData {
  userId?: string;
  email?: string;
  password?: string;
  passwordConfirm?: string;
  firstName?: string;
  lastName?: string;
}

// Async Actions

export const handleRegister = createAsyncThunk(
  "register/create_account",
  async (data: RegisterData) => {
    return await axiosInstance.post<ApiResponse<{}>>(apiUrl, data);
  },
  { serializeError: serializeAxiosError },
);

export const checkAccountExists = createAsyncThunk(
  "register/check_exist",
  async (data: RegisterData) => {
    return await axiosInstance.post(`${apiUrl}/check-exist`, data);
  },
  {
    serializeError: serializeAxiosError,
  },
);

// Slice

const RegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    resetState: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(handleRegister.fulfilled, (state, action) => {
        console.log({ action });
        return {
          ...initialState,
          registrationSuccess: true,
          successMessage: action.payload.data.message,
        };
      })
      .addCase(checkAccountExists.fulfilled, (state, action) => ({
        ...initialState,
        loading: false,
      }))
      .addMatcher(isPending(handleRegister, checkAccountExists), (state) => {
        state.loading = true;
        state.registrationFailure = false;
        state.registrationSuccess = false;
        state.errorMessage = null;
        state.successMessage = null;
      })
      .addMatcher(
        isRejected(handleRegister, checkAccountExists),
        (state, action: any) => {
          return {
            ...initialState,
            loading: false,
            registrationFailure: true,
            errorMessage: action.error.response.data.message,
          };
        },
      );
  },
});

export const { resetState } = RegisterSlice.actions;

// Reducer
export default RegisterSlice.reducer;
