import { useState } from "react";
import AllMemberBoard from "../../../components/admin/members/AllMemberBoard";
import AllRolesBoard from "../../../components/admin/members/AllRolesBoard";
import RegisterRequestsBoard from "../../../components/admin/members/RegisterRequestsBoard";
import ExitRequestsBoard from "../../../components/admin/members/ExitRequestsBoard";
import AdminHeader from "../../../components/headers/AdminHeader";

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
