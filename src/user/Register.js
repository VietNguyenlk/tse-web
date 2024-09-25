// user/Register.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { postApi } from '../api/CallApi';
function Register() {
  const [mssv, setMssv] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
 
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate(); // Sử dụng hook navigate để chuyển hướng trang

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Kiểm tra mssv là 8 ký tự số
    const mssvPattern = /^[0-9]{8}$/;
    if (!mssvPattern.test(mssv)) {
      setErrorMessage('MSSV phải gồm 8 ký tự số.');
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (password.length < 6 || password.length > 30) {
      setErrorMessage('Mật khẩu phải có độ dài từ 6 đến 30 ký tự.');
      return;
    }

    // Gọi API đăng ký tài khoản ở đây
    try {
      // Gọi API để đăng ký bằng Axios
      const response = await postApi ("/register", {
        userId:mssv,
        password:password,
        email:email,
        firstName:firstname,
        lastName:lastname
      });
      console.log(response);

      if (response.status === 201) {
        // Nếu đăng ký thành công
        setSuccessMessage('Đăng ký thành công!');
        setErrorMessage('');
        // Chuyển hướng đến trang đăng nhập hoặc trang khác
        navigate('/');
      }
    } catch (error) {
      // Nếu có lỗi từ server hoặc lỗi kết nối
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      } else {
        setErrorMessage('Đã có lỗi xảy ra. Vui lòng thử lại.');
      }
    }
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-slate-500 to-indigo-500">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-2 text-center">Đăng ký</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-2">{errorMessage}</p>}

        <div className="mb-2">
          <label htmlFor="mssv" className="block mb-2 text-sm font-medium">MSSV</label>
          <input
            type="text"
            id="mssv"
            placeholder='Nhập MSSV'
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={mssv}
            onChange={(e) => setMssv(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="firstname" className="block mb-2 text-sm font-medium">First Name</label>
          <input
            type="text"
            id="firstname"
            placeholder='Nhập Họ'
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={firstname}
            onChange={(e) => setFirstname(e.target.value)}
            required
          />
        </div>
        <div className="mb-2">
          <label htmlFor="lastname" className="block mb-2 text-sm font-medium">Last Name</label>
          <input
            type="text"
            id="lastname"
            placeholder='Nhập Tên'
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="email" className="block mb-2 text-sm font-medium">Email</label>
          <input
            type="email"
            id="email"
            placeholder='Nhập Email'
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-2">
          <label htmlFor="password" className="block mb-2 text-sm font-medium">Mật khẩu</label>
          <input
            type="password"
            id="password"
            placeholder='Nhập mật khẩu'
            className="w-full px-4 py-2 border border-gray-300 rounded-md"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Đăng ký
        </button>
      </form>
    </div>
  );
}

export default Register;
