import { format } from 'date-fns';
import { fr } from 'date-fns/locale';
import styles from "./MissionCard.module.scss";

type MissionCardProps = {
  /**
   * Estimation de la fin de mission
   */
  startDate: Date;
  /**
   * Nom
   */
  estimatedEndDate: Date;
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
  type,
  place,
  team,
  teamMembers = [],
}: MissionCardProps) => {


  return (
    <div className={styles.missionCard}>
      <div className={styles.content}>
        <div className={styles.date}>
          <h4>{startDate.toString()}</h4>
          <p className={styles.time}>{startDate.toString()}</p>
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
          <p className={styles.label}>Date de fin estimé</p>
          <span>{format(estimatedEndDate, "EEEE d MMMM", { locale: fr })}</span>
          <p className={styles.endTime}>Fin : {format(estimatedEndDate, "H:mm")}</p>
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

