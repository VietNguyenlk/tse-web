import { Add } from "@mui/icons-material";
import { useEffect, useState } from "react";
import { userService } from "../../services/user.service";
import { GetUserPaginatedParams } from "../../types/user.types";
import CustomSearch from "../CustomSearch";
import PaginationBar from "../PaginationBar";
import SelectOption from "../SelectOption";
import AdminHeader from "./AdminHeader";
import UserTable from "../UserTable";
import RegisterTable from "../RegisterTable";
import { UserEntity } from "../../types/entities/user.entity";

const AdminMemberBoard: React.FC = () => {
  const [activeHeader, setActiveHeader] = useState<string>("members");
  const [users, setUsers] = useState<UserEntity[]>([]);
  // const [registerRequests, setRegisterRequests] = useState<UserEntity[]>([]);

  const entryOptions = [10, 25, 50, 100];

  const headers = ["ID", "NAME", "TYPE", "FACULTY", "Score", "STATUS"];
 

  useEffect(() => {
    const paginatedParams: GetUserPaginatedParams = {
      page: 1,
      limit: 10,
    };
    const fetchData = async () => {
      try {
        if (activeHeader === "members") {
          // Gọi API lấy danh sách thành viên
          const data = await userService.getAllUsersPaginated(paginatedParams);
          console.log("members",data);
          // lọc danh sách thành viên theo status== active
          const activeUsers = data.items.filter((user) => user.status === "ACTIVE");
          setUsers(activeUsers);
        // } else if (activeHeader === "register-requests") {
        //   // Gọi API lấy danh sách yêu cầu đăng ký
        //   const data = await userService.getRegisterRequests(paginatedParams);
        //   console.log("register",data);
        //   setRegisterRequests(data.items);
        }
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, [activeHeader]);

  return (
    <>
      <AdminHeader activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
      <div className="bg-white mt-3 rounded ">
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

         {activeHeader === "members" ? (
            <UserTable headers={headers} users={users} />
          ) : (
            <RegisterTable />
          )
        }

          <PaginationBar
            currentPage={1}
            totalPages={5}
            onPageChange={(page) => console.log(page)}
          />
        </div>
      </div>
    </>
  );
};

export default AdminMemberBoard;
