import EditIcon from "@mui/icons-material/Edit";
import {IconButton} from "@mui/material";
import React from "react";

const PlanningPage: React.FC = () => {
    return (
        <div>
            <p>Planning page</p>
            <IconButton
                disabled={false}
                onClick={() => console.log("Clicked!")}
            >
                <EditIcon fontSize="large" /> {/* Ici, on met fontSize sur l'icône, pas le bouton */}
            </IconButton>
        </div>
    );
  };
  
export default PlanningPage;