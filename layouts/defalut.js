import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Footer from '@/components/layout/Footer';

const styles = {
  main: {
    minHeight: 'calc(100vh - 1em - 5rem)',
  },
};

const useStyles = makeStyles(styles);

function DefalutLayout({ children }) {
  const classes = useStyles();
  return (
    <>
      <Typography component='main' className={classes.main}>
        {children}
      </Typography>
      <Footer footerPadding='2rem 0' logoHeight='1em' />
    </>
  );
}

DefalutLayout.propTypes = {
  children: PropTypes.any,
};

export default DefalutLayout;