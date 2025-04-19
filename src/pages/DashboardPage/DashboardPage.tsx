import React from "react";
import DashboardWelcomeImage from "../../assets/images/dahsboardImage.svg";
import EmployeesIcon from "../../assets/images/icons/employeesDashboard.svg";
import MissionsIcon from "../../assets/images/icons/missionsTotalDashboard.svg";
import TimeIcon from "../../assets/images/icons/timeDashboard.svg";
import TargetIcon from "../../assets/images/icons/targetDashboard.svg";
import styles from "./DashboardPage.module.scss";

interface DashboardPageProps {
  /**
   * Prénom
   */
  firstname?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ firstname }) => {
  const cards = [
    {
      icon: EmployeesIcon,
      label: "employés",
      value: 25,
      alt: "Illustrations d'employés",
    },
    {
      icon: MissionsIcon,
      label: "missions réalisées au total",
      value: 140,
      alt: "Illustration d'un certificat",
    },
    {
      icon: TimeIcon,
      label: "de travail est prévu aujourd’hui",
      value: "8h30",
      alt: "Illustration d'une horloge",
    },
    {
      icon: TargetIcon,
      label: "Missions prévu aujourd’hui",
      value: 3,
      alt: "Illustration d'une cible",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardWelcome}>
        <div className={styles.dashboardText}>
          <h1>Bonjour, {firstname ?? "Utilisateur"}</h1>
          <h2>Prêt(e) à faire briller la journée ? ✨</h2>
        </div>
        <div className={styles.dashboardImage}>
          <img src={DashboardWelcomeImage} alt="Outils de nettoyage" />
        </div>
      </div>

      <div className={styles.dashboardInfoParent}>
        <h2>Les informations en plus</h2>
        <div className={styles.dashboardInfoGroup}>
          {cards.map((card) => (
            <div className={styles.infoCard} key={`${card.label}-${card.alt}`}>
              <img
                src={card.icon}
                alt={card.alt}
                className={styles.infoCardIcon}
              />
              <div className={styles.infoCardText}>
                <span className={styles.infoCardTextValue}>{card.value}</span>{" "}
                {card.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default DashboardPage;
