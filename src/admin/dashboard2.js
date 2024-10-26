import React, { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Divider from "@mui/material/Divider";

// Import các component bạn muốn render
import HomePage from "../components/HomePage";
import UserManagement from "../components/UserManagement";
// quản lý nhóm
import CreateGroup from "../components/CreateGroup";
import DeleteGroup from "../components/DeleteGroup";
import GroupInformation from "../components/GroupInformation";
// quản lý người dùng
import CreateUser from "../components/CreateUser";
import ClubLeaveApproval from "../components/ClubLeaveApproval";
import Decentralization from "../components/Decentralization";
import Search from "../components/Search";
import EditInformation from "../components/EditInformation";
import ApproveLoginForm from "../components/ApproveLoginForm";
// quản lý hoạt động
import AddActivity from "../components/AddActivity";
import DeleteActivity from "../components/DeleteActivity";
import EditActivityInformation from "../components/EditActivityInformation";
import ViewActivityInformation from "../components/ViewActivityInformation";
import AssignActivity from "../components/AssignActivity";
import EndOfOperation from "../components/EndOfOperation";
import Invite from "../components/Invite";
import StatisticalAnalysis from "../components/StatisticalAnalysis";
// quản lý điểm tích lũy
import EditPoints from "../components/EditPoints";
import AddPoints from "../components/AddPoints";
import ScoreReportAnalysis from "../components/ScoreReportAnalysis";
import AssignCumulativePoints from "../components/AssignCumulativePoints";
// quản lý điểm danh
import ViewAttendanceList from "../components/ViewAttendanceList";
import FilterAttendanceList from "../components/FilterAttendanceList";
import TakeAttendance from "../components/TakeAttendance";
import EditAttendance from "../components/EditAttendance";
import AttendanceLock from "../components/AttendanceLock";
import AttendanceReportStatistics from "../components/AttendanceReportStatistics";
// cấu hình nhóm
import AddTeamMember from "../components/configGroup/AddTeamMember";
import RemoveMember from "../components/configGroup/RemoveMember";
import RemovePermissions from "../components/configGroup/RemovePermissions";
import SelectTeamLeader from "../components/configGroup/SelectTeamLeader";
import GrantPermissions from "../components/configGroup/GrantPermissions";
import EditMember from "../components/configGroup/EditMember";
import ViewMember from "../components/configGroup/ViewMember";

const drawerWidth = 240;

const Dashboard2 = () => {
  // Tạo một trạng thái để lưu component hiện tại
  const [selectedComponent, setSelectedComponent] = useState("Home");
  // tạo trang thái riêng để kiểm soát menu
  const [isGroupManagementOpen, setIsGroupManagementOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isActivityManagementOpen, setIsActivityManagementOpen] = useState(false);
  const [isPointManagementOpen, setIsPointManagementOpen] = useState(false);
  const [isAttendanceManagementOpen, setIsAttendanceManagementOpen] =
    useState(false);
  const [isConfigGroupOpen, setIsConfigGroupOpen] = useState(false);

  const toggleGroupManagementMenu = () => {
    setIsGroupManagementOpen(!isGroupManagementOpen);
    //setIsUserManagementOpen(false); // Đóng menu người dùng khi mở menu nhóm
  };

  const toggleUserManagementMenu = () => {
    setIsUserManagementOpen(!isUserManagementOpen);
    // setIsGroupManagementOpen(false); // Đóng menu nhóm khi mở menu người dùng
  };

  const toggleActivityManagementMenu = () => {
    setIsActivityManagementOpen(!isActivityManagementOpen);
    // setIsGroupManagementOpen(false); // Đóng menu nhóm khi mở menu người dùng
  };

  const togglePointManagementMenu = () => {
    setIsPointManagementOpen(!isPointManagementOpen);
    // setIsGroupManagementOpen(false); // Đóng menu nhóm khi mở menu người dùng
  };

  const toggleAttendanceManagementMenu = () => {
    setIsAttendanceManagementOpen(!isAttendanceManagementOpen);
    // setIsGroupManagementOpen(false); // Đóng menu nhóm khi mở menu người dùng
  };

  const toggleConfigGroupMenu = () => {
    setIsConfigGroupOpen(!isConfigGroupOpen);
    // setIsGroupManagementOpen(false); // Đóng menu nhóm khi mở menu người dùng
  };

  // Hàm để render component dựa trên trạng thái
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      // quản lý nhóm
      case "CreateGroup":
        return <CreateGroup />;
      case "GroupInformation":
        return <GroupInformation />;
      case "UserManagement":
        return <UserManagement />;
      case "DeleteGroup":
        return <DeleteGroup />;
      // quản lý người dùng
      case "CreateUser":
        return <CreateUser />;
      case "ClubLeaveApproval":
        return <ClubLeaveApproval />;
      case "Decentralization":
        return <Decentralization />;
      case "Search":
        return <Search />;
      case "EditInformation":
        return <EditInformation />;
      case "ApproveLoginForm":
        return <ApproveLoginForm />;
      // quản lý hoạt động
      case "AddActivity":
        return <AddActivity />;
      case "DeleteActivity":
        return <DeleteActivity />;
      case "EditActivityInformation":
        return <EditActivityInformation />;
      case "ViewActivityInformation":
        return <ViewActivityInformation />;
      case "AssignActivity":
        return <AssignActivity />;
      case "EndOfOperation":
        return <EndOfOperation />;
      case "Invite":
        return <Invite />;
      case "StatisticalAnalysis":
        return <StatisticalAnalysis />;
      // quản lý điểm tích lũy
      case "EditPoints":
        return <EditPoints />;
      case "AddPoints":
        return <AddPoints />;
      case "ScoreReportAnalysis":
        return <ScoreReportAnalysis />;
      case "AssignCumulativePoints":
        return <AssignCumulativePoints />;
      // quản lý điểm danh
      case "ViewAttendanceList":
        return <ViewAttendanceList />;
      case "FilterAttendanceList":
        return <FilterAttendanceList />;
      case "TakeAttendance":
        return <TakeAttendance />;
      case "EditAttendance":
        return <EditAttendance />;
      case "AttendanceLock":
        return <AttendanceLock />;
      case "AttendanceReportStatistics":
        return <AttendanceReportStatistics />;
      // cấu hình nhóm
      case "AddTeamMember":
        return <AddTeamMember />;
      case "RemoveMember":
        return <RemoveMember />;
      case "RemovePermissions":
        return <RemovePermissions />;
      case "SelectTeamLeader":
        return <SelectTeamLeader />;
      case "GrantPermissions":
        return <GrantPermissions />;
      case "EditMember":
        return <EditMember />;
      case "ViewMember":
        return <ViewMember />;

      default:
        return <HomePage />; // Trang mặc định khi không có component được chọn
    }
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* Drawer (menu bên trái) */}
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#2c3e50",
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List className=" text-white rounded-lg shadow-lg ">
          <ListItem onClick={toggleGroupManagementMenu}>
            <ListItemText primary="Quản lý nhóm" />
          </ListItem>
          {isGroupManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("GroupInformation")}
              >
                <ListItemText primary="Xem thông tin nhóm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("CreateGroup")}
              >
                <ListItemText primary="Tạo nhóm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("DeleteGroup")}
              >
                <ListItemText primary="Xóa nhóm" />
              </ListItemButton>
            </List>
          )}
          <Divider />
          <ListItem onClick={toggleUserManagementMenu}>
            <ListItemText primary="Quản lý người dùng" />
          </ListItem>
          {isUserManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("CreateUser")}
              >
                <ListItemText primary="Tạo người dùng" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("Search")}
              >
                <ListItemText primary="Tìm kiếm người dùng" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("EditInformation")}
              >
                <ListItemText primary="Chỉnh sửa thông tin" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("ClubLeaveApproval")}
              >
                <ListItemText primary="Duyệt xin rời câu lạc bộ" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("Decentralization")}
              >
                <ListItemText primary="Phân quyền" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("ApproveLoginForm")}
              >
                <ListItemText primary="Duyệt form đăng ký" />
              </ListItemButton>
            </List>
          )}
          <Divider />
          {/* // quản lý hoạt động
           */}
          <ListItem onClick={toggleActivityManagementMenu}>
            <ListItemText primary="Quản lý hoạt động" />
          </ListItem>
          {isActivityManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AddActivity")}
              >
                <ListItemText primary="Thêm hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("DeleteActivity")}
              >
                <ListItemText primary="Xóa hoạt động" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("EditActivityInformation")}
              >
                <ListItemText primary="Sửa thông tin hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("ViewActivityInformation")}
              >
                <ListItemText primary="Xem thông tin hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AssignActivity")}
              >
                <ListItemText primary="Gán hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("EndOfOperation")}
              >
                <ListItemText primary="Kết thúc hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("Invite")}
              >
                <ListItemText primary="Mời tham gia" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AttendanceReportStatistics")}
              >
                <ListItemText primary="Phân tích thống kê" />
              </ListItemButton>
            </List>
          )}

          <Divider />
          {/* quản lý điểm tích lũy */}
          <ListItem onClick={togglePointManagementMenu}>
            <ListItemText primary="Quản lý điểm tích lũy" />
          </ListItem>
          {isPointManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("EditPoints")}
              >
                <ListItemText primary="Chỉnh sửa điểm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AddPoints")}
              >
                <ListItemText primary="Thêm điểm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("ScoreReportAnalysis")}
              >
                <ListItemText primary="Phân tích báo cáo điểm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AssignCumulativePoints")}
              >
                <ListItemText primary="Gán điểm tích lũy" />
              </ListItemButton>
            </List>
          )}
          <Divider />
          {/* quản lý điểm danh */}
          <ListItem onClick={toggleAttendanceManagementMenu}>
            <ListItemText primary="Quản lý điểm danh" />
          </ListItem>
          {isAttendanceManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("ViewAttendanceList")}
              >
                <ListItemText primary="Xem danh sách điểm danh" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("FilterAttendanceList")}
              >
                <ListItemText primary="Lọc danh sách điểm danh" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("TakeAttendance")}
              >
                <ListItemText primary="Điểm danh" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("EditAttendance")}
              >
                <ListItemText primary="Chỉnh sửa điểm danh" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AttendanceLock")}
              >
                <ListItemText primary="Khóa điểm danh" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AttendaceReportAnalysis")}
              >
                <ListItemText primary="Phân tích báo cáo điểm danh" />
              </ListItemButton>
            </List>
          )}
          <Divider />
          {/* cấu hình nhóm */}
          <ListItem onClick={toggleConfigGroupMenu}>
            <ListItemText primary="Cấu hình nhóm" />
          </ListItem>
          {isConfigGroupOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("AddTeamMember")}
              >
                <ListItemText primary="Thêm thành viên" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("RemoveMember")}
              >
                <ListItemText primary="Xóa thành viên" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("RemovePermissions")}
              >
                <ListItemText primary="Xóa quyền" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("SelectTeamLeader")}
              >
                <ListItemText primary="Chọn trưởng nhóm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("GrantPermissions")}
              >
                <ListItemText primary="Cấp quyền" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("EditMember")}
              >
                <ListItemText primary="Chỉnh sửa thành viên" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent("ViewMember")}
              >
                <ListItemText primary="Xem thành viên" />
              </ListItemButton>
            </List>
          )}

          <Divider />
        </List>
      </Drawer>

      {/* Nội dung bên phải thay đổi dựa trên component được chọn */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
};

// export default Dashboard;
