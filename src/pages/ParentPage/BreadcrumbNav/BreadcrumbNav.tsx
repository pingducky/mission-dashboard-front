import React from "react";
import { Breadcrumbs, Link } from "@mui/material";
import ChevronRightOutlinedIcon from "@mui/icons-material/ChevronRightOutlined";
import styles from "./BreadcrumbNav.module.scss"

type BreadcrumbItem = {
  /**
   * Texte affiché pour l’élément de la breadcrumb
   */
  label: string;
  /**
   * Chemin ou identifiant de la page liée à cet élément
   */
  page: string;
  /**
   * Identifiant unique optionnel de l’élément breadcrumb
   */
  id?: string;
};

interface BreadcrumbNavProps {
  /**
   * Liste des items du fil d'ariane
   */
  items: BreadcrumbItem[];
  /**
   * Evenement lors du click sur un élément du fil d'ariane
   */
  onBreadcrumbClick: (index: number) => void;
}

const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, onBreadcrumbClick }) => {
    const homeItem = { label: "Accueil", page: "dashboard" };
  
    return (
      <Breadcrumbs
        aria-label="breadcrumb"
        separator={<ChevronRightOutlinedIcon fontSize="small" />}
        className={styles.breadcrumbs}
      >
        <Link
          color="inherit"
          href="#"
          onClick={(e) => {
            e.preventDefault();
            onBreadcrumbClick(-1);
          }}
        >
          {homeItem.label}
        </Link>
  
        {items.map((item, index) =>
          index === items.length - 1 ? (
            <p key={index} className={styles.current}>
              {item.label}
            </p>
          ) : (
            <Link
              key={index}
              color="inherit"
              href="#"
              onClick={(e) => {
                e.preventDefault();
                onBreadcrumbClick(index);
              }}
            >
              {item.label}
            </Link>
          )
        )}
      </Breadcrumbs>
    );
  };

export default BreadcrumbNav;
