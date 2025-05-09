/* eslint-disable @typescript-eslint/no-explicit-any */
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar'
import { Link, useLocation } from 'react-router-dom'
import {
  HomeTwoTone as HomeIcon,
  PeopleAltTwoTone as UsersIcon,
  DashboardTwoTone as RoomsIcon,
  CalendarMonthTwoTone as AdsIcon,
  BookOnlineTwoTone as BookingsIcon,
  PrecisionManufacturingTwoTone as FacilitiesIcon,
  LockOpenTwoTone as ChangePasswordIcon,
  DoubleArrow as ToggleIcon,
} from '@mui/icons-material'
import { Box, IconButton, useTheme } from '@mui/material'

interface SidebarProps {
  onToggle: () => void
  collapsed: boolean
}

interface MenuItemConfig {
  label: string
  path: string
  icon: any
  onClick?: () => void
}

const SidebarMenuItem = ({
  label,
  path,
  icon,
  onClick,
  isActive,
  collapsed,
}: {
  label: string
  path: string
  icon: any
  onClick?: () => void
  isActive: boolean
  collapsed: boolean
}) => {
  const theme = useTheme()
  return (
    <MenuItem
      component={<Link to={path} />}
      onClick={onClick}
      rootStyles={{
        backgroundColor: isActive
          ? theme.palette.mode === 'light'
            ? 'rgba(255, 255, 255, 0.2)'
            : 'rgba(0, 0, 0, 0.2)'
          : 'transparent',
        '&:hover': {
          backgroundColor: theme.palette.mode === 'light' ? 'white' : '#333',
          color: theme.palette.primary.main,
          '& .menu-icon': {
            color: theme.palette.primary.main,
          },
        },
      }}
    >
      <Box
        className="menu-icon"
        sx={{
          display: 'flex',
          alignItems: 'center',
          marginLeft: collapsed ? '0.5rem' : '1rem',
          color: theme.palette.mode === 'light' ? 'white' : '#fff',
          transition: 'all 0.3s linear',
          marginBottom: '1rem',
          paddingTop: '1rem',
        }}
      >
        {icon}
        {!collapsed && (
          <span style={{ marginLeft: '1rem', color: 'inherit' }}>{label}</span>
        )}
      </Box>
    </MenuItem>
  )
}

export default function SidebarComponent({
  onToggle,
  collapsed,
}: SidebarProps) {
  const location = useLocation()
  const theme = useTheme()
  const isActive = (path: string) => {
    if (path === '/dashboard') {
      return location.pathname === '/dashboard'
    }
    return location.pathname.includes(path)
  }

  const menuItems: MenuItemConfig[] = [
    { label: 'Home', path: '/dashboard', icon: <HomeIcon /> },
    { label: 'Users', path: 'users', icon: <UsersIcon /> },
    { label: 'Rooms', path: 'rooms', icon: <RoomsIcon /> },
    { label: 'Ads', path: 'advertisements', icon: <AdsIcon /> },
    { label: 'Bookings', path: 'booking', icon: <BookingsIcon /> },
    { label: 'Facilities', path: 'facilities', icon: <FacilitiesIcon /> },
    {
      label: 'Change Password',
      path: '/auth/change-password',
      icon: <ChangePasswordIcon />,
    },
  ]

  return (
    <Sidebar
      rootStyles={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor:
          theme.palette.mode === 'light' ? 'rgba(32, 63, 199, 1)' : '#1e1e1e',
        transition: 'all 0.3s linear',
      }}
    >
      <IconButton
        onClick={onToggle}
        sx={{
          transform: collapsed ? 'rotate(0deg)' : 'rotate(180deg)',
          transition: 'all 0.3s linear',
          position: 'absolute',
          right: collapsed ? '170px' : '5px',
          color: theme.palette.mode === 'light' ? 'white' : '#fff',
        }}
        aria-label="Toggle Sidebar"
      >
        <ToggleIcon />
      </IconButton>
      <Menu
        rootStyles={{
          paddingTop: '4rem',
          backgroundColor:
            theme.palette.mode === 'light' ? 'rgba(32, 63, 199, 1)' : '#1e1e1e',
          height: '100%',
        }}
      >
        {menuItems.map((item) => (
          <SidebarMenuItem
            key={item.label}
            label={item.label}
            path={item.path}
            icon={item.icon}
            onClick={item.onClick}
            isActive={isActive(item.path)}
            collapsed={collapsed}
          />
        ))}
      </Menu>
    </Sidebar>
  )
}
