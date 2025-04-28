import { useState } from "react";
import Switch from "./Switch/Switch";
import MissionsList, { MissionCard } from "./MissionsList/MissionsList";
import { getUserDataFromToken } from "../../../utils/auth";
import { MissionModel, useGetMissionsByAccount } from "../../../hooks/useGetMissionsByAccount";
import styles from "./MissionsListSwitch.module.scss";
import { safeDate } from "../../../utils/dates";

type MissionTab = "upcoming" | "past"

const MissionsListSwitch = () => {
  const [activeTab, setActiveTab] = useState<MissionTab>("upcoming");

  const tokenData = getUserDataFromToken();

  const { data: missions, isLoading } = useGetMissionsByAccount({
    accountId: tokenData!.id,
    filters: ["past", "current", "future"],
    limit: 2,
  });

  console.debug("missions :", missions);
  const formatMission = (mission: MissionModel) => {

    return {
      id: mission.id,
      startDate: safeDate(mission.timeBegin)!,
      estimatedEndDate: safeDate(mission.estimatedEnd),
      endDate: safeDate(mission.timeEnd),
      type: mission.missionType?.longLibel || "Type inconnu",
      place: mission.address,
      team: "Seul",
    };
  };

  let selectedMissions: MissionCard[] = [];

  if (!isLoading && missions) {
    if (activeTab === "past") {
      selectedMissions = missions.past
        ?.slice(-2)
        .reverse()
        .map(formatMission);
    } else {
      selectedMissions = [...(missions.current || []), ...(missions.future || [])]
        .slice(0, 2)
        .map(formatMission);
    }
  }

  return (
    !isLoading && (
      <div className={styles.missionWwrapper}>
        <Switch activeTab={activeTab} onTabChange={setActiveTab} />
        <MissionsList missions={selectedMissions} />
      </div>
    )
  );
};

export default MissionsListSwitch;