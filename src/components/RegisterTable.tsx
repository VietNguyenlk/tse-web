import React from "react";
import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
// import { GetUserPaginatedParams } from "../types/user.types";
import UserIntro from "./UserIntro";
import dayjs from "dayjs";

interface UserProfile {
  userId: string;
  email: string;
  firstName: string;
  lastName: string;
  status: string | null;
  className: string | null;
  cumulativeScore: number;
  faculty: string | null;
  phoneNumber: string | null;
  registerDate: dayjs.Dayjs;
  userType: string | null;
}


// danh sách người đăng ký chờ duyệt
export default function RegisterTable() { 
    const registerHeaders = ["ID", "NAME", "TYPE", "FACULTY","Score", "STATUS"];
    const [registerRequests, setRegisterRequests] = useState<UserProfile[]>([]);
    
  useEffect(() => {
    // const paginatedParams: GetUserPaginatedParams = {
    //   page: 1,
    //   limit: 10,
    // };
    const fetchData = async () => {
      try {
          // Gọi API lấy danh sách yêu cầu đăng ký
          const data = await userService.getRegisterRequests();
          console.log("register",data.users);
          setRegisterRequests(data.users);
        }
       catch (error) {
        console.error("Failed to fetch data", error);
      }
    }
    
    fetchData();
  }, []);


    return (
      <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </th>
            {registerHeaders.map((header, index) => (
              <th scope="col" className=" py-3" key={index}>
                <div className="flex items-center">
                  <button onClick={() => console.log("sort")}>
                    <svg
                      className="w-3 h-3 "
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                    </svg>
                  </button>
                  {header}
                </div>
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {registerRequests.map((user, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer"
  
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id="checkbox-table-search-1"
                    type="checkbox"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor="checkbox-table-search-1" className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className=" text-sm">{user.userId}</td>
              <td>
                <UserIntro
                  email={user.email}
                  name={user.firstName + user.lastName}
                />
              </td>
              <td className=" text-sm">{user.userType}</td>
              <td className=" text-sm">{user.faculty}</td>
              <td className=" text-sm">{user.cumulativeScore}</td>
              <td>
                <div
                  className= "bg-blue-500 inline-block text-sm px-4 py-2 rounded text-white font-semibold"
                >
                  {user.status}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
  
    </>
    );
    };
  