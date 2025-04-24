import styles from "./Switch.module.scss";
import IconButton from "../../../layout/IconButton/IconButton";
import clsx from "clsx";

type MissionTab = "upcoming" | "past";

type SwitchProps = {
  /**
   * Filtre actif : "Prochaines missions" ou "Missions passées"
   */
  activeTab: MissionTab;
  /**
   * Filtre changeant
   */
  onTabChange: (tab: MissionTab) => void;
};

const Switch = ({ activeTab, onTabChange }: SwitchProps) => {
  return (
    <div className={styles.switchContainer}>
      <div
        className={clsx(styles.switchBackground, {
          [styles.translateRight]: activeTab === "past",
        })}
      />
      <IconButton
        text="Prochaines missions"
        onClick={() => onTabChange("upcoming")}
        specialClass={clsx(styles.buttonSwitch, {
          [styles.active]: activeTab == "upcoming",
        })}
        variant={"ghost"}
        color={"black"}
        isRounded={false}
      />
      <IconButton
        text="Missions passées"
        onClick={() => onTabChange("past")}
        specialClass={clsx(styles.buttonSwitch, {
          [styles.active]: activeTab == "past",
        })}
        variant={"ghost"}
        color={"black"}
        isRounded={false}
      />
    </div>
  );
};

export default Switch;
