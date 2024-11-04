import React from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AdminPage from "./modules/administration/Administration";
import { Login } from "./modules/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import AdminMemberBoard from "./components/admin/AdminMemberBoard";
import AdminActivityDashboard from "./components/admin/AdminActivityDashboard";
import AdminGroupDashboard from "./components/admin/AdminGroupDashboard";

interface ProtectedRouteProps {
  children: React.ReactNode;
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  children,
  isAuthenticated,
}) => {
  if (!isAuthenticated) {
    return <Navigate to="/" />;
  }

  return <>{children}</>;
};

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="admin"
          element={
            <ProtectedRoute isAuthenticated={true}>
              <AdminPage />
            </ProtectedRoute>
          }
        >
          <Route path="" index element={<AdminDashboard />} />
          <Route path="dashboard" element={<AdminDashboard />} />
          <Route path="members" element={<AdminMemberBoard />} />
          <Route path="activities" element={<AdminActivityDashboard />} />
          <Route path="groups" element={<AdminGroupDashboard />} />
          {/* <Route path="qnas" element={<Admin />} /> */}
          <Route path="*" element={<Navigate to="/" />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
