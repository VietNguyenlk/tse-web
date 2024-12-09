import { useEffect, useState } from "react";
import {
  Bar,
  BarChart,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { userService } from "../../../services/user.service";
import Modal from "./Modal";
import * as XLSX from 'xlsx';


const AdminDashboard = () => {
  const [activities, setActivities] = useState([]);
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  const [registeredUsers, setRegisteredUsers] = useState(0); // State cho số lượng người tham gia
  const [topUsers, setTopUsers] = useState([]); // State cho người dùng tham gia nhiều nhất
  const [selectedUser, setSelectedUser] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [infor, setInfor] = useState([]); // State cho thông tin người dùng
  const [previousMonthActivities, setPreviousMonthActivities] = useState([]);
  const [previousMonthRegisteredUsers, setPreviousMonthRegisteredUsers] =
    useState(0);

    const [exportOption, setExportOption] = useState('all');

  // Export function
  const handleExport = () => {
    switch(exportOption) {
      case 'activities':
        exportActivities();
        break;
      case 'participation':
        exportParticipationRates();
        break;
      case 'all':
      default:
        exportAllData();
        break;
    }
  };

  // Export all data
  const exportAllData = () => {
    // Combine multiple sheets
    const workbook = XLSX.utils.book_new();

    // Activities Sheet
    const activitiesSheet = XLSX.utils.json_to_sheet(
      activities.map(activity => ({
        'Tên Hoạt Động': activity.name,
        'Loại Hoạt Động': activity.activityType,
        'Ngày Diễn Ra': new Date(activity.occurDate).toLocaleDateString(),
        'Người Tổ Chức': activity.hostName,
        'Trạng Thái': activity.activityStatus,
        'Số Người Đăng Ký': activity.registeredNumber,
        'Sức Chứa': activity.capacity
      }))
    );
    XLSX.utils.book_append_sheet(workbook, activitiesSheet, 'Hoạt Động');

    // Participation Rates Sheet
    const participationRatesSheet = XLSX.utils.json_to_sheet([
      {
        'Loại Hoạt Động': 'Hội thảo',
        'Tỷ Lệ Tham Gia (%)': participationRatesByType.seminar.toFixed(2)
      },
      {
        'Loại Hoạt Động': 'Đào tạo',
        'Tỷ Lệ Tham Gia (%)': participationRatesByType.training.toFixed(2)
      },
      {
        'Loại Hoạt Động': 'Cuộc thi',
        'Tỷ Lệ Tham Gia (%)': participationRatesByType.contest.toFixed(2)
      },
      {
        'Tổng Tỷ Lệ Tham Gia (%)': participationRate.toFixed(2)
      }
    ]);
    XLSX.utils.book_append_sheet(workbook, participationRatesSheet, 'Tỷ Lệ Tham Gia');

    // Top Users Sheet
    const topUsersSheet = XLSX.utils.json_to_sheet(
      topUsers.map(user => ({
        'Mã Người Dùng': user.userId,
        'Số Lượng Hoạt Động': user.activityCount
      }))
    );
    XLSX.utils.book_append_sheet(workbook, topUsersSheet, 'Người Dùng Tích Cực');

    // Monthly Comparison Sheet
    const monthlyComparisonSheet = XLSX.utils.json_to_sheet([
      {
        'Chỉ Số': 'Số Hoạt Động',
        'Tháng Hiện Tại': currentMonthActivityCount,
        'Tháng Trước': previousMonthActivityCount,
        'Thay Đổi (%)': activityCountChange
      },
      {
        'Chỉ Số': 'Số Thành Viên Mới',
        'Tháng Hiện Tại': registeredUsers,
        'Tháng Trước': previousMonthRegisteredUsers,
        'Thay Đổi (%)': memberCountChange
      },
      {
        'Chỉ Số': 'Tỷ Lệ Tham Gia',
        'Tháng Hiện Tại': `${participationRate.toFixed(2)}%`,
        'Tháng Trước': `${previousMonthParticipationRate.toFixed(2)}%`,
        'Thay Đổi (%)': participationRateChange
      }
    ]);
    XLSX.utils.book_append_sheet(workbook, monthlyComparisonSheet, 'So Sánh Tháng');

    // Export the workbook
    XLSX.writeFile(workbook, `ClubActivities_Month${selectedMonth}.xlsx`);
  };

  // Export only activities
  const exportActivities = () => {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet(
      activities.map(activity => ({
        'Tên Hoạt Động': activity.name,
        'Loại Hoạt Động': activity.activityType,
        'Ngày Diễn Ra': new Date(activity.occurDate).toLocaleDateString(),
        'Người Tổ Chức': activity.hostName,
        'Trạng Thái': activity.activityStatus,
        'Số Người Đăng Ký': activity.registeredNumber,
        'Sức Chứa': activity.capacity
      }))
    );
    XLSX.utils.book_append_sheet(workbook, sheet, 'Hoạt Động');
    XLSX.writeFile(workbook, `ClubActivities_Month${selectedMonth}.xlsx`);
  };

  // Export participation rates
  const exportParticipationRates = () => {
    const workbook = XLSX.utils.book_new();
    const sheet = XLSX.utils.json_to_sheet([
      {
        'Loại Hoạt Động': 'Hội thảo',
        'Tỷ Lệ Tham Gia (%)': participationRatesByType.seminar.toFixed(2)
      },
      {
        'Loại Hoạt Động': 'Đào tạo',
        'Tỷ Lệ Tham Gia (%)': participationRatesByType.training.toFixed(2)
      },
      {
        'Loại Hoạt Động': 'Cuộc thi',
        'Tỷ Lệ Tham Gia (%)': participationRatesByType.contest.toFixed(2)
      },
      {
        'Tổng Tỷ Lệ Tham Gia (%)': participationRate.toFixed(2)
      }
    ]);
    XLSX.utils.book_append_sheet(workbook, sheet, 'Tỷ Lệ Tham Gia');
    XLSX.writeFile(workbook, `ParticipationRates_Month${selectedMonth}.xlsx`);
  };



  useEffect(() => {
    const fetchTopUsers = async () => {
      try {
        const data = await userService.getTopUsersInMonth(selectedMonth);
        setTopUsers(data);
      } catch (error) {
        console.error("Error fetching top users:", error);
      }
    };
    fetchTopUsers();
  }, [selectedMonth]);

  // Chuyển đổi dữ liệu topUsers trước khi render
  const transformedTopUsers = topUsers.map((user) => ({
    name: user.userId, // hoặc bạn có thể muốn lấy tên người dùng từ dịch vụ khác
    participationCount: user.activityCount,
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Lấy danh sách hoạt động
        const activityData = await userService.getActivitiesInMonth(selectedMonth);
        setActivities(activityData);

        // Lấy số lượng người tham gia
        const registeredData = await userService.getRegisteredUsersInMonth(
          selectedMonth,
        );
        setRegisteredUsers(registeredData.length); // Giả sử API trả về `{ count: số lượng }`
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await userService.getActivitiesInMonth(selectedMonth);
        setActivities(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [selectedMonth]);

  const handleMonthChange = (e) => {
    setSelectedMonth(Number(e.target.value));
  };

  // Group activities by type
  const groupedActivities = activities.reduce(
    (acc, activity) => {
      if (activity.activityType === "SEMINAR") {
        acc.seminar.push(activity);
      } else if (activity.activityType === "TRAINING") {
        acc.training.push(activity);
      } else if (activity.activityType === "CONTEST") {
        acc.contest.push(activity);
      }
      return acc;
    },
    { seminar: [], training: [], contest: [] },
  );

  // Calculate participation rate for the month based on registered and maxParticipants
  const totalRegisteredParticipants = activities.reduce(
    (acc, activity) => acc + activity.registeredNumber,
    0,
  );
  const totalMaxParticipants = activities.reduce(
    (acc, activity) => acc + (activity.capacity || 0),
    0,
  );
  const participationRate =
    totalMaxParticipants > 0
      ? (totalRegisteredParticipants / totalMaxParticipants) * 100
      : 0;

  // Find the activity with the highest number of participants
  const mostRegisteredActivity = activities.reduce(
    (max, activity) =>
      activity.registeredNumber > max.registeredNumber ? activity : max,
    { registeredNumber: 0 },
  );
  // tỷ lệ tham gia hoạt động của từng loại
  const participationRatesByType = {
    seminar:
      (groupedActivities.seminar.reduce(
        (acc, activity) => acc + activity.registeredNumber,
        0,
      ) /
        groupedActivities.seminar.reduce(
          (acc, activity) => acc + (activity.capacity || 0),
          0,
        )) *
        100 || 0,

    training:
      (groupedActivities.training.reduce(
        (acc, activity) => acc + activity.registeredNumber,
        0,
      ) /
        groupedActivities.training.reduce(
          (acc, activity) => acc + (activity.capacity || 0),
          0,
        )) *
        100 || 0,

    contest:
      (groupedActivities.contest.reduce(
        (acc, activity) => acc + activity.registeredNumber,
        0,
      ) /
        groupedActivities.contest.reduce(
          (acc, activity) => acc + (activity.capacity || 0),
          0,
        )) *
        100 || 0,
  };

  const participationRateData = [
    { name: "Hội thảo", rate: participationRatesByType.seminar.toFixed(2) },
    { name: "Đào tạo", rate: participationRatesByType.training.toFixed(2) },
    { name: "Cuộc thi", rate: participationRatesByType.contest.toFixed(2) },
  ];
  // thống tin người dùng top trong tháng
  const handleUserClick = async (userId) => {
    try {
      const userData = await userService.getUserInfo(userId);
      setInfor(userData);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
    }
  };

  // so sánh tỷ lệ tham gia
  useEffect(() => {
    const fetchPreviousMonthData = async () => {
      try {
        const previousMonth = selectedMonth === 1 ? 12 : selectedMonth - 1;
        const previousMonthYear =
          selectedMonth === 1
            ? new Date().getFullYear() - 1
            : new Date().getFullYear();

        // Lấy số lượng người đăng ký tháng trước
        const previousRegisteredData = await userService.getRegisteredUsersInMonth(
          previousMonth,
        );
        setPreviousMonthRegisteredUsers(previousRegisteredData.length);

        // Lấy danh sách hoạt động tháng trước
        const previousMonthActivityData = await userService.getActivitiesInMonth(
          previousMonth,
        );
        setPreviousMonthActivities(previousMonthActivityData);
      } catch (error) {
        console.error("Error fetching previous month data:", error);
      }
    };

    fetchPreviousMonthData();
  }, [selectedMonth]);
  // Số hoạt động
  const currentMonthActivityCount = activities.length;
  const previousMonthActivityCount = previousMonthActivities.length;

  // Tránh chia cho 0 và xử lý trường hợp cả hai tháng đều bằng 0
  const activityCountChange =
    previousMonthActivityCount === 0
      ? currentMonthActivityCount > 0
        ? "100"
        : "0"
      : (
          ((currentMonthActivityCount - previousMonthActivityCount) /
            previousMonthActivityCount) *
          100
        ).toFixed(2);

  // Số thành viên mới
  const memberCountChange =
    previousMonthRegisteredUsers === 0
      ? registeredUsers > 0
        ? "100"
        : "0"
      : (
          ((registeredUsers - previousMonthRegisteredUsers) /
            previousMonthRegisteredUsers) *
          100
        ).toFixed(2);

  // Tỷ lệ tham gia
  const previousMonthParticipationRate =
    (previousMonthActivities.reduce(
      (acc, activity) => acc + activity.registeredNumber,
      0,
    ) /
      previousMonthActivities.reduce(
        (acc, activity) => acc + (activity.capacity || 0),
        0,
      )) *
      100 || 0;

  const participationRateChange =
    previousMonthParticipationRate === 0
      ? participationRate > 0
        ? "100"
        : "0"
      : (
          ((participationRate - previousMonthParticipationRate) /
            previousMonthParticipationRate) *
          100
        ).toFixed(2);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setInfor(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8 text-blue-700">
          Thống Kê Hoạt Động CLB
        </h1>

        {/* Dropdown chọn tháng */}
        <div className="mb-6">
          <label htmlFor="month" className="mr-2 font-medium">
            Chọn tháng:
          </label>
          <select
            id="month"
            value={selectedMonth}
            onChange={handleMonthChange}
            className="px-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:ring focus:ring-blue-500"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((month) => (
              <option key={month} value={month}>
                Tháng {month}
              </option>
            ))}
          </select>
        </div>
         {/* Export Section */}
         <div className="mb-6 flex items-center">
          <label htmlFor="export-option" className="mr-2 font-medium">
            Xuất dữ liệu:
          </label>
          <select
            id="export-option"
            value={exportOption}
            onChange={(e) => setExportOption(e.target.value)}
            className="px-4 py-2 rounded-md border border-gray-300 mr-4 focus:outline-none focus:ring focus:ring-blue-500"
          >
            <option value="all">Xuất tất cả</option>
            <option value="activities">Xuất hoạt động</option>
            <option value="participation">Xuất tỷ lệ tham gia</option>
          </select>
          <button
            onClick={handleExport}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
          >
            Xuất Excel
          </button>
        </div>

        {/* Tổng quan về các loại hoạt động */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-600">Hội thảo</h3>
            <p className="text-2xl font-bold text-blue-600">
              {groupedActivities.seminar.length}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-600">Đào tạo</h3>
            <p className="text-2xl font-bold text-blue-600">
              {groupedActivities.training.length}
            </p>
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4 text-center">
            <h3 className="text-lg font-semibold text-gray-600">Cuộc thi</h3>
            <p className="text-2xl font-bold text-blue-600">
              {groupedActivities.contest.length}
            </p>
          </div>
        </div>

        {/* Biểu đồ phân bố các loại hoạt động */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Phân Bố Các Loại Hoạt Động</h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={[
                  { name: "Hội thảo", value: groupedActivities.seminar.length },
                  { name: "Đào tạo", value: groupedActivities.training.length },
                  { name: "Cuộc thi", value: groupedActivities.contest.length },
                ]}
                dataKey="value"
                cx="50%"
                cy="50%"
                labelLine={false}
                outerRadius={80}
                fill="#8884d8"
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
              >
                <Cell fill="#0088FE" />
                <Cell fill="#00C49F" />
                <Cell fill="#FFBB28" />
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        {/* Thống kê tỷ lệ tham gia
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Tỷ Lệ Tham Gia Hoạt Động</h2>
          <p className="text-lg">Tỷ lệ tham gia trong tháng {selectedMonth}: {participationRate.toFixed(2)}%</p>
        </div> */}

        {/* Thống kê hoạt động được đăng ký tham gia nhiều nhất */}
        {mostRegisteredActivity.registeredNumber > 0 && (
          <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
            <h2 className="text-xl font-semibold mb-4">
              Hoạt Động Được Đăng Ký Tham Gia Nhiều Nhất
            </h2>
            <p className="text-lg">Tên hoạt động: {mostRegisteredActivity.name}</p>
            <p className="text-lg">
              Loại hoạt động: {mostRegisteredActivity.activityType==="TRAINING"? "Đào tạo": mostRegisteredActivity.activityType==="SEMINAR"? "Hội thảo": "Cuộc thi"}
            </p>
            <p className="text-lg">
              Số lượng tham gia: {mostRegisteredActivity.registeredNumber}
            </p>
          </div>
        )}
        {/* Thống kê số lượng người tham gia
         <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Số Lượng Người Mới Tham Gia Trong Tháng</h2>
          <p className="text-lg">Tổng số lượng người tham gia CLB trong tháng {selectedMonth}: {registeredUsers}</p>
        </div> */}

        {/* So sánh với tháng trước */}
        {/* So sánh số hoạt động */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">So Sánh Số Lượng Hoạt Động</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-lg">
                Số hoạt động tháng {selectedMonth}: {currentMonthActivityCount}
              </p>
              <p className="text-lg">
                Số hoạt động tháng trước: {previousMonthActivityCount}
              </p>
            </div>
            <div
              className={`text-lg font-bold ${
                parseFloat(activityCountChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(activityCountChange) >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(parseFloat(activityCountChange))}%
            </div>
          </div>
        </div>

        {/* So sánh số thành viên mới */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">So Sánh Số Thành Viên Mới</h2>
          <div className="flex justify-between">
            <div>
              <p className="text-lg">
                Số thành viên mới tháng {selectedMonth}: {registeredUsers}
              </p>
              <p className="text-lg">
                Số thành viên mới tháng trước: {previousMonthRegisteredUsers}
              </p>
            </div>
            <div
              className={`text-lg font-bold ${
                parseFloat(memberCountChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(memberCountChange) >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(parseFloat(memberCountChange))}%
            </div>
          </div>
        </div>

        {/* So sánh tỷ lệ tham gia */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            So Sánh Tỷ Lệ Tham Gia Hoạt Động
          </h2>
          <div className="flex justify-between">
            <div>
              <p className="text-lg">
                Tỷ lệ tham gia tháng {selectedMonth}: {participationRate.toFixed(2)}%
              </p>
              <p className="text-lg">
                Tỷ lệ tham gia tháng trước:{" "}
                {previousMonthParticipationRate.toFixed(2)}%
              </p>
            </div>
            <div
              className={`text-lg font-bold ${
                parseFloat(participationRateChange) >= 0
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {parseFloat(participationRateChange) >= 0 ? "▲" : "▼"}{" "}
              {Math.abs(parseFloat(participationRateChange))}%
            </div>
          </div>
        </div>

        {/* Biểu đồ tỷ lệ tham gia của từng loại hoạt động */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Biểu Đồ Tỷ Lệ Tham Gia Theo Loại Hoạt Động
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={participationRateData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis unit="%" />
              <Tooltip />
              <Legend />
              <Bar dataKey="rate" fill="#82ca9d" name="Tỷ lệ tham gia">
                {participationRateData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={["#0088FE", "#00C49F", "#FFBB28"][index]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Biểu đồ người dùng tham gia nhiều nhất */}
        <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">
            Biểu Đồ Thành Viên Tham Gia Nhiều Nhất Trong Tháng
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart
              data={transformedTopUsers}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
            >
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar
                dataKey="participationCount"
                fill="#8884d8"
                name="Số lượng tham gia"
                onClick={(data) => {
                  handleUserClick(data.name);
                }}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Bảng chi tiết các hoạt động */}
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-4">
            Chi Tiết Hoạt Động Tháng {selectedMonth}
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="p-2 border text-left">Tên Hoạt Động</th>
                  <th className="p-2 border text-left">Loại Hoạt Động</th>
                  <th className="p-2 border text-left">Ngày Diễn Ra</th>
                  <th className="p-2 border text-left">Người Tổ Chức</th>
                  <th className="p-2 border text-right">Trạng Thái</th>
                </tr>
              </thead>
              <tbody>
                {activities
                  .filter((activity) => {
                    const activityMonth =
                      new Date(activity.occurDate).getMonth() + 1;
                    return activityMonth === selectedMonth;
                  })
                  .map((activity) => (
                    <tr key={activity.activityId}>
                      <td className="p-2 border font-medium">{activity.name}</td>
                      {/* loại thi convert sang tiếng việt */}
                      <td className="p-2 border">
                        {activity.activityType === "SEMINAR"
                          ? "Hội thảo"
                          : activity.activityType === "TRAINING"
                          ? "Đào tạo"
                          : "Cuộc thi"}
                      </td>
                      <td className="p-2 border">
                        {new Date(activity.occurDate).toLocaleDateString()}
                      </td>
                      <td className="p-2 border">{activity.hostName}</td>
                      {/* convert status sang tiếng việt */}
                      {/* IN_COMING,
                      OPEN_NOW,
                      CLOSED,
                      CANCELED,
                      FINISHED, */}
                      <td className="p-2 border text-right">
                        {activity.activityStatus === "IN_COMING"
                          ? "Sắp diễn ra"
                          : activity.activityStatus === "OPEN_NOW"
                          ? "Đang diễn ra"
                          : activity.activityStatus === "CLOSED"
                          ? "Đã đóng"
                          : activity.activityStatus === "CANCELED"
                          ? "Đã hủy"
                          : activity.activityStatus === "FINISHED"
                          ? "Đã kết thúc"
                          : ""}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Modal isOpen={isModalOpen} onClose={handleCloseModal} user={infor} />
    </div>
  );
};

export default AdminDashboard;
