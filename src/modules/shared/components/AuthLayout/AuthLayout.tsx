
import { Outlet, useLocation } from 'react-router-dom'
import { Box, Grid, Typography } from '@mui/material'
import loginBg from '../../../../assets/imges/login-bg.png'
import registerBg from '../../../../assets/imges/register-bg.png'
import forgetResetBg from '../../../../assets/imges/forget-reset-bg.png'
import Navbar from '../Navbar/Navbar'

const AuthLayout = () => {
  const location = useLocation()

  const getBackgroundImage = () => {
    switch (location.pathname) {
      case '/auth/register':
        return `url(${registerBg})`
      case '/auth/login':
        return `url(${loginBg})`
      case '/auth':
        return `url(${loginBg})`
      default:
        return `url(${forgetResetBg})`
    }
  }
  const rightSectionText = () => {
    switch (location.pathname) {
      case '/auth/register':
        return `Sign up to Roamhome`
      case '/auth/login':
        return `Sign in to Roamhome`
      case '/auth':
        return `Sign in to Roamhome`
      case '/auth/forget-password':
        return `Forget Password`
      case '/auth/reset-password':
        return `Reset Password`
      case '/auth/change-password':
        return `Change Password`
    }
  }


  return (
    <>


      <Box
        sx={{
          display: 'flex',
          minHeight: '100dvh',
        }}
      >
        <Box
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              position: 'absolute',
              top: '30px',
              left: '30px',
              color: '#3252DF',
              fontWeight: 500,
            }}
          >
            Stay<span style={{ color: 'black' }}>cation.</span>
          </Typography>

          <Box sx={{ width: '80%',padding:"10px" , marginTop:"50px" }}>
            <Outlet />
          </Box>
        </Box>

        <Grid
          container
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            backgroundImage: getBackgroundImage(),
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#ccc', //fallback color
            borderRadius: '16px',
            color: '#fff',
            textAlign: 'left',
            paddingLeft: '80px',
            paddingBottom: '80px',
          }}
        >
          <Typography
            variant="h4"
            sx={{
              fontWeight: 600,
              marginBottom: '10px',
            }}
          >
            {rightSectionText()}
          </Typography>
          <Typography
            variant="h6"
            sx={{
              fontWeight: 400,
            }}
          >
            Homes as unique as you.
          </Typography>
        </Grid>
      </Box>
    </>
  );
};

export default AuthLayout;
