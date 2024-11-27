import { activityFields } from "../../shared/models/activity.model";
import { ActivityType } from "../../shared/models/enums/activity.enum";
import CustomSelect, { SelectOption } from "./CustomSelect";
import MultiSelect, { MultiSelectOption } from "./MutilpleSelect";

interface ActivityFilterBarProps {
  onChangePageSize: (pageSize: number) => void;
}

const ActivityFilterBar: React.FC<ActivityFilterBarProps> = ({}) => {
  const getActivityTypeOptions = (): MultiSelectOption[] => {
    return Object.entries(ActivityType)
      .filter(([key]) => isNaN(Number(key)))
      .map(([key, value]) => {
        const text = {
          CONTEST: "Cuộc thi",
          SEMINAR: "Hội thảo",
          TRAINING: "Đào tạo",
        }[key];
        return {
          label: text,
          value: text,
        };
      });
  };

  const getSortOptions = (): SelectOption[] => {
    return Object.values(activityFields)
      .filter((field) => field !== null)
      .map((field) => ({ label: field, value: field }));
  };

  return (
    <div className="bg-white rounded-lg">
      <div className="flex gap-4">
        <div className="flex gap-2 items-center">
          <span>Loại HĐ:&nbsp;</span>
          <MultiSelect
            options={getActivityTypeOptions()}
            onBlur={() => console.log("change")}
          />
        </div>
        <div className="flex gap-2 items-center">
          <span>Sắp xếp theo:&nbsp;</span>
          <CustomSelect
            options={getSortOptions()}
            value={getSortOptions().length !== 0 ? getSortOptions()[0] : null}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityFilterBar;
