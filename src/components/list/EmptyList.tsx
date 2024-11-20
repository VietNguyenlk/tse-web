import { Inbox } from "@mui/icons-material";

interface EmptyListProps {
  title?: string;
  description?: string;
  icon?: React.ReactNode;
}

const EmptyList: React.FC<EmptyListProps> = ({
  title = "Ở đây thật trống trải",
  description = "Hiện tại không có dữ liệu nào để hiển thị.",
  icon: customIcon,
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center bg-gray-50 rounded-lg border-2 border-dashed border-gray-200 min-h-[300px]">
      <div className="flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
        {customIcon || <Inbox className="w-8 h-8 text-gray-400" />}
      </div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 max-w-md">{description}</p>
    </div>
  );
};

export default EmptyList;
