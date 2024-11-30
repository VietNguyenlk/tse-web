import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  HomeIcon,
  UserIcon,
  ChartBarIcon,
  ArrowLeftEndOnRectangleIcon,
  Bars3Icon,
  ChevronLeftIcon,
  ChevronRightIcon,
  QuestionMarkCircleIcon,
  CodeBracketIcon,
} from "@heroicons/react/24/outline";
//import ProfileView from './ProfileView'; // Import ProfileView component
// import { UserEntity } from '../types/entities/user.entity';
import HomeMembers from "../../modules/home/HomeMembers";
import { useAppDispatch } from "../../configs/store";
import { IconButton } from "@mui/material";
import { Close, Menu } from "@mui/icons-material";
// import {Home} from '../../modules/home/Home';
import { IUser } from "../../shared/models/user.model";
import ProfileView from "../../modules/home/profile/ProfileView";
import QA from "../../modules/home/q&a/QA";
import { logout } from "../../modules/auth/authentication.reducer";
import ActivityList from "../../modules/activity/Activity";

interface SideBarMenuMembersProps {
  user: IUser | null;
}

const SideBarMenuMembers: React.FC<SideBarMenuMembersProps> = ({ user }) => {
  const [activeTab, setActiveTab] = useState("home");
  const [isExpanded, setIsExpanded] = useState(true);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  const menuItems = [
    {
      id: "home",
      icon: HomeIcon,
      label: "Home",
      onClick: () => setActiveTab("home"),
    },
    {
      id: "profile",
      icon: UserIcon,
      label: "Thông tin cá nhân",
      onClick: () => setActiveTab("profile"),
    },
    {
      id: "activity",
      icon: ChartBarIcon,
      label: "Hoạt động",
      onClick: () => setActiveTab("activity"),
    },
    // Q&A
    {
      id: "q&a",
      icon: QuestionMarkCircleIcon,
      label: "Hỏi đáp",
      onClick: () => setActiveTab("q&a"),
    },
    {
      id: "logout",
      icon: ArrowLeftEndOnRectangleIcon,
      label: "Đăng xuất",
      onClick: handleLogout,
    },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "profile":
        return user ? <ProfileView user={user} /> : null;
      case "home":
        return <HomeMembers />;
      case "activity":
        return <ActivityList />;
      case "q&a":
        return <QA />;

      default:
        return null;
    }
  };

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="relative">
        {/* Mobile Menu Button */}
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="fixed top-4 left-4 z-50 lg:hidden rounded-lg p-2 bg-gray-800 text-white hover:bg-gray-700"
        >
          <Bars3Icon className="h-6 w-6" />
        </button>

        <div
          className={`fixed top-0 left-0 h-screen bg-gray-800 text-white transition-all duration-300 ease-in-out
              ${isExpanded ? "w-64" : "w-20"}
              ${isExpanded ? "translate-x-0" : "-translate-x-0"}
            `}
        >
          {/* Toggle Button */}
          {/* <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="hidden lg:block absolute -right-3 top-8 bg-gray-800 rounded-full p-1 text-white hover:bg-gray-700"
          >
            {isExpanded ? (
              <ChevronLeftIcon className="h-5 w-5 transition-transform duration-300" />
            ) : (
              <ChevronRightIcon className="h-5 w-5 transition-transform duration-300" />
            )}
          </button> */}

          {/* Logo/Title */}
          <div className="h-16 flex items-center justify-between pr-4 pl-5 border-b border-gray-700">
            {isExpanded && (
              <span className="text-md font-bold flex items-center gap-2 transition-all duration-300 ease-in-out">
                <CodeBracketIcon className="h-10 w-10" /> TSE Club
              </span>
            )}
            <IconButton
              onClick={() => setIsExpanded(!isExpanded)}
              size="medium"
              edge="start"
              color="inherit"
              aria-label="toggle sidebar"
            >
              {isExpanded ? <Close /> : <CodeBracketIcon className="h-10 w-10" />}
            </IconButton>
          </div>

          {/* Menu Items */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {menuItems.map((item) => {
                const Icon = item.icon;
                return (
                  <li key={item.id}>
                    <button
                      onClick={item.onClick}
                      className={`flex w-full items-center rounded-lg px-4 py-3 text-sm font-medium transition-colors
                          ${
                            activeTab === item.id
                              ? "bg-blue-600 text-white"
                              : "text-gray-300 hover:bg-gray-700"
                          }
                          ${!isExpanded ? "justify-center" : ""}`}
                      title={!isExpanded ? item.label : ""}
                    >
                      <Icon className={`h-5 w-5 ${isExpanded ? "mr-3" : ""}`} />
                      {isExpanded && <span>{item.label}</span>}
                    </button>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Footer */}
          <div className="border-t border-gray-700 p-4">
            <div className="flex items-center">
              <div className="h-8 w-8 rounded-full bg-gray-600 flex items-center justify-center">
                <UserIcon className="h-5 w-5 text-gray-300" />
              </div>
              {isExpanded && user && (
                <div className="ml-3">
                  <p className="text-sm font-medium">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="text-xs text-gray-400">{user.email}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div
        className={`flex-1 p-8 transition-all duration-300
            ${isExpanded ? "ml-64" : "ml-20"}
            ${isExpanded ? "lg:ml-64" : "lg:ml-20"}`}
      >
        {renderContent()}
      </div>
    </div>
  );
};

export default SideBarMenuMembers;
