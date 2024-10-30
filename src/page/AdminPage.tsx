import { useState } from "react";
import TopHeader from "../components/TopHeader";
import SideMenu from "../components/SideMenu";
import ContentContainer from "../components/ContentContainer";

const AdminPage: React.FC = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [activeContent, setActiveContent] = useState<string>("dashboard");

  return (
    <div className="min-h-screen bg-gray-100">
      <TopHeader />
      <SideMenu
        activeContent={activeContent}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
        setActiveContent={setActiveContent}
      />
      <div className={`flex-1 transition-all duration-300`}>
        <main
          className={` pt-6
          ${sidebarOpen ? "ml-60" : "ml-16"} 
          transition-all 
          duration-300 
          min-h-screen`}
        >
          <div className="p-10">
            <ContentContainer activeContent={activeContent} />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminPage;
