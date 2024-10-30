import { CheckCircle, Tag } from "@mui/icons-material";
import { useState } from "react";

const ActivityBasicInfo: React.FC = () => {
  const [selectedType, setSelectedType] = useState<string>("seminar");
  const [selectedScope, setSelectedScope] = useState<string>("internal");
  const [descriptionLength, setDescriptionLength] = useState<number>(0);

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescriptionLength(value.length);
  };

  const activityTypes = [
    {
      id: "seminar",
      name: "Seminar",
      description: "Discussing & Sharing Knowledge",
    },
    {
      id: "contest",
      name: "Contest",
      description: "Talent Discovery and Recognition",
    },
    {
      id: "training",
      name: "Training",
      description: "Developing Skills & Improve Knowledge",
    },
  ];

  const activityScopes = [
    {
      id: "internal",
      name: "Internal",
      description: "For Club internal",
    },
    {
      id: "external",
      name: "External",
      description: "For external people",
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Basic Information</h2>
        <p className="text-gray-600">Tell us about your activity</p>
      </div>

      <div className="relative group space-y-2">
        <h3 className="font-medium">Activity's Name:</h3>
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                placeholder="Please input your activity title..."
                className="w-full border-gray-300 px-6 py-4 text-lg bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
              />
              <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500">
                <Tag />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">Type:</h3>
        <div className="grid grid-cols-3 gap-4">
          {activityTypes.map((type) => (
            <div
              key={type.id}
              className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 ${
                selectedType === type.id
                  ? "hover:border-blue-400 border-blue-500"
                  : "border-transparent hover:border-blue-400"
              }`}
              onClick={() => setSelectedType(type.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{type.name}</span>
                <CheckCircle
                  className={`${
                    selectedType === type.id ? "text-blue-500" : "text-gray-300"
                  }`}
                />
              </div>
              <p className="text-sm text-gray-600">{type.description}</p>
            </div>
          ))}
        </div>

        <h3 className="font-medium">Scope:</h3>
        <div className="grid grid-cols-2 gap-4">
          {activityScopes.map((scope) => (
            <div
              key={scope.id}
              className={`bg-white p-4 rounded-xl shadow-sm hover:shadow-md transition-shadow cursor-pointer border-2 ${
                selectedScope === scope.id
                  ? "hover:border-blue-400 border-blue-500"
                  : "border-transparent hover:border-blue-400"
              }`}
              onClick={() => setSelectedScope(scope.id)}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{scope.name}</span>
                <CheckCircle
                  className={`${
                    selectedScope === scope.id ? "text-blue-500" : "text-gray-300"
                  }`}
                />
              </div>
              <p className="text-sm text-gray-600">{scope.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="relative space-y-2  ">
        <h3 className="font-medium">Description:</h3>
        <textarea
          onChange={handleChangeTextArea}
          placeholder="Describe your activity in details..."
          rows={3}
          className="w-full px-6 py-4 text-lg border-gray-300 bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all resize-none"
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          {descriptionLength}/280
        </div>
      </div>
    </div>
  );
};

export default ActivityBasicInfo;
