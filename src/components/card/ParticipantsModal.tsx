import React, { useState, useEffect } from 'react';
import * as XLSX from 'xlsx';
import { userService } from '../../services/user.service';
import { IUser } from '../../shared/models/user.model';
import { IActivity } from '../../shared/models/activity.model';
interface ParticipantsModalProps {
//   activityId: number;
    activity: IActivity
  isOpen: boolean;
  onClose: () => void;
}

const ParticipantsModal: React.FC<ParticipantsModalProps> = ({ 
//   activityId,
    activity,
  isOpen, 
  onClose 
}) => {
  // State quản lý danh sách người tham gia
  const [participants, setParticipants] = useState<IUser[]>([]);
  
  // State quản lý trạng thái tải
  const [isLoading, setIsLoading] = useState(false);
  
  // State quản lý lỗi
  const [error, setError] = useState<string | null>(null);

  // State cho việc tìm kiếm và lọc
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'name' | 'userId'>('name');

  // Hàm fetch danh sách người tham gia
  const fetchParticipants = async () => {
    setIsLoading(true);
    
    try {
      const response = await userService.getParticipants(activity.activityId);
      
      setParticipants(response);
      setError(null);
    } catch (err) {
      console.error('Lỗi khi tải danh sách người tham gia:', err);
      setError('Không thể tải danh sách người tham gia. Vui lòng thử lại.');
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xuất file Excel
  const exportToExcel = () => {
    // Chuyển đổi dữ liệu sang định dạng phù hợp cho Excel
    const exportData = filteredParticipants.map((participant, index) => ({
      'STT': index + 1,
      'Tiêu đề': activity.name,
      "Địa chỉ": activity.venue,
      'MSSV': participant.userId,
      'Họ': participant.firstName,
      'Tên': participant.lastName,
      'Tên đầy đủ': `${participant.firstName} ${participant.lastName}`,
      'Email': participant.email,
      'Khoa': participant.faculty
    }));
  
   // Tạo Workbook và Worksheet
   const worksheet = XLSX.utils.json_to_sheet([]);

   // Thêm dòng tiêu đề và địa chỉ vào sheet
   XLSX.utils.sheet_add_aoa(worksheet, [
     [`Tiêu đề: ${activity.name}`], // Dòng 1: Tiêu đề
     [`Địa chỉ: ${activity.venue}`], // Dòng 2: Địa chỉ
     [] // Dòng 3: Dòng trống
   ], { origin: 0 });
 
   // Thêm dữ liệu người tham gia vào sheet
   XLSX.utils.sheet_add_json(worksheet, exportData, { origin: -1, skipHeader: false });
 
   // Tạo Workbook và ghi dữ liệu
   const workbook = XLSX.utils.book_new();
   XLSX.utils.book_append_sheet(workbook, worksheet, 'Danh sách người tham gia');

    // Xuất file
    XLSX.writeFile(workbook, `DanhSachNguoiThamGia_${activity.activityId}.xlsx`);
  };

  // Sử dụng useEffect để tự động fetch khi modal mở
  useEffect(() => {
    if (isOpen) {
      fetchParticipants();
    }
  }, [activity.activityId, isOpen]);

  // Hàm lọc và tìm kiếm người tham gia
  const filteredParticipants = participants.filter(participant => {
    const searchValue = searchTerm.toLowerCase().trim();
    
    if (!searchValue) return true;

    if (filterType === 'name') {
      const fullName = `${participant.firstName} ${participant.lastName}`.toLowerCase();
      return fullName.includes(searchValue);
    } else {
      return participant.userId.toLowerCase().includes(searchValue);
    }
  });

  // Nếu modal không mở, không render gì cả
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl max-w-xl w-full max-h-[80vh] overflow-auto">
        {/* Tiêu đề modal */}
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Danh sách người tham gia {activity.name}</h2>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>  

        {/* Thanh công cụ */}
        <div className="p-4 flex justify-between space-x-2">
          {/* Thanh tìm kiếm */}
          <div className="flex-grow flex space-x-2">
            <div className="flex-grow">
              <input 
                type="text" 
                placeholder={`Tìm kiếm theo ${filterType === 'name' ? 'tên' : 'MSSV'}`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full p-2 border rounded"
              />
            </div>
            <select 
              value={filterType}
              onChange={(e) => setFilterType(e.target.value as 'name' | 'userId')}
              className="p-2 border rounded"
            >
              <option value="name">Tìm theo Tên</option>
              <option value="userId">Tìm theo MSSV</option>
            </select>
          </div>

          {/* Nút xuất Excel */}
          <button 
            onClick={exportToExcel}
            disabled={filteredParticipants.length === 0}
            className="bg-green-500 text-white p-2 rounded hover:bg-green-600 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M3 17a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm3.293-9.707a1 1 0 011.414 0L9 10.586V3a1 1 0 112 0v7.586l1.293-1.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
            Xuất Excel
          </button>
        </div>

        {/* Nội dung modal */}
        <div className="p-4">
          {/* Trạng thái loading */}
          {isLoading && (
            <div className="text-center py-4 text-gray-500">
              Đang tải danh sách...
            </div>
          )}

          {/* Thông báo lỗi */}
          {error && (
            <div className="text-center py-4 text-red-500">
              {error}
            </div>
          )}

          {/* Danh sách người tham gia */}
          {!isLoading && !error && filteredParticipants.length > 0 && (
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border p-2 text-left">STT</th>
                  <th className="border p-2 text-left">MSSV</th>
                  <th className="border p-2 text-left">Tên</th>
                  <th className="border p-2 text-left">Email</th>
                  <th className="border p-2 text-left">Khoa</th>
                </tr>
              </thead>
              <tbody>
                {filteredParticipants.map((participant, index) => (
                  <tr key={participant.userId} className="hover:bg-gray-50">
                    <td className="border p-2">{index + 1}</td>
                    <td className="border p-2">{participant.userId}</td>
                    <td className="border p-2">{participant.firstName} {participant.lastName}</td>
                    <td className="border p-2">{participant.email}</td>
                    <td className="border p-2">{participant.faculty}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Thông báo khi không có người tham gia hoặc không tìm thấy kết quả */}
          {!isLoading && !error && (
            participants.length === 0 ? (
              <div className="text-center py-4 text-gray-500">
                Chưa có người đăng ký tham gia
              </div>
            ) : (
              filteredParticipants.length === 0 && (
                <div className="text-center py-4 text-gray-500">
                  Không tìm thấy kết quả phù hợp
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default ParticipantsModal;