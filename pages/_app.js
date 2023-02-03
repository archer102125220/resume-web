import App from 'next/app';
import Head from 'next/head';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import GlobalStyles from '@/styles/globals';
import LayoutSwitch from '@/components/layout/LayoutSwitch';
import Message from '@/components/Message';
import { wrapper } from '@/redux/index';

// https://ithelp.ithome.com.tw/articles/10269342
// https://vercel.com/archer102125220/resume-web

function NextApp({ Component, pageProps, router }) {
  const messageState = useSelector((state) => state.system.message);
  const dispatch = useDispatch();
  const resetMessageState = (callback) => {
    return dispatch({ type: 'system/message_reset', callback });
  };

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }

    const systemEnquireScreen = (payload, callback) => {
      return dispatch({ type: 'system/SAVE_is_mobile', payload, callback });
    };
    function windowWidthListener() {
      enquireScreen((mobile) => {
        systemEnquireScreen(mobile ? true : false);
      });
    }
    window.addEventListener('resize', windowWidthListener);
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
    </ThemeProvider>
  );
}

NextApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object,
  err: PropTypes.object,
};

NextApp.getInitialProps = wrapper.getInitialPageProps(({ dispatch }) => {
  return async (appContext) => {
    if (typeof window === 'undefined') {
      const userAgent = appContext?.ctx?.req?.headers?.['user-agent'] || '';
      const isMobile =
        userAgent.includes('Android') || userAgent.includes('iPhone');
      dispatch({ type: 'system/SAVE_is_mobile', payload: isMobile });
    }
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  };
});

export default wrapper.withRedux(NextApp);
