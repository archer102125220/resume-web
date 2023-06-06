import PropTypes from 'prop-types';
import { useState, useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import anime from 'animejs';

import { mediaMobile } from '@/styles/globals';
import { tableStyle } from '@/styles/tableStyle';
import Menu from '@/components/layout/Menu';

const styles = theme => ({
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main
  },
  table: {
    ...tableStyle,
    top: '5%',
    left: '2.5%',
    width: '95%',
    height: '90%'
  },
  tableTop: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  tablecloth: {
    width: '80%',
    height: '100%',
    margin: 'auto',
    padding: '15px',
    // textAlign: 'center',
    backgroundColor: 'rgb(255 226 177)',
    overflow: 'auto',
    // position: 'absolute',
    [mediaMobile]: {
      width: '70%',
      // padding: '15px 5px',
      padding: '15px 2px'
    }
  },
  tableTopMenu: {
    position: 'absolute',
    left: '-100%',
    [mediaMobile]: {
      width: '15%'
    }
  },
  main: {
    height: '100%',
    width: '100%'
  }
});

const useStyles = makeStyles(styles);

function DefalutLayout({ isMobile, children }) {
  const [isClient, setIsClient] = useState(false);

  const tableTopRef = useRef(null);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const tableclothRef = useRef(null);

  const defalutLayout = useSelector(({ system }) => system.defalutLayout);
  const defalutLayoutFullScreen = useSelector(
    ({ system }) => system.defalutLayoutFullScreen
  );
  const defalutLayoutFullScreenCallback = useSelector(
    ({ system }) => system.defalutLayoutFullScreenCallback
  );
  const dispatch = useDispatch();
  const SAVE_defalutLayout = useCallback(
    payload =>
      dispatch({ type: 'system/SAVE_defalutLayout', payload: payload }),
    [dispatch]
  );
  const SAVE_defalutLayoutFullScreenCallback = useCallback(
    payload =>
      dispatch({
        type: 'system/SAVE_defalutLayoutFullScreenCallback',
        payload: payload
      }),
    [dispatch]
  );

  const classes = useStyles();

  useEffect(() => {
    if (menuRef?.current?.style) menuRef.current.style.left = '-100%';
    anime({
      targets: tableTopRef.current,
      top: ['-100%', '0%'],
      duration: 1000,
      easing: 'easeOutQuint',
      complete() {
        anime({
          targets: menuRef.current,
          left: ['-100%', '0%'],
          duration: 1000,
          easing: 'easeOutQuint'
        });
      }
    });
    function setDefalutLayout() {
      if (mainRef.current !== null) {
        const height = mainRef.current.scrollHeight;
        const width = mainRef.current.scrollWidth;
        const left = mainRef.current.offsetLeft;
        SAVE_defalutLayout({ height, width, left });
      }
    }
    window.addEventListener('resize', setDefalutLayout);
    setDefalutLayout();
    setIsClient(true);

    return () => {
      window.removeEventListener('resize', setDefalutLayout);
    };
  }, []);

  useEffect(() => {
    const layoutLeft = defalutLayout?.left;
    const layoutWidth = parseInt(window.innerWidth * (isMobile ? 0.7 : 0.8));

    const top =
      defalutLayoutFullScreen === true ? ['0%', '-6%'] : ['-6%', '0%'];

    const left =
      defalutLayoutFullScreen === true
        ? [`${layoutLeft}px`, `${0 - window.innerWidth * 0.03}px`]
        : [`${0 - window.innerWidth * 0.03}px`, `${layoutLeft}px`];

    const width =
      defalutLayoutFullScreen === true
        ? [`${layoutWidth}px`, `${window.innerWidth}`]
        : [`${window.innerWidth}`, `${layoutWidth}px`];

    const height =
      defalutLayoutFullScreen === true ? ['100%', '100vh'] : ['100vh', '100%'];

    if (isClient === true && typeof layoutLeft === 'number') {
      if (
        defalutLayoutFullScreen === true &&
        typeof defalutLayoutFullScreenCallback === 'function'
      ) {
        tableclothRef.current.style.position = 'absolute';
      }

      anime({
        targets: tableclothRef.current,
        top,
        left,
        width,
        height,
        duration: 500,
        easing: 'easeOutQuint',
        complete() {
          if (typeof defalutLayoutFullScreenCallback === 'function') {
            defalutLayoutFullScreenCallback();
          } else {
            setTimeout(() => {
              tableclothRef.current.style.position = '';
            }, 10);
          }
          if (defalutLayoutFullScreen === false) {
            setTimeout(() => {
              // tableclothRef.current.style = '';
            }, 10);
          }
        }
      });
    }
    SAVE_defalutLayoutFullScreenCallback(null);
  }, [defalutLayoutFullScreen]);

  return (
    <div className={classes.content}>
      <div className={classes.table}>
        <div ref={tableTopRef} className={classes.tableTop}>
          <Menu ref={menuRef} className={classes.tableTopMenu} />
          <div ref={tableclothRef} className={classes.tablecloth}>
            <Typography component="main" ref={mainRef} className={classes.main}>
              {children}
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
}

DefalutLayout.propTypes = {
  children: PropTypes.any,
  isMobile: PropTypes.bool
};

export default DefalutLayout;
