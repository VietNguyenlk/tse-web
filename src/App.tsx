import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AdminActivityManagement from "./modules/administration/activity-management/AdminActivityManagement";
import AdminPage from "./modules/administration/Administration";
import AdminBudgetManagement from "./modules/administration/budget-management/AdminBudgetManagement";
import AdminDashboard from "./modules/administration/dashboard/AdminDashBoard";
import AdminForumManagement from "./modules/administration/forum-management/AdminForumManagement";
import AdminGroupManagement from "./modules/administration/group-management/AdminGroupManagement";
import { Login } from "./modules/auth/Login";
import ProtectedRoute from "./modules/auth/ProtectedRoute";
import { Home } from "./modules/home/Home";
import NotFoundPage from "./NotFoundPage";
import AdminUserManagement from "./modules/administration/user-management/AdminUserManagement";
import RegisterPage from "./modules/account/register/RegisterPage";
import ForgotPasswordForm from "./modules/account/forgotpass/ForgotPasswordForm";
import QuestionDetails from "./modules/administration/forum-management/questions/QuestionDetails";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="register" element={<RegisterPage></RegisterPage>} />
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
          <Route path="forum" element={<AdminForumManagement />}></Route>
          <Route path="forum/:questionId" element={<QuestionDetails />} />
        </Route>
        {/* New route for QuestionDetails accessible to all users */}
        <Route path="questions/:questionId" element={<QuestionDetails />} />
        <Route path="home" element={<Home />} />
        
        <Route path="*" element={<NotFoundPage />} />
        <Route path="forgot-password" element={<ForgotPasswordForm />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
