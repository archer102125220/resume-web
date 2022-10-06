import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import Footer from '@/components/layout/Footer';

const styles = {
  main: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
};
const globalstyles = {
  '.error-code': {
    display: 'inline-block',
    borderRight: '1px solid rgba(0, 0, 0, .3)',
    margin: 0,
    marginRight: '20px',
    padding: '0 23px 0 0',
    fontSize: '24px',
    fontWeight: 500,
    verticalAlign: 'top',
    lineHeight: '49px',
  },
  '.error-description-block': {
    display: 'inline-block',
    height: '49px',
    textAlign: 'left',
    lineHeight: '49px',
    verticalAlign: 'middle',
  },
  '.error-description': {
    fontSize: '14px',
    fontWeight: 'normal',
    verticalAlign: 'top',
    lineHeight: '49px',
    margin: 0,
    padding: 0,
  },
};

const useStyles = makeStyles(styles);

function ErrorLayout({ children }) {
  const classes = useStyles();
  return (
    <>
      <main className={classes.main}>
        <GlobalStyles styles={globalstyles} />
        {children}
      </main>
      <Footer footerPadding="2rem 0" logoHeight="1em" />
    </>
  );
}

ErrorLayout.propTypes = {
  children: PropTypes.any,
};

export default ErrorLayout;
