import React from "react";
import clsx from "clsx";
import styles from "./IconButton.module.scss";

type fontWeight = "regular" | "medium" | "semibold" | "bold";
type variant = "ghost" | "outlined" | "filled";
type color = "white" | "darkblue" | "blue" | "pink" | "black" | "darkGray" | "red" | "lightGray";

interface IconButtonProps {
  /**
   * Texte affiché dans le bouton
   */
  text: string;
  /**
   * Épaisseur de la police (ex. : 'normal', 'bold', etc.)
   */
  fontWeight?: fontWeight;
  /**
   * Détermine si le bouton est actif (état visuel ou fonctionnel)
   */
  isActive?: boolean;
  /**
   * Désactive le bouton s'il est défini sur true
   */
  isDisabled?: boolean;
  /**
   * Classe CSS supplémentaire à appliquer au bouton
   */
  specialClass?: string;
  /**
   * Icône affichée avant le texte (au début du bouton)
   */
  startIcon?: React.ReactNode;
  /**
   * Variante de style du bouton (ex. : 'outlined', 'contained', etc.)
   */
  variant: variant;
  /**
   * Couleur principale du bouton (ex. : 'primary', 'secondary', etc.)
   */
  color?: color;
  /**
   * Si true, rend les bords du bouton arrondis
   */
  isRounded: boolean;
  /**
   * Fonction appelée lors du clic sur le bouton
   */
  onClick?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}


const IconButton: React.FC<IconButtonProps> = ({
  text,
  fontWeight = "regular",
  isActive = false,
  isDisabled = false,
  specialClass,
  startIcon,
  variant = "filled",
  color  = "blue",
  isRounded = true,
  onClick,
}) => {
  const buttonClass = clsx(
    specialClass,
    styles.iconButtonContainer,
    styles[variant],
    styles[color],
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
      {
        startIcon && <span className={styles.iconBtn}>
            {startIcon}
          </span>
        }
        {
          text && <span className={`iconTextGlobal ${styles.iconText}`}>
            {text}
          </span>
  }
    </button>
  );
};

export default IconButton;
