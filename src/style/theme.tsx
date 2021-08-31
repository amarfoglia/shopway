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
  },
  typography: {
    fontFamily: 'DM Sans, sans-serif',
    h4: {
      color: primary,
      fontWeight: 'bold',
      textTransform: 'capitalize',
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
