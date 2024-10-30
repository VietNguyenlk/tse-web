import { Card, CardHeader } from "@mui/material";

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
    <Card className="flex flex-col justify-between" variant="outlined">
      <CardHeader
        title={title}
        subheader={description}
        avatar={<div className="text-gray-600">{icon}</div>}
      />
      <div className="text-xl font-bold text-center pb-2">{content}</div>
    </Card>
  );
};

export default ActivityAnalyticCard;
