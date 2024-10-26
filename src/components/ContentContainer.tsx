import { Home } from "@mui/icons-material";
import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import AdminMemberBoard from "./admin/AdminMemberBoard";

interface ContentContainerProps {
  sidebarOpen: boolean;
  activeContent: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  sidebarOpen,
  activeContent,
}) => {
  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <AdminDashboard />;
      case "members":
        return <AdminMemberBoard />;
      default:
        return <AdminDashboard />;
    }
  };

  return (
    <div>
      <div className="text-2xl font-bold mb-4 flex justify-between items-end">
        <div className="flex items-end">
          <Home />
          <span className="text-sm ml-2">Dashboard</span>
        </div>
        <button className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded-full text-sm">
          Đăng xuất
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default ContentContainer;
