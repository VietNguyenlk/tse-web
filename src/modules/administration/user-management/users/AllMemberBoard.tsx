import { Add } from "@mui/icons-material";
import { useEffect } from "react";
import { PaginationRequestParams } from "../../../../configs/api";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { getUsers } from "./user-management.reducer";
import CustomSearch from "../../../../components/pagination/CustomSearch";
import PaginationBar from "../../../../components/pagination/PaginationBar";
import SelectOption from "../../../../components/pagination/SelectOption";
import UserTable from "./UserTable";

const AllMemberBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector((state) => state.userManagement.users);

  const entryOptions = [5, 10, 25, 50, 100];

  const tableHeaders = ["MSSV", "Tên", "Loại", "Ngành", "Điểm tích lũy", "TRẠNG THÁI"];

  useEffect(() => {
    const paginatedParams: PaginationRequestParams = {
      page: 1,
      size: 10,
    };
    dispatch(getUsers(paginatedParams));
  }, [dispatch]);

  return (
    <>
      <div className="h-14 border-b flex justify-between items-center p-4">
        <h1 className="text-sm font-semibold text-gray-600">Tất cả thành viên</h1>
        <button className="border rounded bg-blue-600 text-white text-xs h-8 p-1 hover:bg-blue-700">
          <Add /> Thêm thành viên
        </button>
      </div>

      <div className="px-4 py-6 space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span>Chọn</span>
            <SelectOption values={entryOptions} />
            <span>thành viên</span>
          </div>
          <CustomSearch />
        </div>

        <UserTable headers={tableHeaders} users={users} />

        {/* <PaginationBar
          currentPage={1}
          totalPages={5}
          handlePageChange={(page) => console.log(page)}
        /> */}
      </div>
    </>
  );
};
export default AllMemberBoard;
