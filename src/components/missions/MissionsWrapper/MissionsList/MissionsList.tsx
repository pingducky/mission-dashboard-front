// MissionsList.tsx
import MissionCard from "./MissionCard/MissionCard";
import styles from "./MissionsList.module.scss";

type Mission = {
  id: number;
  date: string;
  time: string;
  type: string;
  place: string;
  duration: string;
  endTime: string;
  team: string;
  teamMembers?: string[];
};

type MissionsListProps = {
  missions: Mission[];
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
