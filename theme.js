import { createTheme } from '@mui/material/styles';
import { zhTW as coreZhTW } from '@mui/material/locale';
import { zhCN } from '@mui/x-date-pickers';

// https://mui.com/zh/material-ui/customization/how-to-customize/#4-global-css-override
// https://mui.com/zh/material-ui/customization/theme-components/
export const themeObj = {
  palette: {
    primary: {
      main: '#faf0df'
    },
    secondary: {
      main: '#ffe7c0'
    }
    // inherit: {
    //   main: '#ffffff'
    // }
  },
  components: {
    // Name of the component
    MuiSnackbarContent: {
      styleOverrides: {
        // Name of the slot
        action: {
          // Some CSS
          width: '100%'
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: ({ ownerState }) => {
          const { variant, children, color, component, size } = ownerState;
          let style = {
            textTransform: 'unset'
          };

          if (
            (children === '确认' || children === '取消') &&
            color === 'primary' &&
            component === 'button' &&
            size === 'medium' &&
            variant === 'text'
          ) {
            style = { ...style, color: '#d7904e' };
          }
          return style;
        }
      }
    }
  }
};

const theme = createTheme(themeObj, zhCN, coreZhTW);

export default theme;
