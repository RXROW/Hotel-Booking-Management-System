 
import NavbarUser from '../NavbarUsers/NavbarUser';
import { Outlet } from 'react-router-dom';
import Footer from '../Footer/Footer';
import { Box, Divider } from '@mui/material'; 

const UserLayout = () => {
  return (
    <>
      <NavbarUser />
      <Box sx={{ minHeight: '80vh', padding: { xs: 0, md: 5 } }}>
      <Outlet />
      </Box>
      <Divider sx={{marginTop:8}} />
      <Footer />
    </>
  );
}

export default UserLayout;
