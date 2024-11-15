import { Search } from "@mui/icons-material";

interface ActivityFilterAndSearchProps {
  onChangePageSize: (pageSize: number) => void;
}

const ActivityFilterAndSearch: React.FC<ActivityFilterAndSearchProps> = ({
  onChangePageSize,
}) => {
  return (
    <div className="bg-white rounded-lg mb-2">
      <div className="flex flex-wrap gap-4">
        <select
          className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 text-sm"
          onChange={(e) => onChangePageSize(Number(e.target.value))}
        >
          <option value={10}>10 per page</option>
          <option value={25}>25 per page</option>
          <option value={50}>50 per page</option>
          <option value={100}>100 per page</option>
        </select>

        <select className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-10 text-sm">
          <option>All Categories</option>
          <option>Technology</option>
          <option>Business</option>
          <option>Design</option>
        </select>
        <select className="px-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm">
          <option>All Status</option>
          <option>Upcoming</option>
          <option>Registration Open</option>
          <option>Completed</option>
        </select>
        <div className="flex-1 min-w-[200px]">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 " />
            <input
              type="text"
              placeholder="Search activities..."
              className="w-2/3 pl-10 pr-4 py-2 border-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm h-10"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActivityFilterAndSearch;
