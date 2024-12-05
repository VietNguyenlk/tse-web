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
        `/users/deny-register`,
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
  // từ chối yêu cầu rời clb 
  ///api/v1/users/left-request/reject
  public async denyLeftRequest(userIds: string[]): Promise<any> {
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
  // cập nhật user
  ///api/v1/users/updateUser, POST, có truyền vào id
  public async updateUser(user: IUser ): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/updateUser`,
        user,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  //{/api/v1/users/updatePassword, POST}
  // update password truyền vào     userId: string,
    // oldPassword: string,
    // newPassword: string,
  public async updatePassword(userId: string, oldPassword: string, newPassword: string): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/updatePassword`,
        {userId, oldPassword, newPassword},
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  //thống kê số lượng người tham gia vào clb trong tháng
  // {/api/v1/activities/registered-users-in-month/:month, GET}
  public async getRegisteredUsersInMonth(month: number): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        `/activities/registered-users-in-month/${month}`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // thống kế số lượng hoạt động trong tháng
  //{/api/v1/activities/activities-in-month/:month, GET}
  public async getActivitiesInMonth(month: number): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        `/activities/activities-in-month/${month}`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // top người tham gia hoạt động nhiều nhất trong tháng
  //{/api/v1/activities/top-users-in-month/:month, GET}
  public async getTopUsersInMonth(month: number): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.get(
        `/activities/top-users-in-month/${month}`,
      );
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

 ///api/v1/users/forgot-password, POST}
// truyền email vào 
  public async forgotPassword(email: string): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(
        `/users/forgot-password`,
        { email },
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
