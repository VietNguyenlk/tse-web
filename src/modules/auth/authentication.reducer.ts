import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AxiosResponse } from "axios";
import { jwtDecode } from "jwt-decode";
import { ApiResponse, axiosInstance } from "../../configs/api";
import { LoginResponse } from "../../configs/auth-config";
import { AppThunk } from "../../configs/store";
import { JwtPayload } from "../../shared/utils/jwt-utils";
import { serializeAxiosError } from "../../shared/utils/reducers.utils";
const apiUrl = "/auth";

export const initState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Error returned from server side,
  errorMessage: null as unknown as string, // Errors returned from server side
  sessionHasBeenFetched: false,
  roles: [] as string[],
};

interface IAuthParams {
  userId: string;
  password: string;
  rememberMe?: boolean;
}

export type AuthenticationState = Readonly<typeof initState>;

// Async Actions

export const authenticate = createAsyncThunk(
  "auth/login",
  async (auth: IAuthParams) =>
    axiosInstance.post<ApiResponse<LoginResponse>>(`${apiUrl}/login`, auth),
  {
    serializeError: serializeAxiosError,
  },
);

export const login: (
  userId: string,
  password: string,
  rememberMe?: boolean,
) => AppThunk =
  (userId, password, rememberMe = false) =>
  async (dispatch) => {
    clearAuthToken();
    const result = await dispatch(authenticate({ userId, password, rememberMe }));
    const response = result.payload as AxiosResponse<ApiResponse<LoginResponse>>;
    const jwtToken = response?.data?.data?.token;
    if (jwtToken) {
      if (rememberMe) {
        localStorage.setItem("authToken", jwtToken);
      } else {
        sessionStorage.setItem("authToken", jwtToken);
      }
    }
  };

export const clearAuthToken = () => {
  if (localStorage.getItem("authToken")) {
    localStorage.removeItem("authToken");
  }
  if (sessionStorage.getItem("authToken")) {
    sessionStorage.removeItem("authToken");
  }
};

export const logout: () => AppThunk = () => async (dispatch) => {
  clearAuthToken();
  dispatch(logoutSession());
  dispatch(clearAuth());
};

// Slice

export const AuthSlice = createSlice({
  name: "authentication",
  initialState: initState as AuthenticationState,
  reducers: {
    logoutSession: () => initState,
    clearAuth: (state) => {
      state.loading = false;
      state.isAuthenticated = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticate.fulfilled, (state, action) => {
        const decodeToken = jwtDecode<JwtPayload>(action.payload.data.data.token);
        const roles = decodeToken?.roles || [];
        return {
          ...state,
          loading: false,
          loginError: false,
          loginSuccess: true,
          isAuthenticated: true,
          sessionHasBeenFetched: true,
          errorMessage: null,
          roles: roles,
        };
      })
      .addCase(authenticate.rejected, (state, action) => ({
        ...initState,
        errorMessage: action.error.message,
        loginError: true,
      }));
  },
});

export const { clearAuth, logoutSession } = AuthSlice.actions;

export default AuthSlice.reducer;
