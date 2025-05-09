import IconButton from '@mui/material/IconButton';
import LightModeIcon from '@mui/icons-material/LightMode';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import { useTheme } from '@mui/material/styles';  
import { useColorMode } from '../Context/ThemeContext';

export default function ToggleThemeButton() {
  const theme = useTheme();
  const { toggleColorMode } = useColorMode();

  return (
    <IconButton onClick={toggleColorMode}>
      {theme.palette.mode === 'dark' ? (
        <LightModeIcon sx={{ color: '#FFD700' }} />
      ) : (
        <DarkModeIcon sx={{ color: '#4B5563' }} />
      )}
    </IconButton>
  );
}