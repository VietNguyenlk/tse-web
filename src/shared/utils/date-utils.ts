import dayjs from "dayjs";
import { DATE_FORMAT, DATE_TIME_FORMAT, TIME_FORMAT } from "../../configs/constants";

export const convertDateTimeFromServer = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DATE_TIME_FORMAT) : null;

export const convertDateFromServer = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DATE_FORMAT) : null;

export const convertTimeFromServer = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(TIME_FORMAT) : null;

export const convertDateTimeFromClient = (
  date?: dayjs.ConfigType,
): dayjs.Dayjs | null => (date ? dayjs(date) : null);

export const displayDefaultDateTime = () =>
  dayjs().startOf("day").format(DATE_TIME_FORMAT);
