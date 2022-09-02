
import GlobalStyles from '@mui/material/GlobalStyles';

const htmlBodyStyle = {
  padding: 0,
  margin: 0,
  fontFamily: '-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif'
};

export const globalStyle = {
  html: htmlBodyStyle,
  body: htmlBodyStyle,
  a: {
    color: 'inherit',
    textDecoration: 'none'
  },
  '*': {
    boxSizing: 'border-box'
  }
};

export default function globalStyleComponent() {
  return <GlobalStyles styles={globalStyle} />;
}