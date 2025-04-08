import React from "react";
import styles from "./IconButton.module.scss";
import clsx from "clsx";

interface IconButtonProps {
  text: string; // Le texte du bouton
  color?: string; // Couleur du texte
  fontWeight?: "regular" | "medium" | "semibold" | "bold"; // Poids de la police
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  specialClass?: string;
  startIcon?: React.ReactNode;
  variant: "ghost" | "outlined" | "filled";
  buttonColor: "white" | "darkblue" | "blue" | "pink" | "black";
  isRounded: boolean;
}

const IconButton: React.FC<IconButtonProps> = ({
  text,
  fontWeight = "Normal",
  isActive = false,
  isDisabled = false,
  onClick,
  specialClass = "",
  startIcon,
  variant = "filled",
  buttonColor = "blue",
  isRounded = true,
}) => {
  const buttonClass = clsx(
    specialClass,
    styles.iconButtonContainer,
    styles[variant],
    styles[buttonColor],
    styles[fontWeight],
    {
      [styles.active]: isActive,
      [styles.disabled]: isDisabled,
      [styles.rounded]: isRounded,
    }
  );

  return (
    <button
      className={buttonClass}
      disabled={isDisabled}
      onClick={isDisabled ? undefined : onClick}
    >
      {startIcon && <span className={styles.iconBtn}>{startIcon}</span>}
      {text}
    </button>
  );
};
export default IconButton;
