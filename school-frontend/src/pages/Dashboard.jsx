import authHoc from '../hoc/authHoc';
import Layout from '../layout/Layout';
import { useAuth } from '../context/AuthContext';
import { Typography, Box } from '@mui/material';

function Dashboard() {
  const { auth } = useAuth();
  const user = auth?.user;

  return (
    <Layout>
      {user && (
        <Box sx={{minHeight: '100vh', width:'100%', display: 'flex', justifyContent: 'center', alignItems: 'center',  
             padding: 0}}>
            <Box sx={{ width: '100%', maxWidth: 400 }}>

                <Typography variant="h5"sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                          Welcome to {auth.role} Panel
                </Typography><br/>
                <Typography variant="h7"sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                          Username: {user.username}
                </Typography><br/>
                <Typography variant="h7"sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                          User ID: {user.id}
                </Typography><br/>
                <Typography variant="h7"sx={{ mb: 2, fontWeight: 'bold', textAlign: 'center' }}>
                          Email: {user.email}
                </Typography>

            </Box>
        </Box>
      )}
    </Layout>
  );
}

export default authHoc(Dashboard);
