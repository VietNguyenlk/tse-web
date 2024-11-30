import { Add, Close, Search } from "@mui/icons-material";
import { activityFields } from "../../shared/models/activity.model";
import { ActivityType } from "../../shared/models/enums/activity.enum";
import CustomSelect, { SelectOption } from "./CustomSelect";
import MultiSelect, { MultiSelectOption } from "./MutilpleSelect";
import { useEffect, useState } from "react";
import {
  ISearchActivity,
  searchActivities,
} from "../../modules/administration/activity-management/activity-management.reducer";
import { useAppDispatch } from "../../configs/store";
import { PaginationRequestParams } from "../../configs/api";

interface ActivityFilterBarProps {
  setNewModalOpen: (open: boolean) => void;
  paginationParams?: PaginationRequestParams;
}

const ActivityFilterBar: React.FC<ActivityFilterBarProps> = ({
  setNewModalOpen,
  paginationParams = {
    page: 1,
    size: 5,
  },
}) => {
  return <h1></h1>;
};

export default ActivityFilterBar;
