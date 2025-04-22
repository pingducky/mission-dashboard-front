import styles from "./MissionCard.module.scss";

type MissionCardProps = {
  /**
   * Information date de la mission
   */
  date: string;
  /**
   * Nom
   */
  time: string;
  /**
   * Type ménages réguliers ou ménages unique
   */
  type: string;
  /**
   * Lieu de la mission
   */
  place: string;
  /**
   * Durée de la mission
   */
  duration: string;
  /**
   * Estimation de la fin de mission
   */
  endTime: string;
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
  date,
  time,
  type,
  place,
  duration,
  endTime,
  team,
  teamMembers = [],
}: MissionCardProps) => {
  return (
    <div className={styles.missionCard}>
      <div className={styles.content}>
        <div className={styles.date}>
          <h4>{date}</h4>
          <p className={styles.time}>{time}</p>
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
          <p className={styles.label}>Durée estimée</p>
          <span>{duration}</span>
          <p className={styles.endTime}>Fin : {endTime}</p>
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
