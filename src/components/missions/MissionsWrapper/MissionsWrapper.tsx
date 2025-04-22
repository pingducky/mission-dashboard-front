import React, { useState } from "react";
import Switch from "./Switch/Switch";
import MissionsList from "./MissionsList/MissionsList";
import styles from "./MissionsWrapper.module.scss";

type MissionTab = "upcoming" | "past";

const MissionsWrapper = () => {
  const [activeTab, setActiveTab] = useState<MissionTab>("upcoming");

  const allMissions = [
    {
      id: 1,
      date: "Lundi 24 Mars",
      time: "09:00",
      type: "Nettoyage vitres",
      place: "IUT Laval Bâtiment MMI",
      duration: "2h30",
      endTime: "10:30",
      team: "En équipe",
      teamMembers: ["John Smith", "Patricia Loev"],
    },
    {
      id: 2,
      date: "Mardi 25 Mars",
      time: "14:00",
      type: "Ménage réguliers",
      place: "Numidev",
      duration: "3h30",
      endTime: "17:30",
      team: "Seul",
    },
    {
      id: 3,
      date: "Lundi 10 Mars",
      time: "10:00",
      type: "Aspirateur bureau",
      place: "CCI Laval",
      duration: "1h00",
      endTime: "11:00",
      team: "Seul",
    },
  ];

  // 👉 ici on filtre selon le tab, voir avec chatgpt je comprend pas
  const filteredMissions =
    activeTab === "upcoming"
      ? allMissions.filter((m) => m.id <= 2) // ou toute logique métier réelle
      : allMissions.filter((m) => m.id >= 3);

  return (
    <div className={styles.missionWwrapper}>
      <Switch activeTab={activeTab} onTabChange={setActiveTab} />
      <MissionsList missions={filteredMissions} />
    </div>
  );
};

export default MissionsWrapper;
