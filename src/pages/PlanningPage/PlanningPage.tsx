import React from "react";
import IconButton from "../../components/layout/IconButton/IconButton"; // Importer ton composant personnalisé
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import styles from "./PlanningPage.module.scss";

const PlanningPage: React.FC = () => {
  return (
    <div>
      <p>Planning page</p>
      <IconButton
        startIcon={<CalendarMonthOutlinedIcon />}
        text="Planning"
        fontWeight="regular"
        onClick={() => console.log("Planning clicked!")}
        specialClass={styles.specialButton}
        isDisabled={false}
        variant={"filled"}
        buttonColor={"blue"}
        isRounded={false}
      />
    </div>
  );
};

export default PlanningPage;
