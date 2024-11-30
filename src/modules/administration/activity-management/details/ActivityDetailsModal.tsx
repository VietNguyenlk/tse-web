import { CalendarMonth, Close, Edit, LockClock, Save } from "@mui/icons-material";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import CustomConfirmDialog from "../../../../components/dialogs/CustomConfirmDialog";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { IActivity } from "../../../../shared/models/activity.model";
import {
  ActivityScope,
  ActivityStatus,
  ActivityType,
  VenueType,
} from "../../../../shared/models/enums/activity.enum";
import { extractTimeFromDateTime } from "../../../../shared/utils/date-utils";
import {
  resetActivityManagementState,
  updateActivity,
} from "../activity-management.reducer";
import { useNotifications } from "../../../../shared/hooks/notification.hook";
import Notification from "../../../../components/notifications/Notification";

interface ActivityDetailsModalProps {
  isOpen: boolean;
  activity?: IActivity;
  onClose: () => void;
}

const ActivityDetailsModal: React.FC<ActivityDetailsModalProps> = ({
  isOpen,
  activity,
  onClose,
}) => {
  const notificationTimeOut = 1000;
  const dispatch = useAppDispatch();
  const activityManagementState = useAppSelector(
    (state) => state.activityManagement,
  );
  const [toggleConfirmDialog, setToggleConfirmDialog] = useState<boolean>(false);
  const { addNotification, notifications, removeNotification } = useNotifications();
  const {
    setError,
    clearErrors,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<IActivity>({
    defaultValues: activity,
  });

  const [enableEdit, setEnableEdit] = useState<boolean>(false);
  const [formData, setFormData] = useState<IActivity>({});

  const handleUpdateSuccess = (successMessage: string | null) => {
    addNotification("SUCCESS", "Cập nhật thành công", successMessage);
    // dispatch(resetActivityManagementState());
  };

  const handleUpdateFailure = (errorMessage: string | null) => {
    reset();
    addNotification("ERROR", "Cập nhật thất bại", errorMessage);
  };

  useEffect(() => {
    if (
      activityManagementState.updateSuccess === false &&
      activityManagementState.errorMessage
    ) {
      handleUpdateFailure(activityManagementState.errorMessage);
    }

    if (activityManagementState.updateSuccess) {
      handleUpdateSuccess("Cập nhật thông tin hoạt động thành công");
    }
  }, [activityManagementState]);

  const handleClose = () => {
    setEnableEdit(false);
    onClose();
  };

  const handleConfirm = () => {
    setEnableEdit(false);
    setToggleConfirmDialog(false);
    dispatch(updateActivity(formData));
  };

  const submitHandler = (data: IActivity) => {
    setToggleConfirmDialog(true);
    setFormData(data);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center p-4 overflow-y-auto">
      <div className="fixed inset-0 bg-black/30 bg-opacity-50 transition-opacity" />

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

      <div className="relative bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-6xl mx-4 p-6 ">
        <CustomConfirmDialog
          isOpen={toggleConfirmDialog}
          onCancel={() => setToggleConfirmDialog(false)}
          onConfirm={handleConfirm}
        />
        <div className="flex items-center justify-between border-b py-2">
          <h2 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
            {activity.activityId
              ? `ID Hoạt động: ${activity.activityId}`
              : "New Activity"}
          </h2>
          <button
            onClick={handleClose}
            className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
          >
            <Close />
          </button>
        </div>

        <form
          onSubmit={handleSubmit(submitHandler)}
          className="max-w-6xl mx-auto space-x-2 "
        >
          <div className="pt-2 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-4 md:grid-cols-4 lg:grid-cols-8 gap-4">
              <div className="space-y-2 col-span-4">
                <label className="block text-base font-semibold text-gray-700">
                  Tên hoạt động{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.name?.message ?? ""}`}
                  </span>
                </label>
                <input
                  {...register("name", {
                    required: "Tên hoạt động không được để trống",
                    maxLength: {
                      value: 300,
                      message: "Tên hoạt động không được quá 300 ký tự",
                    },
                  })}
                  readOnly={!enableEdit}
                  type="text"
                  placeholder="Tên của hoạt động..."
                  className={`${
                    enableEdit
                      ? "focus:border-indigo-500 focus:ring-indigo-500 "
                      : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                w-full rounded-lg  shadow-sm text-md transition-all`}
                />
              </div>

              <div className="space-y-2 col-span-4 lg:col-span-1 md:col-span-1">
                <label className="block text-base font-semibold text-gray-700">
                  Loại hoạt động <span className="text-red-500 text-sm">*</span>
                </label>
                <select
                  disabled={!enableEdit}
                  {...register("activityType")}
                  className={`
                  ${
                    enableEdit
                      ? " bg-gray-50"
                      : " border-gray-200 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                  rounded-lg bg-gray-50 px-3 py-2 text-md font-medium focus:border-blue-500 focus:outline-none cursor-pointer`}
                >
                  {Object.entries(ActivityType)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => {
                      return (
                        <option key={key} value={key as keyof typeof ActivityType}>
                          {
                            {
                              CONTEST: "Cuộc thi",
                              SEMINAR: "Hội thảo",
                              TRAINING: "Đào tạo",
                            }[key as keyof typeof ActivityType]
                          }
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="space-y-2 col-span-4 lg:col-span-1 md:col-span-1">
                <label className="block text-base font-semibold text-gray-700">
                  Phạm vi <span className="text-red-500 text-sm">*</span>
                </label>
                <select
                  disabled={!enableEdit}
                  {...register("activityScope")}
                  className={`
                  ${
                    enableEdit
                      ? " bg-gray-50"
                      : " border-gray-200 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                  rounded-lg bg-gray-50 px-3 py-2 text-md font-medium focus:border-blue-500 focus:outline-none cursor-pointer`}
                >
                  {Object.entries(ActivityScope)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => {
                      return (
                        <option key={key} value={key as keyof typeof ActivityScope}>
                          {
                            {
                              INTERNAL: "Nội bộ",
                              EXTERNAL: "Bên ngoài",
                            }[key as keyof typeof ActivityScope]
                          }
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="space-y-2 col-span-4 lg:col-span-2 md:col-span-2">
                <label className="block text-base font-semibold text-gray-700">
                  Trạng thái <span className="text-red-500 text-sm">*</span>
                </label>
                <select
                  disabled={!enableEdit}
                  {...register("activityStatus")}
                  className={`
                  ${
                    enableEdit
                      ? " bg-gray-50"
                      : " border-gray-200 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                  rounded-lg bg-gray-50 px-3 py-2 text-md font-medium focus:border-blue-500 focus:outline-none cursor-pointer`}
                >
                  {Object.entries(ActivityStatus)
                    .filter(([key]) => isNaN(Number(key)))
                    .map(([key, value]) => {
                      return (
                        <option key={key} value={key as keyof typeof ActivityStatus}>
                          {
                            {
                              PLANED: "Lên kế hoạch",
                              OPENED: "Mở",
                              CANCELED: "Huỷ bỏ",
                              CLOSED: "Đóng",
                            }[key as keyof typeof ActivityStatus]
                          }
                        </option>
                      );
                    })}
                </select>
              </div>

              <div className="space-y-2 col-span-4">
                <label className="block text-base font-semibold text-gray-700">
                  Địa điểm{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.venue?.message ?? ""}`}
                  </span>
                </label>
                <div className="flex">
                  <select
                    disabled={!enableEdit}
                    {...register("venueType")}
                    className={`
                    ${
                      enableEdit
                        ? " bg-gray-50"
                        : " border-gray-200 text-gray-600 cursor-not-allowed pointer-events-none"
                    }
                    rounded-l-lg border-r-0 bg-gray-50 px-3 py-2 text-md font-medium focus:border-blue-500 focus:outline-none cursor-pointer`}
                  >
                    {Object.entries(VenueType)
                      .filter(([key]) => isNaN(Number(key)))
                      .map(([key, value]) => {
                        return (
                          <option key={key} value={key as keyof typeof VenueType}>
                            {key as keyof typeof VenueType}
                          </option>
                        );
                      })}
                  </select>

                  <input
                    {...register("venue", {
                      required: "Địa điểm không được để trống",
                    })}
                    readOnly={!enableEdit}
                    type="text"
                    placeholder="Nhập địa điểm..."
                    className={`${
                      enableEdit
                        ? "focus:border-indigo-500 focus:ring-indigo-500 "
                        : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                    }
                  w-full rounded-r-lg shadow-sm text-md transition-all`}
                  />
                </div>
              </div>

              <div className="space-y-2 col-span-4 lg:col-span-2 md:col-span-2">
                <label className="block text-base font-semibold text-gray-700">
                  Số lượng tối đa{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.capacity?.message ?? ""}`}
                  </span>
                </label>
                <input
                  {...register("capacity", {
                    required: "Không được trống",
                    min: {
                      value: 3,
                      message: "Tối thiểu 1",
                    },
                    valueAsNumber: true,
                  })}
                  readOnly={!enableEdit}
                  type="number"
                  placeholder="Số lượng tối đa của hoạt động..."
                  className={`${
                    enableEdit
                      ? "focus:border-indigo-500 focus:ring-indigo-500 "
                      : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                w-full rounded-lg  shadow-sm text-md transition-all`}
                />
              </div>

              <div className="space-y-2 col-span-4 lg:col-span-2 md:col-span-2">
                <label className="block text-base font-semibold text-gray-700">
                  Người chủ trì{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.hostName?.message ?? ""}`}
                  </span>
                </label>
                <input
                  {...register("hostName", {
                    required: "Không được trống",
                  })}
                  readOnly={!enableEdit}
                  type="text"
                  placeholder="Tên người chủ trì hoạt động..."
                  className={`${
                    enableEdit
                      ? "focus:border-indigo-500 focus:ring-indigo-500 "
                      : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                w-full rounded-lg  shadow-sm text-md transition-all`}
                />
              </div>

              <div className="space-y-2 col-span-4 ">
                <label className="block text-base font-semibold text-gray-700">
                  Ngày mở đăng kí{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.timeOpenRegister?.message ?? ""}`}
                  </span>
                </label>
                <div className="relative">
                  <input
                    {...register("timeOpenRegister", {
                      required: "Không được trống",
                      validate: dirtyFields.timeOpenRegister
                        ? {
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
                          }
                        : undefined,
                    })}
                    readOnly={!enableEdit}
                    type="date"
                    className={`
                      ${
                        enableEdit
                          ? "focus:border-indigo-500 focus:ring-indigo-500 "
                          : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                      }
                      w-full rounded-lg  shadow-sm text-md transition-all
                      [&::-webkit-calendar-picker-indicator]:opacity-0 
                      [&::-webkit-calendar-picker-indicator]:absolute 
                      [&::-webkit-calendar-picker-indicator]:right-0
                      [&::-webkit-calendar-picker-indicator]:w-10
                      [&::-webkit-calendar-picker-indicator]:h-full
                      [&::-webkit-calendar-picker-indicator]:cursor-pointer
                      [&::-webkit-inner-spin-button]:hidden
                      [&::-webkit-clear-button]:hidden
                      `}
                  />
                  <div
                    className={`
                    absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none 
                  ${
                    enableEdit
                      ? "text-gray-600 group-focus-within:text-blue-500"
                      : " text-gray-400 group-focus-within:text-blue-500"
                  }
                `}
                  >
                    <CalendarMonth />
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-4 ">
                <label className="block text-base font-semibold text-gray-700">
                  Ngày đóng đăng kí{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.timeCloseRegister?.message ?? ""}`}
                  </span>
                </label>
                <div className="relative">
                  <input
                    {...register("timeCloseRegister", {
                      required: "Không được trống",
                      validate: dirtyFields.timeCloseRegister
                        ? {
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
                          }
                        : undefined,
                    })}
                    readOnly={!enableEdit}
                    type="date"
                    className={`${
                      enableEdit
                        ? "focus:border-indigo-500 focus:ring-indigo-500 "
                        : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                    }
                  w-full rounded-lg  shadow-sm text-md transition-all
                  
                       [&::-webkit-calendar-picker-indicator]:opacity-0 
                      [&::-webkit-calendar-picker-indicator]:absolute 
                      [&::-webkit-calendar-picker-indicator]:right-0
                      [&::-webkit-calendar-picker-indicator]:w-10
                      [&::-webkit-calendar-picker-indicator]:h-full
                      [&::-webkit-calendar-picker-indicator]:cursor-pointer
                      [&::-webkit-inner-spin-button]:hidden
                      [&::-webkit-clear-button]:hidden`}
                  />
                  <div
                    className={`
                    absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none 
                  ${
                    enableEdit
                      ? "text-gray-600 group-focus-within:text-blue-500"
                      : " text-gray-400 group-focus-within:text-blue-500"
                  }
                `}
                  >
                    <CalendarMonth />
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-4 ">
                <label className="block text-base font-semibold text-gray-700">
                  Ngày tổ chức{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.occurDate?.message ?? ""}`}
                  </span>
                </label>
                <div className="relative">
                  <input
                    {...register("occurDate", {
                      required: "Không được trống",
                      validate: dirtyFields.occurDate
                        ? {
                            checkTime: (value: string) => {
                              const today = new Date();
                              const inputDate = new Date(value);
                              today.setHours(0, 0, 0, 0);
                              inputDate.setHours(0, 0, 0, 0);
                              const isAfter = inputDate.getTime() > today.getTime();
                              if (!isAfter) {
                                return "Phải lớn hơn ngày hiên tại";
                              }

                              return true;
                            },
                          }
                        : undefined,
                    })}
                    readOnly={!enableEdit}
                    type="date"
                    placeholder="Số lượng tối đa của hoạt động..."
                    className={`${
                      enableEdit
                        ? "focus:border-indigo-500 focus:ring-indigo-500 "
                        : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                    }
                  w-full rounded-lg  shadow-sm text-md transition-all
                              [&::-webkit-calendar-picker-indicator]:opacity-0
                        [&::-webkit-calendar-picker-indicator]:absolute
                        [&::-webkit-calendar-picker-indicator]:right-0
                        [&::-webkit-calendar-picker-indicator]:w-10
                        [&::-webkit-calendar-picker-indicator]:h-full
                        [&::-webkit-calendar-picker-indicator]:cursor-pointer
                        [&::-webkit-inner-spin-button]:hidden
                        [&::-webkit-clear-button]:hidden
                      `}
                  />
                  <div
                    className={`
                    absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none 
                  ${
                    enableEdit
                      ? "text-gray-600 group-focus-within:text-blue-500"
                      : " text-gray-400 group-focus-within:text-blue-500"
                  }
                `}
                  >
                    <CalendarMonth />
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-2 ">
                <label className="block text-base font-semibold text-gray-700">
                  Giờ bắt đầu{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.startTime?.message ?? ""}`}
                  </span>
                </label>
                <div className="relative">
                  <input
                    {...register("startTime", {
                      required: "Không được trống",
                      validate: {
                        checkTime: (value) => {
                          let endTime = getValues("endTime");
                          if (!endTime) return true;
                          endTime = extractTimeFromDateTime(endTime);
                          if (value >= endTime) {
                            return "Phải nhỏ hơn giờ kết thúc";
                          }
                          return true;
                        },
                      },
                    })}
                    readOnly={!enableEdit}
                    type="time"
                    placeholder="Số lượng tối đa của hoạt động..."
                    className={`${
                      enableEdit
                        ? "focus:border-indigo-500 focus:ring-indigo-500 "
                        : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                    }
                  w-full rounded-lg  shadow-sm text-md transition-all
                    [&::-webkit-calendar-picker-indicator]:opacity-100
                          [&::-webkit-calendar-picker-indicator]:inline-block
                          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                          [&::-webkit-time-picker-indicator]:opacity-100
                          [&::-webkit-time-picker-indicator]:inline-block
                          [&::-webkit-time-picker-indicator]:hover:cursor-pointer
                    `}
                  />
                  <div
                    className={`
                    absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none 
                  ${
                    enableEdit
                      ? "text-gray-600 group-focus-within:text-blue-500"
                      : " text-gray-400 group-focus-within:text-blue-500"
                  }
                `}
                  >
                    <LockClock />
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-2">
                <label className="block text-base font-semibold text-gray-700">
                  Giờ kết thúc{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.endTime?.message ?? ""}`}
                  </span>
                </label>
                <div className="relative">
                  <input
                    {...register("endTime", {
                      validate: {
                        checkTime: (value) => {
                          let startTime = getValues("startTime");
                          if (!startTime) return true;
                          startTime = extractTimeFromDateTime(startTime);
                          if (value <= startTime) {
                            return "Phải lớn hơn giờ bắt đầu";
                          }
                          return true;
                        },
                      },
                    })}
                    readOnly={!enableEdit}
                    type="time"
                    placeholder="Số lượng tối đa của hoạt động..."
                    className={`${
                      enableEdit
                        ? "focus:border-indigo-500 focus:ring-indigo-500 "
                        : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                    }
                  w-full rounded-lg  shadow-sm text-md transition-all
                    [&::-webkit-calendar-picker-indicator]:opacity-100
                          [&::-webkit-calendar-picker-indicator]:inline-block
                          [&::-webkit-calendar-picker-indicator]:hover:cursor-pointer
                          [&::-webkit-time-picker-indicator]:opacity-100
                          [&::-webkit-time-picker-indicator]:inline-block
                          [&::-webkit-time-picker-indicator]:hover:cursor-pointer
                    `}
                  />
                  <div
                    className={`
                    absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none 
                  ${
                    enableEdit
                      ? "text-gray-600 group-focus-within:text-blue-500"
                      : " text-gray-400 group-focus-within:text-blue-500"
                  }
                `}
                  >
                    <LockClock />
                  </div>
                </div>
              </div>

              <div className="space-y-2 col-span-4 md:col-span-full lg:col-span-full">
                <label className="block text-base font-semibold text-gray-700">
                  Mô tả{" "}
                  <span className="text-red-500 text-sm">
                    *{` ${errors.description?.message ?? ""}`}
                  </span>
                </label>
                <textarea
                  {...register("description", {
                    maxLength: {
                      value: 280,
                      message: "Mô tả không được quá 280 ký tự",
                    },
                  })}
                  readOnly={!enableEdit}
                  placeholder="Mô tả cho hoạt động..."
                  rows={4}
                  className={`${
                    enableEdit
                      ? "focus:border-indigo-500 focus:ring-indigo-500 "
                      : "border-gray-100 text-gray-600 cursor-not-allowed pointer-events-none"
                  }
                w-full rounded-lg  shadow-sm text-md transition-all`}
                />
              </div>
            </div>
          </div>

          <div className="mt-8 flex justify-end space-x-2">
            {enableEdit ? (
              <>
                <button
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    reset();
                    setEnableEdit(false);
                  }}
                  className="px-4 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex justify-center space-x-2"
                >
                  <Close />
                  <span>Cancel</span>
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex justify-center space-x-2"
                >
                  <Save />
                  <span>Save</span>
                </button>
              </>
            ) : (
              <>
                <button
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    onClose();
                  }}
                  className="px-4 py-2 text-base font-medium text-white bg-red-600 hover:bg-red-500 rounded-lg transition-colors flex justify-center space-x-2"
                >
                  <Close />
                  <span>Close</span>
                </button>
                <button
                  onClick={(e: React.FormEvent) => {
                    e.preventDefault();
                    setEnableEdit(true);
                  }}
                  className="px-4 py-2 text-base font-medium text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex justify-center space-x-2"
                >
                  <Edit />
                  <span>Edit</span>
                </button>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default ActivityDetailsModal;
