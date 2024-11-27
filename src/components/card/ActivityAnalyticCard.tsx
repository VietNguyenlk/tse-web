interface ActivityAnalyticCardProps {
  title: string;
  icon: React.ReactNode;
  content: number | string;
  description: string;
}

const ActivityAnalyticCard: React.FC<ActivityAnalyticCardProps> = ({
  content,
  description,
  icon,
  title,
}) => {
  return (
    <div className="border rounded-lg flex flex-col justify-between shadow-sm">
      <div className="flex items-center p-4 ">
        <div className="mr-4 text-gray-600">{icon}</div>
        <div>
          <h2 className="text-lg font-semibold">{title}</h2>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <div className="text-4xl font-bold text-center pb-2">{content}</div>
    </div>
  );
};

export default ActivityAnalyticCard;
