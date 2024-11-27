import { CalendarMonth, Group } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IActivity } from "../../../../shared/models/activity.model";
import { ActivityStatus } from "../../../../shared/models/enums/activity.enum";

import dayjs from "dayjs";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";

interface FinalDetailsProps {
  register: UseFormRegister<IActivity>;
  setValue: UseFormSetValue<IActivity>;
  getValues: UseFormGetValues<IActivity>;
  setError: UseFormSetError<IActivity>;
  errors: FieldErrors<IActivity>;
  clearErrors: UseFormClearErrors<IActivity>;
}

const FinalDetails: React.FC<FinalDetailsProps> = ({
  clearErrors,
  errors,
  getValues,
  register,
  setValue,
  setError,
}) => {
  const [activityStatus, setActivityStatus] = useState<keyof typeof ActivityStatus>(
    getValues("activityStatus") ?? "PLANED",
  );

  useEffect(() => {
    setValue("activityStatus", activityStatus);
  }, []);

  const validateHostName = (value) => {
    const regex = /^[\p{L}\p{M}'\-\s]+$/u;
    try {
      return regex.test(value) || "Tên người chủ trì không hợp lệ";
    } catch {
      return "Tên người chủ trì không hợp lệ";
    }
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Bước cuối cùng</h2>
        <p className="text-gray-600">Chỉ thêm một số chi tiết nữa thôi!</p>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <div>
              <h3 className="font-medium">
                Người chủ trì{" "}
                <span className="text-red-600">
                  *{` ${errors.hostName?.message ?? ""}`}
                </span>
              </h3>
            </div>
            <input
              {...register("hostName", {
                required: "Tên người chủ trì không được để trống",
                minLength: { value: 3, message: "Trên 3 ký tự" },
                maxLength: { value: 100, message: "Dưới 100 ký tự" },
                validate: validateHostName,
              })}
              type="text"
              placeholder="Tên người chủ trì hoạt động..."
              className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.hostName?.message
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">
                Số lượng tối đa
                <span className="text-red-600">
                  *{` ${errors.capacity?.message ?? ""}`}
                </span>
              </h3>
              <div className="flex-1 ">
                <div className="relative">
                  <input
                    {...register("capacity", {
                      required: "Số lượng người tối đa không được để trống",
                      min: { value: 3, message: "Ít nhất 3 người" },
                      max: { value: 1000, message: "Tối đa 1000 người" },
                      valueAsNumber: true,
                    })}
                    type="number"
                    placeholder="Số lượng người tối đa"
                    className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.capacity?.message
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
                    }`}
                  />
                  <Group className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">
                Trạng thái{" "}
                <span className="text-red-600">
                  *{` ${errors.activityStatus?.message ?? ""}`}
                </span>
              </h3>
              <select
                {...register("activityStatus")}
                className="w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 hover:cursor-pointer"
              >
                {Object.entries(ActivityStatus)
                  .filter(
                    ([key]) =>
                      isNaN(Number(key)) && (key === "PLANED" || key === "OPENED"),
                  )
                  .map(([key, value]) => (
                    <option key={key} value={key}>
                      {
                        {
                          PLANED: "Lên kế hoạch",
                          OPENED: "Mở",
                        }[key]
                      }
                    </option>
                  ))}
              </select>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">
                Ngày mở đăng ký{" "}
                <span className="text-red-600">
                  *{` ${errors.timeOpenRegister?.message ?? ""}`}
                </span>
              </h3>
              <div className="relative">
                <input
                  {...register("timeOpenRegister", {
                    required: "Không để trống",
                    validate: {
                      isFromToDay: (value) => {
                        const timeOpen = dayjs(value).startOf("day");
                        const timeToday = dayjs().startOf("day");

                        if (timeOpen.isBefore(timeToday)) {
                          return "Nhỏ nhất là hôm nay";
                        }
                        return true;
                      },
                      beforeOccurDate: (value: string) => {
                        const occurDate = getValues("occurDate");
                        if (!occurDate) return true;
                        const inputDate = dayjs(value);
                        const occurDateObj = dayjs(occurDate);

                        if (inputDate.isAfter(occurDateObj)) {
                          return "Phải trước ngày tổ chức";
                        }
                        return true;
                      },
                      isBeforeTimeCloseRegister: (value) => {
                        const timeClose = getValues("timeCloseRegister");
                        if (!timeClose) return true;
                        const timeOpen = dayjs(value).startOf("day");

                        if (
                          timeOpen.isAfter(dayjs(timeClose).startOf("day")) ||
                          timeOpen.isSame(dayjs(timeClose).startOf("day"))
                        ) {
                          setError("timeCloseRegister", {
                            message: "Phải sau ngày mở",
                            type: "manual",
                          });
                          return "Phải trước ngày đóng";
                        }
                        clearErrors("timeCloseRegister");
                        return true;
                      },
                    },
                  })}
                  type="date"
                  className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.timeOpenRegister?.message
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
                  }
                         [&::-webkit-calendar-picker-indicator]:opacity-0 
                        [&::-webkit-calendar-picker-indicator]:absolute 
                        [&::-webkit-calendar-picker-indicator]:right-0
                        [&::-webkit-calendar-picker-indicator]:w-10
                        [&::-webkit-calendar-picker-indicator]:h-full
                        [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        [&::-webkit-inner-spin-button]:hidden
                        [&::-webkit-clear-button]:hidden`}
                />
                <CalendarMonth
                  className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                    errors.timeOpenRegister?.message
                      ? "text-red-500"
                      : " text-gray-400"
                  }`}
                />
              </div>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">
                Ngày đóng đăng ký{" "}
                <span className="text-red-600">
                  *{` ${errors.timeCloseRegister?.message ?? ""}`}
                </span>
              </h3>
              <div className="relative">
                <input
                  {...register("timeCloseRegister", {
                    required: "Không để trống",
                    validate: {
                      isAfterToday: (value) => {
                        const timeClose = dayjs(value);
                        const timeToDay = dayjs(new Date());
                        if (timeClose.isBefore(timeToDay)) {
                          return "Ít nhất sau hôm nay";
                        }
                        return true;
                      },
                      beforeOccurDate: (value: string) => {
                        const occurDate = getValues("occurDate");
                        if (!occurDate) return true;
                        const inputDate = dayjs(value);
                        const occurDateObj = dayjs(occurDate);
                        if (inputDate.isAfter(occurDateObj)) {
                          return "Phải trước ngày tổ chức";
                        }
                        return true;
                      },
                      isAfterTimeOpen: (value) => {
                        const timeOpen = getValues("timeOpenRegister");
                        if (!timeOpen) return true;
                        const timeClose = dayjs(value).startOf("day");

                        if (
                          timeClose.isBefore(dayjs(timeOpen).startOf("day")) ||
                          timeClose.isSame(dayjs(timeOpen).startOf("day"))
                        ) {
                          setError("timeOpenRegister", {
                            message: "Phải trước ngày đóng",
                            type: "manual",
                          });
                          return "Phải sau ngày mở";
                        }
                        clearErrors("timeOpenRegister");
                        return true;
                      },
                    },
                  })}
                  type="date"
                  className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.timeCloseRegister?.message
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
                  }
                         [&::-webkit-calendar-picker-indicator]:opacity-0 
                        [&::-webkit-calendar-picker-indicator]:absolute 
                        [&::-webkit-calendar-picker-indicator]:right-0
                        [&::-webkit-calendar-picker-indicator]:w-10
                        [&::-webkit-calendar-picker-indicator]:h-full
                        [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        [&::-webkit-inner-spin-button]:hidden
                        [&::-webkit-clear-button]:hidden`}
                />
                <CalendarMonth
                  className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                    errors.timeCloseRegister?.message
                      ? "text-red-500"
                      : " text-gray-400"
                  }`}
                />
              </div>
            </div>
          </div>
        </div>

        {/* May be good to implement this one~~~ */}
        {/* <div className="space-y-4">
          <h3 className="font-medium">Materials & Resources</h3>
          <div className="border-2 border-dashed border-gray-200 rounded-xl p-8 text-center">
            <Image className="mx-auto text-gray-400 mb-4" />
            <p className="text-sm text-gray-600 mb-2">
              Drag and drop files here, or click to browse
            </p>
            <p className="text-xs text-gray-400">
              Supported formats: PDF, PPT, DOC (Max 10MB)
            </p>
          </div>
        </div> */}

        {/* <div className="space-y-4">
          <h3 className="font-medium">Additional Options</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Require approval for registration
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Send reminder emails to participants
              </span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded text-blue-600" />
              <span className="text-sm text-gray-700">
                Allow participants to submit questions beforehand
              </span>
            </label>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default FinalDetails;
