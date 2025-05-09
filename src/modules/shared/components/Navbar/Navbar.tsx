/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useContext, useState } from 'react'
import {
  AppBar,
  Toolbar,
  IconButton,
  InputBase,
  Avatar,
  Typography,
  Menu,
  MenuItem,
  Box,
  useTheme,
} from '@mui/material'
import SearchIcon from '@mui/icons-material/Search'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'
import NotificationsIcon from '@mui/icons-material/Notifications'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { AuthContext } from '../../../../Context/AuthContext.js'
import { LanguageOutlined } from '@mui/icons-material'
import { useTranslation } from 'react-i18next'
import { ThemeToggle } from '../ThemeToggle/ThemeToggle.js'

const Navbar: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const { logout, userName, profileImage }: any = useContext(AuthContext)
  const { i18n } = useTranslation()
  const navigate = useNavigate()
  const theme = useTheme()
  const handleMenuClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }
  const handleLogout = () => {
    logout()
    navigate('/auth')
  }

  const [searchParams, setSearchParams] = useSearchParams()
  const getNameValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    const nameValue = e.target.value
    if (nameValue) {
      searchParams.set('name', nameValue)
    } else {
      searchParams.delete('name')
    }
    setSearchParams(searchParams)
  }

  return (
    <AppBar
      position="static"
      sx={{
        backgroundColor: theme.palette.mode === 'light' ? '#F8F9FB' : '#1e1e1e',
        boxShadow:
          theme.palette.mode === 'light'
            ? 'none'
            : '0px 2px 4px rgba(255, 255, 255, 0.05)',
        borderRadius: '15px',
        transition: 'all 0.3s linear',
      }}
    >
      <Toolbar>
        {/* Search Input */}
        <Box
          sx={{
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            backgroundColor:
              theme.palette.mode === 'light' ? 'white' : '#252525',
            padding: '0.2rem',
            paddingInline: '10px',
            borderRadius: '25px',
            transition: 'background-color 0.3s linear',
            boxShadow:
              theme.palette.mode === 'light'
                ? '0px 2px 4px rgba(0, 0, 0, 0.05)'
                : '0px 2px 4px rgba(255, 255, 255, 0.05)',
          }}
        >
          <SearchIcon
            sx={{
              color: theme.palette.mode === 'light' ? 'gray' : '#fff',
              mr: 1,
            }}
          />
          <InputBase
            placeholder="Search here..."
            sx={{
              flexGrow: 1,
              height: '30px',
              color: theme.palette.text.primary,
              '& ::placeholder': {
                color:
                  theme.palette.mode === 'light'
                    ? 'rgba(0, 0, 0, 0.6)'
                    : 'rgba(255, 255, 255, 0.5)',
                opacity: 1,
              },
            }}
            onChange={getNameValue}
            value={searchParams.get('name') || ''}
          />
        </Box>

        {/* User Avatar and Name */}
        <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
          <Avatar alt="User Photo" src={profileImage} />
          <Typography sx={{ ml: 1, color: theme.palette.text.primary }}>
            {userName}
          </Typography>

          {/* Dropdown Menu Trigger */}
          <IconButton onClick={handleMenuClick}>
            <ArrowDropDownIcon sx={{ color: theme.palette.text.primary }} />
          </IconButton>
        </Box>
        <IconButton
          onClick={() => {
            if (i18n.language === 'en') {
              i18n.changeLanguage('ar')
              localStorage.setItem('lng', 'ar')
            } else {
              i18n.changeLanguage('en')
              localStorage.setItem('lng', 'en')
            }
          }}
        >
          <LanguageOutlined
            style={{ fontSize: '36px', color: theme.palette.text.primary }}
          />
        </IconButton>
        <ThemeToggle />
        {/* Dropdown Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
          transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          PaperProps={{
            sx: {
              backgroundColor:
                theme.palette.mode === 'light' ? 'white' : '#1e1e1e',
              color: theme.palette.text.primary,
              boxShadow:
                theme.palette.mode === 'light'
                  ? '0px 2px 4px rgba(0, 0, 0, 0.1)'
                  : '0px 2px 4px rgba(255, 255, 255, 0.05)',
            },
          }}
        >
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>

        {/* Notifications Icon */}
        <IconButton sx={{ ml: 2 }}>
          <NotificationsIcon sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
