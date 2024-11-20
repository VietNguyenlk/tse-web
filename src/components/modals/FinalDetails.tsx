import { CalendarMonth, Group } from "@mui/icons-material";
import { useEffect, useRef, useState } from "react";
import * as yup from "yup";
import { IActivity } from "../../shared/models/activity.model";
import { ActivityStatus } from "../../shared/models/enums/activity.enum";
import {
  convertDateTimeFromClient,
  convertDateTimeFromServer,
} from "../../shared/utils/date-utils";

interface FieldErrors {
  hostName?: string;
  capacity?: string;
  timeToOpenRegistry?: string;
  timeToCloseRegistry?: string;
}

const finalDetailsSchema = yup.object().shape({
  hostName: yup
    .string()
    .required("Tên người chủ trì không được để trống")
    .min(2, "Tên người chủ trì phải trên 2 ký tự")
    .max(100, "Tên người chủ trì quá dài"),
  capacity: yup
    .number()
    .required("Số lượng người tham gia không được để trống")
    .min(3, "Tối thiểu là 3")
    .max(1000, "Tối đa 1000"),
  timeToOpenRegistry: yup
    .string()
    .required("Thời gian mở đăng ký không được để trống")
    .test(
      "is-future",
      "Thời gian mở đăng ký phải sau thời gian hiện tại",
      function (value) {
        if (!value) return true;
        const timeToCloseRegistry = this.parent.timeToCloseRegistry;
        const selectedDay = new Date(value).getTime();
        if (timeToCloseRegistry) {
          const timeCloseRegistry = new Date(timeToCloseRegistry).getTime();
          if (selectedDay >= timeCloseRegistry)
            throw new yup.ValidationError(
              "Thời gian mở đăng ký phải trước thời gian kết thúc đăng ký",
              value,
              "timeToOpenRegistry",
            );
        }
        const now = new Date().getTime();
        return selectedDay + 100000 >= now;
      },
    ),
  timeToCloseRegistry: yup
    .string()
    .required("Thời gian kết thúc đăng ký không được để trống")
    .test(
      "is-future",
      "Thời gian kết thúc đăng ký phải sau thời gian hiện tại",
      function (value) {
        if (!value) return true;
        const selectedDay = new Date(value).getTime();
        const now = new Date().getTime();
        return selectedDay > now;
      },
    ),
});

interface FinalDetailsProps {
  activity: IActivity;
  updateActivity: (newData: Partial<IActivity>) => void;
  setValidStep: (valid: boolean) => void;
  checkValid: boolean;
  setCheckValid: (valid: boolean) => void;
}

const FinalDetails: React.FC<FinalDetailsProps> = ({
  activity,
  updateActivity,
  setValidStep,
  checkValid,
  setCheckValid,
}) => {
  const [hostName, setHostName] = useState<string>(activity.hostName ?? "");
  const [capacity, setCapacity] = useState<number | null>(activity.capacity ?? 10);
  const [activityStatus, setActivityStatus] = useState<keyof typeof ActivityStatus>(
    activity.activityStatus ?? "PLANED",
  );

  const [timeOpenRegister, setTimeOpenRegister] = useState<string>(
    convertDateTimeFromServer(activity.timeOpenRegister) ?? "",
  );
  const [timeCloseRegister, setTimeCloseRegister] = useState<string>(
    convertDateTimeFromServer(activity.timeCloseRegister) ?? "",
  );

  const [errors, setErrors] = useState<FieldErrors>({});

  const latestDateTimeRef = useRef<{
    timeOpenRegister: string;
    timeCloseRegister: string;
  }>({
    timeOpenRegister: "",
    timeCloseRegister: "",
  });

  useEffect(() => {
    latestDateTimeRef.current = {
      timeOpenRegister,
      timeCloseRegister,
    };
  }, [timeOpenRegister, timeCloseRegister]);

  useEffect(() => {
    updateActivity({
      hostName: hostName,
      activityStatus: activityStatus,
      capacity: capacity,
      timeOpenRegister: convertDateTimeFromClient(
        latestDateTimeRef.current.timeOpenRegister,
      ),
      timeCloseRegister: convertDateTimeFromClient(
        latestDateTimeRef.current.timeCloseRegister,
      ),
    });
  }, [capacity, activityStatus, timeOpenRegister, timeCloseRegister, hostName]);

  useEffect(
    () => {
      if (checkValid) {
        validateField("capacity", capacity);
        validateField("hostName", hostName);
        validateField(
          "timeToOpenRegistry",
          latestDateTimeRef.current.timeOpenRegister,
        );
        validateField(
          "timeToCloseRegistry",
          latestDateTimeRef.current.timeCloseRegister,
        );
        setCheckValid(false);
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [checkValid],
  );

  const validateField = async (
    fieldName: keyof FieldErrors,
    value: string | number,
  ) => {
    try {
      const dataToValidate =
        fieldName === "timeToOpenRegistry" || fieldName === "timeToCloseRegistry"
          ? {
              timeToOpenRegistry:
                fieldName === "timeToOpenRegistry"
                  ? value
                  : latestDateTimeRef.current.timeOpenRegister,
              timeToCloseRegistry:
                fieldName === "timeToCloseRegistry"
                  ? value
                  : latestDateTimeRef.current.timeCloseRegister,
            }
          : { [fieldName]: value };

      await finalDetailsSchema.validateAt(fieldName, dataToValidate);

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
    const name = e.target.name as keyof FieldErrors;
    switch (name) {
      case "capacity":
        const sanitizedValue = e.target.value.replace(/[^0-9]/g, ""); // Remove all non-digit characters
        const newCapacity = sanitizedValue === "" ? 0 : Number(sanitizedValue);
        setCapacity(newCapacity);
        validateField(name, newCapacity);
        break;
      case "hostName":
        setHostName(newValue);
        validateField(name, newValue);
        break;
      case "timeToOpenRegistry":
        setTimeOpenRegister(newValue);
        validateField(name, newValue);
        // validateField("timeToCloseRegistry", timeCloseRegister);
        break;
      case "timeToCloseRegistry":
        setTimeCloseRegister(newValue);
        validateField(name, newValue);
        // validateField("timeToOpenRegistry", timeOpenRegister);
        break;
      default:
        break;
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
                Người chủ trì <span className="text-red-600">*</span>
              </h3>
              <span className="text-red-600">{errors.hostName}</span>
            </div>
            <input
              type="text"
              value={hostName}
              name="hostName"
              onChange={handleChange}
              placeholder="Tên người chủ trì hoạt động..."
              className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                errors.hostName
                  ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                  : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
              }`}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">
                Số lượng tối đa{" "}
                <span className="text-red-600">{errors.capacity ?? "*"}</span>
              </h3>
              <div className="flex-1 ">
                <div className="relative">
                  <input
                    type="text"
                    name="capacity"
                    value={capacity}
                    onChange={handleChange}
                    placeholder="Số lượng người tối đa"
                    className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      errors.capacity
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
                Trạng thái <span className="text-red-600">*</span>
              </h3>
              <select
                value={activityStatus}
                onChange={(e) =>
                  setActivityStatus(e.target.value as keyof typeof ActivityStatus)
                }
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
                Thời gian mở đăng ký <span className="text-red-600">*</span>
              </h3>
              <div className="relative">
                <input
                  type="datetime-local"
                  name="timeToOpenRegistry"
                  // value={convertDateTimeToDisplay(timeOpenRegister)}
                  value={timeOpenRegister ?? ""}
                  onChange={handleChange}
                  className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.timeToOpenRegistry
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
                    errors.timeToOpenRegistry ? "text-red-500" : " text-gray-400"
                  }`}
                />
              </div>
              <p className="text-red-600">{errors.timeToOpenRegistry}</p>
            </div>

            <div className="space-y-2">
              <h3 className="font-medium">
                Thời gian kết thúc đăng ký <span className="text-red-600">*</span>
              </h3>
              <div className="relative">
                <input
                  type="datetime-local"
                  value={timeCloseRegister}
                  name="timeToCloseRegistry"
                  onChange={handleChange}
                  className={`w-full px-6 py-3 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.timeToCloseRegistry
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
                    errors.timeToCloseRegistry ? "text-red-500" : " text-gray-400"
                  }`}
                />
              </div>{" "}
              <p className="text-red-600">{errors.timeToCloseRegistry}</p>
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
