import React from "react";
import DashboardWelcomeImage from "../../assets/images/dahsboardImage.svg";
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import VerifiedOutlinedIcon from '@mui/icons-material/VerifiedOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AdsClickOutlinedIcon from '@mui/icons-material/AdsClickOutlined';
import MissionsWrapper from "../../components/missions/MissionsListSwitch/MissionsListSwitch";
import { useGetDashboardStats } from "../../hooks/useGetDashboardStats";
import styles from "./DashboardPage.module.scss";

interface DashboardPageProps {
  /**
   * Prénom
   */
  firstname?: string;
}

const DashboardPage: React.FC<DashboardPageProps> = ({ firstname }) => {
  const { data: dataDashboardStats, isLoading, isError, error } = useGetDashboardStats();

  const cards = [
    {
      icon: GroupsOutlinedIcon,
      label: "employés",
      value: dataDashboardStats?.employeeCount ?? 0,
      alt: "Illustrations d'employés",
    },
    {
      icon: VerifiedOutlinedIcon,
      label: dataDashboardStats?.isAdmin
        ? "missions réalisées parmis tous les employés"
        : "missions réalisées au total",
      value: dataDashboardStats?.missionsDoneCount ?? 0,
      alt: "Illustration d'un certificat",
    },
    {
      icon: AccessTimeIcon,
      label: "de travail est prévu aujourd’hui",
      value: dataDashboardStats?.workingTimeToday ?? "N/A",
      alt: "Illustration d'une horloge",
    },
    {
      icon: AdsClickOutlinedIcon,
      label: dataDashboardStats?.isAdmin
        ? "missions prévues aujourd’hui parmis tous les employés"
        : "missions prévues aujourd’hui",
      value: dataDashboardStats?.missionsTodayCount ?? 0,
      alt: "Illustration d'une cible",
    },
  ];

  return (
    <div className={styles.dashboardContainer}>
      <div className={styles.dashboardWelcome}>
        <div className={styles.dashboardText}>
          <h1>Bonjour, {firstname ?? ""}</h1>
          <h2>Prêt(e) à faire briller la journée ? ✨</h2>
        </div>
        <div className={styles.dashboardImage}>
          <img src={DashboardWelcomeImage} alt="Outils de nettoyage" />
        </div>
      </div>

      <div className={styles.dashboardInfoParent}>
        <h2>Les informations en plus</h2>
        {isLoading ? (
          <p className={styles.noInfosCard}>Chargement des statistiques...</p>
        ) : isError ? (
          <p className={styles.noInfosCard}>Erreur : {error?.message}</p>
        ) : (
          <div className={styles.dashboardInfoGroup}>
            {cards.map((card) => (
              <div className={styles.infoCard} key={`${card.label}-${card.alt}`}>
                <card.icon
                  className={styles.infoCardIcon}
                  titleAccess={card.alt}
                />
                <div className={styles.infoCardText}>
                  <span className={styles.infoCardTextValue}>{card.value}</span>{" "}
                  {card.label}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <MissionsWrapper/>
    </div>
  );
};
export default DashboardPage;
