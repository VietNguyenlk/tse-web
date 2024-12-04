import React from 'react';
import dayjs from 'dayjs';

interface UserInfoModalProps {
  user: any;
  isOpen: boolean;
  onClose: () => void;
}

const UserInfoModal: React.FC<UserInfoModalProps> = ({ user, isOpen, onClose }) => {
  if (!isOpen) return null;

  // Helper function to render user info with fallback and icons
  const renderInfoField = (
    label: string, 
    value: string | undefined | null, 
    icon?: React.ReactNode,
    fallbackText: string = 'Chưa cập nhật'
  ) => {
    // Use fallback text if value is null, undefined, or empty string
    const displayValue = value?.trim() || fallbackText;
    
    return (
      <div className="flex items-center space-x-3 py-3 border-b border-gray-200 last:border-b-0">
        {icon && <span className="text-blue-500">{icon}</span>}
        <div className="flex-grow">
          <p className="text-sm text-gray-500 mb-1">{label}</p>
          <p className={`font-semibold ${!value?.trim() ? 'text-gray-400 italic' : 'text-gray-800'}`}>
            {displayValue}
          </p>
        </div>
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex justify-center items-center p-4 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full flex flex-col h-[80vh] max-h-[600px]">
        {/* Header */}
        <div className="bg-blue-50 px-6 py-4 rounded-t-2xl border-b border-blue-100 flex-shrink-0">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold text-blue-800">Thông tin thành viên</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700 transition-colors rounded-full p-1 hover:bg-gray-100"
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="flex-grow overflow-y-auto px-6 py-4">
          <div className="space-y-4">
            {renderInfoField('Email', user.userInfo.email, 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            )}
            
            {renderInfoField('Họ và tên', `${user.userInfo.firstName || ''} ${user.userInfo.lastName || ''}`.trim(), 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            )}
            
            {renderInfoField('Loại người dùng', user.userInfo.userType, 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
            )}
            
            {renderInfoField('Khoa', user.userInfo.faculty, 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5 8.445v5.127a1 1 0 00.553.894l4 2a1 1 0 00.894 0l4-2A1 1 0 0015 13.572v-5.127l2.394-1.025a1 1 0 000-1.84l-7-3z" />
              </svg>
            )}
            
            {renderInfoField('Lớp', user.userInfo.className, 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.445.29-3.5.804v10A7.969 7.969 0 015.5 14c1.463 0 2.847.388 4 1.004a7.962 7.962 0 014-1.004c1.254 0 2.445.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.445.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
              </svg>
            )}
            
            {renderInfoField('Trạng thái', user.userInfo.status, 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M17.778 8.222c-4.296-4.296-11.26-4.296-15.556 0A1 1 0 01.808 6.808c5.076-5.077 13.308-5.077 18.384 0a1 1 0 01-1.414 1.414zM14.95 11.05a7 7 0 00-9.9 0 1 1 0 01-1.414-1.414 9 9 0 0112.728 0 1 1 0 01-1.414 1.414zM12.12 13.88a3 3 0 00-4.242 0 1 1 0 01-1.415-1.415 5 5 0 017.072 0 1 1 0 01-1.415 1.415zM9 16a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
              </svg>
            )}
            
            {renderInfoField('Số điện thoại', user.userInfo.phoneNumber, 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                <path d="M3.61 5.679a1 1 0 000 1.414l2.11 2.11a1 1 0 001.415-1.415l-1.208-1.208a5.02 5.02 0 012.576-1.118c1.465 0 2.834.74 3.642 2.107.826 1.386 1.167 3.184.9 4.908-.13.998-.433 1.929-.909 2.835-.531 1.04-1.311 1.897-2.366 2.357-.09.039-.186.078-.278.117a6.033 6.033 0 01-2.52.33c-1.05-.21-2.042-.647-3.073-1.253l-3.04 3.04a1 1 0 00.708 1.707c1.393.47 2.864.72 4.35.72 3.307 0 6-2.693 6-6s-2.693-6-6-6a5.98 5.98 0 00-4.35 1.808c-.391-.287-.83-.53-1.3-.743-.017-.007-.035-.013-.052-.02a4.975 4.975 0 00-.61-.195z" />
              </svg>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserInfoModal;
