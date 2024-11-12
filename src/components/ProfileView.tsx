import React from 'react';
import { UserIcon, AcademicCapIcon, CalendarIcon, PhoneIcon, EnvelopeIcon, IdentificationIcon } from '@heroicons/react/24/outline';
import dayjs from 'dayjs';
import 'dayjs/locale/vi'; // Import locale tiếng Việt

// Cấu hình locale cho dayjs
dayjs.locale('vi');

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

const ProfileView: React.FC<{ user: UserProfile }> = ({ user }) => {
  const formatDate = (date: dayjs.Dayjs) => {
    // Kiểm tra nếu date là dayjs object
    if (dayjs.isDayjs(date)) {
      return date.format('DD MMMM YYYY, HH:mm');
    }
    // Nếu không phải, convert sang dayjs
    return dayjs(date).format('DD MMMM YYYY, HH:mm');
  };

  const profileSections = [
    {
      icon: <IdentificationIcon className="w-5 h-5 text-blue-500" />,
      label: 'MSSV',
      value: user.userId
    },
    {
      icon: <UserIcon className="w-5 h-5 text-blue-500" />,
      label: 'Họ và tên',
      value: `${user.firstName} ${user.lastName}`
    },
    {
      icon: <EnvelopeIcon className="w-5 h-5 text-blue-500" />,
      label: 'Email',
      value: user.email
    },
    {
      icon: <AcademicCapIcon className="w-5 h-5 text-blue-500" />,
      label: 'Khoa',
      value: user.faculty || 'Chưa cập nhật'
    },
    {
      icon: <PhoneIcon className="w-5 h-5 text-blue-500" />,
      label: 'Số điện thoại',
      value: user.phoneNumber || 'Chưa cập nhật'
    },
    {
      icon: <CalendarIcon className="w-5 h-5 text-blue-500" />,
      label: 'Ngày đăng ký',
      value: formatDate(user.registerDate)
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
                <p className="text-sm text-gray-500">Lớp</p>
                <p className="text-gray-900 font-medium">{user.className || 'Chưa cập nhật'}</p>
              </div>
              <div className="p-3 rounded-lg bg-gray-50">
                <p className="text-sm text-gray-500">Điểm tích lũy</p>
                <p className="text-gray-900 font-medium">{user.cumulativeScore}</p>
              </div>
            </div>
          </div>

          {/* Edit Button */}
          <div className="mt-8 flex justify-center">
            <button className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition duration-200 flex items-center space-x-2">
              <UserIcon className="w-4 h-4" />
              <span>Cập nhật thông tin</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileView;