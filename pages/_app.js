import App from 'next/app';
import Head from 'next/head';
import { useRouter } from 'next/router';
import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { enquireScreen } from 'enquire-js';
import { ThemeProvider } from '@mui/material/styles';
import theme from '@/theme';
import GlobalStyles from '@/styles/globals';
import LayoutSwitch from '@/components/layout/LayoutSwitch';
import PageLoading from '@/components/PageLoading';
import Message from '@/components/Message';
import { wrapper } from '@/redux/index';

// https://ithelp.ithome.com.tw/articles/10269342
// https://vercel.com/archer102125220/resume-web

function NextApp({ Component, pageProps, router }) {
  const nextRouter = useRouter();
  const [pageLoading, setPageLoading] = useState(false);
  const messageState = useSelector((state) => state.system.message);
  const dispatch = useDispatch();

  useEffect(() => {
    const handleStart = (url) => (url !== router.asPath) && setPageLoading(true);
    const handleComplete = (url) => (url === router.asPath) && setPageLoading(false);
    nextRouter.events.on('routeChangeStart', handleStart);
    nextRouter.events.on('routeChangeComplete', handleComplete);
    nextRouter.events.on('routeChangeError', handleComplete);

    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles) {
      jssStyles.parentElement?.removeChild(jssStyles);
    }

    const systemEnquireScreen = (payload, callback) => dispatch({ type: 'system/SAVE_is_mobile', payload, callback });
    function windowWidthListener() {
      enquireScreen(
        (mobile) => {
          systemEnquireScreen(mobile ? true : false);
        }
      );
    }
    window.addEventListener('resize', windowWidthListener);
    return () => {
      nextRouter.events.off('routeChangeStart', handleStart);
      nextRouter.events.off('routeChangeComplete', handleComplete);
      nextRouter.events.off('routeChangeError', handleComplete);

      window.removeEventListener('resize', windowWidthListener);
    };
  }, []);

  return <ThemeProvider theme={theme}>
    <Head>
      <GlobalStyles />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="initial-scale=1, width=device-width" />
      <meta name="description" content="Parker Chan 的個人資料" />
      <meta name="theme-color" content={theme.palette.primary.main} />
    </Head>
    <LayoutSwitch router={router} pageProps={pageProps}>
      <Component {...pageProps} />
    </LayoutSwitch>
    {pageLoading === true && <PageLoading />}
    <Message messageState={messageState} />
  </ThemeProvider>;
}

NextApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
  router: PropTypes.object,
  err: PropTypes.object
};

NextApp.getInitialProps = wrapper.getInitialPageProps(({ dispatch }) => {
  return async (appContext) => {
    const userAgent = appContext?.ctx?.req?.headers?.['user-agent'] || '';
    const isMobile = userAgent.includes('WebKit-based');
    dispatch({ type: 'system/SAVE_is_mobile', payload: isMobile });
    const appProps = await App.getInitialProps(appContext);

    return { ...appProps };
  };
});

export default wrapper.withRedux(NextApp);
