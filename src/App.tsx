import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Roles } from "./configs/constants";
import AdminActivityManagement from "./modules/administration/activity-management/AdminActivityManagement";
import AdminPage from "./modules/administration/Administration";
import AdminBudgetManagement from "./modules/administration/budget-management/AdminBudgetManagement";
import AdminDashboard from "./modules/administration/dashboard/AdminDashBoard";
import AdminForumManagement from "./modules/administration/forum-management/AdminForumManagement";
import AdminGroupManagement from "./modules/administration/group-management/AdminGroupManagement";
import AdminUserManagement from "./modules/administration/user-management/AdminUserManagement";
import { Login } from "./modules/auth/Login";
import ProtectedRoute from "./modules/auth/ProtectedRoute";
import NotFoundPage from "./NotFoundPage";
import { Home } from "./modules/home/Home";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute hasAnyRoles={["admin"]}>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="" index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<AdminUserManagement />} />
          <Route path="activities" element={<AdminActivityManagement />} />
          <Route path="groups" element={<AdminGroupManagement />} />
          <Route path="budget" element={<AdminBudgetManagement />} />
          <Route path="forum" element={<AdminForumManagement />} />
        </Route>
        <Route path="home" element={<Home />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;