import { AddLink, CalendarMonth, LocationOn, LockClock } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { IActivity } from "../../shared/models/activity.model";
import * as yup from "yup";
import {
  convertDateFromServer,
  convertDateTimeFromClient,
  convertTimeFromClient,
  extractTimeFromDateTime,
} from "../../shared/utils/date-utils";
import { VenueType } from "../../shared/models/enums/activity.enum";

interface FieldErrors {
  occurDate?: string;
  startTime?: string;
  endTime?: string;
  venue?: string;
}

const dateTimeValidation = yup.object().shape({
  occurDate: yup
    .string()
    .required("Ngày tổ chức không được để trống")
    .test(
      "is-future-date",
      "Ngày tổ chức phải lớn hơn hoặc bằng ngày hôm nay",
      (value) => {
        if (!value) return false;
        const selectedDate = new Date(value);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
    ),
  startTime: yup
    .string()
    .trim()
    .required("Giờ bắt đầu không được để trống")
    .test(
      "is-after-current",
      "Giờ bắt đầu phải sau thời gian hiện tại",
      function (value) {
        if (!value) return true; // Skip if empty

        const currentDate = new Date();
        const currentTime = `${String(currentDate.getHours()).padStart(
          2,
          "0",
        )}:${String(currentDate.getMinutes()).padStart(2, "0")}`;
        return value >= currentTime;
      },
    ),
  endTime: yup
    .string()
    .trim()
    .required("Giờ kết thúc không được để trống")
    .test("is-after-start", "Giờ kết thúc phải sau giờ bắt đầu", function (value) {
      if (!value) return true;
      const { startTime } = this.parent;
      if (!startTime) return true;

      // Convert times to comparable format (assuming HH:mm format)
      const start = startTime.split(":").map(Number);
      const end = value.split(":").map(Number);

      // Compare hours first, then minutes if hours are equal
      if (start[0] < end[0]) return true;
      if (start[0] === end[0]) return start[1] < end[1];
      return false;
    }),
  venue: yup.string().trim().required("Địa điểm không được để trống"),
});

interface ActivityTimeLocationProps {
  activity: IActivity;
  updateActivity: (newData: Partial<IActivity>) => void;
  setValidStep: (valid: boolean) => void;
  checkValid: boolean;
  setCheckValid: (check: boolean) => void;
}

const ActivityTimeLocation: React.FC<ActivityTimeLocationProps> = ({
  activity,
  updateActivity,
  setValidStep,
  checkValid,
  setCheckValid,
}) => {
  const [venueType, setSelectedVenueType] = useState<keyof typeof VenueType>(
    activity.venueType ?? "OFFLINE",
  );
  const [venueValue, setVenueValue] = useState<string>(activity.venue ?? "");

  const [occurDate, setOccurDate] = useState<string>(
    convertDateFromServer(activity.occurDate ?? new Date()),
  );
  const [startTime, setStartTime] = useState<string>(
    extractTimeFromDateTime(activity.startTime) ?? "",
  );
  const [endTime, setEndTime] = useState<string | null>(
    extractTimeFromDateTime(activity.endTime) ?? "",
  );

  const [errors, setErrors] = useState<FieldErrors>({});

  useEffect(
    () => {
      if (checkValid) {
        validateField("occurDate", occurDate);
        validateField("startTime", startTime);
        validateField("endTime", endTime);
        validateField("venue", venueValue);
        setCheckValid(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkValid],
  );

  useEffect(
    () => {
      updateActivity({
        occurDate: convertDateTimeFromClient(occurDate),
        startTime: convertTimeFromClient(startTime),
        endTime: convertTimeFromClient(endTime),
        venue: venueValue,
        venueType: venueType,
      });
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [occurDate, startTime, endTime, venueValue, venueType],
  );

  const validateField = async (fieldName: keyof FieldErrors, value: string) => {
    try {
      const dataToValidate =
        fieldName === "endTime"
          ? { startTime: startTime, [fieldName]: value }
          : { [fieldName]: value };
      await dateTimeValidation.validateAt(fieldName, dataToValidate);

      // Clear error for this field while keeping other errors
      const newErrors = { ...errors };
      delete newErrors[fieldName];
      setErrors(newErrors);
      setValidStep(Object.keys(newErrors).length === 0);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        setErrors((prev) => ({
          ...prev,
          [fieldName]: err.message,
        }));
        setValidStep(false);
      }
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const newValue = e.target.value;
    const name = e.target.name;
    switch (name) {
      case "occurDate":
        setOccurDate(newValue);
        validateField(name, newValue);
        break;
      case "startTime":
        setStartTime(newValue);
        validateField(name, newValue);
        break;
      case "endTime":
        setEndTime(newValue);
        validateField(name, newValue);
        break;
      case "venue":
        setVenueValue(newValue);
        validateField(name, newValue);
        break;
      default:
        break;
    }
  };

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
              Ngày tổ chức <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="date"
                name="occurDate"
                value={occurDate}
                onChange={handleChange}
                className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.occurDate
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
                  errors.occurDate ? "text-red-500" : " text-gray-400"
                }`}
              />
            </div>
            <p className="text-red-500">{errors.occurDate}</p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Giờ bắt đầu <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                name="startTime"
                value={startTime}
                onChange={handleChange}
                className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.startTime
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
                  errors.startTime ? "text-red-500" : "text-gray-400"
                }`}
              />
            </div>
            <p className="text-red-500">{errors.startTime}</p>
          </div>

          <div className="flex-1 space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Giờ kết thúc <span className="text-red-600">*</span>
            </label>
            <div className="relative">
              <input
                type="time"
                name="endTime"
                value={endTime}
                onChange={handleChange}
                className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500
                  ${
                    errors.endTime
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
                  errors.endTime ? "text-red-500" : "text-gray-400"
                }`}
              />
            </div>
            <p className="text-red-500">{errors.endTime}</p>
          </div>
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-medium">
            Địa điểm <span className="text-red-600">*</span>
          </h3>
          <div className="flex gap-4">
            {Object.entries(VenueType)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => {
                return (
                  <button
                    key={key}
                    onClick={() => {
                      setSelectedVenueType(key as keyof typeof VenueType);
                      setVenueValue("");
                      validateField("venue", "");
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
            type="text"
            name="venue"
            onChange={handleChange}
            value={venueValue}
            placeholder={
              venueType === "OFFLINE"
                ? "Nhập địa điểm tổ chức"
                : "Nhập link tham gia meeting"
            }
            className={`w-full px-6 py-4 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              errors.venue
                ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
            }`}
          />
          {venueType === "OFFLINE" ? (
            <LocationOn
              className={`absolute right-4 top-1/2 -translate-y-1/2  ${
                errors.venue ? "text-red-500" : "text-gray-400"
              }`}
            />
          ) : (
            <AddLink
              className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                errors.venue ? "text-red-500" : "text-gray-400 "
              }`}
            />
          )}
        </div>
        <p className="text-red-500">{errors.venue}</p>
      </div>
    </div>
  );
};

export default ActivityTimeLocation;
