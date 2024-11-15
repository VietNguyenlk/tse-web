import { CheckCircle, Tag } from "@mui/icons-material";
import { useEffect, useState } from "react";
import * as yup from "yup";
import { IActivity } from "../../shared/models/activity.model";
import {
  ActivityScope,
  ActivityType,
} from "../../shared/models/enums/activity.enum";

interface ActivityBasicInfoProps {
  activity: IActivity;
  updateActivity: (newData: Partial<IActivity>) => void;
  setValidStep: (valid: boolean) => void;
  checkValid: boolean;
}

type ActivityTypeOption = {
  id: keyof typeof ActivityType;
  name: string;
  description: string;
};

type ActivityScopeOption = {
  id: keyof typeof ActivityScope;
  name: string;
  description: string;
};

const activityTypes: ActivityTypeOption[] = [
  {
    name: "Hội thảo",
    id: "SEMINAR",
    description: "Thảo luận & chia sẻ kiến thức", // Discussion & Knowledge Sharing
  },
  {
    name: "Cuộc thi",
    id: "CONTEST",
    description: "Khám phá và tôn vinh tài năng", // Talent Discovery and Recognition
  },
  {
    name: "Đào tạo",
    id: "TRAINING",
    description: "Phát triển kĩ năng & kiến thức", // Developing Skills & Improve Knowledge
  },
];

const activityScopes: ActivityScopeOption[] = [
  {
    name: "Nội bộ",
    id: "INTERNAL",
    description: "Dành cho thành viên CLB",
  },
  {
    name: "Bên ngoài",
    id: "EXTERNAL",
    description: "Dành cho tất cả mọi người",
  },
];

const basicInformationSchema = yup.object().shape({
  activityName: yup
    .string()
    .trim()
    .required("Tên hoạt động không được bỏ trống!")
    .min(5, "Tên hoạt động phải có ít nhất 5 ký tự")
    .max(50, "Tên hoạt động không được quá 50 ký tự"),
  activityDescription: yup
    .string()
    .trim()
    .max(280, "Mô tả không được quá 280 ký tự"),
});

const ActivityBasicInfo: React.FC<ActivityBasicInfoProps> = ({
  activity,
  updateActivity,
  setValidStep,
  checkValid,
}) => {
  const [activityTitle, setActivityTitle] = useState<string>(activity.name ?? "");
  const [selectedType, setSelectedType] = useState<keyof typeof ActivityType>(
    activity.activityType || "SEMINAR",
  );
  const [selectedScope, setSelectedScope] = useState<keyof typeof ActivityScope>(
    activity.activityScope || "INTERNAL",
  );
  const [description, setDescription] = useState<string>(activity.description || "");
  const [descriptionLength, setDescriptionLength] = useState<number>(
    activity.description?.length || 0,
  );
  const [nameError, setNameError] = useState<string | null>(null);

  useEffect(() => {
    updateActivity({
      name: activityTitle.trim(),
      activityType: selectedType,
      activityScope: selectedScope,
      description: description.trim(),
    });
  }, [activityTitle, selectedType, selectedScope, description]);

  useEffect(() => {
    if (checkValid) {
      validateField("activityName", activityTitle);
    }
  }, [checkValid]);

  const validateField = async (fieldName: string, value: string) => {
    try {
      const dataToValidate = { [fieldName]: value };
      await basicInformationSchema.validateAt(fieldName, dataToValidate);
      setNameError(null);
      setValidStep(true);
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        setNameError(error.message);
        setValidStep(false);
      }
    }
  };

  const maxDescriptionLength = 280;
  const handleChangeTextArea = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = event.target.value;
    setDescription(value);
    setDescriptionLength(value.length);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const fieldName = event.target.name;
    const value = event.target.value;
    setActivityTitle(value);
    validateField(fieldName, value);
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-2xl font-bold mb-2">Thông tin cơ bản</h2>
        <p className="text-gray-600">Thông tin cơ bản của hoạt động</p>
      </div>

      <div className="relative group space-y-2">
        <h3 className="font-medium">
          Tên hoạt động <span className="text-red-600">*</span>
        </h3>

        <div className="flex gap-4">
          <div className="flex-1">
            <div className="relative">
              <input
                type="text"
                name="activityName"
                value={activityTitle}
                placeholder="Tên của hoạt động..."
                onChange={handleInputChange}
                className={`w-full border-gray-300 px-6 py-4 text-lg bg-gray-50 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all
                    ${
                      nameError && nameError.length !== 0
                        ? "border-red-500 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 focus:ring-blue-500 force:border-blue-500"
                    }
                  `}
              />
              <div
                className={`absolute right-4 top-1/2 -translate-y-1/2 ${
                  nameError
                    ? "text-red-500 group-focus-within:text-red-500"
                    : "text-gray-400 group-focus-within:text-blue-500"
                } `}
              >
                <Tag />
              </div>
            </div>
          </div>
        </div>

        {nameError && nameError.length !== 0 && (
          <p className="text-red-500">{nameError}</p>
        )}
      </div>

      <div className="space-y-2">
        <h3 className="font-medium">
          Loại hoạt động <span className="text-red-600">*</span>
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
          Phạm vi <span className="text-red-600">*</span>
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

      <div className="relative space-y-2 ">
        <h3 className="font-medium">Mô tả</h3>
        <textarea
          name="activityDescription"
          onChange={handleChangeTextArea}
          placeholder="Mô tả chi tiết về hoạt động này..."
          rows={3}
          value={description}
          maxLength={maxDescriptionLength}
          className={`w-full px-6 py-4 text-lg bg-gray-50 rounded-xl focus:outline-none focus:ring-2 transition-all resize-none border-gray-300 focus:ring-blue-500 focus:border-blue-500`}
        />
        <div className="absolute bottom-4 right-4 text-sm text-gray-400">
          {descriptionLength}/{maxDescriptionLength}
        </div>
      </div>
    </div>
  );
};

export default ActivityBasicInfo;
