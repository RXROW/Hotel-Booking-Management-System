// import React, { useState } from 'react'
// import AppBar from '@mui/material/AppBar';
// import Box from '@mui/material/Box';
// import Toolbar from '@mui/material/Toolbar';
// import IconButton from '@mui/material/IconButton';
// import Typography from '@mui/material/Typography';
// import Menu from '@mui/material/Menu';
// import MenuIcon from '@mui/icons-material/Menu';
// import Container from '@mui/material/Container';
// import MenuItem from '@mui/material/MenuItem';
// import { Link, useNavigate } from 'react-router-dom';
// import Avatar from '@mui/material/Avatar';
// import Tooltip from '@mui/material/Tooltip';
// import { useAuthContext } from '../../../../context/AuthContext';

// export default function NavbarUser() {
//   const {userData} = useAuthContext()
//   const navigate = useNavigate()
//   const [active, setActive] = useState('home')
//   const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null);
//   const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

//   const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElNav(event.currentTarget);
//   };
//   const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
//     setAnchorElUser(event.currentTarget);
//   };

//   const handleCloseNavMenu = () => {
//     setAnchorElNav(null);
//   };

//   const handleCloseUserMenu = () => {
//     setAnchorElUser(null);
//   };

//   return (
//     <>
//     <AppBar position="static" sx={{backgroundColor: '#ffffff', position: 'sticky', top: 0, zIndex: 1}}>
//       <Container maxWidth="xl">
//         <Toolbar disableGutters>
//           <Box sx={{marginLeft: {lg: '150px', sm: '0'}}}>
//             <Link to={'/'} style={{ textDecoration: 'none', fontSize: '26px', fontFamily: 'Poppins', fontWeight: '500'}}>
//               Stay<span style={{color: '#000'}}>cation.</span>
//             </Link>
//           </Box>

//           <Box sx={{ flexGrow: 1, justifyContent: 'end', display: { xs: 'flex', md: 'none' } }}>
//             <IconButton
//               size="large"
//               aria-label="account of current user"
//               aria-controls="menu-appbar"
//               aria-haspopup="true"
//               onClick={handleOpenNavMenu}
//               // color="inherit"
//             >
//               <MenuIcon />
//             </IconButton>
//             <Menu
//               id="menu-appbar"
//               anchorEl={anchorElNav}
//               anchorOrigin={{
//                 vertical: 'bottom',
//                 horizontal: 'left',
//               }}
//               keepMounted
//               transformOrigin={{
//                 vertical: 'top',
//                 horizontal: 'left',
//               }}
//               open={Boolean(anchorElNav)}
//               onClose={handleCloseNavMenu}
//               sx={{ display: { xs: 'block', md: 'none' } }}
//             >
//               <MenuItem>
//                 <Link to={'/'} style={{ textAlign: 'center', textDecoration: 'none'}}>Home</Link>
//               </MenuItem>
//               <MenuItem>
//                 <Link to={'/explore-all-rooms'} style={{ textAlign: 'center', textDecoration: 'none'}}>Explore</Link>
//               </MenuItem>
//               {localStorage.getItem('token') ?
//               <>
//                 <MenuItem>
//                   <Link to={'/'} style={{ textAlign: 'center', textDecoration: 'none'}}>Reviews</Link>
//                 </MenuItem>
//                 <MenuItem>
//                   <Link to={'/favorites'} style={{ textAlign: 'center', textDecoration: 'none'}}>Favorites</Link>
//                 </MenuItem>
//                 <MenuItem>
//                   <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
//                     {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
//                     <Box sx={{ flexGrow: 0 }}>
//                       <Tooltip title="Open settings">
//                         <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                           <Avatar alt="Remy Sharp" src={userData?.profileImage} />
//                         </IconButton>
//                       </Tooltip>
//                       <Menu
//                         sx={{ mt: '45px' }}
//                         id="menu-appbar"
//                         anchorEl={anchorElUser}
//                         anchorOrigin={{
//                           vertical: 'top',
//                           horizontal: 'right',
//                         }}
//                         keepMounted
//                         transformOrigin={{
//                           vertical: 'top',
//                           horizontal: 'right',
//                         }}
//                         open={Boolean(anchorElUser)}
//                         onClose={handleCloseUserMenu}
//                       >
//                         <MenuItem onClick={() => {
//                           localStorage.removeItem('token')
//                           navigate('/')
//                         }}>
//                           <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
//                         </MenuItem>
//                       </Menu>
//                     </Box>
//                     <Typography sx={{ color: '#000' }}>{userData?.userName}</Typography>
//                   </Box>
//                 </MenuItem>
//               </> : <>
//                       <Box sx={{display: {xs: 'block'},marginBlock: {xs: '25px'}, marginInline:{xs: '10px'}}}>
//                         <Link to={'/auth/register'} className='link-auth'>Register</Link>
//                         {/* <Link to={'/auth/login'} className='link-auth'>Login Now</Link> */}
//                       </Box>
//                       <Box sx={{display: {xs: 'block'},marginBlock: {xs: '25px'}, marginInline:{xs: '10px'}}}>
//                         {/* <Link to={'/auth/register'} className='link-auth'>Register</Link> */}
//                         <Link to={'/auth/login'} className='link-auth'>Login Now</Link>
//                       </Box>
//                     </>
//             }
//             </Menu>
//           </Box>
//           <Box sx={{ flexGrow: 1, justifyContent: 'end',alignItems: 'center', marginInline: '40px', display: { xs: 'none', md: 'flex' } }}>
//             <Link to={'/'} onClick={() => setActive('home')} className={`link ${active === 'home' ? 'active' : ''}`}>Home</Link>
//             <Link to={'/explore-all-rooms'} onClick={() => setActive('explore')} className={`link ${active === 'explore' ? 'active' : ''}`}>Explore</Link>
//             {localStorage.getItem('token') ?
//               <>
//                 <Link to={'/'} onClick={() => setActive('reviews')} className={`link ${active === 'reviews' ? 'active' : ''}`}>Reviews</Link>
//                 <Link to={'/favorites'} onClick={() => setActive('favorites')} className={`link ${active === 'favorites' ? 'active' : ''}`}>Favorites</Link>
//                 <Box sx={{display: 'flex', alignItems: 'center', gap: '10px'}}>
//                   {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" /> */}
//                   <Box sx={{ flexGrow: 0 }}>
//                     <Tooltip title="Open settings">
//                       <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
//                         <Avatar alt="Remy Sharp" src={userData?.profileImage} />
//                       </IconButton>
//                     </Tooltip>
//                     <Menu
//                       sx={{ mt: '45px' }}
//                       id="menu-appbar"
//                       anchorEl={anchorElUser}
//                       anchorOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right',
//                       }}
//                       keepMounted
//                       transformOrigin={{
//                         vertical: 'top',
//                         horizontal: 'right',
//                       }}
//                       open={Boolean(anchorElUser)}
//                       onClose={handleCloseUserMenu}
//                     >
//                       <MenuItem onClick={() => {
//                         localStorage.removeItem('token')
//                         navigate('/')
//                       }}>
//                         <Typography sx={{ textAlign: 'center' }}>Logout</Typography>
//                       </MenuItem>
//                     </Menu>
//                   </Box>
//                   <Typography sx={{ color: '#000' }}>{userData?.userName}</Typography>
//                 </Box>
//               </> : <>
//                       <Link to={'/auth/register'} className='link-auth'>Register</Link>
//                       <Link to={'/auth/login'} className='link-auth'>Login Now</Link>
//                     </>
//             }
//           </Box>
//         </Toolbar>
//       </Container>
//     </AppBar>
//     </>
//   )
// }

/**/ //////////////////////////////////// */

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

export default function NavbarUser() {
  const { profileImage, userName } = useAuthContext()
  const navigate = useNavigate()
  const [active, setActive] = useState('home')
  const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null)

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

  return (
    <AppBar
      className="UserNav"
      position="static"
      sx={{
        backgroundColor: '#ffffff',
        position: 'sticky',
        top: 0,
        zIndex: 1000,
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
              Stay<span style={{ color: 'black' }}>cation.</span>
            </Typography>
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
                  style={{ textDecoration: 'none', color: '#3252DF' }}
                >
                  Home
                </Link>
              </MenuItem>
              <MenuItem onClick={handleCloseNavMenu}>
                <Link
                  to="/explore-all-rooms"
                  style={{ textDecoration: 'none', color: '#152C5B' }}
                >
                  Explore
                </Link>
              </MenuItem>

              {token ? (
                <>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/"
                      style={{ textDecoration: 'none', color: '#152C5B' }}
                    >
                      Reviews
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Link
                      to="/favorites"
                      style={{ textDecoration: 'none', color: '#152C5B' }}
                    >
                      Favorites
                    </Link>
                  </MenuItem>
                  <MenuItem onClick={handleCloseNavMenu}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar alt="User Photo" src={profileImage} />
                      <Typography sx={{ ml: 1, color: 'black' }}>
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
            <Link
              to="/"
              onClick={() => setActive('home')}
              className={`link ${active === 'home' ? 'active' : ''}`}
              style={{ textDecoration: 'none', color: '#3252DF' }}
            >
              Home
            </Link>
            <Link
              to="/explore-all-rooms"
              onClick={() => setActive('explore')}
              className={`link ${active === 'explore' ? 'active' : ''}`}
              style={{ textDecoration: 'none', color: '#152C5B' }}
            >
              Explore
            </Link>

            {token ? (
              <>
                <Link
                  to="/"
                  onClick={() => setActive('reviews')}
                  className={`link ${active === 'reviews' ? 'active' : ''}`}
                  style={{ textDecoration: 'none', color: '#152C5B' }}
                >
                  Reviews
                </Link>
                <Link
                  to="/favorites"
                  onClick={() => setActive('favorites')}
                  className={`link ${active === 'favorites' ? 'active' : ''}`}
                  style={{ textDecoration: 'none', color: '#152C5B' }}
                >
                  Favorites
                </Link>

                <Box
                  sx={{ display: 'flex', alignItems: 'center', gap: '10px' }}
                >
                  <Tooltip title="Open settings">
                    <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                      <Avatar alt="User" src={profileImage} />
                      <Typography sx={{ ml: 1, color: 'black' }}>
                        {userName}
                      </Typography>
                      <ExpandMoreIcon sx={{ color: 'black', ml: 0.5 }} />
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
                      <Typography sx={{ textAlign: 'center' }}>
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
    </AppBar>
  )
}
