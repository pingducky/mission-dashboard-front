import React, { useState } from "react";
import clsx from "clsx";
import { MissionFilter } from "../../../hooks/useGetMissions";
import styles from "./FilterMissions.module.scss";

type Tab = {
  /**
   * Id du filtre
   */
  id: string
  /**
   * Filtre des missions
   */
  filter: MissionFilter;
  /**
   * Nom du filtre
   */
  label: string;
  /**
   * Nombre de résultat du filtre
   */
  count: number;
};

const tabs: Tab[] = [
  { id: "allMissions", filter: "all", label: "Toutes les missions", count: 22 },
  { id: "activeMissions", filter: "actives", label: "Missions actives", count: 18 },
  { id: "CanceledMissions", filter: "canceled", label: "Missions inactives", count: 4 },
  { id: "PastMissions", filter: "past", label: "Missions passées", count: 3 },
  { id: "UpcomingMissions", filter: "upcoming", label: "Missions prévues", count: 3 },
];

interface FilterMissionsProps {
  /**
   * Fonction pour mettre à jour le filtre des missions
   */
  setFilter: (filter: MissionFilter) => void;
}

const FilterMissions: React.FC<FilterMissionsProps> = ({setFilter}) => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div
      className={styles.filterEmployeesContainer}
      data-tab-active={tabs[activeIndex].id}
    >
      {tabs.map((tab, index) => (
        <button
          key={tab.id}
          className={clsx(styles.filterTab, {
            [styles.active]: activeIndex === index,
          })}
          role="tab"
          aria-selected={activeIndex === index}
          data-tab-id={tab.id}
          onClick={() => {
            setActiveIndex(index);
            setFilter(tab.filter);
          }}
        >
          <span className={styles.label}>{tab.label}</span>
          <span className={styles.badge}>{tab.count}</span>
          {activeIndex === index && <div className={styles.underline} />}
        </button>
      ))}
    </div>
  );
};

export default FilterMissions;
