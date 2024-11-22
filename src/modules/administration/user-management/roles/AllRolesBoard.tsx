import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../../configs/store";
import { Add } from "@mui/icons-material";
import SelectOption from "../../../../components/pagination/SelectOption";
import CustomSearch from "../../../../components/pagination/CustomSearch";
import RoleTable from "./RoleTable";
import { PaginationRequestParams } from "../../../../configs/api";
import { getAllRolesPaginated } from "./role.reducer";

const AllRolesBoard: React.FC = () => {
  const dispatch = useAppDispatch();
  const roles = useAppSelector((state) => state.role.entities);
  const entryOptions = [5, 10, 25, 50, 100];
  const [paginatedParams, setPaginatedParams] = useState<PaginationRequestParams>({
    page: 1,
    size: 10,
  });

  useEffect(() => {
    dispatch(getAllRolesPaginated(paginatedParams));
  }, [dispatch]);

  return (
    <>
      <div className="h-14 border-b flex justify-between items-center p-4">
        <h1 className="text-sm font-semibold text-gray-600">All Members</h1>
        <button className="border rounded bg-blue-600 text-white text-xs h-8 p-1 hover:bg-blue-700">
          <Add /> Add new
        </button>
      </div>

      <div className="px-4 py-6 space-y-4">
        <div className="flex justify-between">
          <div className="flex items-center space-x-2 text-sm text-gray-700">
            <span>Show</span>
            <SelectOption values={entryOptions} />
            <span>members</span>
          </div>
          <CustomSearch />
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
