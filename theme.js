
import { createTheme } from '@mui/material/styles';

// https://mui.com/zh/material-ui/customization/how-to-customize/#4-global-css-override
// https://mui.com/zh/material-ui/customization/theme-components/
export const themeObj = {
  palette: {
    primary: {
      main: '#d2b6f7',
    },
    secondary: {
      main: '#61dafb',
    },
    inherit: {
      main: '#ffffff',
    },
  },
};

const theme = createTheme(themeObj);

export default theme;
