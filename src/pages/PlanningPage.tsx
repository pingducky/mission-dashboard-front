import EditIcon from "@mui/icons-material/Edit";
import {IconButton} from "@mui/material";
import React from "react";

const PlanningPage: React.FC = () => {
    return (
        <div>
            <p>Planning page</p>
            <IconButton
                fontSize="large"
                disabled={false} // ou `true` pour désactiver
                onClick={() => console.log("Clicked!")}
            >
                <EditIcon />
            </IconButton>
        </div>
    );
  };
  
export default PlanningPage;