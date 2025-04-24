import MissionCard from "./MissionCard/MissionCard";
import styles from "./MissionsList.module.scss";

export type MissionCard = {
  /**
   * Identifiant unique de la mission
   */
  id: number;
  /**
   * Date et heure début de mission
   */
  startDate: Date;
  /**
   * Estimation de la date et heure de fin de mission
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
};

type MissionsListProps = {
  missions: MissionCard[];
};

const MissionsList = ({ missions }: MissionsListProps) => {
  return (
    <div className={styles.missionsListContainer}>
      <div className={styles.timeline}>
        <div className={`${styles.dot} ${styles.active}`} />
        <div className={styles.line} />
        <div className={`${styles.dot}`} />
      </div>
      <div className={styles.missionsList}>
        {missions.map((mission) => (
          <MissionCard key={mission.id} {...mission} />
        ))}
      </div>
    </div>
  );
};

export default MissionsList;
