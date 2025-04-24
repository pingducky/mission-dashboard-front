import MissionCard from "./MissionCard/MissionCard";
import styles from "./MissionsList.module.scss";

export type MissionCard = {
  id: number;
  startDate: Date;
  estimatedEndDate: Date;
  type: string;
  place: string;
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
