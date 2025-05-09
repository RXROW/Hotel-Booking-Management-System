import React, {
  useEffect,
  useMemo,
  createContext,
  useContext,
  useState,
} from 'react'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
  PaletteMode,
} from '@mui/material/styles'
import { useTranslation } from 'react-i18next'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { CssBaseline } from '@mui/material'
import rtlPlugin from 'stylis-plugin-rtl'

// Create rtl and ltr cache instances
const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [rtlPlugin],
})

const ltrCache = createCache({
  key: 'muiltr',
})

interface ThemeContextType {
  mode: PaletteMode
  toggleMode: () => void
}

interface ThemeProviderProps {
  children: React.ReactNode
}

const ThemeContext = createContext<ThemeContextType>({
  mode: 'light',
  toggleMode: () => {},
})

export const useThemeMode = () => useContext(ThemeContext)

// Create a theme instance
const getTheme = (isRTL: boolean, mode: PaletteMode) =>
  createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    palette: {
      mode,
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
      background: {
        default: mode === 'light' ? '#ffffff' : '#121212',
        paper: mode === 'light' ? '#ffffff' : '#1e1e1e',
      },
      text: {
        primary: mode === 'light' ? '#000000' : '#ffffff',
        secondary:
          mode === 'light' ? 'rgba(0, 0, 0, 0.7)' : 'rgba(255, 255, 255, 0.7)',
      },
    },
    typography: {
      body1: {
        color: mode === 'light' ? '#152C5B' : '#ffffff',
      },
      h6: {
        color: mode === 'light' ? '#152C5B' : '#3252DF',
      },
    },
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          '*, *::before, *::after': {
            transition:
              'background-color 0.3s, color 0.3s, border-color 0.3s, box-shadow 0.3s',
          },
          body: {
            transition: 'background-color 0.3s linear',
          },
        },
      },
    },
  })

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  const [mode, setMode] = useState<PaletteMode>('light')

  const toggleMode = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
  }

  // Create the theme based on the current language and mode
  const theme = useMemo(() => getTheme(isRTL, mode), [isRTL, mode])

  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [isRTL, i18n.language])

  const themeContextValue = useMemo(
    () => ({
      mode,
      toggleMode,
    }),
    [mode],
  )

  return (
    <ThemeContext.Provider value={themeContextValue}>
      <CacheProvider value={isRTL ? rtlCache : ltrCache}>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </CacheProvider>
    </ThemeContext.Provider>
  )
}
