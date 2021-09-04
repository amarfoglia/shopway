import { createTheme } from '@material-ui/core/styles';

const primary = '#4f52ff';
const primaryLight = '#8e7fff';
const primaryDark = '#0028cb';

const secondary = '#e3f2fd';
const secondaryLight = '#ffffff';
const secondaryDark = '#b1bfca';

const theme = createTheme({
  palette: {
    type: 'light',
    primary: {
      main: primary,
      light: primaryLight,
      dark: primaryDark,
    },
    secondary: {
      main: secondary,
      light: secondaryLight,
      dark: secondaryDark,
    },
    error: {
      main: '#c62828',
      dark: '#8e0000',
      light: '#ff5f52',
    },
  },
  typography: {
    fontFamily: [
      'DMSans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h4: {
      color: primary,
      fontWeight: 'bold',
      textTransform: 'capitalize',
    },
    subtitle1: {
      color: '#757575',
    },
  },
  overrides: {
    MuiLink: {
      root: {
        textDecoration: 'none',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 30,
        padding: '12px 35px',
        textTransform: 'capitalize',
      },
      containedPrimary: {
        boxShadow: '0 0 20px rgba(105,147,255,.3)',
        '&:hover': {
          backgroundColor: primaryDark,
        },
      },
      containedSecondary: {
        '&:hover': {
          backgroundColor: secondaryDark,
        },
      },
    },
    MuiCard: {
      root: {
        borderRadius: 30,
        boxShadow: '0 10px 30px rgba(0,37,132,.06)',
      },
    },
    MuiTextField: {
      root: {
        border: 'none',
        borderRadius: 30,
      },
    },
    MuiOutlinedInput: {
      root: {
        borderRadius: 30,
      },
    },
    MuiInputAdornment: {
      root: {
        '& hover': {
          backgroundColor: secondary,
        },
      },
    },
  },
});

export default theme;
