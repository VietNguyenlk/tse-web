import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { Link, Navigate, NavigateFunction, useNavigate } from "react-router-dom";
import * as yup from "yup";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";
import { JwtPayload } from "../../shared/utils/jwt-utils";
import { LoginData } from "../../configs/auth-config";
import { useAppDispatch, useAppSelector } from "../../configs/store";
import { login } from "./authentication.reducer";
import { useNotifications } from "../../shared/hooks/notification.hook";
import Notification from "../../components/notifications/Notification";
import { resetLoginError } from "./authentication.reducer";
import { userInfo } from "os";

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
  const { addNotification, removeNotification, notifications } = useNotifications();
  const navigate: NavigateFunction = useNavigate();
  const dispatch = useAppDispatch();
  const [infor, setInfor] = useState<String>();

  const {
    errorMessage,
    sessionHasBeenFetched,
    loading,
    loginSuccess,
    loginError,
    roles,
    isAuthenticated,
  } = useAppSelector((state) => state.authentication);

  const [errorLogin, setErrorLogin] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<LoginData>({
    resolver: yupResolver(loginSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (loginError && errorMessage) {
      addNotification(
        "ERROR",
        "Đăng nhập thất bại",
        "MSSV hoặc mật khẩu không đúng",
      );
      dispatch(resetLoginError()); // Reset trạng thái loginError và errorMessage
    }
  }, [loginError, errorMessage, addNotification, dispatch]);

  const onSubmit = async (data: LoginData) => {
    dispatch(login(data.userId, data.password, data.rememberMe));
    // console.log(localStorage);
    const token = localStorage.getItem("authToken");
    // const token = sessionStorage.getItem("authToken");
    // const authToken = JSON.parse(localStorage.getItem('persist:root')).authToken;
    // console.log(authToken);
    // console.log("token",token);
    setInfor(data.userId);
    if (!token) return;
    const decode = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now() / 1000;
    if (currentTime > decode.exp) {
      addNotification("ERROR", "Token hết hạn", "Vui lòng đăng nhập lại");
      return;
    }
    reset();
  };

  if (loginSuccess && isAuthenticated) {
    if (roles.includes("admin")) {
      return <Navigate to="/admin" />;
    }
    return <Navigate to="/home" state={{ userInfo: infor }} />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg px-10 py-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">
          Chào mừng đến với TSE
        </h1>
        <h2 className="text-sm text-center text-gray-800 mb-4 font-bold">
          "Chào mừng trở lại, vui lòng đăng nhập."
        </h2>
        <p className="text-red-500 text-xl mt-1">{errorLogin}</p>
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

          <div className="flex justify-between items-center pb-4">
            <div className="flex items-center space-x-2">
              <input
                {...register("rememberMe")}
                type="checkbox"
                name="rememberMe"
                id="cboxRememberMe"
                className="rounded hover:cursor-pointer"
              />
              <label
                htmlFor="cboxRememberMe"
                className="text-sm hover:cursor-pointer"
              >
                Ghi nhớ đăng nhập?
              </label>
            </div>
            <div>
              <Link
                to="/forgot-password"
                className="text-sm underline italic text-purple-600 hover:text-purple-900 "
              >
                Quên mật khẩu?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            {loading ? "Đang đăng nhập..." : "Đăng Nhập"}
          </button>
        </form>

        <div className="mt-6 text-center text-sm">
          <p>
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="text-blue-600 hover:text-blue-700 font-semibold"
            >
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>

      <div className="fixed top-0 right-0 z-50">
        {notifications.map((notification, index) => (
          <Notification
            isShow={notification.show}
            key={notification.id}
            {...notification}
            index={index}
            onClose={() => removeNotification(notification.id)}
            duration={5000}
            autoClose={true}
          />
        ))}
      </div>
    </div>
  );
};
