import React from 'react';
import styles from './MissionType.module.scss'; // Importation du fichier SCSS

interface MissionTypeProps {
  nom: string;
  code: string;
}

const getColorForMission = (code: string): string => {
  switch (code) {
    case 'A':
      return '#FF5733'; // Exemple de couleur pour le code A
    case 'B':
      return '#33FF57'; // Exemple de couleur pour le code B
    case 'C':
      return '#3357FF'; // Exemple de couleur pour le code C
    default:
      return '#808080'; // Gris par défaut si le code ne correspond à rien
  }
};

const MissionType: React.FC<MissionTypeProps> = ({ nom, code }) => {
  const color = getColorForMission(code);

  return (
    <div className={styles.container}>
      <div
        className={styles.circle}
        style={{ backgroundColor: color }}
      ></div>
      <span className={styles.text}>{nom}</span>
    </div>
  );
};

export default MissionType;
