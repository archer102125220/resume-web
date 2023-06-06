import PropTypes from 'prop-types';
import { useRef, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { makeStyles } from '@mui/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import { useRouter } from 'next/router';
import DefalutLayout from '@/layouts/defalut';
import IndexLayout from '@/layouts/index';
import ErrorLayout from '@/layouts/error';

export const LAYOUT_SETTING = [
  { path: '/', layout: IndexLayout, layoutName: 'index', exact: true },
  { path: '/index', layout: IndexLayout, layoutName: 'index' },
  { path: '/404', layout: ErrorLayout, layoutName: 'error' },
  { path: '/500', layout: ErrorLayout, layoutName: 'error' }
];
export const DEFALUT_LAYOUT = { layout: DefalutLayout, layoutName: 'defalut' };

const styles = {
  transitionRoot: {
    minHeight: 'inherit',
    height: 'inherit'
  }
};
const useStyles = makeStyles(styles);

const pageTransition = {
  '.page-enter': {
    opacity: 0,
    transform: 'translateY(-100%)'
  },
  '.page-enter-active': {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'all  300ms'
  },
  '.page-exit': {
    opacity: 1,
    transform: 'translateY(0)'
  },
  '.page-exit-active': {
    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'all  300ms'
  }
};
function LayoutSwitch({ router, isMobile, children, pageProps }) {
  const nextRouter = useRouter();
  const nodeRef = useRef(null);

  const dispatch = useDispatch();
  const SAVE_loading = useCallback(
    loading => dispatch({ type: 'system/SAVE_loading', payload: loading }),
    [dispatch]
  );
  const SAVE_layoutName = useCallback(
    loading => dispatch({ type: 'system/SAVE_layoutName', payload: loading }),
    [dispatch]
  );

  const classes = useStyles();

  const layoutSetting =
    LAYOUT_SETTING.find(({ path, exact }) =>
      exact === true ? path === router.route : router.route.includes(path)
    ) || DEFALUT_LAYOUT;
  const Layout = layoutSetting.layout;

  useEffect(() => {
    const handleStart = url => url !== router.asPath && SAVE_loading(true);
    const handleComplete = url => {
      url === router.asPath && SAVE_loading(false);
    };
    nextRouter.events.on('routeChangeStart', handleStart);
    nextRouter.events.on('routeChangeComplete', handleComplete);
    nextRouter.events.on('routeChangeError', handleComplete);
    return () => {
      nextRouter.events.off('routeChangeStart', handleStart);
      nextRouter.events.off('routeChangeComplete', handleComplete);
      nextRouter.events.off('routeChangeError', handleComplete);
    };
  }, []);
  useEffect(() => {
    SAVE_layoutName(layoutSetting.layoutName);
  }, [layoutSetting.layoutName]);

  return (
    <>
      <GlobalStyles styles={pageTransition} />
      <Layout {...pageProps} isMobile={isMobile}>
        <SwitchTransition>
          <CSSTransition
            key={router.pathname}
            nodeRef={nodeRef}
            in
            timeout={200}
            classNames="page"
          >
            {/* https://github.com/reactjs/react-transition-group/issues/668 */}
            <div ref={nodeRef} className={classes.transitionRoot}>
              {children}
            </div>
          </CSSTransition>
        </SwitchTransition>
      </Layout>
    </>
  );
}

LayoutSwitch.propTypes = {
  router: PropTypes.object,
  children: PropTypes.any,
  isMobile: PropTypes.bool,
  pageProps: PropTypes.object.isRequired
};

export default LayoutSwitch;
