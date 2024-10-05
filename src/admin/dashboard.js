import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

// Import các component bạn muốn render
import HomePage from '../component/HomePage';
import UserManagement from '../component/UserManagement';
// quản lý nhóm
import CreateGroup from '../component/CreateGroup';
import DeleteGroup from '../component/DeleteGroup';
import GroupInformation from '../component/GroupInformation';
// quản lý người dùng
import CreateUser from '../component/CreateUser';
import ClubLeaveApproval from '../component/ClubLeaveApproval';
import Decentralization from '../component/Decentralization';
import Search from '../component/Search';
import EditInformation from '../component/EditInformation';
import ApproveLoginForm from '../component/ApproveLoginForm';
// quản lý hoạt động
import AddActivity from '../component/AddActivity';
import DeleteActivity from '../component/DeleteActivity';
import EditActivityInformation from '../component/EditActivityInformation';
import ViewActivityInformation from '../component/ViewActivityInformation';
import AssignActivity from '../component/AssignActivity';
import EndOfOperation from '../component/EndOfOperation';
import Invite from '../component/Invite';
import StatisticalAnalysis from '../component/StatisticalAnalysis';



const drawerWidth = 240;

const Dashboard = () => {
  // Tạo một trạng thái để lưu component hiện tại
  const [selectedComponent, setSelectedComponent] = useState('Home');
  // tạo trang thái riêng để kiểm soát menu
  const [isGroupManagementOpen, setIsGroupManagementOpen] = useState(false);
  const [isUserManagementOpen, setIsUserManagementOpen] = useState(false);
  const [isActivityManagementOpen, setIsActivityManagementOpen] = useState(false);
 

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

  // Hàm để render component dựa trên trạng thái
  const renderSelectedComponent = () => {
    switch (selectedComponent) {
      // quản lý nhóm
      case 'CreateGroup':
        return <CreateGroup />;
      case 'GroupInformation':
        return <GroupInformation />;
      case 'UserManagement':
        return <UserManagement />;
      case 'DeleteGroup':
        return <DeleteGroup />;  
      // quản lý người dùng  
      case 'CreateUser':
        return <CreateUser />;
      case 'ClubLeaveApproval':
        return <ClubLeaveApproval />;
      case 'Decentralization':
        return <Decentralization />;
      case 'Search':
        return <Search />;
      case 'EditInformation':
        return <EditInformation />;
      case 'ApproveLoginForm':
        return <ApproveLoginForm />;     
       // quản lý hoạt động
       case 'AddActivity':
        return <AddActivity />;
      case 'DeleteActivity':
        return <DeleteActivity />;
      case 'EditActivityInformation':
        return <EditActivityInformation />;
      case 'ViewActivityInformation':
        return <ViewActivityInformation />;
      case 'AssignActivity':
        return <AssignActivity />;
      case 'EndOfOperation':
        return <EndOfOperation />;
      case 'Invite':
        return <Invite />;
      case 'StatisticalAnalysis':
        return <StatisticalAnalysis />;  

      default:
        return <HomePage />; // Trang mặc định khi không có component được chọn
    }
  };

  return (
    <Box  sx={{ display: 'flex' }} >
      {/* Drawer (menu bên trái) */}
      <Drawer
        
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: drawerWidth,
            boxSizing: 'border-box',
          },
        }}
        variant="permanent"
        anchor="left"
      >
        <List className= 'bg-emerald-500 text-white rounded-lg shadow-lg '  >
          <ListItem button onClick={toggleGroupManagementMenu}>
            <ListItemText primary="Quản lý nhóm" />
          </ListItem>
          {isGroupManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('GroupInformation')}  
              >
                <ListItemText primary="Xem thông tin nhóm" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('CreateGroup')}
              >
                <ListItemText primary="Tạo nhóm" /> 
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('DeleteGroup')}
              >
                <ListItemText primary="Xóa nhóm" />
              </ListItemButton>
            </List>
          )}
          <Divider />
          <ListItem button onClick={toggleUserManagementMenu}>
            <ListItemText primary="Quản lý người dùng" />
           
          </ListItem>
          {isUserManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('CreateUser')}
              >
                <ListItemText primary="Tạo người dùng" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('Search')}
              >
                <ListItemText primary="Tìm kiếm người dùng"     
                />  
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('EditInformation')}
              >
                <ListItemText primary="Chỉnh sửa thông tin" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('ClubLeaveApproval')}
              >
                <ListItemText primary="Duyệt xin rời câu lạc bộ" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('Decentralization')}
              > 
                <ListItemText primary="Phân quyền" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('ApproveLoginForm')}
              >
                <ListItemText primary="Duyệt form đăng ký" />
              </ListItemButton>

            </List>

          )}
          <Divider />
          {/* // quản lý hoạt động
           */}
          <ListItem tutton onClick={toggleActivityManagementMenu}>
            <ListItemText primary="Quản lý hoạt động" />
          </ListItem>
          {isActivityManagementOpen && (
            <List component="div" disablePadding>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('AddActivity')}
              >
                <ListItemText primary="Thêm hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('DeleteActivity')}
              >
                <ListItemText primary="Xóa hoạt động" />
              </ListItemButton>

              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('EditActivityInformation')}
              >
                <ListItemText primary="Sửa thông tin hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('ViewActivityInformation')}
              >
                <ListItemText primary="Xem thông tin hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('AssignActivity')}

              >
                <ListItemText primary="Gán hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('EndOfOperation')}
              >
                <ListItemText primary="Kết thúc hoạt động" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('Invite')}
              >
                <ListItemText primary="Mời tham gia" />
              </ListItemButton>
              <ListItemButton
                sx={{ pl: 4 }}
                onClick={() => setSelectedComponent('StatisticalAnalysis')}
              >
                <ListItemText primary="Phân tích thống kê" />
              </ListItemButton>
              


            </List>
          )}

          <Divider /> 


        </List>
      </Drawer>

      {/* Nội dung bên phải thay đổi dựa trên component được chọn */}
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
      >
        {renderSelectedComponent()}
      </Box>
    </Box>
  );
};

export default Dashboard;
