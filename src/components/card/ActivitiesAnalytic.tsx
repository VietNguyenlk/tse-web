import { CalendarMonth, CheckCircle, Group } from "@mui/icons-material";
import React from "react";
import ActivityAnalyticCard from "./ActivityAnalyticCard";

const ActivitiesAnalytic: React.FC = () => {
  const cardContents = [
    {
      title: "Tổng số hoạt động trong tháng",
      icon: <CalendarMonth />,
      content: 88,
      description: "+23% from last month",
    },
    {
      title: "tỷ lệ tham dự trung bình",
      icon: <Group />,
      content: "85%",
      description: "Based on last 5 seminars",
    },
    {
      title: "Tỷ lệ tham dự sự kiện",
      icon: <CheckCircle />,
      content: "85%",
      description: "Based on last 5 seminars",
    },
  ];

  return (
    <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 mb-4 mt-4`}>
      {cardContents.map((card, index) => (
        <ActivityAnalyticCard
          key={index}
          title={card.title}
          icon={card.icon}
          content={card.content}
          description={card.description}
        />
      ))}
    </div>
  );
};

export default ActivitiesAnalytic;
