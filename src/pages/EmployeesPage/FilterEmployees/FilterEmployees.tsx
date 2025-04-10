import React, { useState } from "react";
import "./FilterEmployees.scss";

type Tab = {
  label: string;
  count: number;
};

const tabs: Tab[] = [
  { label: "Tout les employés", count: 22 },
  { label: "Employés actifs", count: 18 },
  { label: "Employés inactifs", count: 4 },
  { label: "Employés en ligne", count: 3 },
];

const FilterEmployees: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number>(0);

  return (
    <div className="filter-employees">
      {tabs.map((tab, index) => (
        <div
          key={index}
          className={`filter-tab ${activeIndex === index ? "active" : ""}`}
          onClick={() => setActiveIndex(index)}
        >
          <span>{tab.label}</span>
          <span className="badge">{tab.count}</span>
          {activeIndex === index && <div className="underline" />}
        </div>
      ))}
    </div>
  );
};

export default FilterEmployees;
