import React from "react";
import styles from "./displayProfileName.module.scss";

interface DisplayProfilNameProps {
    firstname: string;
    name: string;
  }
  
const DisplayProfilName: React.FC<DisplayProfilNameProps> = ({ firstname, name }) => (
    <div className={styles.profileContainer}>
        <div className={styles.avatar}>
            <span className={styles.initial}>{firstname.charAt(0)}</span>
        </div>
        <div className={styles.info}>
            <h2 className={styles.name}>{firstname} {name}</h2>
            <p className={styles.subtitle}>Ravie de te revoir ici !</p>
        </div>
    </div>
);

export default DisplayProfilName;