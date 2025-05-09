// @ts-nocheck
import React, { useState } from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import MenuItem from '@mui/material/MenuItem'
import { Link, useNavigate } from 'react-router-dom'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Button from '@mui/material/Button'
import { useAuthContext } from '../../../../context/AuthContext'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ViewModal from '../ViewModal/ViewModal'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useTheme } from '@mui/material/styles'
import { useColorMode } from '../../../../context/ThemeContext'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import Commonheader from '../commonheader/Commonheader'

export default function NavbarUser() {
  const { profileImage, userName, email, phoneNumber, country } =
    useAuthContext()
  const navigate = useNavigate()
  const [active, setActive] = useState('home')
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false)
  // const [darkMode, setDarkMode] = useState(false);
  const theme = useTheme()
  const getLinkStyle = (isActive: boolean, theme: Theme) => ({
    textDecoration: 'none',
    color: isActive
      ? theme.palette.mode === 'light'
        ? '#3252DF'
        : '#1976d2'
      : theme.palette.text.primary,
    fontWeight: isActive ? 600 : 400,
    padding: '8px 16px',
    borderRadius: '8px',
    backgroundColor: isActive
      ? theme.palette.mode === 'light'
        ? 'rgba(50, 82, 223, 0.1)'
        : 'rgba(25, 118, 210, 0.1)'
      : 'transparent',
    transition: 'all 0.3s ease',
    display: 'block',
    position: 'relative',
    '&:hover': {
      backgroundColor:
        theme.palette.mode === 'light'
          ? 'rgba(50, 82, 223, 0.05)'
          : 'rgba(25, 118, 210, 0.05)',
    },
    ...(isActive && {
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        height: '2px',
        backgroundColor: theme.palette.mode === 'light' ? '#3252DF' : '#1976d2',
        borderRadius: '2px',
      },
    }),
  })

  const token = localStorage.getItem('token')

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget)
  }
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget)
  }
  const handleCloseNavMenu = () => {
    setAnchorElNav(null)
  }
  const handleCloseUserMenu = () => {
    setAnchorElUser(null)
  }
  const handleLogout = () => {
    localStorage.removeItem('token')
    navigate('/')
  }

  const handleAvatarClick = () => {
    setIsProfileModalOpen(true)
  }

  const handleCloseProfileModal = () => {
    setIsProfileModalOpen(false)
  }
  console.log(active)
  return (
    <AppBar
      className="UserNav"
      position="static"
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#fff' : '#1e1e1e',
        color: theme.palette.text.primary,
        position: 'sticky',
        top: 0,
        zIndex: 1000,
        boxShadow:
          theme.palette.mode === 'light'
            ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
            : '0px 2px 4px rgba(255, 255, 255, 0.05)',
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Logo */}
          <Box sx={{ marginLeft: { lg: '150px', sm: '0' } }}>
            <Commonheader />
          </Box>

          {/* Mobile Menu */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              display: { xs: 'flex', md: 'none' },
            }}
          >
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
                <Link
                  to="/"
                  onClick={() => setActive('home')}
                  style={getLinkStyle(active === 'home', theme)}
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/explore-all-rooms"
                  onClick={() => setActive('explore')}
                  style={getLinkStyle(active == 'explore', theme)}
                >
                  Explore
                </Link>
              </MenuItem>

              {token ? (
                <>
                  {/* <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/re"
                      style={{
                        textDecoration: 'none',
                        color:
                          theme.palette.mode === 'light'
                            ? '#3252DF'
                            : '#1976d2',
                      }}
                    >
                      Reviews
                    </Link>
                  </MenuItem> */}
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/favorites"
                      onClick={() => setActive('favorites')}
                      style={getLinkStyle(active === 'favorites', theme)}
                    >
                      Favorites
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt="User Photo" src={profileImage} />
                      <Typography
                        sx={{ ml: 1, color: theme.palette.text.primary }}
                      >
                        {userName}
                      </Typography>
                    </Box>
                  </MenuItem>
                  <MenuItem onClick={handleLogout}>
                    <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
                  </MenuItem>
                </>
              ) : (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button
                      component={Link}
                      to="/auth/register"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Register
                    </Button>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Button
                      component={Link}
                      to="/auth/login"
                      variant="contained"
                      color="primary"
                      fullWidth
                    >
                      Login Now
                    </Button>
                  </MenuItem>
                </>
              )}
            </Menu>
          </Box>

          {/* Desktop Menu */}
          <Box
            sx={{
              flexGrow: 1,
              justifyContent: 'end',
              alignItems: 'center',
              marginInline: '40px',
              display: { xs: 'none', md: 'flex' },
              gap: 2,
            }}
          >
            <ThemeToggle />

            <Link
              to="/"
              onClick={() => setActive('home')}
              style={getLinkStyle(active === 'home', theme)}
            >
              Home
            </Link>
            <Link
              to="/explore-all-rooms"
              onClick={() => setActive('explore')}
              style={getLinkStyle(active === 'explore', theme)}
            >
              Explore
            </Link>

            {token ? (
              <>
                {/* <Link
                  to="/"
                  onClick={() => setActive('home')}
                  style={getLinkStyle(active === 'home', theme)}
                >
                  Reviews
                </Link> */}
                <Link
                  to="/favorites"
                  onClick={() => setActive('favorites')}
                  style={getLinkStyle(active === 'favorites', theme)}
                >
                  Favorites
                </Link>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Tooltip title="View Profile">
                    <IconButton onClick={handleAvatarClick} sx={{ p: 0 }}>
                      <Avatar alt="User" src={profileImage || ""} />
                      <Typography
                        sx={{ ml: 1, color: theme.palette.text.primary }}
                      >
                        {userName}
                      </Typography>
                    </IconButton>
                  </Tooltip>

                  <Tooltip title="Open Menu">
                    <IconButton onClick={handleOpenUserMenu}>
                      <ExpandMoreIcon
                        sx={{ color: theme.palette.text.primary }}
                      />
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
                      <Typography
                        sx={{
                          textAlign: 'center',
                          color: theme.palette.text.primary,
                        }}
                      >
                        Logout
                      </Typography>
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
                    '&:hover': { backgroundColor: '#2233aa' },
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
                    '&:hover': { backgroundColor: '#2233aa' },
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
          Email: email || 'user@email.com',
          Phone_Number: phoneNumber || '1XXXXXXXXXXXXXXX',
          Country: country || 'Country',
        }}
      />
    </AppBar>
  )
}
