import theme from '@/theme';
import GlobalStyles from '@mui/material/GlobalStyles';

export const mediaMobile = '@media (max-width: 1080px)';

export const globalStyle = {
  'html, body': {
    padding: 0,
    margin: 0,
    fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none'
  },
  '*': {
    boxSizing: 'border-box'
  },
  '::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
    [mediaMobile]: {
      height: '5px'
    }
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.main,
    border: `1px solid ${theme.palette.primary.main}`
  },
  '::-webkit-scrollbar-track-piece': {
    backgroundColor: '#ffffff00'
  },
  '::-webkit-scrollbar-track': {
    boxShadow: 'transparent'
  },
  '.page-enter': {
    opacity: 0,
    transform: 'scale(1.1)'
  },
  '.page-enter-active': {
    opacity: 1,
    transform: 'scale(1)',
    transition: 'opacity 300ms, transform 300ms'
  },
  '.page-exit': {
    opacity: 1,
    transform: 'scale(1)'
  },
  '.page-exit-active': {
    opacity: 0,
    transform: 'scale(0.9)',
    transition: 'opacity 300ms, transform 300ms'
  }
};

export default function globalStyleComponent() {
  return <GlobalStyles styles={globalStyle} />;
}