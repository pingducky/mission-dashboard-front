import React from "react";
import {IconButton as MUIButton} from "@mui/material";
import {SxProps} from "@mui/system";

interface IconButtonProps {
    icon: React.ReactNode; // L'icône passée en prop (ex: <DeleteIcon />)
    fontSize?: "lg" | "md" | "sm"; // Taille de l'icône
    color?: string; // Couleur du bouton
    isActive?: boolean; // État actif du bouton
    isDisabled?: boolean; // Désactive le bouton
    onClick?: () => void; // Gestion des clics
    className?: string; // Classe CSS supplémentaire
}

const fontSizeMap = {
    lg: "var(--font-size-lg)",
    md: "var(--font-size-md)",
    sm: "var(--font-size-sm)",
};

const IconButton: React.FC<IconButtonProps> = ({
                                                   icon,
                                                   fontSize = "md",
                                                   color = "var(--color-primary)",
                                                   isActive = false,
                                                   isDisabled = false,
                                                   onClick,
                                                   className = "",
                                               }) => {
    const styles: SxProps = {
        fontSize: fontSizeMap[fontSize],
        color: isActive ? "var(--color-secondary)" : color,
        opacity: isDisabled ? 0.5 : 1,
        cursor: isDisabled ? "not-allowed" : "pointer",
        transition: "0.3s ease-in-out",
        "&:hover": {
            opacity: isDisabled ? 0.5 : 0.8,
        },
    };

    return (
        <MUIButton
            sx={styles}
            disabled={isDisabled}
            onClick={isDisabled ? undefined : onClick}
            className={className}
        >
            {icon}
        </MUIButton>
    );
};

export default IconButton;
