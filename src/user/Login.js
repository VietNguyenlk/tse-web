// Login.js
import React from 'react';
import { set, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { postApi } from '../api/CallApi';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
// jwt
import {jwtDecode} from 'jwt-decode';
// Định nghĩa schema validate cho Yup
const schema = yup.object().shape({
  mssv: yup
    .string()
    .length(8, 'MSSV phải đúng 8 ký tự')
    .required('Vui lòng nhập MSSV'),
  password: yup
    .string()
    .min(6, 'Mật khẩu phải từ 6 ký tự trở lên')
    .max(30, 'Mật khẩu không được quá 30 ký tự')
    .required('Vui lòng nhập mật khẩu'),
});


function Login() {
  const navigate = useNavigate(); // Sử dụng hook navigate để chuyển hướng trang
  // Sử dụng useForm với schema yupResolver để validate dữ liệu nhập
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Hàm xử lý khi submit form
  const onSubmit = async (data) => {
    console.log('Dữ liệu đăng nhập:', data);
    // Gọi API đăng nhập hoặc thực hiện logic tiếp theo ở đây
    try {
      // Gọi API đăng nhập
      const res = await postApi('/login', {
        userId: data.mssv,
        password: data.password,
      });
      // console.log('res:', res);

      if (res.status === 200) {
        // Nếu đăng nhập thành công, lưu token vào cookies
        // console.log('Đăng nhập:', res.data);
        const token = res.data.token; // Giả sử token nhận từ API là res.data.token
        // console.log('Token:', token);
        Cookies.set('token', token, { expires: 7 }); // Lưu token vào cookies trong 7 ngày
        const decoded = jwtDecode(token)
        console.log('token:', token);
        console.log('decoded:', decoded);
        console.log('roles:', decoded.roles);
        // Thực hiện chuyển hướng hoặc logic tiếp theo sau khi đăng nhập thành công
        if(decoded.roles.includes("admin")){
          navigate("/admin");// chuyển hướng đến trang admin
        }
        else if(decoded.roles.includes("member")){
          navigate("/membersPage");// chuyển hướng đến trang thành viên
        }
       
      }
    } catch (error) {
      // Xử lý lỗi đăng nhập
      console.error('Lỗi khi đăng nhập:', error);
      alert('Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.');
    }
  
    
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-r from-blue-500 to-indigo-500">
      <div className="bg-white shadow-lg rounded-lg px-10 py-8 max-w-md w-full">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-3">Welcome to TSE</h1>
        <h2 className="text-sm text-center text-gray-800 mb-4 font-bold">Welcombe back, please login into an account</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Trường MSSV */}
          <div className="mb-5">
            <label htmlFor="mssv" className="block text-sm font-medium text-gray-700">MSSV</label>
            <input
              id="mssv"
              {...register('mssv')}
              type="text"
              placeholder="Nhập MSSV"
              className={`mt-1 block w-full border ${errors.mssv ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <p className="text-red-500 text-xs mt-1">{errors.mssv?.message}</p>
          </div>

          {/* Trường mật khẩu */}
          <div className="mb-5">
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
            <input
              id="password"
              {...register('password')}
              type="password"
              placeholder="Nhập mật khẩu"
              className={`mt-1 block w-full border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded-md p-3 shadow-sm focus:ring-blue-500 focus:border-blue-500`}
            />
            <p className="text-red-500 text-xs mt-1">{errors.password?.message}</p>
          </div>

          {/* Nút đăng nhập */}
          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-md shadow-lg hover:bg-blue-700 transition duration-200 ease-in-out transform hover:scale-105"
          >
            Đăng Nhập
          </button>
        </form>

        {/* Liên kết đăng ký và quên mật khẩu */}
        <div className="mt-6 text-center text-sm">
          <a href="/register" className="text-blue-600 hover:underline">Đăng Ký</a>
          <span className="mx-2 text-gray-500">|</span>
          <a href="/forgot-password" className="text-blue-600 hover:underline">Quên Mật Khẩu?</a>
        </div>
      </div>
    </div>
  );
}

export default Login;
