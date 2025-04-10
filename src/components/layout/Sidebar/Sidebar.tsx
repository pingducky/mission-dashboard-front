import React, { useState } from "react";
import clsx from "clsx";

import LogoCClean53 from "../../../assets/images/LogoCClean53.png";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from "@mui/icons-material/Group";
import ListAltIcon from "@mui/icons-material/ListAlt";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import PersonOutlineIcon from "@mui/icons-material/PersonOutline";
import LogoutIcon from "@mui/icons-material/Logout";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeftOutlined";
import ChevronRightIcon from "@mui/icons-material/ChevronRightOutlined";

import styles from "./Sidebar.module.scss";
import { Drawer } from "@mui/material";
import IconButton from "../IconButton/IconButton";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

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
        data-isVisible={open}
        classes={{
          paper: clsx(open ? styles.drawerOpen : styles.drawerClosed),
        }}
      >
        <button onClick={toggleDrawer} className={styles.toggleButton}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </button>

        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          className={styles.sidebarContainer}
        >
          <div className={styles.logoSidebar}>
            <img src={LogoCClean53} alt="Logo" />
          </div>

          <div className={styles.profilSidebar}>
            <h2>Thomas Tronville </h2>
            <p>Ravie de te revoir !</p>
          </div>

          <div className={styles.iconButtonListParent}>
            
            <div className={styles.iconButtonList}>
              <hr />
              <IconButton
                startIcon={<CalendarMonthOutlinedIcon />}
                text="Planning"
                fontWeight="regular"
                onClick={() => console.log("Planning clicked!")}
                specialClass={styles.specialButton}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<GroupIcon />}
                text="Salarié"
                fontWeight="regular"
                onClick={() => console.log("Planning clicked!")}
                specialClass={styles.specialButton}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<ListAltIcon />}
                text="Liste missions"
                fontWeight="regular"
                onClick={() => console.log("Planning clicked!")}
                specialClass={styles.specialButton}
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
                onClick={() => console.log("Planning clicked!")}
                specialClass={styles.specialButton}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<PersonOutlineIcon />}
                text="Compte"
                fontWeight="regular"
                onClick={() => console.log("Planning clicked!")}
                specialClass={styles.specialButton}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<LogoutIcon />}
                text="Se déconnecter"
                fontWeight="regular"
                onClick={() => console.log("Planning clicked!")}
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
