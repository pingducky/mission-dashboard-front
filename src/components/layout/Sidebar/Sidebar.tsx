import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import LogoCClean53 from "../../../assets/images/LogoCClean53.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import WorkHistoryOutlinedIcon from '@mui/icons-material/WorkHistoryOutlined';
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRightOutlined";
import { Drawer } from "@mui/material";
import IconButton from "../IconButton/IconButton";
import DisplayProfilName from "./profilName/displayProfilName";
import styles from "./Sidebar.module.scss";

interface SidebarProps {
  /**
   * Nom
   */
  name?: string,
  /**
   * Prénom
   */
  firstname?: string,
  /**
   * Page active
   */
  activePage: string;
  /**
   * Information du profil en chargement
   */
  isLoading: boolean
  /**
   * Props pour gérer les clicks
   */
  onMenuClick: (page: string) => void;
  /**
   * Vérifier si admin
   */
  isAdmin?: boolean; 
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, name, firstname, isLoading, onMenuClick, isAdmin }) => {
  const [isOpen, setIsOpen] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setIsOpen(!isOpen);
  };

  // Ajout de la détection de clic extérieur (pour mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isMobile = window.innerWidth <= 768;
      if (
        isOpen &&
        isMobile &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <>
      <Drawer
        anchor="left"
        open={isOpen}
        onClose={toggleDrawer}
        variant="permanent"
        className={clsx(
          styles.drawer,
          isOpen ? styles.drawerOpen : styles.drawerClosed
        )}
        data-isvisible={isOpen}
        classes={{
          paper: clsx(
            styles.drawer,
            isOpen ? styles.drawerOpen : styles.drawerClosed
          ),
        }}
      >
        <button onClick={toggleDrawer} className={styles.toggleButton}>
          {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>

        <div role="presentation" className={styles.sidebarContainer} ref={drawerRef}>
          <div className={styles.logoSidebar}>
            <img src={LogoCClean53} alt="Logo" />
          </div>

          {isOpen && !isLoading && name && firstname && isAdmin && <DisplayProfilName name={firstname} firstname={name} isAdmin={isAdmin}/>}

          <div className={styles.iconButtonListParent}>
            <div className={styles.iconButtonList}>
              <hr />
              <IconButton
                startIcon={<HomeOutlinedIcon />}
                text="Tableau de bord"
                fontWeight="medium"
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
                isActive={activePage === "dashboard"}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "dashboard",
                })}
                onClick={() => onMenuClick("dashboard")}
              />

              <IconButton
                startIcon={<CalendarMonthOutlinedIcon />}
                text="Planning"
                fontWeight="medium"
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
                isActive={activePage === "planning"}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "planning",
                })}
                onClick={() => onMenuClick("planning")}
              />
              <IconButton
                startIcon={<WorkHistoryOutlinedIcon />}
                text="Suivi des Heures"
                fontWeight="medium"
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
                isActive={activePage === "pointage"}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "pointage",
                })}
                onClick={() => onMenuClick("pointage")}
              />
              {isAdmin && (
                <>
                  <IconButton
                    startIcon={<GroupIcon />}
                    text="Salarié"
                    fontWeight="medium"
                    isDisabled={false}
                    variant={"ghost"}
                    color={"darkGray"}
                    isRounded={false}
                    isActive={activePage === "salarie"}
                    specialClass={clsx(styles.specialButton, {
                      [styles.active]: activePage == "salarie",
                    })}
                    onClick={() => onMenuClick("salarie")}
                  />

                  <IconButton
                    startIcon={<ListAltIcon />}
                    text="Liste missions"
                    fontWeight="medium"
                    isDisabled={false}
                    variant={"ghost"}
                    color={"darkGray"}
                    isRounded={false}
                    isActive={activePage === "missions"}
                    specialClass={clsx(styles.specialButton, {
                      [styles.active]: activePage == "missions",
                    })}
                    onClick={() => onMenuClick("missions")}
                  />
                </>
              )}
            </div>

            <div className={styles.iconButtonList}>
              <hr />
              <IconButton
                startIcon={<NotificationsNoneIcon />}
                text="Notifications"
                fontWeight="medium"
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
                isActive={activePage === "notifications"}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "notifications",
                })}
                onClick={() => onMenuClick("notifications")}
              />

              <IconButton
                startIcon={<PersonOutlineIcon />}
                text="Compte"
                fontWeight="medium"
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
                isActive={activePage === "compte"}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "compte",
                })}
                onClick={() => onMenuClick("compte")}
              />

              <IconButton
                startIcon={<LogoutIcon />}
                text="Se déconnecter"
                fontWeight="medium"
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
                specialClass={styles.specialButton}
                onClick={() => onMenuClick("logout")}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
