import React, { useState } from "react";
import clsx from "clsx";
import {
  Drawer,
  //   List,
  //   ListItem,
  //   ListItemText,
  IconButton,
  //   Divider,
  //   Box,
  Button,
} from "@mui/material";
// import MenuIcon from "@mui/icons-material/Menu";
// import { Link } from "react-router-dom";
import LogoCClean53 from "../../../assets/images/LogoCClean53.png";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
// import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
// import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
// import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";
// import PersonOutlineOutlinedIcon from "@mui/icons-material/PersonOutlineOutlined";
// import LogoutOutlinedIcon from "@mui/icons-material/LogoutOutlined";

import styles from "./Sidebar.module.scss";

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
          <IconButton onClick={toggleDrawer} className={styles.toggleButton}>
            {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
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
                startIcon={<CalendarMonthOutlinedIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<CalendarMonthOutlinedIcon />}
              >
                Delete
              </Button>
            </div>
            {/* <hr/> */}
            <div className={styles.iconButtonList}>
              <Button
                variant="outlined"
                startIcon={<CalendarMonthOutlinedIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<CalendarMonthOutlinedIcon />}
              >
                Delete
              </Button>
              <Button
                variant="outlined"
                startIcon={<CalendarMonthOutlinedIcon />}
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
