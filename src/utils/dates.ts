export const safeDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return undefined;

  // Corriger le décalage UTC+2
  date.setHours(date.getHours() - 2);

  return date;
};

export const getWeekRange = (date: Date) => {
  const day = date.getDay();
  const diffToMonday = (day === 0 ? -6 : 1) - day;
  const monday = new Date(date);
  monday.setDate(date.getDate() + diffToMonday);
  const sunday = new Date(monday);
  sunday.setDate(monday.getDate() + 6);
  return {
    monday: monday.toISOString(),
    sunday: sunday.toISOString(),
  };
};

export const toParisISOString = (date : string | Date) => {
  return new Date(date).toISOString()
};
