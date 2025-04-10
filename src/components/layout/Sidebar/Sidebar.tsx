import React, { useState } from "react";
import clsx from "clsx";

import LogoCClean53 from "../../../assets/images/LogoCClean53.png";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import GroupIcon from '@mui/icons-material/Group';
import ListAltIcon from '@mui/icons-material/ListAlt';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';

import styles from "./Sidebar.module.scss";
import { Button, Drawer } from "@mui/material";
const Sidebar: React.FC = () => {
  const [open, setOpen] = useState(true);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <>
      {/* Drawer component */}
      <Drawer
        anchor="left"
        open={open}
        onClose={toggleDrawer}
        variant="permanent"
        className={clsx(
          styles.drawer,
          open ? styles.drawerOpen : styles.drawerClosed
        )}
        classes={{
          paper: clsx(open ? styles.drawerOpen : styles.drawerClosed),
        }}
      >
        {/* Bouton centré verticalement à droite */}
        <div className={styles.toggleButton}>
          {/* <IconButton onClick={toggleDrawer} className={styles.toggleButton}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton> */}
        </div>

        <div
          role="presentation"
          onClick={toggleDrawer}
          onKeyDown={toggleDrawer}
          className={styles.sidebarContainer}
        >
          {/* Logo at the top */}
          {/* <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}> */}
          {open && (
            <div className={styles.logoSidebar}>
              <img src={LogoCClean53} alt="Logo" />
            </div>
          )}

          {/* </Box> */}

          {/* <Box sx={{ padding: 2, display: "flex", justifyContent: "center" }}> */}
          {open && (
            <div className={styles.profilSidebar}>
              <h2>Thomas Tronville </h2>
              <p>Ravie de te revoir !</p>
            </div>
          )}

          <hr />

          {/* <List className={styles.listMenu}> */}
          <div className={styles.iconButtonListParent}>
            <div className={styles.iconButtonList}>
              <Button
                variant="outlined"
                startIcon={<CalendarMonthOutlinedIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<GroupIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<ListAltIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<ShowChartIcon />}
              >
                Delete
              </Button>
            </div>
            {/* <hr/> */}
            <div className={styles.iconButtonList}>
            <Button
                variant="outlined"
                startIcon={<NotificationsNoneIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<PersonOutlineIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<LogoutIcon />}
              >
                Delete
              </Button>
            </div>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
