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

// Todo : comprendre pourquoi un new Date() sur le toParisISOString() renvoie un décallage de 2h
export const toParisISOStringV2 = (date: string | Date) => {
  const d = new Date(date);
  const offset = -120;
  d.setMinutes(d.getMinutes() - offset);
  return d.toISOString();
};

export const toParisISOStringV2Two = (date: string | Date, time: string): string => {
  // Convertir la date en objet Date si c'est une chaîne
  const d = new Date(date);

  // Extraire les heures et les minutes à partir du paramètre time
  const [hours, minutes] = time.split(":").map(Number);

  // Ajouter l'heure et les minutes à la date
  d.setHours(hours, minutes, 0, 0);

  // Appliquer le décalage de -120 minutes (2 heures)
  d.setMinutes(d.getMinutes() + 120);

  return d.toISOString();
};

export const formatDateForInput = (dateStr: string) => {
  const date = new Date(dateStr);
  const offset = date.getTimezoneOffset();
  const localDate = new Date(date.getTime() - offset * 60 * 1000);
  return localDate.toISOString().slice(0, 16); // YYYY-MM-DDTHH:mm
};

const pad = (n: number): string => String(Math.floor(Math.abs(n))).padStart(2, '0');

const getTimezoneOffset = (date: Date): string => {
  const tzOffset = -date.getTimezoneOffset();
  const sign = tzOffset >= 0 ? '+' : '-';
  return sign + pad(Math.floor(tzOffset / 60)) + ':' + pad(Math.abs(tzOffset % 60));
};

export const toISOStringWithTimezone = (date: Date): string => {
  return date.getFullYear() +
    '-' + pad(date.getMonth() + 1) +
    '-' + pad(date.getDate()) +
    'T' + pad(date.getHours()) +
    ':' + pad(date.getMinutes()) +
    ':' + pad(date.getSeconds()) +
    getTimezoneOffset(date);
};

export const formatTimeString = (date: string | Date) => {
  const d = (typeof date === 'string' && date.trim() === '') ? new Date() : new Date(date);

  return d.toLocaleTimeString('fr-FR', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false
  });
};