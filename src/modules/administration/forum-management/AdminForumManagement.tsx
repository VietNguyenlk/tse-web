import NewQuestion from "./questions/NewQuestion";
import QuestionList from "./questions/QuestionList";

const AdminForumManagement: React.FC = () => {
  return (
    <div className="container mx-auto bg-gray-100 min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-4 mb-2">
        <NewQuestion />
        <QuestionList />
      </div>
    </div>
  );
};

export default AdminForumManagement;
