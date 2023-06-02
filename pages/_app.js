// import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Provider } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';

import theme from '@/theme';
import LayoutSwitch from '@/components/layout/LayoutSwitch';
import Message from '@/components/Message';
import PageLoading from '@/components/PageLoading';
import NotificationPermission from '@/components/NotificationPermission';
import { wrapper } from '@/redux/index';
import { firebaseClientInit } from '@/utils/firebase.client';

import 'dayjs/locale/zh-cn';

firebaseClientInit();

function App({ ...rest }) {
  const wrapperData = wrapper.useWrappedStore(rest);
  const { props } = wrapperData;
  const { Component, pageProps, router } = props;

  const [messageState, setMessageState] = useState({});
  const [loading, setLoading] = useState(false);

  const store = useMemo(() => wrapperData.store, [wrapperData.store]);

  const resetMessageState = useCallback(
    callback => store.dispatch({ type: 'system/message_reset', callback }),
    [store.dispatch]
  );

  const SAVE_is_mobile = useCallback(
    (payload, callback) => {
      return store.dispatch({
        type: 'system/SAVE_is_mobile',
        payload,
        callback
      });
    },
    [store.dispatch]
  );

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles !== null) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }
    function windowWidthListener() {
      enquireScreen(mobile => {
        SAVE_is_mobile(mobile ? true : false);
      });
    }
    window.addEventListener('resize', windowWidthListener);

    return () => {
      window.removeEventListener('resize', windowWidthListener);
    };
  }, []);
  useEffect(() => {
    const unsubscribe = store.subscribe(function () {
      const state = store.getState();

      const newMessage = state.system.message;
      if (messageState !== newMessage) {
        setMessageState(newMessage);
      }

      const newLoading = state.system.loading;
      if (loading !== newLoading) {
        setLoading(newLoading);
      }
    });
    return unsubscribe;
  }, [messageState, loading]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <Head>
          <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
          <meta name="viewport" content="initial-scale=1, width=device-width" />
          <meta name="description" content="Parker Chan 的個人資料" />
          <meta name="theme-color" content={theme.palette.primary.main} />
          <title>Parker Chan 的個人資料</title>
        </Head>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
          <LayoutSwitch router={router} pageProps={pageProps}>
            <Component {...pageProps} />
          </LayoutSwitch>
          <NotificationPermission />
          <Message
            messageState={messageState}
            resetMessageState={resetMessageState}
          />
          <PageLoading loading={loading} />
        </LocalizationProvider>
      </ThemeProvider>
    </Provider>
  );
}
// https://github.com/kirill-konshin/next-redux-wrapper
// App.getInitialProps = wrapper.getInitialPageProps(({ dispatch }) => {
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

// export default wrapper.withRedux(App);

App.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object,
  err: PropTypes.object
};

export default App;
