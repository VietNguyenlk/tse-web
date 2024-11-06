import { useState } from "react";
import TopHeader from "../../components/headers/TopHeader";
import AdminSideBar from "../../components/sidebars/AdminSidebar";
import { Outlet, useNavigate } from "react-router-dom";
import { Home, PowerSettingsNewOutlined } from "@mui/icons-material";
import { useAppDispatch } from "../../configs/store";
import { logout } from "../auth/authentication.reducer";

const AdminPage: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

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
                <span className="text-sm ml-2">Dashboard</span>
              </div>
              <button
                onClick={handleLogout}
                className="flex space-x-1.5 items-center bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-1 px-2 border border-blue-500 hover:border-transparent rounded-full text-sm"
              >
                <PowerSettingsNewOutlined />
                <p>Đăng xuất</p>
              </button>
            </div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
