// import { createTheme } from "@mui/material";

// const theme = createTheme({
//   typography: {
//     fontFamily: 'Poppins, Arial, sans-serif',
//   },
// })

// export default theme

/**/////////////// */

// import { createTheme, ThemeOptions } from '@mui/material/styles';


// export const getTheme = (mode: 'light' | 'dark') =>
//   createTheme({
//     palette: {
//       mode,
//       ...(mode === 'light'
//         ? {
//             background: {
//               default: '#f9f9f9',
//               paper: '#ffffff',
//             },
//             primary: {
//               main: '#1976d2',
//             },
//           }
//         : {
//             background: {
//               default: '#121212',
//               paper: '#1e1e1e',
//             },
//             primary: {
//               main: '#90caf9',
//             },
//             text: {
//               primary: '#ffffff',
//               secondary: '#cccccc',
//             },
//           }),
//     },
//     typography: {
//       fontFamily: 'Poppins, Arial, sans-serif',
//     },
//     components: {
//       MuiInputBase: {
//         styleOverrides: {
//           input: ({ theme }) => ({
//             '::placeholder': {
//               color: theme.palette.mode === 'dark' ? '#ffffff' : '#9e9e9e',
//               opacity: 1,
//             },
//           }),
//         },
//       },
//     },
//   });

/**///////////////////// */
import { createTheme } from '@mui/material/styles';

export const getTheme = (mode: 'light' | 'dark') =>
  createTheme({
    palette: {
      mode,
      ...(mode === 'light'
        ? {
            background: {
              default: '#f9f9f9',
              paper: '#ffffff',
            },
            primary: {
              main: '#1976d2',
            },
            text: {
              primary: '#000000',
              secondary: '#555555',
            },
          }
        : {
            background: {
              default: '#121212',
              paper: '#1e1e1e',
            },
            primary: {
              main: '#90caf9',
            },
            text: {
              primary: '#ffffff',
              secondary: '#cccccc',
            },
          }),
    },
    typography: {
      fontFamily: 'Poppins, Arial, sans-serif',
    },
    components: {
      // Text Fields Placeholder
      MuiInputBase: {
        styleOverrides: {
          input: ({ theme }) => ({
            '::placeholder': {
              color: theme.palette.mode === 'dark' ? '#ffffff' : '#9e9e9e',
              opacity: 1,
            },
          }),
        },
      },
      // Buttons
      MuiButton: {
        styleOverrides: {
          contained: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === 'dark' ? '#ffffff' : '#1976d2',
            color: theme.palette.mode === 'dark' ? '#000000' : '#ffffff',
            fontWeight: '',
            '&:hover': {
              backgroundColor:
                theme.palette.mode === 'dark' ? '#e0e0e0' : '#1565c0',
            },
          }),
        },
      },
      // TextField background
      MuiTextField: {
        styleOverrides: {
          root: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === 'dark' ? '#2c2c2c' : '#f9f9f9',
            borderRadius: 4,
          }),
        },
      },
      // Popover styling
      MuiPopover: {
        styleOverrides: {
          paper: ({ theme }) => ({
            backgroundColor:
              theme.palette.mode === 'dark' ? '#2a2a2a' : '#fff',
            color: theme.palette.mode === 'dark' ? '#fff' : '#000',
          }),
        },
      },
      // Typography default color override
      MuiTypography: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.mode === 'dark' ? '#ffffff' : undefined,
          }),
        },
      },
      // Link color override (for Navbar links)
      MuiLink: {
        styleOverrides: {
          root: ({ theme }) => ({
            color: theme.palette.mode === 'dark' ? '#ffffff' : '#1976d2',
            textDecoration: 'none',
            fontWeight: '500',
            '&:hover': {
              color: theme.palette.mode === 'dark' ? '#90caf9' : '#1565c0',
              textDecoration: 'underline',
            },
          }),
        },
      },
    },
  });
