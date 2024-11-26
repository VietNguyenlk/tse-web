import { Search } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { PaginationRequestParams } from "../../../configs/api";
import { useAppDispatch, useAppSelector } from "../../../configs/store";
import RegistrationTable from "./RegistrationTable";
import { getRegistrationRequests } from "./account-activate.reducer";

const RegistrationBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const activateUser = useAppSelector((state) => state.activateUser);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [isReload, setReload] = useState(false);

  const tableHeaders = [
    "MSSV",
    "Thông tin",
    "Nghề nghiệp",
    "Khoa",
    "Trạng thái",
    "Hành động",
  ];

  const handleLoadData = () => {
    const paginatedParams: PaginationRequestParams = {
      page: currentPage,
      size: pageSize,
    };
    dispatch(getRegistrationRequests(paginatedParams));
  };

  useEffect(() => {
    handleLoadData();
  }, [pageSize, currentPage]);
  return (
    <>
      <div className="h-20 border-b flex justify-between items-center px-4 py-2">
        <h1 className="text-lg font-bold">Tất cả người đăng kí</h1>
      </div>

      <div className="px-4 pt-3 pb-6 space-y-4">
        <div className="flex justify-between">
          <div>
            <span>Số lượng:&nbsp;</span>
            <select
              className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 text-sm cursor-pointer"
              onChange={(e) => setPageSize(Number(e.target.value))}
            >
              <option value={5}>5 mỗi trang</option>
              <option value={10}>10 mỗi trang</option>
              <option value={25}>25 mỗi trang</option>
              <option value={50}>50 mỗi trang</option>
              <option value={100}>100 mỗi trang</option>
            </select>
          </div>
          <div className="relative min-w-[300px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
            <input
              type="text"
              placeholder="Tìm kiếm..."
              className="w-full pl-10 pr-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10"
            />
          </div>
        </div>

        <RegistrationTable
          headers={tableHeaders}
          users={activateUser.requestActivates}
          isLoading={activateUser.loading}
          setReload={handleLoadData}
        />

        {/* <PaginationBar
          currentPage={1}
          totalPages={5}
          handlePageChange={(page) => console.log(page)}
        /> */}
      </div>
    </>
  );
};

export default RegistrationBoard;
