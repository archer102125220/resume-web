import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const styles = {
  main: {
    minHeight: '100vh',
  },
};

const useStyles = makeStyles(styles);

function IndexLayout({ children }) {
  const classes = useStyles();
  return (
    <Typography component="main" className={classes.main}>
      {children}
    </Typography>
  );
}

IndexLayout.propTypes = {
  children: PropTypes.any,
};

export default IndexLayout;
