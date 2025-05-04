import React, { useEffect, useMemo } from 'react'
import {
  createTheme,
  ThemeProvider as MUIThemeProvider,
} from '@mui/material/styles'
import { CssBaseline } from '@mui/material'
import { useTranslation } from 'react-i18next'
import rtlPlugin from 'stylis-plugin-rtl'
import { CacheProvider } from '@emotion/react'
import createCache from '@emotion/cache'
import { prefixer } from 'stylis'

// Define prop types for the component
interface ThemeProviderProps {
  children: React.ReactNode
}

// Create a theme instance
const getTheme = (isRTL: boolean) =>
  createTheme({
    direction: isRTL ? 'rtl' : 'ltr',
    // Your other theme customizations
    palette: {
      primary: {
        main: '#1976d2',
      },
      secondary: {
        main: '#dc004e',
      },
    },
  })

// Create caches for LTR and RTL
const ltrCache = createCache({
  key: 'muiltr',
  prepend: true,
})

const rtlCache = createCache({
  key: 'muirtl',
  stylisPlugins: [prefixer, rtlPlugin],
  prepend: true,
})

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const { i18n } = useTranslation()
  const isRTL = i18n.language === 'ar'
  // Create the theme based on the current language
  const theme = useMemo(() => getTheme(isRTL), [isRTL])
  // Set document direction
  useEffect(() => {
    document.dir = isRTL ? 'rtl' : 'ltr'
    document.documentElement.lang = i18n.language
  }, [isRTL, i18n.language])

  return (
    <CacheProvider value={isRTL ? rtlCache : ltrCache}>
      <MUIThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MUIThemeProvider>
    </CacheProvider>
  )
}
