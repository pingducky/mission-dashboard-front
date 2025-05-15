// Fonction pour ajouter un zéro aux nombres
const pad = (num: number): string => String(num).padStart(2, "0");

// Corriger le décalage UTC+2 (ou autre)
export const safeDate = (dateString?: string): Date | undefined => {
  if (!dateString) return undefined;
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return undefined;

  // Correction dynamique du fuseau horaire local
  const localOffset = date.getTimezoneOffset() / 60;
  date.setHours(date.getHours() - localOffset);

  return date;
};

// Formater une date en ISO avec fuseau horaire
export const toISOStringWithTimezone = (date: Date): string => {
  const tzOffset = -date.getTimezoneOffset();
  const sign = tzOffset >= 0 ? "+" : "-";
  return date.getFullYear() +
    "-" + pad(date.getMonth() + 1) +
    "-" + pad(date.getDate()) +
    "T" + pad(date.getHours()) +
    ":" + pad(date.getMinutes()) +
    ":" + pad(date.getSeconds()) +
    sign + pad(Math.floor(tzOffset / 60)) + ":" + pad(Math.abs(tzOffset % 60));
};

// Convertir une chaîne date + heure en ISO
// export const toISOStringWithTime = (date: string, time: string): string => {
//   return new Date(`${date}T${time}`).toISOString();
// };


// Convertir une chaîne date + heure en ISO avec le fuseau horaire local
// export const toISOStringWithTime = (date: string, time: string): string => {
//   const [hours, minutes] = time.split(":").map(Number);
//   const [year, month, day] = date.split("-").map(Number);

//   // Créer une date en heure locale
//   const localDate = new Date(year, month - 1, day, hours, minutes);

//   // Retourner la date en ISO avec le fuseau horaire local
//   return localDate.toISOString();
// };

export const toISOStringWithTime = (date: string, time: string): string => {
  const [year, month, day] = date.split("-").map(Number);
  const [hours, minutes] = time.split(":").map(Number);

  // Créer une date locale
  const localDate = new Date(year, month - 1, day, hours, minutes);

  // Décalage horaire en minutes (ex: -120 pour UTC+2)
  const tzOffset = -localDate.getTimezoneOffset();
  const sign = tzOffset >= 0 ? "+" : "-";
  const offsetHours = pad(Math.floor(Math.abs(tzOffset) / 60));
  const offsetMinutes = pad(Math.abs(tzOffset) % 60);

  // Construction de la date en ISO (locale) manuellement
  return (
    `${localDate.getFullYear()}-${pad(localDate.getMonth() + 1)}-${pad(localDate.getDate())}` +
    `T${pad(localDate.getHours())}:${pad(localDate.getMinutes())}:${pad(localDate.getSeconds())}` +
    `${sign}${offsetHours}:${offsetMinutes}`
  );
};

