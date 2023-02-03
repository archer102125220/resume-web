import PropTypes from 'prop-types';
import {
  useRef,
  // useEffect
} from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { makeStyles } from '@mui/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
// import { useRouter } from 'next/router';
import DefalutLayout from '@/layouts/defalut';
import IndexLayout from '@/layouts/index';
import ErrorLayout from '@/layouts/error';

const styles = {
  transitionRoot: {
    minHeight: 'inherit',
    height: 'inherit',
  },
};
const useStyles = makeStyles(styles);

const pageTransition = {
  '.page-enter': {
    opacity: 0,
    transform: 'translateY(-100%)',
  },
  '.page-enter-active': {
    opacity: 1,
    transform: 'translateY(0)',
    transition: 'all  300ms',
  },
  '.page-exit': {
    opacity: 1,
    transform: 'translateY(0)',
  },
  '.page-exit-active': {
    opacity: 0,
    transform: 'translateY(100%)',
    transition: 'all  300ms',
  },
};
function LayoutSwitch({ router, children, pageProps }) {
  // const nextRouter = useRouter();
  const nodeRef = useRef(null);
  const classes = useStyles();

  const layoutSetting = [
    { path: '/', layout: IndexLayout, exact: true },
    { path: '/index', layout: IndexLayout },
    { path: '/404', layout: ErrorLayout },
    { path: '/500', layout: ErrorLayout },
  ];
  const Layout =
    layoutSetting.find(({ path, exact }) =>
      exact === true ? path === router.route : router.route.includes(path)
    )?.layout || DefalutLayout;

  // useEffect(() => {
  //   // const handleStart = (url) => url !== router.asPath && setPageLoading(true);
  //   // const handleComplete = (url) => {
  //   //   url === router.asPath && setPageLoading(false);
  //   // };
  //   // nextRouter.events.on('routeChangeStart', handleStart);
  //   // nextRouter.events.on('routeChangeComplete', handleComplete);
  //   // nextRouter.events.on('routeChangeError', handleComplete);
  //   return () => {
  //     // nextRouter.events.off('routeChangeStart', handleStart);
  //     // nextRouter.events.off('routeChangeComplete', handleComplete);
  //     // nextRouter.events.off('routeChangeError', handleComplete);
  //   };
  // }, []);

  return (
    <>
      <GlobalStyles styles={pageTransition} />
      <Layout {...pageProps}>
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
  pageProps: PropTypes.object.isRequired,
};

export default LayoutSwitch;
