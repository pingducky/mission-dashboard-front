import React from "react";
// import {Button} from "@mui/material";
import IconButtonStyle from "./IconButton.module.scss"

// Interface pour les props du bouton
interface IconButtonProps {
    text: string; // Le texte du bouton
    color?: string; // Couleur du texte
    fontWeight?: "regular" | "medium" | "semibold" | "bold"; // Poids de la police
    isActive?: boolean;
    isDisabled?: boolean;
    onClick?: () => void;
    specialClass?: string;
    startIcon?: React.ReactNode; // L'icône avant le texte
    variant: "ghost" | "outlined" | "filled"; // Nouveau variant pour le bouton
    buttonColor: "white" | "darkblue" | "blue" | "pink" | "black";
    isRounded: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
                                                   text,
                                                   fontWeight = "Normal", // Valeur par défaut pour fontWeight
                                                   isActive = false,
                                                   isDisabled = false,
                                                   onClick,
                                                   specialClass = "",
                                                   startIcon, // L'icône passée en prop
                                                   variant = "filled", // Valeur par défaut pour variant
                                                   buttonColor = "blue",
                                                   isRounded = true,// Valeur par défaut pour buttonColor
                                               }) => {

    // Classes dynamiques en fonction des props
    const buttonClass = `${specialClass} ${IconButtonStyle.iconButtonContainer} 
                          ${IconButtonStyle[variant]} 
                          ${IconButtonStyle[buttonColor]} 
                          ${isActive ? IconButtonStyle.active : ""} 
                          ${isDisabled ? IconButtonStyle.disabled : ""} 
                          ${IconButtonStyle[fontWeight]}
                          ${isRounded ? IconButtonStyle.rounded : ""}`;

    return (
        <button
            className={buttonClass}
            disabled={isDisabled}
            onClick={isDisabled ? undefined : onClick}
            // startIcon={startIcon}
            // sx={{color}} // Cette couleur pourrait aussi être gérée dans SCSS si tu veux
        >
            {startIcon && <span className={IconButtonStyle.iconBtn}>{startIcon}</span>}
            {text}
        </button>
    );
};

export default IconButton;
