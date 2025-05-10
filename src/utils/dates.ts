export const safeDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return undefined;

  // Corriger le décalage UTC+2
  date.setHours(date.getHours() - 2);

  return date;
};
