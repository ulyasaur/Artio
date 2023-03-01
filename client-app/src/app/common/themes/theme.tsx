import { createTheme, ThemeOptions } from "@mui/material";

const themeOptions: ThemeOptions = {
  palette: {
    primary: {
      main: '#FF69B4',
      light: '#f39dcc',
      contrastText: 'rgba(255,255,255,0.87)',
    },
    secondary: {
      main: '#f50057',
    },
  },
};

export const theme = createTheme(themeOptions);