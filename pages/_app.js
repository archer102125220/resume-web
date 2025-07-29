// import _App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useState, useEffect, useCallback, useMemo } from 'react';
import { Provider } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { ThemeProvider } from '@mui/material/styles';

import 'dayjs/locale/zh-cn';
import dayjs from 'dayjs';

import theme from '@/theme';
import LayoutSwitch from '@/components/layout/LayoutSwitch';
import Message from '@/components/Message';
import PageLoading from '@/components/PageLoading';
import NotificationPermission from '@/components/NotificationPermission';
import { wrapper } from '@/redux/index';
import { firebaseClientInit } from '@/utils/helpers/firebase.client';

firebaseClientInit();

function App({ ...rest }) {
  const wrapperData = wrapper.useWrappedStore(rest);
  const { props } = wrapperData;
  const { Component, pageProps, router } = props;

  const [messageState, setMessageState] = useState({});
  const [isMobile, setIsMobile] = useState(false);

  const store = useMemo(() => wrapperData.store, [wrapperData.store]);

  const resetMessageState = useCallback(
    callback => store.dispatch({ type: 'system/message_reset', callback }),
    [store.dispatch]
  );

  const SAVE_isMobile = useCallback(
    (payload, callback) => {
      return store.dispatch({
        type: 'system/SAVE_isMobile',
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
        SAVE_isMobile(mobile ? true : false);
      });
    }
    windowWidthListener();
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

      // next-redux-wrapper 目前在前後端資料持同步上仍有bug，gitHub上寫預計9.x版會修復，目前尚未發布，尚無官方文件資料．
      // https://github.com/kirill-konshin/next-redux-wrapper/pull/523
      const newIsMobile = state.system.isMobile;
      if (isMobile !== newIsMobile) {
        setIsMobile(newIsMobile);
      }
    });
    return unsubscribe;
  }, [messageState, isMobile]);

  return (
    <Provider store={store}>
      <SpeedInsights />
      <ThemeProvider theme={theme}>
        <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="zh-cn">
          <Head>
            <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
            <meta
              name="viewport"
              content="initial-scale=1, width=device-width"
            />
            <meta name="description" content="Parker Chan 的個人資料" />
            <meta name="theme-color" content={theme.palette.primary.main} />
            <meta
              name="copyright"
              content={`Copyright © ${dayjs().year()} Parker Chen. All rights reserved.`}
            />
            <title>Parker Chan 的個人資料</title>
          </Head>
          <LayoutSwitch
            router={router}
            isMobile={isMobile}
            pageProps={pageProps}
          >
            <Component {...pageProps} isMobile={isMobile} />
          </LayoutSwitch>
          <NotificationPermission />
          <Message
            messageState={messageState}
            resetMessageState={resetMessageState}
          />
          <PageLoading />
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
//       dispatch({ type: 'system/SAVE_isMobile', payload: isMobile });
//     }
//     const appProps = await _App.getInitialProps(appContext);

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
