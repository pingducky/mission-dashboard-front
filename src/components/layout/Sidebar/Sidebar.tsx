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
import { Drawer } from "@mui/material";
import IconButton from "../IconButton/IconButton";

import styles from "./Sidebar.module.scss";

const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const [activeButton, setActiveButton] = useState<string>("");

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
    console.log(`${buttonName} clicked!`);
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
          // onClick={toggleDrawer}
          // onKeyDown={toggleDrawer}
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
                fontWeight="bold"
                onClick={() => handleClick("planning")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activeButton === "planning",
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
                onClick={() => handleClick("employees")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activeButton === "employees",
                })}
                isDisabled={false}
                variant={"ghost"}
                color={"darkGray"}
                isRounded={false}
              />

              <IconButton
                startIcon={<ListAltIcon />}
                text="Liste missions"
                fontWeight="regular"
                onClick={() => handleClick("ListMissions")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activeButton === "ListMissions",
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
                onClick={() => handleClick("notifications")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activeButton === "notifications",
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
                onClick={() => handleClick("compte")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activeButton === "compte",
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
                onClick={() => handleClick("deconnexion")}
                specialClass={clsx(styles.specialButton, {
                  [styles.active]: activeButton === "deconnexion",
                })}
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
