import { AxiosResponse } from "axios";
import { ApiResponse, axiosInstance } from "../configs/api.config";
import {
  GetUserPaginatedParams,
  GetUsersPaginatedResponse,
} from "../types/user.types";

class UserService {
  private static instance: UserService;
  private readonly BASE_PATH = "/users";
  private constructor() {}

  public static getInstance(): UserService {
    if (!UserService.instance) {
      UserService.instance = new UserService();
    }
    return UserService.instance;
  }

  public async getAllUsersPaginated(
    paginatedParams: GetUserPaginatedParams,
  ): Promise<GetUsersPaginatedResponse> {
    try {
      const response: AxiosResponse<ApiResponse<GetUsersPaginatedResponse>> =
        await axiosInstance.get(`${this.BASE_PATH}`, {
          params: paginatedParams,
        });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
    // Phương thức mới để lấy danh sách người dùng đăng ký
    public async getRegisterRequests(
      paginatedParams: GetUserPaginatedParams,
    ): Promise<GetUsersPaginatedResponse> {
      try {
        const response: AxiosResponse<ApiResponse<GetUsersPaginatedResponse>> =
          await axiosInstance.get("/users/registers", {
            params: paginatedParams,
          });
        return response.data.data;
      } catch (error) {
        throw this.handleError(error);
      }
    }
   // localhost:3008/api/v1/users/:userId/info 
    public async getUserInfo(userId: string): Promise<any> {
      try {
        const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(`/users/${userId}/info`);
        return response.data.data;
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

export const userService = UserService.getInstance();
