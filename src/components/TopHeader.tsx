import { Search } from "@mui/icons-material";

const TopHeader: React.FC = () => {
  return (
    <header className="h-14 bg-white shadow-sm fixed top-0 right-0 left-0 z-20 flex items-center justify-between px-4">
      <div className="flex items-center flex-1">
        <div className="relative w-64">
          <input
            type="text"
            placeholder="Search..."
            className="w-full pl-10 pr-4 py-1 rounded-lg border border-gray-300 focus:outline-none focus:border-blue-500"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-3 top-1.5" />
        </div>
      </div>

      <div className="flex items-center space-x-4 mr-6">
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          {/* <Bell className="w-5 h-5 text-gray-600" /> */}
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          {/* <Settings className="w-5 h-5 text-gray-600" /> */}
        </button>
        <button className="p-2 hover:bg-gray-100 rounded-lg">
          {/* <HelpCircle className="w-5 h-5 text-gray-600" /> */}
        </button>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
            {/* <User className="w-5 h-5 text-gray-600" /> */}
          </div>
          <div className="hidden sm:block text-sm">
            <div className="font-medium">John Doe</div>
            <div className="text-gray-500">Admin</div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default TopHeader;
