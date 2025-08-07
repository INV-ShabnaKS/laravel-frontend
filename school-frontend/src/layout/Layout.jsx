import React from 'react';
import Navbar from '../components/Navbar';
import { useNavigate } from "react-router-dom";
import { Box, Drawer, List, ListItemText, ListItemButton } from '@mui/material';
import { useAuth } from '../context/AuthContext';
const drawerWidth = 180;

function Layout({ children }) {
    const navigate = useNavigate();
    const {auth}=useAuth()
    const menuByRole = {
        admin: ['Teachers', 'Students'],
        teacher: ['Students'],
        student: ['Students']
    };
    const menuItems = menuByRole[auth.role] || [];

    return (
        <>
          <Navbar />
          <Box sx={{ display: 'flex' }}>
            <Drawer
              variant="permanent"
              sx={{
                width: drawerWidth,
                flexShrink: 0,
                '& .MuiDrawer-paper': {
                  width: drawerWidth,
                  boxSizing: 'border-box',
                  marginTop: '64px',justifyContent:'center',alignItems:'center'
                }
              }}>
                <List>
                    {menuItems.map((item) => (
                        <ListItemButton key={item} onClick={() => navigate(`/${item.toLowerCase().replace(" ", "")}`)}>
                            <ListItemText primary={item} />
                        </ListItemButton>))}
                </List>
            </Drawer>
            <Box
            component="main"
            sx={{
                flexGrow: 1,
                p: 3,
                marginTop: '64px',
                
            }}>
                {children}
            </Box>
        </Box>
    </>
  );
}

export default Layout;
