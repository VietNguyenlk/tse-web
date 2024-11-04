import { CheckCircle, Tag } from "@mui/icons-material";
import { useState } from "react";
import * as yup from "yup";
import { ActivityType } from "../../../shared/models/enums/activity.enum";

interface ActivityBasicInfoProps {
  setActivityTitle: (value: string) => void;
  setActivityDescription: (value: string) => void;
  setActivityType: (value: keyof typeof ActivityType) => void;
}

const basicInformationSchema = yup.object().shape({
  activityName: yup
    .string()
    .required("Activity name is required")
    .min(5, "Activity name must be at least 5 characters")
    .max(50, "Activity name must be at most 50 characters"),
  activityDescription: yup
    .string()
    .max(280, "Description must be at most 280 characters"),
});

const ActivityBasicInfo: React.FC<ActivityBasicInfoProps> = ({
  setActivityTitle,
  setActivityDescription,
  setActivityType,
}) => {
  const [selectedType, setSelectedType] = useState<string>("seminar");
  const [selectedScope, setSelectedScope] = useState<string>("internal");
  const [descriptionLength, setDescriptionLength] = useState<number>(0);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescriptionLength(value.length);
  };

  const validateInput = async (field: string, value: any) => {
    try {
      await basicInformationSchema.validateAt(field, { [field]: value });
      setErrors((prevErrors) => ({ ...prevErrors, [field]: "" }));
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setErrors((prevErrors) => ({ ...prevErrors, [field]: error.message }));
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    validateInput(name, value);
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
        <h3 className="font-medium">
          Activity's Name <span className="text-red-600">*</span>
        </h3>
        {errors.activityName && <p>{errors.activityName}</p>}
        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                name="activityName"
                placeholder="Please input your activity title..."
                onChange={handleInputChange}
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
        <h3 className="font-medium">
          Type <span className="text-red-600">*</span>
        </h3>
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

        <h3 className="font-medium">
          Scope <span className="text-red-600">*</span>
        </h3>
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
        <h3 className="font-medium">Description</h3>
        <textarea
          name="activityDescription"
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
