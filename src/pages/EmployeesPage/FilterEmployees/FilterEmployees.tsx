import React, { useState } from "react";
import clsx from "clsx";
import styles from "./FilterEmployees.module.scss";

type Tab = {
  /**
   * Id du filtre
   */
  id: string;
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
  { id: "allEmployees", label: "Tous les employés", count: 22 },
  { id: "activeEmployees", label: "Employés actifs", count: 18 },
  { id: "inactiveEmployees", label: "Employés inactifs", count: 4 },
  { id: "onlineEmployees", label: "Employés en ligne", count: 3 },
];

const FilterEmployees: React.FC = () => {
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
          onClick={() => setActiveIndex(index)}
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
