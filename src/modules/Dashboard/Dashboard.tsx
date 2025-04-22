import { Grid, Button, Typography } from '@mui/material';
import { useAuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const { loginData, userName, profileImage, logout } = useAuthContext();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <h1>{loginData?.role === "admin" ? (<Typography>Hello Admin</Typography>) : (<Typography>Hello User</Typography>)} {userName ? userName : 'Loading'}</h1>
        {profileImage && <img src={profileImage} alt="IMG" width={100} />}
      </Grid>
      <Grid container spacing={0}>
      <Button onClick={handleLogout} variant="contained" color="primary">
  Log out
</Button>

      </Grid>
    </Grid>
  );
};

export default Dashboard;