import React from "react";
import StarBorderPurple500OutlinedIcon from "@mui/icons-material/StarBorderPurple500Outlined";
import styles from "./displayProfileName.module.scss";

interface DisplayProfilNameProps {
  /**
   * Prénom
   */
  firstname: string;
  /**
   * Nom
   */
  name: string;
  /**
   * Vérifier si admin
   */
  isAdmin?: boolean;
}

const DisplayProfilName: React.FC<DisplayProfilNameProps> = ({
  firstname,
  name,
  isAdmin,
}) => {

  return (
    <div className={styles.profileContainer}>
      <div className={styles.avatar}>
        {isAdmin && (
          <StarBorderPurple500OutlinedIcon className={styles.adminIcon} />
        )}
        <span className={styles.initial}>{firstname.charAt(0)}</span>
      </div>
      <div className={styles.info}>
        <h2 className={styles.name}>
          {firstname} {name}
        </h2>
        <p className={styles.subtitle}>Ravie de te revoir ici !</p>
      </div>
    </div>
  );
};

export default DisplayProfilName;
