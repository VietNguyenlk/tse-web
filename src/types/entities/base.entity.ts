import dayjs from "dayjs";

export interface BaseEntity {
  id: string;
  createdAt: dayjs.Dayjs;
  updatedAt: dayjs.Dayjs;
  deletedAt: dayjs.Dayjs | null;
}
