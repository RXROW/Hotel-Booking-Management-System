import React from 'react'
import { IconButton, useTheme } from '@mui/material'
import Brightness4Icon from '@mui/icons-material/Brightness4'
import Brightness7Icon from '@mui/icons-material/Brightness7'
import DarkModeIcon from '@mui/icons-material/DarkMode'
import LightModeIcon from '@mui/icons-material/LightMode'
import { useThemeMode } from '../../../../theme/ThemeProvider'

export const ThemeToggle = () => {
  const { mode, toggleMode } = useThemeMode()
  return (
    <IconButton onClick={toggleMode} color="inherit">
      {mode === 'dark' ? (
        <LightModeIcon sx={{ color: '#FFD700' }} />
      ) : (
        <DarkModeIcon sx={{ color: '#4B5563' }} />
      )}
    </IconButton>
  )
}
