import React from 'react';
import styles from './MainPageTitle.module.scss';

interface MainTitlePageProps {
  text: string;
  icon: React.ReactNode;
}

export const MainTitlePage: React.FC<MainTitlePageProps> = ({ text, icon }) => {
  return (
    <div className={styles.container}>
      <span className={styles.icon}>{icon}</span>
      <span className={styles.text}>{text}</span>
    </div>
  );
};