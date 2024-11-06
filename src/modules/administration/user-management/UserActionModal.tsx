import { Person } from "@mui/icons-material";
import { useState } from "react";
import { IUser } from "../../../shared/models/user.model";

interface UserActionModalProps {
  selectedUser: IUser | null;
  setSelectedUser: () => void;
  isOpen: boolean;
  onClose: () => void;
}

const UserActionModal: React.FC<UserActionModalProps> = ({
  isOpen,
  onClose,
  selectedUser,
  setSelectedUser,
}) => {
  const tabs = [
    { id: "information", label: "Basic Information" },
    { id: "personal", label: "Personal Information" },
    { id: "contact", label: "Contact Information" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
  ];

  const handleClose = () => {
    setSelectedUser();
    onClose();
  };

  const [activeTab, setActiveTab] = useState<string>("information");
  if (!isOpen || selectedUser === null) return null;
  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity" />
      {/* Modal */}
      <div className="flex min-h-full items-start justify-center p-4">
        <div className="relative w-full max-w-4xl rounded-lg bg-white shadow-xl">
          {/* Header */}
          <>
            <div className="bg-blue-600 text-white rounded-t-lg">
              <div className="flex items-center justify-between px-6 py-4">
                <h3 className="text-lg font-semibold">Member Profile</h3>
              </div>

              {/* Profile Header */}
              <div className="px-6 pb-4 flex justify-between">
                <div className="flex items-center space-x-4">
                  <div className="h-16 w-16 rounded-full bg-white flex items-center justify-center">
                    <Person className="h-12 w-12 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">
                      {selectedUser.firstName + selectedUser.lastName}
                    </h3>
                    <div className="text-sm flex items-end">
                      Member ID: &nbsp;
                      <p className="text-blue-500 font-medium text-sm bg-white border rounded px-2">
                        {selectedUser.userId}
                      </p>
                    </div>
                    <p className="text-blue-100 text-sm">
                      Email: {selectedUser.email}
                    </p>
                  </div>
                </div>
                <div className="border rounded h-full p-1 font-bold text-base">
                  {
                    {
                      null: "",
                      ACTIVE: "ACTIVE",
                      IN_ACTIVE: "INACTIVE",
                      LEFT_REQUEST: "LEFT REQUEST",
                      PENDING_APPROVAL: "PENDING APPROVAL",
                      TERMINATED: "TERMINATED",
                    }[selectedUser.status ?? "null"]
                  }
                </div>
              </div>

              {/* Tabs */}
              <div className="flex space-x-1 px-6 justify-between">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-4 py-2 rounded-t-lg font-medium transition-colors
                              ${
                                activeTab === tab.id
                                  ? "bg-white text-blue-600"
                                  : "text-blue-100 hover:bg-blue-700"
                              }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>
          </>

          {/* Content */}
          <div className="px-6 py-4">Hello</div>
          <div className="px-6 py-4">Hello</div>

          <div className="px-6 py-4">Hello</div>
          <div className="px-6 py-4">Hello</div>
          <div className="px-6 py-4">Hello</div>
          <div className="px-6 py-4">Hello</div>
          <div className="px-6 py-4">Hello</div>

          {/* Footer */}
          <div className="flex justify-end gap-2 border-t px-6 py-4">
            <button
              onClick={handleClose}
              className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserActionModal;
