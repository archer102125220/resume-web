import { memo } from 'react';
import theme from '@/theme';
import GlobalStyles from '@mui/material/GlobalStyles';
import { cssAnimation } from '@/styles/animation';

export const mediaTabletOnly = '@media (min-width: 501px) and (max-width: 1080px)';
export const mediaTablet = '@media (max-width: 1080px)';
export const mediaMobile = '@media (max-width: 500px)';

const scrollbar = {
  '::-webkit-scrollbar': {
    width: '10px',
    height: '10px',
    [mediaMobile]: {
      width: '7px',
      height: '5px'
    }
  },
  '::-webkit-scrollbar-thumb': {
    borderRadius: '4px',
    backgroundColor: theme.palette.primary.light,
    border: `1px solid ${theme.palette.primary.light}`
  },
  '::-webkit-scrollbar-track-piece': {
    backgroundColor: '#ffffff00'
  },
  '::-webkit-scrollbar-track': {
    boxShadow: 'transparent'
  }
};

export const globalStyle = {
  'html, body': {
    width: '100vw',
    height: '100vh',
    padding: 0,
    margin: 0,
    fontFamily:
      '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif',
    overflow: 'hidden'
  },
  a: {
    color: 'inherit',
    textDecoration: 'none'
  },
  '*': {
    boxSizing: 'border-box',
    fontSize: 'inherit',
    padding: 0,
    margin: 0
  },
  '#__next': {
    overflow: 'hidden'
  },
  img: {
    [mediaTablet]: {
      width: '100%',
      height: 'auto'
    },
    [mediaMobile]: {
      width: '100%',
      height: 'auto'
    }
  },
  '.a-fullscreen .a-enter-vr,.a-fullscreen  .a-enter-ar': {
    bottom: '-95vh',
    [mediaMobile]: {
      bottom: '-90vh'
    }
  },
  '.MuiFormControl-root .MuiFormLabel-root.MuiInputLabel-root.Mui-focused': {
    color: theme.palette.thirdly.main
  },
  '.MuiFormControl-root .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline':
    {
      borderColor: theme.palette.fourthly.main
    },
  ...cssAnimation,
  ...scrollbar
};

function globalStyleComponent() {
  return <GlobalStyles styles={globalStyle} />;
}

export default memo(globalStyleComponent);
