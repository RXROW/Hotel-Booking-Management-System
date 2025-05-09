import { Outlet, useLocation } from 'react-router-dom'
import { Box, Grid, Typography, useTheme } from '@mui/material'
import loginBg from '../../../../assets/imges/login-bg.png'
import registerBg from '../../../../assets/imges/register-bg.png'
import forgetResetBg from '../../../../assets/imges/forget-reset-bg.png'
import Navbar from '../Navbar/Navbar'
import LanguageSwitcher from '../Lan/LanguageSwitcher'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle'
import Commonheader from '../commonheader/Commonheader'

const AuthLayout = () => {
  const location = useLocation()
  const { t } = useTranslation()
  const theme = useTheme()
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
        return `${t('Authentication.text.headingimage')}`
      case '/auth/login':
        return `${t('Authentication.text.headingimage')}`
      case '/auth':
        return `${t('Authentication.text.headingimage')}`
      case '/auth/forget-password':
        return `${t('Authentication.title.forgetPassword')}`
      case '/auth/reset-password':
        return `${t('Authentication.title.resetPassword')}`
      case '/auth/change-password':
        return `${t('Authentication.title.changePassword')}`
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        minHeight: '100dvh',
        flexDirection: { xs: 'column', md: 'row' },
      }}
    >
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: '20px', md: '0' },
        }}
      >
        {/* Logo */}
        <Box
          sx={{
            position: 'absolute',
            top: '30px',
            left: '30px',
            color: theme.palette.primary.main,
            fontWeight: 500,
          }}
        >
          <Commonheader />
        </Box>
        <Box sx={{ width: '80%', padding: '10px', marginTop: '50px' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 5,
              position: 'absolute',
              top: '30px',
              left: '240px',
            }}
          >
            <ThemeToggle />

            <LanguageSwitcher />
          </Box>
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
          paddingLeft: { xs: '40px', md: '80px' },
          paddingBottom: { xs: '20px', md: '80px' },
        }}
      >
        <Typography
          variant="h4"
          sx={{
            fontWeight: 600,
            marginBottom: '10px',
            fontSize: { xs: '1.8rem', md: '2.5rem' },
          }}
        >
          {rightSectionText()}
        </Typography>
        <Typography
          variant="h5"
          sx={{
            fontWeight: 400,
            fontSize: { xs: '1rem', md: '1.2rem' },
          }}
        >
          {t('Authentication.text.image')}
        </Typography>
      </Grid>
    </Box>
  )
}

export default AuthLayout
