import { Add, Close, Search } from "@mui/icons-material";
import React, { useEffect, useState } from "react";
import ActivitiesAnalytic from "../../../components/card/ActivitiesAnalytic";
import Notification from "../../../components/notifications/Notification";
import PaginationBar from "../../../components/pagination/PaginationBar";
import CustomSelect, { SelectOption } from "../../../components/search/CustomSelect";
import MultiSelect, {
  MultiSelectOption,
} from "../../../components/search/MutilpleSelect";
import { PaginationRequestParams } from "../../../configs/api";
import { useAppDispatch, useAppSelector } from "../../../configs/store";
import { useNotifications } from "../../../shared/hooks/notification.hook";
import { activityFields } from "../../../shared/models/activity.model";
import { ActivityType } from "../../../shared/models/enums/activity.enum";
import {
  ISearchActivity,
  resetActivityManagementState,
  searchActivities,
} from "./activity-management.reducer";
import AllActivitiesDashboard from "./list/AllActivitiesDashboard";
import NewActivityModal from "./update/NewActivityModal";

const AdminActivityManagement: React.FC = () => {
  const notificationTimeOut = 2000;
  const dispatch = useAppDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const { addNotification, notifications, removeNotification } = useNotifications();
  const [isNewModalOpen, setNewModalOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchActivityModel, setSearchActivityModel] = useState<ISearchActivity>({
    searchText: "",
    activityTypes: [],
    sortBy: "",
  });
  const {
    entities,
    totalPages,
    totalItems,
    errorMessage,
    successMessage,
    updateSuccess,
  } = useAppSelector((state) => state.activityManagement);

  const paginationParams: PaginationRequestParams = {
    page: currentPage,
    size: pageSize,
  };

  useEffect(() => {
    if (errorMessage && !updateSuccess) {
      addNotification("ERROR", "Có lỗi xảy ra", errorMessage);
    }

    if (successMessage && updateSuccess) {
      addNotification("SUCCESS", "Thành công", successMessage);
      dispatch(resetActivityManagementState());
      dispatch(
        searchActivities({ searchActivityModel, pagingParams: paginationParams }),
      );
    }
  }, [errorMessage, successMessage, updateSuccess]);

  useEffect(() => {
    dispatch(
      searchActivities({
        pagingParams: paginationParams,
        searchActivityModel: searchActivityModel,
      }),
    );
  }, [searchActivityModel, pageSize, currentPage]);

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
      <div className="bg-white rounded-lg shadow p-4 ">
        {/* Header */}
        <h1 className="text-lg font-bold">Tất cả hoạt động</h1>

        {/* Analytic */}
        <ActivitiesAnalytic />
        {/* Filter and search */}
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
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center gap-2"
              onClick={() => setNewModalOpen(true)}
            >
              <Add />
              Thêm mới
            </button>
          </div>
        </div>

        {/* Contents */}
        <AllActivitiesDashboard activities={entities} />
        {/* Pagination Bar */}
        {entities.length > 0 && (
          <PaginationBar
            totalPages={totalPages}
            currentPage={currentPage}
            onPageSizeChange={setPageSize}
            onPageChange={setCurrentPage}
            totalItems={totalItems}
            itemsPerPage={pageSize}
          />
        )}

        <NewActivityModal
          isOpen={isNewModalOpen}
          onClose={() => setNewModalOpen(false)}
        />
      </div>
    </>
  );
};
export default AdminActivityManagement;
