import {
  AccessTime,
  AppRegistration,
  CalendarMonth,
  Check,
  CheckCircle,
  Close,
  HowToReg,
  LocationOn,
  Person,
  Search,
  VisibilityOutlined,
} from "@mui/icons-material";
import { Badge } from "@mui/material";
import React, { useEffect, useState } from "react";
import Notification from "../../components/notifications/Notification";
import CustomSelect, { SelectOption } from "../../components/search/CustomSelect";
import MultiSelect, {
  MultiSelectOption,
} from "../../components/search/MutilpleSelect";
import { PaginationRequestParams } from "../../configs/api";
import { useAppDispatch, useAppSelector } from "../../configs/store";
import { useNotifications } from "../../shared/hooks/notification.hook";
import { activityFields, IActivity } from "../../shared/models/activity.model";
import {
  ActivityScope,
  ActivityStatus,
  ActivityType,
} from "../../shared/models/enums/activity.enum";
import {
  convertDateFromServer,
  convertTimeFromServer,
} from "../../shared/utils/date-utils";
import { ISearchActivity } from "../administration/activity-management/activity-management.reducer";
import {
  getRegisteredActivities,
  registerActivity,
  resetState,
  searchActivities,
} from "./activity.reducer";
import MemberActivityDetailModal from "./MemberActivityDetailModal";

const ActivityList: React.FC = () => {
  const notificationTimeOut = 2000;
  const dispatch = useAppDispatch();
  const activityState = useAppSelector((state) => state.activity);
  const [selectedActivity, setSelectedActivity] = useState<IActivity>({});
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [searchText, setSearchText] = useState("");
  const [searchActivityModel, setSearchActivityModel] = useState<ISearchActivity>({
    searchText: "",
    activityTypes: [],
    sortBy: "",
  });
  const { addNotification, notifications, removeNotification } = useNotifications();
  const paginationParams: PaginationRequestParams = {
    page: currentPage,
    size: pageSize,
  };

  useEffect(() => {
    dispatch(
      searchActivities({
        pagingParams: paginationParams,
        searchActivityModel: searchActivityModel,
      }),
    );
    dispatch(getRegisteredActivities());
  }, [searchActivityModel, pageSize, currentPage]);

  useEffect(() => {
    console.log(activityState);
    if (activityState.errorMessage) {
      addNotification("ERROR", "Có lỗi xảy ra", activityState.errorMessage);
      dispatch(resetState());
    }
    if (activityState.successMessage && activityState.updateSuccess) {
      addNotification("SUCCESS", "Thành công", activityState.successMessage);
      dispatch(
        searchActivities({
          pagingParams: paginationParams,
          searchActivityModel: searchActivityModel,
        }),
      );
    }
  }, [activityState.errorMessage, activityState.successMessage]);

  const getActivityTypeOptions = (): MultiSelectOption[] => {
    return Object.entries(ActivityType)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => {
        const text = {
          CONTEST: "Cuộc thi",
          SEMINAR: "Hội thảo",
          TRAINING: "Đào tạo",
        }[key];
        return {
          label: text,
          value: key,
        };
      });
  };

  const getSortOptions = (): SelectOption[] => {
    return Object.entries(activityFields)
      .filter(([key, value]) => value !== null)
      .map(([key, value]) => ({
        label: value,
        value: key,
      }));
  };

  const handleMultiSelects = (selected: MultiSelectOption[]) => {
    if (selected && selected.length > 0) {
      setSearchActivityModel({
        ...searchActivityModel,
        activityTypes: selected.map((item) => item.value),
      });
    }
  };

  const getActivityScopeStyle = (scope: keyof typeof ActivityScope): string => {
    switch (scope) {
      case "INTERNAL":
        return "bg-white border-violet-200 text-violet-700 ring-violet-100 hover:bg-violet-50";
      case "EXTERNAL":
        return "bg-white border-cyan-200 text-cyan-700 ring-cyan-100 hover:bg-cyan-50";
      default:
        return "bg-white border-gray-200 text-gray-700 ring-gray-100 hover:bg-gray-50";
    }
  };

  const getActivityStatusStyles = (status: keyof typeof ActivityStatus): string => {
    switch (status) {
      case "PLANED":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "OPENED":
        return "bg-green-100 text-green-800 border-green-200";
      case "CLOSED":
        return "bg-red-100 text-red-800 border-red-200";
      case "CANCELED":
        return "bg-gray-100 text-gray-800 border-gray-200";
      default:
        return "bg-red-100 text-red-800 border-red-200";
    }
  };

  const getActivityTypeStyles = (type: keyof typeof ActivityType): string => {
    switch (type) {
      case "CONTEST":
        return "bg-gradient-to-r from-purple-500 to-indigo-500 text-white shadow-purple-100";
      case "SEMINAR":
        return "bg-gradient-to-r from-amber-400 to-orange-500 text-white shadow-orange-100";
      case "TRAINING":
        return "bg-gradient-to-r from-emerald-400 to-teal-500 text-white shadow-emerald-100";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-500 text-white";
    }
  };

  const getActivityStatusIcon = (
    status: keyof typeof ActivityStatus,
  ): JSX.Element => {
    switch (status) {
      case "PLANED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        );
      case "OPENED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        );
      case "CLOSED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
      case "CANCELED":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        );
    }
  };

  const getActivityTypeIcon = (type: keyof typeof ActivityType): JSX.Element => {
    switch (type) {
      case "CONTEST":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z"
            />
          </svg>
        );
      case "SEMINAR":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
      case "TRAINING":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
            />
          </svg>
        );
    }
  };

  const getScopeIcon = (scope: keyof typeof ActivityScope): JSX.Element => {
    switch (scope) {
      case "INTERNAL":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
            />
          </svg>
        );
      case "EXTERNAL":
        return (
          <svg
            className="w-5 h-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
            />
          </svg>
        );
    }
  };

  const handleOpenDetailModal = (activity: IActivity) => {
    setSelectedActivity(activity);
    setModalOpen(true);
  };

  const handleRegisterActivity = (activityId: number) => {
    dispatch(registerActivity(activityId));
  };

  return (
    <>
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
      <div className="min-h-screen bg-gray-100 flex justify-center p-4">
        <div className="bg-white p-8 rounded-xl shadow-md w-full ">
          <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
            Danh Sách Hoạt Động CLB Lập Trình TSE
          </h1>

          <div className="flex justify-between items-center my-2">
            <div className="bg-white rounded-lg">
              <div className="flex gap-4">
                <div className="flex gap-2 items-center">
                  <span>Loại HĐ:&nbsp;</span>
                  <MultiSelect
                    options={getActivityTypeOptions()}
                    onBlur={handleMultiSelects}
                    onRemove={handleMultiSelects}
                    // onChange={handleMultiSelects}
                  />
                </div>
                <div className="flex gap-2 items-center">
                  <span>Sắp xếp theo:&nbsp;</span>
                  <CustomSelect
                    placeholder="Mặc định"
                    options={getSortOptions()}
                    onClear={() => {
                      setSearchActivityModel({
                        ...searchActivityModel,
                        sortBy: "",
                      });
                    }}
                    onChange={(selected: SelectOption) => {
                      if (selected)
                        setSearchActivityModel({
                          ...searchActivityModel,
                          sortBy: selected.value,
                        });
                    }}
                  />
                </div>
              </div>
            </div>
            <div className="flex space-x-2">
              <div className="relative min-w-[300px]">
                <div
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400  pl-2 ${
                    searchText.length > 0 ? "border-l-2" : ""
                  }`}
                >
                  <button
                    className="flex items-center "
                    onClick={() => console.log("searching")}
                  >
                    <Search />
                  </button>
                </div>
                {searchText.length > 0 && (
                  <button
                    className="absolute rounded-full hover:bg-gray-100 top-1/2 transform -translate-y-1/2 right-14 flex items-center text-gray-400"
                    onClick={() => {
                      setSearchText("");
                      setSearchActivityModel({
                        ...searchActivityModel,
                        searchText: "",
                      });
                    }}
                  >
                    <Close />
                  </button>
                )}
                <input
                  type="text"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setSearchActivityModel({
                        ...searchActivityModel,
                        searchText: searchText,
                      });
                    }
                  }}
                  placeholder="Tìm kiếm..."
                  className="w-full pr-[88px] py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-base h-10"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
            {activityState.entities.map((activity) => (
              <div
                key={activity.activityId}
                className="rounded-lg border overflow-hidden p-4 space-y-4 hover:shadow-lg"
              >
                <div className="flex justify-between">
                  <h3 className="text-xl font-semibold text-gray-900">
                    {activity.name}
                  </h3>
                  {activityState.registeredActivities.some(
                    (a) => a.activityId === activity.activityId,
                  ) && <CheckCircle className="text-green-500" />}
                </div>
                <div className="flex items-center gap-3 mb-2">
                  <Badge
                    className={`${getActivityTypeStyles(
                      activity.activityType,
                    )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
                  >
                    <i>{getActivityTypeIcon(activity.activityType)} </i>
                    <span>
                      {
                        {
                          CONTEST: "Cuộc thi",
                          SEMINAL: "Hội thảo",
                          TRAINING: "Đào tạo",
                        }[activity.activityType]
                      }
                    </span>
                  </Badge>
                  <Badge
                    className={`${getActivityStatusStyles(
                      activity.activityStatus,
                    )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
                  >
                    <i>{getActivityStatusIcon(activity.activityStatus)} </i>
                    <span>
                      {
                        {
                          PLANED: "Lên kế hoạch",
                          OPENED: "Mở",
                          CLOSED: "Đóng",
                          CANCELED: "Huỷ bỏ",
                        }[activity.activityStatus]
                      }
                    </span>
                  </Badge>

                  <Badge
                    className={`${getActivityScopeStyle(
                      activity.activityScope,
                    )} px-2 py-2 rounded-lg min-w-[100px] flex items-center gap-1`}
                  >
                    <i>{getScopeIcon(activity.activityScope)} </i>
                    <span>
                      {
                        { INTERNAL: "Nội bộ", EXTERNAL: "Bên ngoài" }[
                          activity.activityScope
                        ]
                      }
                    </span>
                  </Badge>
                </div>
                <div className="flex items-center gap-6 text-gray-600">
                  <div className="flex items-center gap-2">
                    <Person />
                    <span>{activity.hostName}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CalendarMonth />
                    <span>{convertDateFromServer(activity.occurDate)}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <AccessTime />
                    <span>
                      {convertTimeFromServer(activity.startTime, true)} -{" "}
                      {convertTimeFromServer(activity.endTime, true)}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-gray-600 mt-3">
                  <LocationOn />
                  <span>{activity.venue}</span>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between mb-1 space-y-1">
                    <span className="text-sm text-gray-600">
                      Số lượng đã đăng kí
                    </span>
                    <span className="text-sm font-medium text-gray-900">
                      {activity.registeredNumber}/{activity.capacity}
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${
                          activity.registeredNumber &&
                          activity.capacity &&
                          (activity.registeredNumber / activity.capacity) * 100
                        }%`,
                      }}
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 text-gray-600 mt-3">
                  <button
                    className="bg-blue-600 space-x-2 p-2 rounded-lg text-white hover:bg-blue-700"
                    onClick={() => handleOpenDetailModal(activity)}
                  >
                    <VisibilityOutlined />
                    <span>Xem chi tiết</span>
                  </button>
                  <button
                    disabled={activityState.registeredActivities.some(
                      (a) => a.activityId === activity.activityId,
                    )}
                    className="bg-green-500 space-x-1 p-2 rounded-lg text-white hover:bg-green-600"
                    onClick={() => handleRegisterActivity(activity.activityId)}
                  >
                    {activityState.registeredActivities.some(
                      (a) => a.activityId === activity.activityId,
                    ) ? (
                      <>
                        <HowToReg />
                        <span>Đã đăng kí</span>
                      </>
                    ) : (
                      <>
                        <AppRegistration /> <span>Đăng kí tham gia</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <MemberActivityDetailModal
        activity={selectedActivity}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
      />
    </>
  );
};

export default ActivityList;
