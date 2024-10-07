import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { useState } from "react";
import dayjs from "dayjs";
// tìm kiếm
const Search = () => {
  const [ListUser, setListUser] = useState([]);

    // Hàm gọi API để lấy danh sách người dùng
  const fetchUsers = async () => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookies

      // Gọi API với các query params cụ thể
      const res = await axios.get("http://localhost:3008/api/v1/users", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
        params: {
          "query[page]": 1,
          "query[size]": 10,
          "query[sortDirection]": "descs",
          "query[sortBy]": "registerDate",
        },
      });
      console.log("Danh sách người dùng:", res.data.data.users);
      setListUser(res.data.data.users);

     

    } catch (error) {
      console.error("Lỗi khi lấy danh sách người dùng:", error);
     
    }
  };
    // Gọi API ngay khi component được render
    useEffect(() => {
      fetchUsers();
    }, []);
  
  // Xử lý khi người dùng tìm kiếm
  const handleSearch = async (event) => {
    event.preventDefault();
    const searchValue = event.target.search.value; // Lấy giá trị tìm kiếm từ input
    console.log("Giá trị tìm kiếm:", searchValue);
    try {
      const token = Cookies.get("token"); // Lấy token từ cookies

      // Gọi API với số tìm kiếm là searchValue (số MSSV được nhập)
      const res = await axios.get(`http://localhost:3008/api/v1/users/${searchValue}/info`, {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      console.log("Kết quả tìm kiếm:", res.data.data);
      setListUser([res.data.data]); // Đặt kết quả tìm kiếm vào danh sách
    } catch (error) {
      console.error("Lỗi khi tìm kiếm:", error);
    }
  };



  return (
    <div>
      {/* thanh tìm kiếm */}
      <form class="max-w-md mx-auto" onSubmit={handleSearch}>   
    <label for="default-search" class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
    <div class="relative">
        <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
            <svg class="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
            </svg>
        </div>
        <input type="search" id="default-search" name="search" class="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search member..." required />
        <button type="submit" class="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
    </div>
   
</form>
        <h1 className="text-xl font-bold text-center mb-5 mt-2">Danh sách thành viên</h1>
        <table className="border min-w-full text-center">
          <thead>
            <tr >
              <th className="border px-2 py-4 border-gray-800">STT</th>
              <th className="border px-2 py-4 border-gray-800">Họ</th>
              <th className="border px-2 py-4 border-gray-800">Tên</th>
              <th className="border px-2 py-4 border-gray-800">MSSV</th>
              <th className="border px-2 py-4 border-gray-800">Email</th>
              <th className="border px-2 py-4 border-gray-800">Ngày đăng ký</th>
            </tr>
          </thead>
          <tbody>
            {ListUser.map((user, index) => (
              <tr key={user._id}>
                <td className="border px-2 py-4 border-gray-800 hover:bg-orange-300">{index + 1}</td>
                <td className="border px-2 py-4 border-gray-800 hover:bg-orange-300">{user.firstName}</td>
                <td className="border px-2 py-4 border-gray-800 hover:bg-orange-300">{user.lastName}</td>
                <td className="border px-2 py-4 border-gray-800 hover:bg-orange-300">{user.userId}</td>
                <td className="border px-2 py-4 border-gray-800 hover:bg-orange-300">{user.email}</td>
                <td className="border px-2 py-4 border-gray-800 hover:bg-orange-300">{dayjs(user.register).format('DD/MM/YYYY')}</td>
              </tr>
            ))}
          </tbody>
        </table>
    </div>
  );
}
export default Search;