import {
  AcademicCapIcon,
  ArrowRightIcon,
  BookOpenIcon,
  CalendarIcon,
  CodeBracketIcon,
  TrophyIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

const HomeMembers = () => {
  const upcomingEvents = [
    {
      title: "Hackathon 2024",
      date: "20 Nov 2024",
      description: "48 giờ coding không ngừng nghỉ",
    },
    {
      title: "Workshop React Advanced",
      date: "25 Nov 2024",
      description: "Học React hooks và performance optimization",
    },
    {
      title: "Competitive Programming",
      date: "30 Nov 2024",
      description: "Giải thuật và cấu trúc dữ liệu nâng cao",
    },
  ];

  const stats = [
    { title: "Thành viên", value: "150+", icon: UsersIcon },
    { title: "Dự án", value: "25", icon: CodeBracketIcon },
    { title: "Khóa học", value: "12", icon: BookOpenIcon },
    { title: "Giải thưởng", value: "8", icon: TrophyIcon },
  ];

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl p-8 text-white">
        <div className="max-w-4xl">
          <h1 className="text-4xl font-bold mb-4">
            Chào mừng đến với CLB Tài năng lập trình TSEClub
          </h1>
          <p className="text-lg opacity-90 mb-6">
            Nơi kết nối đam mê công nghệ và phát triển kỹ năng lập trình chuyên
            nghiệp
          </p>
          <button className="flex items-center bg-white text-blue-600 px-6 py-2 rounded-lg font-medium hover:bg-opacity-90 transition-colors">
            Tham gia hoạt động ngay
            <ArrowRightIcon className="ml-2 h-4 w-4" />
          </button>
        </div>
        <div className="absolute right-8 bottom-8 opacity-10">
          <CodeBracketIcon className="h-40 w-40" />
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-blue-100 rounded-xl">
                  <Icon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-500">{stat.title}</p>
                  <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Upcoming Events */}
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <CalendarIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Sự kiện sắp diễn ra
              </h2>
            </div>
            <p className="text-gray-500">Các hoạt động và sự kiện trong tháng</p>
          </div>

          <div className="space-y-4">
            {upcomingEvents.map((event, index) => (
              <div
                key={index}
                className="flex items-start space-x-4 p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex-shrink-0 w-16 h-16 bg-blue-100 rounded-lg flex items-center justify-center">
                  <p className="text-blue-600 font-medium text-sm text-center">
                    {event.date.split(" ")[0]}
                    <br />
                    {event.date.split(" ")[1]}
                  </p>
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">{event.title}</h3>
                  <p className="text-sm text-gray-500">{event.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learning Paths */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <div className="mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <AcademicCapIcon className="h-5 w-5 text-blue-600" />
              <h2 className="text-xl font-semibold text-gray-900">
                Lộ trình học tập
              </h2>
            </div>
            <p className="text-gray-500">Các khóa học dành cho thành viên</p>
          </div>

          <div className="space-y-4">
            {[
              { title: "Web Development", level: "Cơ bản", students: 45 },
              { title: "Data Structures", level: "Trung cấp", students: 32 },
              { title: "Mobile Apps", level: "Nâng cao", students: 28 },
            ].map((course, index) => (
              <div
                key={index}
                className="p-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-900">{course.title}</h3>
                    <p className="text-sm text-gray-500">Cấp độ: {course.level}</p>
                  </div>
                  <span className="text-sm text-gray-400">
                    {course.students} học viên
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeMembers;
