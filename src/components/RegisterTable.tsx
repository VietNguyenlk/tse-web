import React from "react";
import { useEffect, useState } from "react";
import { userService } from "../services/user.service";
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

export default function RegisterTable() {
  const registerHeaders = ["ID", "NAME", "TYPE", "FACULTY", "Score", "STATUS"];
  const [registerRequests, setRegisterRequests] = useState<UserProfile[]>([]);
  const [showOptions, setShowOptions] = useState<string | null>(null);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getRegisterRequests();
        console.log("register", data.users);
        setRegisterRequests(data.users);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };
    fetchData();
  }, []);

  const handleApprove = async (ids: string[]) => {
    try {
      if (ids.length === 0) {
        throw new Error("No user IDs selected for approval.");
      }
      await userService.approveRegisterRequest(ids); // Truyền đúng mảng ID
      const data = await userService.getRegisterRequests(); // Làm mới dữ liệu
      setRegisterRequests(data.users);
      setShowOptions(null);
      setSelectedIds([]); // Reset selection
    } catch (error) {
      console.error("Failed to approve request", error);
    }
  };
  const handleSelectAll = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.checked) {
      setSelectedIds(registerRequests.map(user => user.userId));
    } else {
      setSelectedIds([]);
    }
  };

  const handleSelectUser = (userId: string) => {
    setSelectedIds(prev => {
      if (prev.includes(userId)) {
        return prev.filter(id => id !== userId);
      } else {
        return [...prev, userId];
      }
    });
  };

  return (
    <div>
      {selectedIds.length > 0 && (
        <div className="mb-4">
          <button
            onClick={() => handleApprove(selectedIds)}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 mr-2"
          >
            Approve Selected ({selectedIds.length})
          </button>
          <button
            onClick={() => setSelectedIds([])}
            className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
          >
            Clear Selection
          </button>
        </div>
      )}
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  checked={selectedIds.length === registerRequests.length}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </th>
            {registerHeaders.map((header, index) => (
              <th scope="col" className="py-3" key={index}>
                <div className="flex items-center">
                  <button onClick={() => console.log("sort")}>
                    <svg
                      className="w-3 h-3"
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
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-center">
                  <input
                    id={`checkbox-${user.userId}`}
                    type="checkbox"
                    checked={selectedIds.includes(user.userId)}
                    onChange={() => handleSelectUser(user.userId)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label htmlFor={`checkbox-${user.userId}`} className="sr-only">
                    checkbox
                  </label>
                </div>
              </td>
              <td className="text-sm">{user.userId}</td>
              <td>
                <UserIntro
                  email={user.email}
                  name={user.firstName + user.lastName}
                />
              </td>
              <td className="text-sm">{user.userType}</td>
              <td className="text-sm">{user.faculty}</td>
              <td className="text-sm">{user.cumulativeScore}</td>
              <td className="relative">
                {showOptions === user.userId ? (
                  <div className="absolute z-10 bg-white shadow-lg rounded-lg p-2 border">
                    <button
                      onClick={() => handleApprove([user.userId])}
                      className="block w-full text-left px-4 py-2 text-green-600 hover:bg-gray-100 rounded"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => setShowOptions(null)}
                      className="block w-full text-left px-4 py-2 text-red-600 hover:bg-gray-100 rounded"
                    >
                      Reject
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => setShowOptions(user.userId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                  >
                    {user.status || "Pending"}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}