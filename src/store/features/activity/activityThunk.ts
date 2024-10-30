import { createAsyncThunk } from "@reduxjs/toolkit";
import { activityService } from "../../../services/activity.service";
import { PaginationRequestParams } from "../../../configs/api.config";

export const fetchAllActivities = createAsyncThunk(
  "activity/fetchAllActivities",
  async (paginationParams: PaginationRequestParams) => {
    const response = await activityService.getActivitiesPaginated(paginationParams);
    return response;
  },
);
