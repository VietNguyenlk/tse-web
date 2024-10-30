import { useState } from "react";
import AdminHeader from "./AdminHeader";
import AllMemberBoard from "./members/AllMemberBoard";
import AllRolesBoard from "./members/AllRolesBoard";
import RegisterRequestsBoard from "./members/RegisterRequestsBoard";
import ExitRequestsBoard from "./members/ExitRequestsBoard";

const AdminMemberBoard: React.FC = () => {
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

export default AdminMemberBoard;
