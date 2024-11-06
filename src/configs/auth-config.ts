export type LoginData = {
  userId?: string;
  password?: string;
  rememberMe?: boolean;
};

export type LoginResponse = {
  token: string;
};

export interface AuthError {
  status: number;
  message: string;
  code: string;
}
