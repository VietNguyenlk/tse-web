import { useState } from "react";
import { authService } from "../services/auth.service";
import { AuthError, LoginData } from "../configs/auth-config";

interface UseAuth {
  isLoading: boolean;
  error: AuthError | null;
  login: (data: LoginData) => Promise<void>;
}

export const useAuth = (): UseAuth => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<AuthError | null>(null);
  const login = async (data: LoginData): Promise<void> => {
    try {
      setLoading(true);
      setError(null);
      await authService.login(data);
    } catch (error) {
      setError(error as AuthError);
    } finally {
      setLoading(false);
    }
  };

  return { isLoading, error, login };
};
