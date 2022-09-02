import PropTypes from 'prop-types';
import { makeStyles } from '@mui/styles';

const styles = {
  main: {
    minHeight: '100vh',
    padding: '4rem 2rem',
    flex: '1',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center'
  },
};

const useStyles = makeStyles(styles);

function ErrorLayout({ children }) {
  const classes = useStyles();
  return <div className={classes.main}>{children}</div>;
}

export default ErrorLayout;

ErrorLayout.propTypes = {
  children: PropTypes.any,
};
