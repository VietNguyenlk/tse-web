import React, { useEffect, useState } from "react";
import { userService } from "../../../../services/user.service";
// import { useNotifications } from "../../../../shared/hooks/notification.hook";

interface ExitRequest {
  id: string;
  userId: string;
  firstName: string;
  lastName: string;
  email: string;
  userType: string;
  faculty: string;
  status: string;
}

const ExitRequestsBoard: React.FC = () => {
  const [data, setData] = useState<ExitRequest[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  // const { addNotification, notifications, removeNotification } = useNotifications();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const res = await userService.getLeftRequesting();
        setData(res);
      } catch (error) {
        console.error("Error fetching exit requests:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleApprove = async (id: string) => {
    try {
      await userService.approveLeftRequest([id]);
      setData(data.map(item => 
        item.id === id 
          ? {...item, status: 'Approved'} 
          : item
      ));
      // thông báo duyệt thành công
      // addNotification('SUCCESS', 'Thành công', 'Đã duyệt yêu cầu rời clb.');
      window.location.reload()
    } catch (error) {
      console.error("Error approving exit request:", error);
    }
  };

  const handleReject = async (id: string) => {
    try {
      console.log(id);
      await userService.denyLeftRequest([id]);
      setData(data.map(item => 
        item.id === id 
          ? {...item, status: 'Rejected'} 
          : item
      ));
      // thông báo từ chối thành công
      // addNotification('SUCCESS', 'Thành công', 'Đã từ chối yếu cầu rời clb.');
      // reset trang 
      window.location.reload()

    } catch (error) {
      console.error("Error rejecting exit request:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch(status) {
      case 'Pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'Approved':
        return 'bg-green-100 text-green-800';
      case 'Rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="w-full p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        Duyệt yêu cầu rời CLB
      </h2>
      
      {loading ? (
        <div className="text-center py-4 text-gray-500">Loading...</div>
      ) : data.length === 0 ? (
        <div className="text-center py-4 text-gray-500">
          Ở đây thật trống trải
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-center">MSSV</th>
                <th className="px-4 py-3 text-center">Thông tin</th>
                <th className="px-4 py-3 text-center">Loại</th>
                <th className="px-4 py-3 text-center">Khoa</th>
                <th className="px-4 py-3 text-center">Trạng thái</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {data.map((user) => (
                <tr 
                  key={user.userId} 
                  className="border-b  hover:bg-gray-100 transition-colors"
                >
                  <td className="px-4 py-6 h-5 text-center text-base">{user.userId}</td>
                      <td className="py-6 text-center">
                        <div className="text-base font-bold">
                          {user.firstName} {user.lastName}
                        </div>
                          <div className="text-sm text-gray-500">{user.email}</div>
                  </td>
                  <td className="px-4 py-6 h-5 text-center text-base">{user.userType}</td>
                  <td className="px-4 py-6 h-5 text-center text-base ">{user.faculty}</td>
                  <td className="px-4 py-6 h-5 text-center text-base">
                    <span className={`
                      px-2 py-1 rounded-full text-xs font-medium bg-blue-400
                      ${getStatusColor(user.status)}
                    `}>
                      {user.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-center">
                    {user.status === 'LEFT_REQUESTING' && (
                      <div className="flex justify-center space-x-2">
                        <button 
                          onClick={() => handleApprove(user.userId)}
                          className="
                            px-3 py-3 
                            bg-green-500 text-white 
                            rounded hover:bg-green-600 
                            transition-colors text-xm
                          "
                        >
                          Đồng ý
                        </button>
                        <button 
                          onClick={() => handleReject(user.userId)}
                          className="
                            px-3 py-1 
                            bg-red-500 text-white 
                            rounded hover:bg-red-600 
                            transition-colors text-xs
                          "
                        >
                          từ chối
                        </button>
                      </div>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ExitRequestsBoard;