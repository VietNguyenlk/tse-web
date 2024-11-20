import dayjs from "dayjs";
import {
  DATE_FORMAT,
  DATE_TIME_FORMAT,
  DISPLAY_DATE_FORMAT,
  DISPLAY_DATE_TIME_FORMAT,
  TIME_FORMAT,
  TIME_FORMAT_24H,
} from "../../configs/constants";

export const convertDateFromServer = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DATE_FORMAT) : null;

export const convertDateForDisplay = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DISPLAY_DATE_FORMAT) : null;

export const convertDateTimeFromServer = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DATE_TIME_FORMAT) : null;

export const convertDateTimeToDisplay = (date: dayjs.ConfigType) =>
  date ? dayjs(date).format(DISPLAY_DATE_TIME_FORMAT) : null;

export const convertTimeFromServer = (
  timeString: dayjs.ConfigType,
  is24h: boolean,
) =>
  timeString
    ? dayjs(`2000-01-01 ${timeString}`).format(is24h ? TIME_FORMAT_24H : TIME_FORMAT)
    : null;

export const extractTimeFromDateTime = (dateTime: dayjs.ConfigType) => {
  if (!dateTime) return null;

  // Check if the input is already in "HH:mm" format
  if (typeof dateTime === "string" && dateTime.match(/^\d{2}:\d{2}$/)) {
    return dateTime; // Return as is
  }

  // For "HH:mm:ss" or other formats, parse and convert to "HH:mm"
  return dayjs(
    typeof dateTime === "string" && dateTime.match(/^\d{2}:\d{2}:\d{2}$/)
      ? `1970-01-01T${dateTime}` // Add default date for time-only input
      : dateTime,
  ).format(TIME_FORMAT);
};

export const convertDateTimeFromClient = (
  date?: dayjs.ConfigType,
): dayjs.Dayjs | null => (date ? dayjs(date) : null);

export const convertTimeFromClient = (time?: dayjs.ConfigType): dayjs.Dayjs | null =>
  time ? dayjs(`2000-01-01 ${time}`) : null;

export const displayDefaultDateTime = () =>
  dayjs().startOf("day").format(DATE_TIME_FORMAT);
