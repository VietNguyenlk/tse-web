import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { AppThunk } from "../../configs/store";
import { serializeAxiosError } from "../../shared/utils/reducers.utils";
import { AxiosResponse } from "axios";

export const initState = {
  loading: false,
  isAuthenticated: false,
  loginSuccess: false,
  loginError: false, // Error returned from server side,
  account: {} as any,
  errorMessage: null as unknown as string,
  redirectMessage: null as unknown as string,
  sessionHasBeenFetched: false,
  logoutUrl: null as unknown as string,
};

export type AuthenticationState = Readonly<typeof initState>;

// Actions
export const getSession = (): AppThunk => (dispatch, getState) => {
  // dispatch(getAccount());
  console.log("hee");
};

// export const getAccount = createAsyncThunk('auth/getAccount', async () => axiso

interface IAuthParams {
  userId: string;
  password: string;
  rememberMe?: boolean;
}

export const authenticate = createAsyncThunk(
  "auth/login",
  async (auth: IAuthParams) => console.log("auth"),
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
    const result = await dispatch(authenticate({ userId, password, rememberMe }));
    const response = result.payload as AxiosResponse;
    const bearerToken: string = response?.headers?.authorization;
    if (bearerToken && bearerToken.startsWith("Bearer ")) {
      const jwtToken = bearerToken.substring(7, bearerToken.length);
      if (rememberMe) {
        localStorage.setItem("authToken", jwtToken);
      } else {
        sessionStorage.setItem("authToken", jwtToken);
      }
    }
    dispatch(getSession());
  };

export const clearAuthToken = () => {
  if (localStorage.getItem("authToken")) {
    localStorage.removeItem("authToken");
  }
  if (sessionStorage.getItem("authToken")) {
    sessionStorage.removeItem("authToken");
  }
};

export const logout: () => AppThunk = () => (dispatch) => {
  clearAuthToken();
  dispatch(logoutSession());
};

export const clearAuthentication = (messageKey) => (dispatch) => {
  clearAuthToken();
  dispatch(authError(messageKey));
  dispatch(clearAuth());
};

// Slice

export const AuthSlice = createSlice({
  name: "auth",
  initialState: initState as AuthenticationState,
  reducers: {
    logoutSession: () => {},
    authError: (state, action) => {},
    clearAuth: (state) => {},
  },
  extraReducers: (builder) => {
    builder
      .addCase(authenticate.pending, (state) => {
        state.loading = true;
      })
      .addCase(authenticate.fulfilled, (state) => ({
        ...state,
        loading: false,
        loginError: false,
        loginSuccess: true,
      }))
      .addCase(authenticate.rejected, (state, action) => ({
        ...initState,
        errorMessage: action.error.message,
        showModalLogin: true,
        loginError: true,
      }));
  },
});

export const { authError, clearAuth, logoutSession } = AuthSlice.actions;

export default AuthSlice.reducer;
