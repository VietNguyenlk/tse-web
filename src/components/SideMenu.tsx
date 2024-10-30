import { IconButton } from "@mui/material";
import { useState } from "react";
import { menuItems } from "../configs/components/menuItems.config";
import { Close, Menu } from "@mui/icons-material";
interface MenuSideProps {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;

  activeContent: string;
  setActiveContent: (value: string) => void;
}

const SideMenu: React.FC<MenuSideProps> = ({
  sidebarOpen,
  setSidebarOpen,
  activeContent,
  setActiveContent,
}) => {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const toggleMenu = (menuId: string) =>
    setActiveMenu(activeMenu === menuId ? null : menuId);

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

      <nav className="mt-4 flex-1 overflow-y-auto">
        {menuItems.map((item) => (
          <div key={item.id}>
            <button
              onClick={() => {
                toggleMenu(item.id);
                setActiveContent(item.submenu ? item.submenu[0].id : item.id);
              }}
              className={`w-full flex items-center px-4 py-3 text-gray-300 hover:bg-gray-700 hover:text-white ${
                activeContent === item.id ? "bg-gray-700 text-white" : ""
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
                          activeMenu === item.id ? "transform rotate-180" : ""
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
            </button>
            {sidebarOpen && item.submenu && activeMenu === item.id && (
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
            )}
          </div>
        ))}
      </nav>
    </aside>
  );
};

export default SideMenu;
