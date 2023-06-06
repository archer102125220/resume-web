import PropTypes from 'prop-types';
import { useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';

const styles = {
  main: {
    minHeight: '100vh',
    minWidth: '100vw'
  }
};

const useStyles = makeStyles(styles);

function IndexLayout({ children }) {
  const mainRef = useRef(null);

  const isMobile = useSelector(({ system }) => system.isMobile || false);
  const dispatch = useDispatch();
  const SAVE_indexLayout = useCallback(
    payload => dispatch({ type: 'system/SAVE_indexLayout', payload: payload }),
    [dispatch]
  );

  const classes = useStyles();

  useEffect(() => {
    if (mainRef.current !== null) {
      const height = mainRef.current.scrollHeight;
      const width = mainRef.current.scrollWidth;
      SAVE_indexLayout({ height, width });
    }
  }, [isMobile]);

  return (
    <Typography ref={mainRef} component="main" className={classes.main}>
      {children}
    </Typography>
  );
}

IndexLayout.propTypes = {
  children: PropTypes.any
};

export default IndexLayout;
