import React from 'react';
import styles from './MissionType.module.scss';

interface MissionTypeProps {
  nom: string;
  code: string;
  color: string;
}


const MissionType: React.FC<MissionTypeProps> = ({ nom, code, color }) => {

  return (
    <div className={styles.container} key={code}>
      <div
        className={styles.circle}
        style={{ backgroundColor: color }}
      ></div>
      <span className={styles.text}>{nom}</span>
    </div>
  );
};

export default MissionType;
