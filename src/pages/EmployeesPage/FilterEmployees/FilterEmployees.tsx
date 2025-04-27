import React, { useState } from "react";
import clsx from "clsx";
import styles from "./FilterEmployees.module.scss";

type Tab = {
  /**
   * Id du filtre
   */
  id: string;
  /**
   * Filtre des employés
   */
  filter: 'all' | 'active' | 'inactive' | 'online';
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
  { id: "allEmployees", filter: "all", label: "Tous les employés", count: 22 },
  { id: "activeEmployees", filter: "active", label: "Employés actifs", count: 18 },
  { id: "inactiveEmployees", filter: "inactive", label: "Employés inactifs", count: 4 },
  { id: "onlineEmployees", filter: "online", label: "Employés en ligne", count: 3 },
];

interface FilterEmployeesProps {
  /**
   * Fonction pour mettre à jour le filtre des employés
   */
  setFilter: (filter: 'all' | 'active' | 'inactive' | 'online') => void;
}

const FilterEmployees: React.FC<FilterEmployeesProps> = ({setFilter}) => {
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

export default FilterEmployees;
