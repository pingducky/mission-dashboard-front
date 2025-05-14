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

export const toParisISOString = (utcDateString : string | undefined) => {
  if (!utcDateString) return '';
  const date = new Date(utcDateString);
  return date.toLocaleString('sv-SE', { timeZone: 'Europe/Paris' }).replace(' ', 'T');
};
