"use client";
import { useState } from "react";
import styles from "./Sidebar.module.scss";
import { LuChevronLeft, LuChevronRight } from "react-icons/lu";

import MenuProfil from "@/components/ProfileComponents/Menu/Menu";

interface SidebarProps {
  // role: "user" | "artisan";
  isOpen: boolean; // Paramètre pour contrôler l'état ouvert/fermé
  toggleSidebar: () => void; // Fonction pour gérer le toggle
  children: React.ReactNode; // Pour injecter du contenu
  location: "right" | "left";
}

export default function Sidebar({
  isOpen,
  toggleSidebar,
  children,
  location = "left",
}: SidebarProps) {
  // const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // const toggleSidebar = () => {
  //   setIsSidebarOpen(!isSidebarOpen);
  // };

  return (
    <div
      className={`
        ${styles.sidebarContainer} 
        ${isOpen ? styles.sidebarOpen : styles.sidebarClosed}
        ${location === "right" ? styles.sidebarRight : styles.sidebarLeft}
      `}
    >
      <button
        onClick={toggleSidebar}
        className={styles.toggleButton}
        aria-label={isOpen ? "Fermer le menu" : "Ouvrir le menu"}
      >
        {/* {isOpen ? (location === "right" ? <LuChevronRight /> : <LuChevronLeft />) : (location === "right" ? <LuChevronLeft /> : <LuChevronRight />)} */}
        {location === "left" ? (isOpen ? <LuChevronLeft /> : <LuChevronRight />) : (isOpen ? <LuChevronRight /> : <LuChevronLeft />)}
      </button>
      <div className={styles.sidebarContent}>
        {children} {/* Permet d'insérer le composant que l'on souhaite */}
      </div>
    </div>
  );
}
