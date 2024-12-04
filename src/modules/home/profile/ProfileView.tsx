import React, { useState } from 'react';
import {
  UserIcon,
  ArrowLeftEndOnRectangleIcon,
  AcademicCapIcon,
  CalendarIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  PencilSquareIcon
} from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; 
import { IUser } from "../../../shared/models/user.model";
import { userService } from '../../../services/user.service';
import ChangePasswordModal from './ChangePasswordModal';

dayjs.locale('vi');

const ProfileView: React.FC<{ user: IUser }> = ({ user }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<IUser>({
    ...user,
    firstName: user.firstName,
    lastName: user.lastName,
    phoneNumber: user.phoneNumber || '',
    className: user.className || '',
  });
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const handlePasswordChange = async (oldPassword: string, newPassword: string, confirmPassword: string) => {
    // mật khẩu phải từ 6 kí tự
    if (newPassword.length < 6) {
      alert('Mật khẩu mới phải từ 6 kí tự trở lên');
      return;
    }
    
   if (newPassword !== confirmPassword) {
      alert('Mật khẩu mới và xác nhận mật khẩu không khớp');
      return;
    }

    try {
      await userService.updatePassword(user.userId, oldPassword, newPassword); // Gọi API để đổi mật khẩu
      alert('Thay đổi mật khẩu thành công');
      setIsPasswordModalOpen(false);
    } catch (error) {
      alert('Đã xảy ra lỗi khi thay đổi mật khẩu');
    }
  };

  const formatDate = (date: dayjs.Dayjs) => {
    if (dayjs.isDayjs(date)) {
      return date.format('DD MMMM YYYY, HH:mm');
    }
    return dayjs(date).format('DD MMMM YYYY, HH:mm');
  };

  const profileSections = [
    {
      icon: <IdentificationIcon className="w-5 h-5 text-blue-500" />,
      label: 'MSSV',
      value: updatedUser.userId
    },
    {
      icon: <UserIcon className="w-5 h-5 text-blue-500" />,
      label: 'Họ và tên',
      value: isEditMode
        ? (
          <input
            type="text"
            value={updatedUser.firstName}
            onChange={(e) => setUpdatedUser({ ...updatedUser, firstName: e.target.value })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1"
          />
        ) : `${updatedUser.firstName} ${updatedUser.lastName}`
    },
    {
      icon: <EnvelopeIcon className="w-5 h-5 text-blue-500" />,
      label: 'Email',
      value: updatedUser.email
    },
    {
      icon: <AcademicCapIcon className="w-5 h-5 text-blue-500" />,
      label: 'Khoa',
      value: updatedUser.faculty || 'Chưa cập nhật'
    },
    {
      icon: <PhoneIcon className="w-5 h-5 text-blue-500" />,
      label: 'Số điện thoại',
      value: isEditMode
        ? (
          <input
            type="text"
            value={updatedUser.phoneNumber}
            onChange={(e) => setUpdatedUser({ ...updatedUser, phoneNumber: e.target.value })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1"
          />
        ) : updatedUser.phoneNumber || 'Chưa cập nhật'
    },
    {
      icon: <CalendarIcon className="w-5 h-5 text-blue-500" />,
      label: 'Ngày đăng ký',
      value: formatDate(user.registerDate)
    },
    {
      icon: <AcademicCapIcon className="w-5 h-5 text-blue-500" />,
      label: 'Lớp',
      value: isEditMode
        ? (
          <input
            type="text"
            value={updatedUser.className}
            onChange={(e) => setUpdatedUser({ ...updatedUser, className: e.target.value })}
            className="border-b border-gray-300 focus:outline-none focus:border-blue-500 px-1"
          />
        ) : updatedUser.className || 'Chưa cập nhật'
    }
  ];

  const getStatusColor = (status: string | null) => {
    switch (status?.toUpperCase()) {
      case 'ACTIVE':
        return 'bg-green-100 text-green-800';
      case 'INACTIVE':
        return 'bg-red-100 text-red-800';
      case 'PENDING':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // yêu cầu rời clb
  const exitClub = async () => {
    try {
      // Gọi API từ service
      await userService.requestLeft(user.userId);
      // Hiển thị thông báo thành công
      alert('Chuyển yêu cầu rời CLB thành công');
    } catch (error) {
      // Hiển thị thông báo lỗi
      alert('Đã xảy ra lỗi');
    }
  }

  const handleUpdateProfile = async () => {
    try {
      await userService.updateUser(updatedUser);
      setIsEditMode(false);
      alert('Cập nhật thông tin thành công');
    } catch (error) {
      alert(error.message);
    }
  };

  const cancelEdit = () => {
    // Khi hủy, phục hồi dữ liệu cũ và tắt chế độ chỉnh sửa
    setUpdatedUser({ ...user });
    setIsEditMode(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg">
        <div className="p-6">
          {/* Header Section */}
          <div className="text-center pb-8 border-b border-gray-200">
            <div className="w-24 h-24 mx-auto bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-3xl font-bold text-blue-600">
                {user.firstName.charAt(0)}
              </span>
            </div>
            <h2 className="text-2xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex items-center justify-center space-x-2 mt-2">
              <span className={`px-3 py-1 rounded-full text-sm ${getStatusColor(user.status)}`}>
                {user.status || 'Chưa xác định'}
              </span>
              <span className="px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-sm">
                {user.userType}
              </span>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
            {profileSections.map((section, index) => (
              <div key={index} className="flex items-start space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors">
                {section.icon}
                <div>
                  <p className="text-sm text-gray-500">{section.label}</p>
                  <p className="text-gray-900 font-medium">{section.value}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Additional Info */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Điểm tích lũy</p>
                <p className="text-gray-900 font-medium">{user.cumulativeScore}</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-8 flex justify-between">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
              onClick={exitClub}>
              <ArrowLeftEndOnRectangleIcon className="w-4 h-4" />
              <span>Rời TSE club</span>
            </button>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              Thay đổi mật khẩu
            </button>

            {!isEditMode && (
              <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2"
                onClick={() => setIsEditMode(true)}>
                <PencilSquareIcon className="w-4 h-4" />
                <span>Cập nhật thông tin</span>
              </button>
            )}
          </div>

          {/* When editing */}
          {isEditMode && (
            <div className="mt-4 flex justify-end space-x-4">
              <button className="px-6 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition duration-200"
                onClick={cancelEdit}>
                Hủy
              </button>
              <button className="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition duration-200"
                onClick={handleUpdateProfile}>
                Lưu thay đổi
              </button>
            </div>
          )}

        </div>
      </div>
       {/* Hiển thị modal đổi mật khẩu */}
       <ChangePasswordModal
      isOpen={isPasswordModalOpen}
      onClose={() => setIsPasswordModalOpen(false)}
      onSubmit={handlePasswordChange}
    />
    </div>
  );
};

export default ProfileView;
