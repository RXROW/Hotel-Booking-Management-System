import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import MenuItem from '@mui/material/MenuItem';
import { Link, useNavigate } from 'react-router-dom';
import Avatar from '@mui/material/Avatar';
import Tooltip from '@mui/material/Tooltip';
import Button from '@mui/material/Button'; 
import { useAuthContext } from '../../../../context/AuthContext';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ViewModal from '../ViewModal/ViewModal';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useTheme } from '@mui/material/styles';
import { useColorMode } from '../../../../context/ThemeContext'; 


export default function NavbarUser() {
  const { profileImage,userName, email, phoneNumber, country} = useAuthContext();
  const navigate = useNavigate();
  const [active, setActive] = useState('home');
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  // const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();


  const token = localStorage.getItem('token'); 

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };
  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleAvatarClick = () => {
    setIsProfileModalOpen(true);
  };
  
  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false);
  };


  

  return (
    <AppBar
  className="UserNav"
  position="static"
  sx={{
    backgroundColor: theme.palette.background.paper, 
    color: theme.palette.text.secondary,
    position: 'sticky',
    top: 0,
    zIndex: 1000
  }}
>

      <Container maxWidth="xl">
        <Toolbar disableGutters>

          {/* Logo */}
          <Box sx={{ marginLeft: { lg: '150px', sm: '0' } }}>
            
          <Typography
            variant="h5"
            sx={{
              color: '#3252DF',
              fontWeight: 500,
            }}
          >
            Stay<span style={{
     
    color: theme.palette.mode === 'dark' ? '#ffffff' : 'black'
  }}>cation.</span>
          </Typography>
          </Box>

          {/* Mobile Menu */}
          <Box sx={{ flexGrow: 1, justifyContent: 'end', display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu}>
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorElNav}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'block', md: 'none' } }}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
              <MenuItem onClick={handleCloseNavMenu}>
                <Link  to='/' style={{
    textDecoration: "none", 
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#3252DF'
  }}
                >Home</Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link to='/explore-all-rooms' style={{
    textDecoration: "none", 
    color: theme.palette.mode === 'dark' ? '#ffffff' : '#3252DF'
  }}><Typography
    
  >
    Explore
  </Typography></Link>
              </MenuItem>

              {token ? (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to='/' style={{ textDecoration: 'none',color:"#152C5B" }}>Reviews</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link to='/favorites' style={{ textDecoration: 'none',color:"#152C5B" }}>Favorites</Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    
        <Box sx={{ display: "flex", alignItems: "center"}}>
          <Avatar alt="User Photo" src={profileImage} />
          <Typography sx={{ ml: 1, color: "black" }}>{userName}</Typography>
        </Box>
                    
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button component={Link} to="/auth/register" variant="contained" color="primary" fullWidth>
                      Register
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button component={Link} to="/auth/login" variant="contained" color="primary" fullWidth>
                      Login Now
                    </Button>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, justifyContent: 'end', alignItems: 'center', marginInline: '40px', display: { xs: 'none', md: 'flex' }, gap: 2 }}>
          <IconButton onClick={toggleColorMode}>
  {theme.palette.mode === 'dark' ? (
    <LightModeIcon sx={{ color: '#FFD700' }} />
  ) : (
    <DarkModeIcon sx={{ color: '#4B5563' }} />
  )}
</IconButton>

            <Link to='/' onClick={() => setActive('home')} className={`link ${active === 'home' ? 'active' : ''}`} style={{textDecoration:"none",color:"#3252DF"}}>Home</Link>
            <Link to='/explore-all-rooms' onClick={() => setActive('explore')} className={`link ${active === 'explore' ? 'active' : ''}`} style={{textDecoration:"none",color:"#152C5B"}}>Explore</Link>
            


            
            {token ? (
              <>
                <Link to='/' onClick={() => setActive('reviews')} className={`link ${active === 'reviews' ? 'active' : ''}`} style={{textDecoration:"none",color:"#152C5B"}}>Reviews</Link>
                <Link to='/favorites' onClick={() => setActive('favorites')} className={`link ${active === 'favorites' ? 'active' : ''}`} style={{textDecoration:"none",color:"#152C5B"}}>Favorites</Link>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
  <Tooltip title="View Profile">
    <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
      <Avatar alt="User" src={profileImage} />
      <Typography sx={{ ml: 1, color: "black" }}>{userName}</Typography>
    </IconButton>
  </Tooltip>

  <Tooltip title="Open Menu">
    <IconButton onClick={handleOpenUserMenu}>
      <ExpandMoreIcon sx={{ color: 'black' }} />
    </IconButton>
  </Tooltip>

  <Menu
    anchorEl={anchorElUser}
    open={Boolean(anchorElUser)}
    onClose={handleCloseUserMenu}
    sx={{ mt: '45px' }}
    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
  >
    <MenuItem onClick={handleLogout}>
      <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
    </MenuItem>
  </Menu>
</Box>

              </>
            ) : (
              <>
              <Button 
                component={Link} 
                to="/auth/register" 
                variant="contained" 
                sx={{ 
                  ml: 2, 
                  backgroundColor: '#3252DF',
                  '&:hover': { backgroundColor: '#2233aa' } 
                }}
              >
                Register
              </Button>

<Button 
  component={Link} 
  to="/auth/login" 
  variant="contained" 
  sx={{ 
    ml: 2, 
    backgroundColor: '#3252DF',
    '&:hover': { backgroundColor: '#2233aa' } 
  }}
>
  Login Now
</Button>

              </>
            )}
          </Box>
        </Toolbar>
      </Container>
      <ViewModal
  open={isProfileModalOpen}
  onClose={handleCloseProfileModal}
  title="User Profile"
  data={{
    Image: profileImage || '',
    Name: userName || 'No Name',
    Email: email ||'user@email.com', 
    Phone_Number: phoneNumber || '1XXXXXXXXXXXXXXX',
    Country: country || 'Country',


  }}
/>

    </AppBar>
    
  )
}
