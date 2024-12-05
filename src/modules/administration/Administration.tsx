import { Home } from "@mui/icons-material";
import { useState } from "react";
import { Outlet } from "react-router-dom";
import TopHeader from "../../components/headers/TopHeader";
import AdminSideBar from "../../components/sidebars/AdminSidebar";

const AdminPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-gray-100">
      <TopHeader />
      <AdminSideBar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className={`flex-1 transition-all duration-300`}>
        <main
          className={` pt-6
          ${sidebarOpen ? "ml-60" : "ml-16"} 
          transition-all 
          duration-300 
          min-h-screen`}
        >
          <div className="p-10">
            <div className="text-2xl font-bold mb-4 flex justify-between items-end">
              <div className="flex items-end">
                <Home />
                <span className="text-sm ml-2">Trang chủ</span>
              </div>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
