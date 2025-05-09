 
import { IconButton} from '@mui/material' 
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
