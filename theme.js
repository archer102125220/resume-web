
import { createTheme } from '@mui/material/styles';

// https://mui.com/zh/material-ui/customization/how-to-customize/#4-global-css-override
// https://mui.com/zh/material-ui/customization/theme-components/
export const themeObj = {
  palette: {
    primary: {
      main: '#faf0df',
    },
    secondary: {
      main: '#ffe7c0',
    },
    inherit: {
      main: '#ffffff',
    },
  },
};

const theme = createTheme(themeObj);

export default theme;
