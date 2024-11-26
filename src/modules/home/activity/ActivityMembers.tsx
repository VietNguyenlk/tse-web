import React, { useState } from 'react';

interface Activity {
  name: string;
  semester: string;
  score: number;
  endDate: string;
}

const ActivityMembers = () => {
  const [activities, setActivities] = useState<Activity[]>([
    {
      name: 'Lập trình Web',
      semester: 'Học kỳ 1',
      score: 5,
      endDate: '30/12/2024',
    },
    {
      name: 'Phát triển AI/Machine Learning',
      semester: 'Học kỳ 2',
      score: 6,
      endDate: '15/01/2025',
    },
    {
      name: 'Thiết kế UX/UI',
      semester: 'Học kỳ 3',
      score: 7,
      endDate: '10/11/2024',
    },
  ]);

  const handleViewInfo = (activityName: string) => {
    alert(`Thông tin hoạt động: ${activityName}`);
  };

  const handleRegister = (activityName: string) => {
    alert(`Bạn đã đăng ký hoạt động: ${activityName}`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center p-4">
      <div className="bg-white p-8 rounded-xl shadow-md w-full max-w-4xl">
        <h1 className="text-3xl font-bold text-center text-blue-600 mb-6">
          Danh Sách Hoạt Động CLB Lập Trình TSE
        </h1>

        <table className="table-auto w-full border-collapse border border-gray-300 text-sm text-left">
          <thead className="bg-blue-100">
            <tr>
              <th className="border border-gray-300 p-2 text-center">TT</th>
              <th className="border border-gray-300 p-2">Hoạt động (T/gia)</th>
              <th className="border border-gray-300 p-2">Học kỳ</th>
              <th className="border border-gray-300 p-2">Điểm tích luỹ</th>
              <th className="border border-gray-300 p-2">Kết thúc đăng ký</th>
              <th className="border border-gray-300 p-2 text-center">Đăng ký</th>
            </tr>
          </thead>
          <tbody>
            {activities.map((activity, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? 'bg-gray-50' : 'bg-white'
                } hover:bg-gray-100`}
              >
                <td className="border border-gray-300 p-2 text-center">
                  {index + 1}
                </td>
                <td
                  className="border border-gray-300 p-2 text-blue-600 cursor-pointer underline"
                  onClick={() => handleViewInfo(activity.name)}
                >
                  {activity.name}
                </td>
                <td className="border border-gray-300 p-2">{activity.semester}</td>
                <td className="border border-gray-300 p-2 text-center">
                  {activity.score}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  {activity.endDate}
                </td>
                <td className="border border-gray-300 p-2 text-center">
                  <button
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition duration-300"
                    onClick={() => handleRegister(activity.name)}
                  >
                    Đăng ký
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ActivityMembers;
