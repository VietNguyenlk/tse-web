import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userService } from '../../../services/user.service';

const ForgotPasswordForm: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);

  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await userService.forgotPassword(email);
      setMessage('Mật khẩu mới đã được gửi đến email của bạn.');
      setIsSuccess(true);
      // set 3 s
         setTimeout(() => {
              navigate('/');
            }, 3000);
                

    
    } catch (err) {
      setMessage('Email không tồn tại. Vui lòng kiểm tra lại.');
      setIsSuccess(false);
    }
  };

  const handleBackToLogin = () => {
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="w-full max-w-md bg-white shadow-md rounded-lg p-8">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Quên Mật Khẩu</h2>
        
        <form onSubmit={handleEmailSubmit} className="space-y-4">
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400">📧</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Nhập email của bạn"
              required
              className="w-full pl-10 pr-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          {message && (
            <div className={`text-sm ${isSuccess ? 'text-green-600' : 'text-red-500'}`}>
              {message}
            </div>
          )}
          <button
            type="submit"
            disabled={isSuccess}
            className={`w-full text-white py-2 rounded-lg transition duration-300 ${isSuccess ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`}
          >
            Gửi Mật Khẩu Mới
          </button>
        </form>

       
          <button
            onClick={handleBackToLogin}
            className="w-full mt-4 bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition duration-300"
          >
            Quay Lại Đăng Nhập
          </button>
    
      </div>
    </div>
  );
};

export default ForgotPasswordForm;