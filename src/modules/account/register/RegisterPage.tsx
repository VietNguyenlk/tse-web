import { useForm } from "react-hook-form";
import {
  checkAccountExists,
  handleRegister,
  RegisterData,
  resetState,
} from "./register.reducer";
import { useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../configs/store";
import { useNotifications } from "../../../shared/hooks/notification.hook";
import Notification from "../../../components/notifications/Notification";
import LoadingIndicator from "../../../components/list/LoadingIndicator";

const RegisterPage: React.FC = () => {
  const notificationTimeOut = 3000;
  const dispatch = useAppDispatch();
  const registerState = useAppSelector((state) => state.register);
  const { notifications, addNotification, removeNotification } = useNotifications();
  const {
    register,
    getValues,
    handleSubmit,
    setError,
    trigger,
    formState: { errors },
  } = useForm<RegisterData>({
    mode: "onChange",
    defaultValues: {},
  });
  const [currentStep, setCurrentStep] = useState<number>(1);
  const steps: string[] = ["Step 1", "Step 2"];
  const [progressWidth, setProgressWidth] = useState(0);
  useEffect(() => {
    const width = ((currentStep - 1) / (steps.length - 1)) * 100;
    setProgressWidth(width);
  }, [currentStep, steps]);
  const navigate = useNavigate();

  const submitHandler = (data: RegisterData) => {
    dispatch(handleRegister(data));
  };

  const nextStep = async (): Promise<void> => {
    const isValid = await trigger();
    if (isValid) {
      const data = getValues();
      const resultAction = await dispatch(
        checkAccountExists({
          userId: data.userId,
          email: data.email,
        }),
      );
      if (checkAccountExists.fulfilled.match(resultAction)) {
        setCurrentStep(currentStep + 1);
      }
    }
  };

  const handleRegisterFailure = (errMessage: any): void => {
    addNotification("ERROR", "Lỗi đăng kí", errMessage);
    if (errMessage && errMessage.includes("MSSV")) {
      setError("userId", {
        type: "manual",
        message: errMessage,
      });
    } else {
      setError("email", {
        type: "manual",
        message: errMessage,
      });
    }
    dispatch(resetState());
  };

  const handleRegisterSuccess = (successMessage: any): void => {
    addNotification("SUCCESS", "Đăng ký thành công", successMessage);
    dispatch(resetState());
    setTimeout(() => {
      navigate("/");
    }, notificationTimeOut + 100);
  };

  useEffect(() => {
    if (registerState.registrationFailure && registerState.errorMessage) {
      handleRegisterFailure(registerState.errorMessage);
    }

    if (registerState.registrationSuccess && registerState.successMessage) {
      handleRegisterSuccess(registerState.successMessage);
    }
  }, [registerState]);

  const prevStep = (e: React.FormEvent): void => {
    setCurrentStep(currentStep - 1);
  };

  const renderStepIndicator = (): JSX.Element => {
    return (
      <div className="w-full px-4 py-4">
        <div className="flex justify-between items-center relative">
          {steps.map((step, index) => {
            const stepNumber = index + 1;
            const isCurrent = currentStep === stepNumber;
            const isCompleted = currentStep > stepNumber;

            return (
              <React.Fragment key={index}>
                <div
                  className="flex flex-col items-center z-10 transition-all duration-300 ease-in-out"
                  style={{
                    transform: isCurrent ? "scale(1.1)" : "scale(1)",
                  }}
                >
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold 
                      ${
                        isCurrent
                          ? "bg-blue-600"
                          : isCompleted
                          ? "bg-green-500"
                          : "bg-gray-300"
                      } shadow-md transition-all duration-300`}
                  >
                    {stepNumber}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="flex-grow mx-2 relative">
                    <div
                      className="absolute top-1/2 left-0 right-0 h-1 bg-gray-300"
                      style={{
                        width: "100%",
                        transform: "translateY(-50%)",
                      }}
                    />
                    <div
                      className="absolute top-1/2 left-0 h-1 bg-green-500 transition-all duration-500"
                      style={{
                        width: `${progressWidth}%`,
                        transform: "translateY(-50%)",
                      }}
                    />
                  </div>
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400">
      <div className="fixed top-0 right-0 z-50">
        {notifications.map((notification, index) => (
          <Notification
            isShow={notification.show}
            key={notification.id}
            {...notification}
            index={index}
            onClose={() => removeNotification(notification.id)}
            duration={notificationTimeOut}
            autoClose={true}
          />
        ))}
      </div>
      <form
        onSubmit={handleSubmit(submitHandler)}
        className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
      >
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">
          Đăng ký
        </h2>

        {renderStepIndicator()}

        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="mssv"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                MSSV&nbsp;
                <span className="text-red-600 ">
                  *{`${errors.userId?.message ?? ""}`}
                </span>
              </label>
              <input
                {...register("userId", {
                  required: "ID không được để trống",
                  validate: {
                    validFormat: (value) => {
                      const regex = /^[1-9][0-9]{7}$/;
                      const isValid = regex.test(value);
                      if (!isValid) return "MSSV IUH từ 10000000-99999999";
                      return true;
                    },
                  },
                })}
                type="text"
                placeholder="Nhập mã số sinh viên của bạn..."
                className={`
                  w-full px-4 py-2 rounded-md shadow-sm focus:ring transition duration-300 ease-in-out
                  ${
                    errors.userId?.message
                      ? "border border-red-600 focus:ring-red-600 focus:border-none"
                      : "border border-gray-300 focus:ring-blue-300 "
                  }
                  `}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Email&nbsp;
                <span className="text-red-600 ">
                  *{`${errors.email?.message ?? ""}`}
                </span>
              </label>
              <input
                {...register("email", {
                  required: "Email không được để trống",
                  pattern: {
                    value: /^[A-Za-z0-9._+\-\']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$/,
                    message: "Email không hợp lệ",
                  },
                })}
                type="email"
                placeholder="Nhập email..."
                className={`
                  w-full px-4 py-2 rounded-md shadow-sm focus:ring transition duration-300 ease-in-out
                  ${
                    errors.email?.message
                      ? "border border-red-600 focus:ring-red-600 focus:border-none"
                      : "border border-gray-300 focus:ring-blue-300 "
                  }
                  `}
              />
            </div>
            <div className="space-y-4">
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                onClick={nextStep}
              >
                {registerState.loading ? (
                  <LoadingIndicator variant="spinner" />
                ) : (
                  "Tiếp theo"
                )}
              </button>
              <button
                type="button"
                className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
                onClick={() => navigate("/")}
              >
                Quay lại Login
              </button>
            </div>
          </div>
        )}

        {currentStep === 2 && (
          <div>
            <div className="mb-6">
              <label
                htmlFor="firstname"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Họ và tên đệm&nbsp;
                <span className="text-red-600 ">
                  *{`${errors.firstName?.message ?? ""}`}
                </span>
              </label>
              <input
                {...register("firstName", {
                  required: "Họ và tên đệm không được để trống",
                  maxLength: { value: 50, message: "Không được quá 50 ký tự" },
                  minLength: { value: 2, message: "Ít nhất 2 ký tự" },
                  pattern: {
                    value: /^[\p{L}\s.'-]+$/u,
                    message: "Không chứa số và kí tự đặc biệt",
                  },
                })}
                type="text"
                placeholder="Nhập Họ và tên đệm của bạn..."
                className={`
                  w-full px-4 py-2 rounded-md shadow-sm focus:ring transition duration-300 ease-in-out
                  ${
                    errors.firstName?.message
                      ? "border border-red-600 focus:ring-red-600 focus:border-none"
                      : "border border-gray-300 focus:ring-blue-300 "
                  }
                  `}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="lastname"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Tên&nbsp;
                <span className="text-red-600 ">
                  *{`${errors.lastName?.message ?? ""}`}
                </span>
              </label>
              <input
                {...register("lastName", {
                  required: "Tên không được để trống",
                  maxLength: { value: 50, message: "Không được quá 50 ký tự" },
                  minLength: { value: 2, message: "Ít nhất 2 ký tự" },
                  pattern: {
                    value: /^[\p{L}\s.'-]+$/u,
                    message: "Không chứa số và kí tự đặc biệt",
                  },
                })}
                type="text"
                placeholder="Nhập tên của bạn..."
                className={`
                  w-full px-4 py-2 rounded-md shadow-sm focus:ring transition duration-300 ease-in-out
                  ${
                    errors.lastName?.message
                      ? "border border-red-600 focus:ring-red-600 focus:border-none"
                      : "border border-gray-300 focus:ring-blue-300 "
                  }
                  `}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Mật Khẩu&nbsp;
                <span className="text-red-600 ">
                  *{`${errors.password?.message ?? ""}`}
                </span>
              </label>
              <input
                {...register("password", {
                  required: "Mật khẩu không được để trống",
                  minLength: {
                    value: 6,
                    message: "Mật khẩu phải có ít nhất 6 ký tự",
                  },
                  maxLength: {
                    value: 24,
                    message: "Mật khẩu không được quá 24 ký tự",
                  },
                })}
                type="password"
                placeholder="Nhập mật khẩu..."
                className={`
                  w-full px-4 py-2 rounded-md shadow-sm focus:ring transition duration-300 ease-in-out
                  ${
                    errors.password?.message
                      ? "border border-red-600 focus:ring-red-600 focus:border-none"
                      : "border border-gray-300 focus:ring-blue-300 "
                  }
                  `}
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="confirmpassword"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                Xác nhận mật khẩu&nbsp;
                <span className="text-red-600 ">
                  *{`${errors.passwordConfirm?.message ?? ""}`}
                </span>
              </label>
              <input
                {...register("passwordConfirm", {
                  required: "Hãy xác nhận lại mật khẩu của bạn",
                  validate: {
                    matchPassword: (value) =>
                      value === getValues("password") || "Mật khẩu không khớp",
                  },
                })}
                type="password"
                placeholder="Xác nhận lại mật khẩu..."
                className={`
                  w-full px-4 py-2 rounded-md shadow-sm focus:ring transition duration-300 ease-in-out
                  ${
                    errors.passwordConfirm?.message
                      ? "border border-red-600 focus:ring-red-600 focus:border-none"
                      : "border border-gray-300 focus:ring-blue-300 "
                  }
                  `}
              />
            </div>
            <div className="flex justify-between">
              <button
                type="button"
                className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300"
                onClick={prevStep}
              >
                Quay lại
              </button>
              <button
                type="submit"
                className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300"
              >
                Đăng ký
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default RegisterPage;
