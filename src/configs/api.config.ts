import axios, { AxiosInstance } from "axios";

const BASE_URL = process.env.API_BASE_URL || "http://localhost:3008/api/v1";

export interface ApiResponse<T> {
  statusCode: number;
  message: string;
  data: T;
}

export const createAxiosInstance = (): AxiosInstance => {
  const instance = axios.create({
    baseURL: BASE_URL,
    timeout: 10000,
    headers: {
      "Content-Type": "application/json",
    },
  });

  instance.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error),
  );

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        // Handle unauthorized access
        localStorage.removeItem("token");
        window.location.href = "/";
      }
      return Promise.reject(error);
    },
  );

  return instance;
};

export const axiosInstance = createAxiosInstance();
