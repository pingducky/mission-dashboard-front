import React, {useState} from 'react';
import {Drawer, List, ListItem, ListItemText, IconButton, Divider, Box} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import {Link} from 'react-router-dom';
import SidebarStyle from './Sidebar.module.scss'
import LogoCClean53 from '../../../assets/images/LogoCClean53.png'
import CalendarMonthOutlinedIcon from '@mui/icons-material/CalendarMonthOutlined';
import GroupsOutlinedIcon from '@mui/icons-material/GroupsOutlined';
import ListAltOutlinedIcon from '@mui/icons-material/ListAltOutlined';
import NotificationsNoneOutlinedIcon from '@mui/icons-material/NotificationsNoneOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import LogoutOutlinedIcon from '@mui/icons-material/LogoutOutlined';

const Sidebar: React.FC = () => {
    const [open, setOpen] = useState(true);

    const toggleDrawer = () => {
        setOpen(!open);
    };

    return (
        <div>
            {/* IconButton to toggle the drawer */}
            <IconButton color="primary" onClick={toggleDrawer}>
                <MenuIcon/>
            </IconButton>

            {/* Drawer component */}
            <Drawer
                anchor="left"
                open={open}
                onClose={toggleDrawer}
            >
                <div style={{width: 250, display: 'flex', flexDirection: 'column', height: '100%'}} role="presentation"
                     onClick={toggleDrawer} onKeyDown={toggleDrawer}>
                    {/* Logo at the top */}
                    <Box sx={{padding: 2, display: 'flex', justifyContent: 'center'}}>
                        <img src={LogoCClean53} alt="Logo" style={{}}/>
                    </Box>

                    <Box sx={{padding: 2, display: 'flex', justifyContent: 'center'}}>
                        <div>

                        </div>
                        <div>
                            <h2>Thomas Tronville </h2>
                            <p>Ravie de te revoir !</p>
                        </div>
                    </Box>
                    <Divider/>
                    <List className={SidebarStyle.listMenu}>
                        <ListItem component={Link} to="/planning">
                            <CalendarMonthOutlinedIcon/>
                            <ListItemText primary="Planning"/>
                        </ListItem>
                        <ListItem component={Link} to="/salaries">
                            <GroupsOutlinedIcon/>
                            <ListItemText primary="Salariés"/>
                        </ListItem>
                        <ListItem component={Link} to="/liste-missions">
                            <ListAltOutlinedIcon/>
                            <ListItemText primary="Liste missions"/>
                        </ListItem>
                    </List>


                    {/* Box to push the next list items to the bottom */}
                    <Box sx={{marginTop: 'auto'}}>
                        <Divider/>
                        <List>
                            <ListItem component={Link} to="/settings">
                                <NotificationsNoneOutlinedIcon/>
                                <ListItemText primary="Notifications"/>
                            </ListItem>
                            <ListItem component={Link} to="/settings">
                                <PersonOutlineOutlinedIcon/>
                                <ListItemText primary="Compte"/>
                            </ListItem>
                            <ListItem component={Link} to="/logout">
                                <LogoutOutlinedIcon/>
                                <ListItemText primary="Se déconnecter"/>
                            </ListItem>
                        </List>
                    </Box>
                </div>
            </Drawer>
        </div>
    );
};

export default Sidebar;
