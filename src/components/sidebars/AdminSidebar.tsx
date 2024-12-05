import { Close, Menu, PowerSettingsNewOutlined } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { adminSideBarItems } from "../../configs/admin-configs";
import { useAppDispatch } from "../../configs/store";
import { logout } from "../../modules/auth/authentication.reducer";
interface AdminSideBarProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
}

const AdminSideBar: React.FC<AdminSideBarProps> = ({
  sidebarOpen,
  setSidebarOpen,
}) => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const isActiveRoute = (path: string): boolean => {
    if (
      path === "/admin/dashboard" &&
      (location.pathname === "/admin" || location.pathname === "/admin/")
    ) {
      return true;
    }
    return location.pathname === path;
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <aside
      className={`${sidebarOpen ? "w-60" : "w-14"} 
      fixed 
      left-0 
      top-14 
      bottom-0
      bg-gray-800 
      text-white 
      transition-all 
      duration-300
      flex 
      flex-col`}
    >
      <div className="h-16 flex items-center justify-between pr-4 pl-5 border-b border-gray-700">
        {sidebarOpen && <span className="text-md font-bold">TSEClub</span>}
        <IconButton
          onClick={toggleSidebar}
          size="medium"
          edge="start"
          color="inherit"
          aria-label="toggle sidebar"
        >
          {sidebarOpen ? <Close /> : <Menu />}
        </IconButton>
      </div>

      <div className="flex flex-col justify-between h-full">
        <nav className="mt-4 flex-1 overflow-y-auto">
          {adminSideBarItems.map((item) => (
            <div key={item.id}>
              <Link
                to={item.link}
                className={`w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
                  isActiveRoute(item.link) ? "bg-gray-700 text-white" : ""
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {sidebarOpen && (
                  <>
                    <span>{item.title}</span>
                    {item.submenu && (
                      <span className="ml-auto">
                        <svg
                          className={`w-4 h-4 transition-transform ${
                            isActiveRoute(item.link) ? "transform rotate-180" : ""
                          }`}
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </span>
                    )}
                  </>
                )}
              </Link>
              {/* {sidebarOpen && item.submenu && activeMenu === item.id && (
                <div className="bg-gray-700">
                  {item.submenu.map((subItem) => (
                    <button
                      key={subItem.id}
                      className={`w-full flex items-center px-8 py-2 text-gray-300 hover:bg-gray-600 hover:text-white ${
                        activeContent === subItem.id ? "bg-gray-600 text-white" : ""
                      }`}
                      onClick={() => setActiveContent(subItem.id)}
                    >
                      {subItem.title}
                    </button>
                  ))}
                </div>
              )} */}
            </div>
          ))}
        </nav>

        <button
          onClick={handleLogout}
          className="w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white pb-4"
        >
          <PowerSettingsNewOutlined className="mr-3" />
          {sidebarOpen && <p>Đăng xuất</p>}
        </button>
      </div>
    </aside>
  );
};

export default AdminSideBar;
