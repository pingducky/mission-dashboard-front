import React from 'react';
import styles from './MissionType.module.scss';

interface MissionTypeProps {
  /**
   * Nom
   */
  nom: string;
  /**
   * Code
   */
  code: string;
  /**
   * Couleure
   */
  color: string;
}


const MissionType: React.FC<MissionTypeProps> = ({ nom, code, color }) => {

  return (
    <div className={styles.container} key={code}>
      <div
        className={styles.circle}
        style={{ backgroundColor: color }}
      />
      <span className={styles.text}>{nom}</span>
    </div>
  );
};

export default MissionType;
