import { ActivityType } from "../../../shared/models/enums/activity.enum";

interface ActivityFilterBarProps {
  onChangePageSize: (pageSize: number) => void;
}

const ActivityFilterBar: React.FC<ActivityFilterBarProps> = ({
  onChangePageSize,
}) => {
  return (
    <div className="bg-white rounded-lg">
      <div className="flex flex-wrap gap-4">
        <div>
          <span>Số lượng:&nbsp;</span>
          <select
            className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 text-sm cursor-pointer"
            onChange={(e) => onChangePageSize(Number(e.target.value))}
          >
            <option value={5}>5 per page</option>
            <option value={10}>10 per page</option>
            <option value={25}>25 per page</option>
            <option value={50}>50 per page</option>
            <option value={100}>100 per page</option>
          </select>
        </div>

        <div>
          <span>Loại HĐ:&nbsp;</span>
          <select className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-full text-sm cursor-pointer">
            {Object.entries(ActivityType)
              .filter(([key]) => isNaN(Number(key)))
              .map(([key, value]) => {
                return (
                  <option key={key} value={key as keyof typeof ActivityType}>
                    {
                      {
                        CONTEST: "Cuộc thi",
                        SEMINAR: "Hội thảo",
                        TRAINING: "Đào tạo",
                      }[key as keyof typeof ActivityType]
                    }
                  </option>
                );
              })}
          </select>
        </div>
        <div>
          <span>Sắp xếp theo:&nbsp;</span>
          <select className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-full text-sm cursor-pointer">
            <option>Tên hoạt động</option>
            <option>Địa điểm</option>
            <option>Ngày tổ chức</option>
            <option>Completed</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilterBar;
