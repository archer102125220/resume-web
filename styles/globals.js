import theme from '@/theme';
import GlobalStyles from '@mui/material/GlobalStyles';

export const mediaMobile = '@media (max-width: 1080px)';

const scrollbar = {
  '::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
    [mediaMobile]: {
      height: '5px',
    },
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.light}`,
  },
  '::-webkit-scrollbar-track-piece': {
    backgroundColor: '#ffffff00',
  },
  '::-webkit-scrollbar-track': {
    boxShadow: 'transparent',
  },
};

export const globalStyle = {
  'html, body': {
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
  },
  a: {
    color: 'inherit',
    textDecoration: 'none',
  },
  '*': {
    boxSizing: 'border-box',
  },
  '#__next': {
    overflow: 'hidden',
  },
  ...scrollbar,
};

export default function globalStyleComponent() {
  return <GlobalStyles styles={globalStyle} />;
}
