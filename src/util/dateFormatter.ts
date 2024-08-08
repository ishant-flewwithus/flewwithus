import { format, setHours, setMinutes, startOfDay } from "date-fns";

export function formatMinutes(minutes: number) {
  if (minutes < 0) throw new Error("Minutes cannot be negative");

  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  return `${hours}h ${mins}m`;
}

// Function to format a date as yyyy-MM-ddTHH:mm:ss
export function formatDate(date: Date) {
  return format(date, "yyyy-MM-dd'T'HH:mm:ss");
}

// Function to get the formatted date for a given time of day
export function getDateWithTime(date: Date, hour: number, minute: number) {
  const startOfDayDate = startOfDay(date);
  const dateWithTime = setMinutes(setHours(startOfDayDate, hour), minute);
  return dateWithTime;
}

export function isTimeBefore(date1: Date, date2: Date) {
  // Extract the time component from each date
  const time1 = date1.getTime();
  const time2 = date2.getTime();

  // Compare the two times
  return time1 < time2;
}
