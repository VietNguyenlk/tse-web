import { AxiosResponse } from "axios";
import { LoginData, LoginResponse } from "../types/auth.types";
import { ApiResponse, axiosInstance } from "../configs/api.config";

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
