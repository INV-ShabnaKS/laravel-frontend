import authHoc from '../hoc/authHoc';
import Navbar from '../components/Navbar';
import { Drawer, List, ListItem, ListItemText, Box } from '@mui/material';

const drawerWidth = 140;

function Dashboard() {
    const role = localStorage.getItem('role');
    const menuByRole = {
        admin: ['Teachers', 'Students'],
        teacher: ['Students'],
        student: ['My Profile']
    };
    const menuItems = menuByRole[role] || [];

  return (
    <>
      <Navbar />
      <Box sx={{ display: 'flex' }}>
        
      
        <Drawer variant="permanent" sx={{width: drawerWidth, flexShrink: 0,
            '& .MuiDrawer-paper': {width: drawerWidth,
              boxSizing: 'border-box',marginTop: '64px',alignItems:'center', justifyContent:'center'}
          }}>
          <List>
            {menuItems.map((item) => (
                <ListItem button key={item}>
                    <ListItemText primary={item} />
                </ListItem>))}
        </List>

        </Drawer>

        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            marginTop: '64px', 
            marginLeft: `${drawerWidth}px`
          }}
        >
          <h2>Hello</h2>
        </Box>
      </Box>
    </>
  );
}


export default authHoc(Dashboard);
