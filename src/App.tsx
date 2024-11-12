import React from "react";
import { Navigate, Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { Login } from "./auth/Login";
import AdminPage from "./page/AdminPage";
import MembersPage from "./page/MembersPage";

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
    <Router>
      <div>
        <Routes>
          <Route path="/" element={<Login />} />
          {/* <Route path="/Register" element={<Register/>} />
          <Route path="/Home" element={<Home/>} /> */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute isAuthenticated={true}>
                <AdminPage />
              </ProtectedRoute>
            }
          />
          <Route path="/membersPage" element={<MembersPage/>} />
          {/* <Route path="/button" element={<ButtonPage />} />
          <Route path="/textfield" element={<TextFieldPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/homeAdmin" element={<HomePage />} /> */}
          {/* <Route path="/membersPage" element={<HomeMembers/>} /> */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
