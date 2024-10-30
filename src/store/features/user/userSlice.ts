import { ActionReducerMapBuilder, createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";
import { fetchAllUsers } from "./userThunk";

export enum UserStatus {
  ACTIVE,
  IN_ACTIVE,
  TERMINATED,
  PENDING_APPROVAL,
  LEFT_REQUEST,
}

export enum UserType {
  STUDENT,
  TEACHER,
}

export enum UserFaculty {
  COMPUTER_SCIENCE,
  SOFTWARE_ENGINEERING,
  INFORMATION_TECHNOLOGY,
  DATA_SCIENCE,
  INFORMATION_SYSTEM,
  OTHER,
}

export interface User {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: keyof typeof UserStatus | null;
  registerDate: dayjs.Dayjs;
  phoneNumber: string | null;
  userType: keyof typeof UserType | null;
  faculty: keyof typeof UserFaculty | null;
  className: string | null;
  cumulativeScore: number;
}

interface UserState {
  users: User[];
  status: "idle" | "loading" | "failed" | "succeeded";
  error: string | null;
}

const initialState: UserState = {
  users: [],
  status: "idle",
  error: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder: ActionReducerMapBuilder<UserState>) => {
    builder
      .addCase(fetchAllUsers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAllUsers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.items;
      })
      .addCase(fetchAllUsers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message || "Failed to fetch users";
      });
  },
});
