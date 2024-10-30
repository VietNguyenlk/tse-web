import { AxiosResponse } from "axios";
import {
  ApiResponse,
  axiosInstance,
  PaginationRequestParams,
  PaginatedResponse,
} from "../configs/api.config";
import { User } from "../store/features/user/userSlice";

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
  ): Promise<PaginatedResponse<User>> {
    try {
      const response: AxiosResponse<ApiResponse<PaginatedResponse<User>>> =
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
     
    ){
      try {
        const response: AxiosResponse<ApiResponse<any>> =
          await axiosInstance.get("/users/registers");
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
    ///api/v1/users/registers/approve, POST truyền vào id
    //each value in userIds must be a string', 'userIds should not be empty', 'userIds must be an array'
    public async approveRegisterRequest(userIds: string[]): Promise<any> {
      try {
        const response: AxiosResponse<ApiResponse<any>> = await axiosInstance.post(`/users/registers/approve`, { userIds });
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
