import { useState } from "react";
import UserIntro from "./UserIntro";
import UserActionModal from "./modals/UserActionModal";
import { User } from "../types/user.types";

interface UserTableProps {
  headers: string[];
  users: User[];
}

const UserTable: React.FC<UserTableProps> = ({ headers, users }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log("users", users);
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
            {headers.map((header, index) => (
              <th key={index}>{header}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr
              key={index}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 hover:cursor-pointer"
              onClick={() => setIsModalOpen(true)}
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
              {/* {user.map((field, cindex) => {
                if (row.indexOf(cell) === 1) {
                  return (
                    <td key={cindex}>
                      <UserIntro email="sddd" name="dsds" />
                    </td>
                  );
                } else
                  return (
                    <td className=" text-sm" key={cindex}>
                      {cell}
                    </td>
                  );
              })} */}
            </tr>
          ))}
        </tbody>
      </table>
      <UserActionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      ></UserActionModal>
    </>
  );
};

export default UserTable;
