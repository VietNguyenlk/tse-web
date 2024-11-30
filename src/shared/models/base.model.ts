import dayjs from "dayjs";

export interface IBaseModel {
  createdAt?: dayjs.Dayjs | null;
  updatedAt?: dayjs.Dayjs | null;
  deletedAt?: dayjs.Dayjs | null;
  isDeleted?: boolean;
}
