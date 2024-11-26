import { adminHeaderItems } from "../../configs/admin-configs";

interface AdminHeaderProps {
  activeHeader: string;
  setActiveHeader: (header: string) => void;
}

const AdminHeader: React.FC<AdminHeaderProps> = ({
  activeHeader,
  setActiveHeader,
}) => {
  return (
    <div className="h-14 border-b flex justify-between items-center">
      {adminHeaderItems.map((item) => (
        <div
          key={item.id}
          className="flex justify-between items-center group hover:cursor-pointer"
          onClick={() => setActiveHeader(item.id)}
        >
          <div
            className={`p-1  mx-4 ${
              activeHeader === item.id
                ? "text-blue-900 border-blue-900 rounded-full border-2"
                : "group-hover:text-blue-900"
            }`}
          >
            {item.icon}
          </div>
          <div>
            <div
              className={`text-base text-black-500 font-medium leading-tight ${
                activeHeader === item.id
                  ? "text-blue-900"
                  : "group-hover:text-blue-900"
              }`}
            >
              {item.title}
            </div>
            <div className="text-sm text-gray-500 font-normal leading-tight">
              {item.des}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminHeader;
