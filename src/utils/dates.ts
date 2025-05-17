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

