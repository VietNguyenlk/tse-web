import { Person } from "@mui/icons-material";
import { useState } from "react";

interface UserActionModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserActionModal: React.FC<UserActionModalProps> = ({ isOpen, onClose }) => {
  const tabs = [
    { id: "information", label: "Basic Information" },
    { id: "personal", label: "Personal Information" },
    { id: "contact", label: "Contact Information" },
    { id: "experience", label: "Experience" },
    { id: "education", label: "Education" },
  ];

  const [activeTab, setActiveTab] = useState<string>("information");

  if (!isOpen) return null;
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
                    <h4 className="text-xl font-bold">John Doe</h4>
                    <p className="text-blue-100 text-sm">Senior Developer</p>
                    <p className="text-blue-100 text-sm">Employee ID: EMP-001</p>
                  </div>
                </div>
                <div className="border rounded h-full p-1 font-bold text-base">
                  Active
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
              onClick={onClose}
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
