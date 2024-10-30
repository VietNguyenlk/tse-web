import { AxiosResponse } from "axios";
import { ApiResponse, axiosInstance } from "../configs/api.config";
import { LoginData, LoginResponse } from "../configs/auth.config";

class AuthService {
  private static instance: AuthService;
  private readonly BASE_PATH = "/auth";
  private constructor() {}

  public static getInstance(): AuthService {
    if (!AuthService.instance) {
      AuthService.instance = new AuthService();
    }
    return AuthService.instance;
  }

  public async login(data: LoginData): Promise<LoginResponse> {
    try {
      const response: AxiosResponse<ApiResponse<LoginResponse>> =
        await axiosInstance.post(`${this.BASE_PATH}/login`, data);
      this.handleLoginSuccessfully(response.data.data);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }

  private handleLoginSuccessfully(responseData: LoginResponse): void {
    localStorage.setItem("token", responseData.token);
  }
  ///api/v1/auth/register, POST
  public async register(data: any): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> =
        await axiosInstance.post(`${this.BASE_PATH}/register`, data);
      return response.data.data;
    } catch (error) {
      throw this.handleError(error);
    }
  }
  // localhost:3008/api/v1/auth/roles
  public async getRoles(): Promise<any> {
    try {
      const response: AxiosResponse<ApiResponse<any>> =
        await axiosInstance.get(`${this.BASE_PATH}/roles`);
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

export const authService = AuthService.getInstance();
