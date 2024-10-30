import { AxiosResponse } from "axios";
import {
  ApiResponse,
  axiosInstance,
  PaginatedResponse,
  PaginationRequestParams,
} from "../configs/api.config";
import { Activity } from "../store/features/activity/activitySlice";

class ActivityService {
  private static instance: ActivityService;
  private readonly BASE_PATH = "/activities";
  private constructor() {}

  public static getInstance(): ActivityService {
    if (!ActivityService.instance) {
      ActivityService.instance = new ActivityService();
    }
    return ActivityService.instance;
  }

  public async getActivitiesPaginated(
    paginatedParams: PaginationRequestParams,
  ): Promise<PaginatedResponse<Activity>> {
    try {
      const res: AxiosResponse<ApiResponse<PaginatedResponse<Activity>>> =
        await axiosInstance.get(this.BASE_PATH, {
          params: paginatedParams,
        });
      return res.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleError(error: any) {
    if (error.response) {
      return {
        message: error.response.data.message || "An error occurred",
        code: error.response.data.code || "UNKNOWN_ERROR",
        status: error.response.status,
      };
    }
    return {
      message: "Network error occurred",
      code: "NETWORK_ERROR",
      status: 500,
    };
  }
}

export const activityService = ActivityService.getInstance();
