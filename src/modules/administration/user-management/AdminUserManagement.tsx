import { useState } from "react";
import AllMemberBoard from "./users/AllMemberBoard";
import AllRolesBoard from "./roles/AllRolesBoard";
import RegisterRequestsBoard from "./register-requests/RegisterRequestsBoard";
import AdminHeader from "../../../components/headers/AdminHeader";
import ExitRequestsBoard from "./exit-requests/ExitRequestsBoard";

const AdminUserManagement: React.FC = () => {
  const [activeHeader, setActiveHeader] = useState<string>("members");

  const renderBoard = () => {
    switch (activeHeader) {
      case "members":
        return <AllMemberBoard />;
      case "roles":
        return <AllRolesBoard />;
      case "register-requests":
        return <RegisterRequestsBoard />;
      case "exit-requests":
        return <ExitRequestsBoard />;
      default:
        return <AllMemberBoard />;
    }
  };

  return (
    <>
      <AdminHeader activeHeader={activeHeader} setActiveHeader={setActiveHeader} />
      <div className="bg-white mt-3 rounded ">{renderBoard()}</div>
    </>
  );
};

export default AdminUserManagement;
