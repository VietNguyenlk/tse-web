import { Home, PowerSettingsNewOutlined } from "@mui/icons-material";
import React from "react";
import AdminDashboard from "./admin/AdminDashboard";
import AdminMemberBoard from "./admin/AdminMemberBoard";
import AdminActivityDashboard from "./admin/AdminActivityDashboard";
import AdminGroupDashboard from "./admin/AdminGroupDashboard";

interface ContentContainerProps {
  activeContent: string;
}

const ContentContainer: React.FC<ContentContainerProps> = ({ activeContent }) => {
  const renderContent = () => {
    switch (activeContent) {
      case "dashboard":
        return <AdminDashboard />;
      case "members":
        return <AdminMemberBoard />;
      case "activities":
        return <AdminActivityDashboard />;
      case "groups":
        return <AdminGroupDashboard />;
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
        <button className="flex space-x-1.5 items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded-full text-sm">
          <PowerSettingsNewOutlined />
          <p>Đăng xuất</p>
        </button>
      </div>

      {renderContent()}
    </div>
  );
};

export default ContentContainer;
