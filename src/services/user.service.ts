import { AxiosResponse } from "axios";

import {
  axiosInstance,
  PaginationRequestParams,
  PaginatedResponse,
  ApiResponse,
} from "../configs/api";
import { IUser } from "../shared/models/user.model";

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
    paginatedParams: PaginationRequestParams,
  ): Promise<PaginatedResponse<IUser>> {
    try {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<IUser>>> =
        await axiosInstance.get(`${this.BASE_PATH}`, {
          params: paginatedParams,
        });
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // Phương thức mới để lấy danh sách người dùng đăng ký
  public async getRegisterRequests() {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        "/users/registers",
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // localhost:3008/api/v1/users/:userId/info
  public async getUserInfo(userId: string): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        `/users/${userId}/info`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  ///api/v1/users/registers/approve, POST truyền vào id
  //each value in userIds must be a string', 'userIds should not be empty', 'userIds must be an array'
  public async approveRegisterRequest(userIds: string[]): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/registers/approve`,
        { userIds },
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  ///api/v1/users/deny-register, POST userIDs là mảng String
  public async denyRegisterRequest(userIds: string[]): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/left-request/reject`,
        { userIds },
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // {/api/v1/users/getleft-requesting, GET}
  public async getLeftRequesting(): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        `/users/getleft-requesting`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
//{/api/v1/users/left-request/approve, POST}
  public async approveLeftRequest(userIds: string[]): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/left-request/approve`,
        { userIds },
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  ///api/v1/users/:userId/request-left, POST}
  public async requestLeft(userId: string): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/${userId}/request-left`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
//api/v1/activities/:activityId/participants
// get danh sach nguoi tham gia hoat dong
  public async getParticipants(activityId: Number): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        `/activities/${activityId}/participants`,
      );
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
