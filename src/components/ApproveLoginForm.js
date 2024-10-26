import React from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useEffect } from "react";
import { getApiUser } from "../api/CallApi";
import { useState } from "react";
// duyệt đơn đăng nhập
const ApproveLoginForm = () => {
  const [ListRegister, setListRegister] = useState([]);

  // get danh sach người đăng ký
  const fetchUsers = async () => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookies
      console.log("Token từ cookie:", token);
      const res = await getApiUser("/registers", {
        // const res = await axios.get("http://localhost:3008/api/v1/users/registers", {
        headers: {
          Authorization: `Bearer ${token}`, // Gửi token trong header
        },
      });
      console.log("Danh sách người đky:", res.data.data);
      setListRegister(res.data.data.users);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách người đky:", error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  // xử lý nut duyệt
  const handleApprove = async (userId) => {
    try {
      const token = Cookies.get("token"); // Lấy token từ cookies
      // console.log("Token từ cookie:", token);
      console.log("userId:", userId);
      const res = await axios.post(
        "http://localhost:3008/api/v1/users/registers/approve",
        {
          // thêm vao mảng userIds
          userIds: [userId],
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Gửi token trong header
          },
        },
      );
      console.log("Duyệt thành công:", res);
      // Reload lại trang sau khi duyệt thành công
      window.location.reload();
    } catch (error) {
      console.error("Lỗi duyệt:", error);
    }
  };

  return (
    <div className="align-middle text-center ">
      <h1 className="font-bold mb-3 text-xl">Danh Sách Đăng Ký Tham Gia TSE</h1>
      <table className="min-w-full border-dotted border border-gray-500">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2 text-center">Họ</th>
            <th className="border border-gray-300 px-4 py-2">Tên</th>
            <th className="border border-gray-300 px-4 py-2"> MSSV</th>
            <th className="border border-gray-300 px-4 py-2">Ngày đăng ký</th>
            <th className="border border-gray-300 px-4 py-2">Phê duyệt</th>
          </tr>
        </thead>
        <tbody>
          {ListRegister.map((user, index) => (
            <tr key={index}>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.firstName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.lastName}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {user.userId}
              </td>
              <td className="border border-gray-300 px-4 py-2 text-center">
                {new Date(user.registerDate).toLocaleString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </td>
              <td className="border border-gray-300 px-1 py-2 text-center">
                <button
                  onClick={() => handleApprove(user.userId)}
                  className="bg-green-400 rounded px-4 py-2 hover:bg-red-800"
                >
                  Đồng ý
                </button>
                <button className="bg-green-400 rounded px-4 py-2 mx-2 hover:bg-red-800">
                  Từ chối
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
export default ApproveLoginForm;
