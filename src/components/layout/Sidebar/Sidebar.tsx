import React, { useState, useRef, useEffect } from "react";
import clsx from "clsx";

import LogoCClean53 from "../../../assets/images/LogoCClean53.png";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRightOutlined";
import { Drawer } from "@mui/material";
import IconButton from "../IconButton/IconButton";
import styles from "./Sidebar.module.scss";
import DisplayProfilName from "../../sidebar/profilName/displayProfilName";

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
}

const Sidebar: React.FC<SidebarProps> = ({ activePage, name, firstname, isLoading, onMenuClick }) => {
  const [open, setOpen] = useState(true);
  const drawerRef = useRef<HTMLDivElement>(null);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  // Ajout de la détection de clic extérieur (pour mobile)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const isMobile = window.innerWidth <= 768;
      if (
        open &&
        isMobile &&
        drawerRef.current &&
        !drawerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  return (
    <>
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="permanent"
        className={clsx(
          styles.drawer,
          open ? styles.drawerOpen : styles.drawerClosed
        )}
        data-isvisible={open}
        classes={{
          paper: clsx(
            styles.drawer,
            open ? styles.drawerOpen : styles.drawerClosed
          ),
        }}
      >
        <button onClick={toggleDrawer} className={styles.toggleButton}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>

        <div role="presentation" className={styles.sidebarContainer} ref={drawerRef}>
          <div className={styles.logoSidebar}>
            <img src={LogoCClean53} alt="Logo" />
          </div>

          {!isLoading && name && firstname && <DisplayProfilName name={firstname} firstname={name}/>}

          <div className={styles.iconButtonListParent}>
            <div className={styles.iconButtonList}>
              <hr />
              <IconButton
                startIcon={<HomeOutlinedIcon />}
                text="Tableau de bord"
                fontWeight="regular"
                onClick={() => onMenuClick("dashboard")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "dashboard",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<CalendarMonthOutlinedIcon />}
                text="Planning"
                fontWeight="bold"
                onClick={() => onMenuClick("planning")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "planning",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<GroupIcon />}
                text="Salarié"
                fontWeight="medium"
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "salarie",
                })}
                onClick={() => onMenuClick("salarie")}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<ListAltIcon />}
                text="Liste missions"
                fontWeight="regular"
                onClick={() => onMenuClick("missions")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "missions",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />
            </div>

            <div className={styles.iconButtonList}>
              <hr />
              <IconButton
                startIcon={<NotificationsNoneIcon />}
                text="Notifications"
                fontWeight="regular"
                onClick={() => onMenuClick("notifications")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "notifications",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<NotificationsNoneIcon />}
                text="Notifications"
                fontWeight="regular"
                onClick={() => onMenuClick("salarieCreation")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "notifications",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />


              <IconButton
                startIcon={<PersonOutlineIcon />}
                text="Compte"
                fontWeight="regular"
                onClick={() => onMenuClick("compte")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activePage == "compte",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<LogoutIcon />}
                text="Se déconnecter"
                fontWeight="regular"
                onClick={() => onMenuClick("logout")}
                specialClass={styles.specialButton}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
