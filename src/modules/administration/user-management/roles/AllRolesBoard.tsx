import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { Add, Search } from "@mui/icons-material";
import SelectOption from "../../../../components/pagination/SelectOption";

import RoleTable from "./RoleTable";
import { PaginationRequestParams } from "../../../../configs/api";
import { getAllRolesPaginated } from "./role.reducer";

const AllRolesBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.role.entities);

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(5);

  const [paginatedParams, setPaginatedParams] = useState<PaginationRequestParams>({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    dispatch(getAllRolesPaginated(paginatedParams));
  }, [dispatch]);

  return (
    <>
      <div className="h-20 border-b flex justify-between items-center px-4 py-2">
        <h1 className="text-lg font-bold">Tất cả vai trò</h1>
        <button className="border rounded bg-blue-600 text-white text-base font-semibold h-10 p-1 hover:bg-blue-700">
          <Add /> Thêm mới
        </button>
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

        <RoleTable roles={roles} />

        {/* <PaginationBar
          currentPage={1}
          totalPages={5}
          handlePageChange={(page) => console.log(page)}
        /> */}
      </div>
    </>
  );
};

export default AllRolesBoard;
