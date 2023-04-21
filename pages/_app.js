// import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect, useCallback, useMemo } from 'react';
import { Provider, useDispatch, useSelector } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import GlobalStyles from '@/styles/globals';
import LayoutSwitch from '@/components/layout/LayoutSwitch';
import Message from '@/components/Message';
import CircularLoading from '@/components/CircularLoading';
import { wrapper } from '@/redux/index';
import { firebaseClientInit } from '@/utils/firebase.client';
import { firebaseServerInit } from '@/utils/firebase.server';

// https://ithelp.ithome.com.tw/articles/10269342
// https://vercel.com/archer102125220/resume-web

firebaseServerInit();

function NextApp({ Component, pageProps, router }) {
  const messageState = useSelector(state => state.system.message);
  const loading = useSelector(state => state.system.loading);
  const dispatch = useDispatch();

  const resetMessageState = useCallback(
    callback => {
      return dispatch({ type: 'system/message_reset', callback });
    },
    [dispatch]
  );
  const SAVE_is_mobile = useCallback(
    (payload, callback) => {
      return dispatch({
        type: 'system/SAVE_is_mobile',
        payload,
        callback
      });
    },
    [dispatch]
  );

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
    function windowWidthListener() {
      enquireScreen(mobile => {
        SAVE_is_mobile(mobile ? true : false);
      });
    }
    window.addEventListener('resize', windowWidthListener);
    firebaseClientInit();

    return () => {
      window.removeEventListener('resize', windowWidthListener);
    };
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <Head>
        <GlobalStyles />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <meta name="description" content="Parker Chan 的個人資料" />
        <meta name="theme-color" content={theme.palette.primary.main} />
        <title>Parker Chan 的個人資料</title>
      </Head>
      <LayoutSwitch router={router} pageProps={pageProps}>
        <Component {...pageProps} />
      </LayoutSwitch>
      <Message
        messageState={messageState}
        resetMessageState={resetMessageState}
      />
      <CircularLoading
        loading={loading}
        // loading={true}
        style={{
          position: 'absolute',
          width: '20vw',
          height: '20vw',
          top: '40%',
          left: '40%'
        }}
        size="100%"
      />
    </ThemeProvider>
  );
}

NextApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object,
  err: PropTypes.object
};
// https://github.com/kirill-konshin/next-redux-wrapper
// NextApp.getInitialProps = wrapper.getInitialPageProps(({ dispatch }) => {
//   return async (appContext) => {
//     if (typeof window === 'undefined') {
//       const userAgent = appContext?.ctx?.req?.headers?.['user-agent'] || '';
//       const isMobile =
//         userAgent.includes('Android') || userAgent.includes('iPhone');
//       dispatch({ type: 'system/SAVE_is_mobile', payload: isMobile });
//     }
//     const appProps = await App.getInitialProps(appContext);

//     return { ...appProps };
//   };
// });

// export default wrapper.withRedux(NextApp);

function App({ ...rest }) {
  const wrapperData = wrapper.useWrappedStore(rest);
  const { props } = wrapperData;
  const store = useMemo(() => wrapperData.store, [wrapperData.store]);
  return (
    <Provider store={store}>
      <NextApp {...props} />
    </Provider>
  );
}

export default App;
