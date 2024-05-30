import PropTypes from 'prop-types';
import { useEffect, useRef, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from 'next/router';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ArrowCircleLeftOutlinedIcon from '@mui/icons-material/ArrowCircleLeftOutlined';
import anime from 'animejs';

import { mediaMobile } from '@/styles/globals';
import { tableStyle } from '@/styles/tableStyle';
import { buttonColor } from '@/styles/buttonStyle';
import Menu from '@/components/layout/Menu';

const styles = theme => ({
  content: {
    width: '100vw',
    height: '100vh',
    backgroundColor: theme.palette.primary.main
  },
  table: {
    ...tableStyle,
    top: '2%',
    left: '2.5%',
    width: '95%',
    height: '95%'
  },
  tableTop: {
    position: 'absolute',
    width: '100%',
    height: '100%'
  },
  tablecloth: {
    width: '85%',
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
  },
  goBackButton: {
    ...buttonColor,
    position: 'absolute',
    zIndex: 100,
    left: '-100%'
  }
});

const useStyles = makeStyles(styles);

function DefalutLayout({ isMobile, children }) {
  const tableTopRef = useRef(null);
  const mainRef = useRef(null);
  const menuRef = useRef(null);
  const tableclothRef = useRef(null);
  const iconButtonRef = useRef(null);

  const nextRouter = useRouter();
  const defalutLayout = useSelector(({ system }) => system.defalutLayout);
  const defalutLayoutSetting = useSelector(
    ({ system }) => system.defalutLayoutSetting
  );
  const dispatch = useDispatch();
  const SAVE_defalutLayout = useCallback(
    payload =>
      dispatch({ type: 'system/SAVE_defalutLayout', payload: payload }),
    [dispatch]
  );
  const SAVE_defalutLayoutSetting = useCallback(
    payload =>
      dispatch({
        type: 'system/SAVE_defalutLayoutSetting',
        payload
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
        const width = tableclothRef.current.scrollWidth;
        const left = tableclothRef.current.offsetLeft;
        SAVE_defalutLayout({ height, width, left });
      }
    }
    window.addEventListener('resize', setDefalutLayout);
    setDefalutLayout();

    return () => {
      window.removeEventListener('resize', setDefalutLayout);
    };
  }, [mainRef]);

  useEffect(() => {
    const layoutLeft = defalutLayout?.left;

    if (typeof layoutLeft === 'number') {
      const isFullScreen = defalutLayoutSetting.fullScreen;
      const fullScreenTargetUrl = defalutLayoutSetting.fullScreenTargetUrl;
      const layoutWidth = parseInt(window.innerWidth * (isMobile ? 0.7 : 0.8));

      const top = isFullScreen === true ? ['0%', '-6%'] : ['-6%', '0%'];

      const left =
        isFullScreen === true
          ? [`${layoutLeft}px`, `${0 - window.innerWidth * 0.03}px`]
          : [`${0 - window.innerWidth * 0.03}px`, `${layoutLeft}px`];

      const width =
        isFullScreen === true
          ? [`${layoutWidth}px`, `${window.innerWidth}`]
          : [`${window.innerWidth}`, `${layoutWidth}px`];

      const height =
        isFullScreen === true ? ['100%', '100vh'] : ['100vh', '100%'];

      if (isFullScreen === true) {
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
          if (isFullScreen === false) {
            setTimeout(() => {
              tableclothRef.current.style = '';
            }, 10);
          }
        }
      });
      anime({
        targets: iconButtonRef.current,
        left: isFullScreen === true ? ['-100%', '0%'] : ['0%', '-100%'],
        duration: 1000,
        easing: 'easeOutQuint'
      });
      if (
        typeof fullScreenTargetUrl === 'string' &&
        fullScreenTargetUrl !== ''
      ) {
        nextRouter.push(fullScreenTargetUrl);
      }
    }
    SAVE_defalutLayoutSetting({ fullScreenTargetUrl: '' });
  }, [defalutLayoutSetting.fullScreen]);

  function handleGoBack() {
    const fullScreenGoBack = defalutLayoutSetting.fullScreenGoBack;
    if (typeof fullScreenGoBack === 'string' && fullScreenGoBack !== '') {
      nextRouter.push(fullScreenGoBack);
    } else {
      nextRouter.back();
    }
  }

  return (
    <div className={classes.content}>
      <div className={classes.table}>
        <IconButton
          ref={iconButtonRef}
          className={classes.goBackButton}
          aria-label="arrow circle left"
          onClick={handleGoBack}
        >
          <ArrowCircleLeftOutlinedIcon />
        </IconButton>
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
