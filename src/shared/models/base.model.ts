import dayjs from "dayjs";

export interface IBaseModel {
  createdAt?: dayjs.Dayjs | null | string;
  createdBy?: string | null;
  updatedAt?: dayjs.Dayjs | null | string;
  updatedBy?: string | null;
  deletedAt?: dayjs.Dayjs | null | string;
  isDeleted?: boolean;
}
