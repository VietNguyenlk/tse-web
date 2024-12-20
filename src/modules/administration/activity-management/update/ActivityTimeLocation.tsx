import { AddLink, CalendarMonth, LocationOn, LockClock } from "@mui/icons-material";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  FieldErrors,
  UseFormClearErrors,
  UseFormGetValues,
  UseFormRegister,
  UseFormSetError,
  UseFormSetValue,
} from "react-hook-form";
import { IActivity } from "../../../../shared/models/activity.model";
import { VenueType } from "../../../../shared/models/enums/activity.enum";
import { convertTimeFromClient } from "../../../../shared/utils/date-utils";

interface ActivityTimeLocationProps {
  register: UseFormRegister<IActivity>;
  setValue: UseFormSetValue<IActivity>;
  getValues: UseFormGetValues<IActivity>;
  setError: UseFormSetError<IActivity>;
  errors: FieldErrors<IActivity>;
  clearErrors: UseFormClearErrors<IActivity>;
}

const ActivityTimeLocation: React.FC<ActivityTimeLocationProps> = ({
  errors,
  getValues,
  register,
  setValue,
  setError,
  clearErrors,
}) => {
  const [venueType, setSelectedVenueType] = useState<keyof typeof VenueType>(
    getValues("venueType") ?? "OFFLINE",
  );

  useEffect(() => {
    setValue("venueType", venueType);
  }, []);

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-2xl font-bold mb-2">Thời gian và địa điểm</h2>
        <p className="text-gray-600">Sắp xếp thời gian và địa điểm lý tưởng</p>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm space-y-6">
        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Ngày tổ chức{" "}
              <span className="text-red-600">
                *{` ${errors.occurDate?.message ?? ""}`}
              </span>
            </label>
            <div className="relative">
              <input
                {...register("occurDate", {
                  required: "Ngày tổ chức không được để trống",
                  validate: (value: string) => {
                    const selectedDate = dayjs(value);
                    const today = dayjs(new Date());
                    if (selectedDate.isSame(today) || selectedDate.isBefore(today))
                      return "Ngày tổ chức phải sau hôm nay";
                    return true;
                  },
                })}
                type="date"
                className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.occurDate?.message
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
                  errors.occurDate?.message ? "text-red-500" : " text-gray-400"
                }`}
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Giờ bắt đầu{" "}
              <span className="text-red-600">
                *{` ${errors.startTime?.message ?? ""}`}
              </span>
            </label>
            <div className="relative">
              <input
                {...register("startTime", {
                  required: "Giờ bắt đầu không được để trống",
                  validate: (value: string) => {
                    const endTime = convertTimeFromClient(getValues("endTime"));
                    if (!endTime) return true;
                    const startDate = convertTimeFromClient(value);

                    if (startDate.isAfter(endTime)) {
                      setError("endTime", {
                        type: "manual",
                        message: "Ít nhất bằng giờ bắt đầu",
                      });
                      return "Lớn nhất bằng giờ kết thúc";
                    }

                    clearErrors("endTime");
                    return true;
                  },
                })}
                type="time"
                className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.startTime?.message
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
                  }
                          [&::-webkit-calendar-picker-indicator]:opacity-100
                          [&::-webkit-calendar-picker-indicator]:inline-block
                          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                          [&::-webkit-time-picker-indicator]:opacity-100
                          [&::-webkit-time-picker-indicator]:inline-block
                          [&::-webkit-time-picker-indicator]:hover:cursor-pointer`}
              />
              <LockClock
                className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                  errors.startTime?.message ? "text-red-500" : "text-gray-400"
                }`}
              />
            </div>
          </div>

          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Giờ kết thúc{" "}
              <span className="text-red-600">
                *{` ${errors.endTime?.message ?? ""}`}
              </span>
            </label>
            <div className="relative">
              <input
                {...register("endTime", {
                  required: "Không được trống",
                  validate: (value: string) => {
                    const startTime = convertTimeFromClient(getValues("startTime"));
                    if (!startTime) return true;
                    const endTime = convertTimeFromClient(value);

                    if (startTime.isAfter(endTime)) {
                      setError("startTime", {
                        type: "manual",
                        message: "Lớn nhất bằng giờ kết thúc",
                      });
                      return "Ít nhất bằng giờ bắt đầu";
                    }

                    clearErrors("startTime");
                    return true;
                  },
                })}
                type="time"
                className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.endTime?.message
                      ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                      : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
                  }
                          [&::-webkit-calendar-picker-indicator]:opacity-100
                          [&::-webkit-calendar-picker-indicator]:inline-block
                          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                          [&::-webkit-time-picker-indicator]:opacity-100
                          [&::-webkit-time-picker-indicator]:inline-block
                          [&::-webkit-time-picker-indicator]:hover:cursor-pointer`}
              />
              <LockClock
                className={`absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none ${
                  errors.endTime?.message ? "text-red-500" : "text-gray-400"
                }`}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            Địa điểm{" "}
            <span className="text-red-600">
              {" "}
              *{` ${errors.venue?.message ?? ""}`}
            </span>
          </h3>
          <div className="flex gap-4">
            {Object.entries(VenueType)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => {
                return (
                  <button
                    type="button"
                    key={key}
                    onClick={() => {
                      setValue("venueType", key as keyof typeof VenueType);
                      setSelectedVenueType(key as keyof typeof VenueType);
                    }}
                    className={`px-4 py-2 rounded-lg font-medium ${
                      venueType === (key as keyof typeof VenueType)
                        ? "bg-blue-50 text-blue-600"
                        : "text-gray-600"
                    }`}
                  >
                    {key}
                  </button>
                );
              })}
          </div>
        </div>

        <div className="relative">
          <input
            {...register("venue", {
              required: "Địa điểm không được để trống",
              minLength: { value: 10, message: "Ít nhất 10 ký tự" },
              maxLength: { value: 255, message: "Không quá 255 ký tự" },
            })}
            type="text"
            placeholder={
              venueType === "OFFLINE"
                ? "Nhập địa điểm tổ chức"
                : "Nhập link tham gia meeting"
            }
            className={`w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.venue?.message
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
            }`}
          />
          {venueType === "OFFLINE" ? (
            <LocationOn
              className={`absolute right-4 top-1/2 -translate-y-1/2  ${
                errors.venue?.message ? "text-red-500" : "text-gray-400"
              }`}
            />
          ) : (
            <AddLink
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                errors.venue?.message ? "text-red-500" : "text-gray-400 "
              }`}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default ActivityTimeLocation;
