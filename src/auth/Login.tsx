import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { useAuth } from "../hooks/useAuth";
import { LoginData } from "../types/auth.types";
import { jwtDecode } from "jwt-decode";
import { JwtPayload } from "../types/jwt.types";

const loginSchema = yup.object().shape({
  userId: yup
    .string()
    .test("is-valid-id", "ID không hợp lệ", (value: string | undefined) => {
      if (!value) return false;
      if (value === "admin") return true;

      const numValue = parseInt(value);
      return /^\d{8}$/.test(value) && numValue >= 10000000 && numValue <= 99999999;
    })
    .required("ID is required"),
  password: yup
    .string()
    .min(6, "Mật khẩu phải từ 6 ký tự trở lên")
    .max(30, "Mật khẩu không được quá 30 ký tự")
    .required("Vui lòng nhập mật khẩu"),
});

export const Login: React.FC = () => {
  const navigate: NavigateFunction = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
    reset,
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  const { isLoading, error, login } = useAuth();

  const onSubmit = async (data: LoginData) => {
    await login(data);
    const token = localStorage.getItem("token");
    if (!token) return;

    const decode = jwtDecode<JwtPayload>(token);

    const currentTime = Date.now() / 1000;
    if (currentTime > decode.exp) {
      alert("Token hết hạn, vui lòng đăng nhập lại");
      return;
    }
    const roles = decode.roles;
    if (roles.includes("admin")) {
      navigate("/admin");
    } else {
      navigate("/membersPage");
    }
    reset();
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg px-10 py-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Welcome to TSE
        </h1>
        <h2 className="text-sm text-center text-gray-800 mb-4 font-bold">
          Welcome back, please login into an account
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-5">
            <label
              htmlFor="mssv"
              className="block text-sm font-medium text-gray-700"
            >
              MSSV
            </label>
            <input
              id="mssv"
              {...register("userId")}
              type="text"
              placeholder="Nhập MSSV"
              className={`mt-1 block w-full border ${
                errors.userId ? "border-red-500" : "border-gray-300"
              } rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <p className="text-red-500 text-xs mt-1">{errors.userId?.message}</p>
          </div>

          <div className="mb-5">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Mật khẩu
            </label>
            <input
              id="password"
              {...register("password")}
              type="password"
              placeholder="Nhập mật khẩu"
              className={`mt-1 block w-full border ${
                errors.password ? "border-red-500" : "border-gray-300"
              } rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            {isLoading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <a href="/register" className="text-blue-600 hover:underline">
            Đăng Ký
          </a>
          <span className="mx-2 text-gray-500">|</span>
          <a href="/forgot-password" className="text-blue-600 hover:underline">
            Quên Mật Khẩu?
          </a>
        </div>
      </div>
    </div>
  );
};
