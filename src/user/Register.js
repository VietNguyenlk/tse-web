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
  // const [successMessage, setSuccessMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1); // Theo dõi bước hiện tại
  const [confirmpassword, setConfirmpassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate tất cả các bước
      if (currentStep === 2) {
      if (password.length < 6 || password.length > 30) {
        setErrorMessage('Mật khẩu phải có độ dài từ 6 đến 30 ký tự.');
        return;
      }
      confirmPass();

      // Gọi API đăng ký
      try {
        const response = await postApi("/register", {
          userId: mssv,
          password: password,
          email: email,
          firstName: firstname,
          lastName: lastname
        });

        if (response.status === 201) {
          alert('Đăng ký thành công!, vui lòng chờ phê duyệt tài khoản.');
          setErrorMessage('');
          navigate('/');
        }
      } catch (error) {
        setErrorMessage(error.response?.data?.message || 'Đăng ký thất bại. Vui lòng thử lại.');
      }
    }
  };

  const nextStep = () => {
    const mssvPattern = /^[0-9]{8}$/;
    if (!mssvPattern.test(mssv)) {
      setErrorMessage('MSSV phải gồm 8 ký tự số.');
      return;
    }
    setErrorMessage('');
    setCurrentStep(currentStep + 1);
 
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };
  // xác nhận mk
  const confirmPass = () => {
    if (password !== confirmpassword) {
      setErrorMessage('Mật khẩu không khớp.');
      return;
    }
    setErrorMessage('');
  };
// thanh tien trinh
const renderStepIndicator = () => {
  const steps = ['Step 1', 'Step 2'];
  return (
    <div className="flex justify-around items-center mb-2">
      {steps.map((step, index) => {
        const stepNumber = index + 1;
        const isCurrent = currentStep === stepNumber;
        const isCompleted = currentStep > stepNumber;

        return (
          <div key={index} className="flex flex-col items-center">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white ${isCurrent ? 'bg-blue-600' : isCompleted ? 'bg-green-500' : 'bg-gray-300'}`}>
              {stepNumber}
            </div>
            <span className={`mt-2 text-sm ${isCurrent ? 'text-blue-600' : isCompleted ? 'text-green-500' : 'text-gray-500'}`}>
              {step}
            </span>
          </div>
        );
      })}
    </div>
  );
};
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-600 to-blue-400">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-3xl font-semibold mb-4 text-center text-gray-800">Đăng ký</h2>
        {errorMessage && <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>}

            {/* Thanh tiến trình */}
            {renderStepIndicator()}


        {currentStep === 1 && (
          <div>
            <div className="mb-6">
              <label htmlFor="mssv" className="block mb-2 text-sm font-medium text-gray-700">MSSV</label>
              <input
                type="text"
                id="mssv"
                placeholder='Nhập MSSV'
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
                value={mssv}
                onChange={(e) => setMssv(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                placeholder='Nhập Email'
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <button type="button" className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300" onClick={nextStep}>
              Tiếp theo
            </button>
          </div>
        )}


        {currentStep === 2 && (
          <div>
          <div className="mb-6">
              <label htmlFor="firstname" className="block mb-2 text-sm font-medium text-gray-700">First Name</label>
              <input
                type="text"
                id="firstname"
                placeholder='Nhập Họ'
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
                value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="lastname" className="block mb-2 text-sm font-medium text-gray-700">Last Name</label>
              <input
                type="text"
                id="lastname"
                placeholder='Nhập Tên'
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
                value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder='Nhập mật khẩu'
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="mb-6">
              <label htmlFor="confirmpassword" className="block mb-2 text-sm font-medium text-gray-700">Confirm password</label>
              <input
                type="password"
                id="password"
                placeholder='Xác nhận mật khẩu'
                className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring focus:ring-blue-300 transition duration-300 ease-in-out"
                value={confirmpassword}
                onChange={(e) => setConfirmpassword(e.target.value)}
                required
              
              />
            </div>


            <div className="flex justify-between">
              <button type="button" className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 transition duration-300" onClick={prevStep}>
                Quay lại
              </button>
              <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-300">
                Đăng ký
              </button>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default Register;
