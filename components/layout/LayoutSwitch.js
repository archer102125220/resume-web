
import PropTypes from 'prop-types';
import { useRef } from 'react';
import { CSSTransition, SwitchTransition } from 'react-transition-group';
import DefalutLayout from '@/layouts/defalut';
import ErrorLayout from '@/layouts/error';

function LayoutSwitch({ router, children, pageProps }) {
  const nodeRef = useRef(null);

  let Layout = DefalutLayout;
  if (router.route === '/404' || router.route === '/500') {
    Layout = ErrorLayout;
  }
  return <Layout {...pageProps}>
    <SwitchTransition>
      <CSSTransition key={router.pathname} nodeRef={nodeRef} in timeout={200} classNames="page">
        {/* https://github.com/reactjs/react-transition-group/issues/668 */}
        <div ref={nodeRef}>
          {children}
        </div>
      </CSSTransition>
    </SwitchTransition>
  </Layout>;
}

LayoutSwitch.propTypes = {
  router: PropTypes.object,
  children: PropTypes.any,
  pageProps: PropTypes.object.isRequired,
};

export default LayoutSwitch;