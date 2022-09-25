
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import { makeStyles } from '@mui/styles';
import GlobalStyles from '@mui/material/GlobalStyles';
import DefalutLayout from '@/layouts/defalut';
import ErrorLayout from '@/layouts/error';

const styles = {
  transitionRoot: {
    minHeight: 'inherit',
    height: 'inherit'
  },
};
const useStyles = makeStyles(styles);

function LayoutSwitch({ router, children, pageProps }) {
  const nodeRef = useRef(null);
  const classes = useStyles();

  const layoutSetting = [
    { path: '/404', layout: ErrorLayout },
    { path: '/500', layout: ErrorLayout }
  ];
  const Layout = layoutSetting.find(({ path }) => path === router.route)?.layout || DefalutLayout;

  const pageTransition = {
    '.page-enter': {
      opacity: 0,
      transform: 'translateX(100%)'
    },
    '.page-enter-active': {
      opacity: 1,
      transform: 'translateX(0)',
      transition: 'all  300ms'
    },
    '.page-exit': {
      opacity: 1,
      transform: 'translateX(0)'
    },
    '.page-exit-active': {
      opacity: 0,
      transform: 'translateX(-100%)',
      transition: 'all  300ms'
    }
  };

  return <>
    <GlobalStyles styles={pageTransition} />
    <Layout {...pageProps}>
      <SwitchTransition>
        <CSSTransition key={router.pathname} nodeRef={nodeRef} in timeout={200} classNames="page">
          {/* https://github.com/reactjs/react-transition-group/issues/668 */}
          <div ref={nodeRef} className={classes.transitionRoot}>
            {children}
          </div>
        </CSSTransition>
      </SwitchTransition>
    </Layout>
  </>;
}

LayoutSwitch.propTypes = {
  router: PropTypes.object,
  children: PropTypes.any,
  pageProps: PropTypes.object.isRequired,
};

export default LayoutSwitch;