import React from "react";
import { useEffect, useState } from "react";
import { authService } from "../services/auth.service";
// import dayjs from "dayjs";

interface roles {
  description: string;
  roleId: string;
  roleName: string;
  status: string;
}

export default function RoleTable() {
  const rolesHeader = ["ID", "NAME", "Deescription", "STATUS"];
  const [roles, setRole] = useState<roles[]>([]);
  const [selectAll, setSelectAll] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await authService.getRoles();
        console.log("roles", data);
        setRole(data);
      } catch (error) {
        console.error("Failed to fetch data", error);
      }
    };

    fetchData();
  }, []);

  const handleSelectAll = () => {
    setSelectAll(!selectAll);
    setSelectedRoles(selectAll ? [] : roles.map(role => role.roleId));
  };

  const handleSelectRole = (roleId: string) => {
    setSelectedRoles(prev => 
      prev.includes(roleId) 
        ? prev.filter(id => id !== roleId)
        : [...prev, roleId]
    );
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'bg-green-100 text-green-800';
      case 'inactive':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs  text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr >
            <th scope="col" className="p-4">
              <div className="flex items-center">
                <input
                  id="checkbox-all-search"
                  type="checkbox"
                  checked={selectAll}
                  onChange={handleSelectAll}
                  className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
            </th>
            {rolesHeader.map((header, index) => (
              <th scope="col"  className="py-3 px-6 text-center font-semibold text-sm tracking-wide"  key={index}>
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
          {roles.map((role) => (
            <tr 
              key={role.roleId}
              className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
            >
              <td className="w-4 p-4">
                <div className="flex items-start">
                  <input
                    type="checkbox"
                    checked={selectedRoles.includes(role.roleId)}
                    onChange={() => handleSelectRole(role.roleId)}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              </td>
              <td className="px-6 py-4 ">{role.roleId}</td>
              <td className="px-6 py-4  font-medium text-gray-900 whitespace-nowrap dark:text-white">
                {role.roleName}
              </td>
              <td className="px-6 py-4 ">{role.description}</td>
              <td className="px-6 py-4 ">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(role.status)}`}>
                  {role.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
}