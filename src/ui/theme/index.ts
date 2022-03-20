import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  typography: {
    fontSize: 14,
  },
  palette: {
    primary: {
      main: '#fff',
    },
    secondary: {
      main: '#2d2d2d',
    },
    background: {
      default: '#f6f6f6',
    },
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        color: 'secondary',
        size: 'large',
      },
      styleOverrides: {
        root: {
          borderRadius: 999,
        },
      },
    },
    MuiCheckbox: {
      defaultProps: {
        color: 'secondary',
      },
    },
  },
})
