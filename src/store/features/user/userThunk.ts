import { createAsyncThunk } from "@reduxjs/toolkit";
import { userService } from "../../../services/user.service";
import { PaginationRequestParams } from "../../../configs/api.config";

export const fetchAllUsers = createAsyncThunk(
  "user/fetchAllUsers",
  async (paginationParams: PaginationRequestParams, { rejectWithValue }) => {
    try {
      const response = await userService.getAllUsersPaginated(paginationParams);
      return response;
    } catch (error: any) {
      return rejectWithValue({
        message: error.message || "Failed to fetch users",
      });
    }
  },
);
