import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from "./MissionCard.module.scss";

type MissionCardProps = {
  /**
   * Date et heure début de mission
   */
  startDate: Date;
  /**
   * Estimation de la date et heure de fin de mission
   */
  estimatedEndDate?: Date;
  /**
   * Date et heure fin de mission
   */
  endDate?: Date;
  /**
   * Type ménages réguliers ou ménages unique
   */
  type: string;
  /**
   * Lieu de la mission
   */
  place: string;
  /**
   * Type de team : seul ou en équipe
   */
  team: string;
  /**
   * Liste des membres
   */
  teamMembers?: string[];
};

const MissionCard = ({
  startDate,
  estimatedEndDate,
  endDate,
  type,
  place,
  team,
  teamMembers = [],
}: MissionCardProps) => {

  const capitalizeFirstLetter = (str: string) => str.charAt(0).toUpperCase() + str.slice(1);

  const isValidDate = (date: unknown): date is Date =>
    date instanceof Date && !isNaN(date.getTime());

  // Si date de fin alors on prends sinon on prends date estimée
  const dateToDisplay = endDate ?? estimatedEndDate;

  const endDateDay = isValidDate(dateToDisplay)
  ? capitalizeFirstLetter(format(dateToDisplay!, "EEEE d MMMM", { locale: fr }))
  : "Date de fin non estimée";

  const endTimeH = isValidDate(dateToDisplay)
  ? format(dateToDisplay, "H:mm")
  : null;

  return (
    <div className={styles.missionCard}>
      <div className={styles.content}>
        <div className={styles.date}>
        <h4>{capitalizeFirstLetter(format(startDate, "EEEE d MMMM", { locale: fr }))}</h4>
          <p className={styles.time}>{format(startDate, "H:mm")}</p>
        </div>
        <div>
          <p className={styles.label}>Type</p>
          <span>{type}</span>
        </div>
        <div>
          <p className={styles.label}>Lieu</p>
          <span>{place}</span>
        </div>
        <div>
          <p className={styles.label}>{endDate ? "Date de fin réelle" : "Date de fin estimée"}</p>
          <span>{endDateDay}</span>
          {endTimeH && <p className={styles.endTime}>Fin : {endTimeH}</p>}
        </div>
        <div>
          <p className={styles.label}>Intervention</p>
          <span>{team}</span>
          {team === "En équipe" && teamMembers.length > 0 && (
            <ul className={styles.teamMembers}>
              {teamMembers.map((member, i) => (
                <li key={i}>{member}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default MissionCard;

