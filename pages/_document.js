import { Children } from 'react';
import Script from 'next/script';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import { pageCacheManage as _pageCacheManage } from '@/utils/request/cache-manage.js';
import GlobalStyles from '@/styles/globals';

const pageCacheManage = new _pageCacheManage();

const linkTagList = [
  { rel: 'icon', href: '/img/favicon/favicon.ico' },
  {
    rel: 'stylesheet',
    href: 'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap'
  }
];

export default class NextDocument extends Document {
  static async getInitialProps(ctx) {
    // https://github.com/mui/material-ui/issues/30348
    const sheets = new ServerStyleSheets();
    ctx.originalRenderPage = ctx.renderPage;

    ctx.renderPage = async function () {
      const userAgent = this.req?.headers?.['user-agent'] || '';
      const isMobile =
        userAgent.includes('Android') || userAgent.includes('iPhone');
      const pathname = this.pathname + (isMobile === true ? '_is_mobile' : '');
      const clearCache = this.query?.clearCache;

      if (clearCache === '') {
        pageCacheManage.clearAllPageCache();
      } else if (typeof clearCache === 'string') {
        pageCacheManage.clearPageCache(pathname);
      }

      if (clearCache !== pathname) {
        const pageCache = pageCacheManage.getPageCache(pathname);
        if (typeof pageCache === 'object' && pageCache !== null) {
          return pageCache;
        }
      }

      const page = await this.originalRenderPage({
        enhanceApp: App => props => sheets.collect(<App {...props} />)
      });
      pageCacheManage.addPageCache(page, pathname);

      return page;
    };

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement()
      ]
    };
  }

  render() {
    return (
      <Html lang="zh-tw">
        <Head>
          {/* <Script src={'https://www.googletagmanager.com/gtag/js?id=' + (process.env.GA_ID || '')} async={true} id='dataLayer' strategy='beforeInteractive'></Script> */}
          <Script strategy="beforeInteractive" id="gtm">
            {`
            /* window.dataLayer = window.dataLayer || [];
             window.gtag = function (...arg) { window.dataLayer.push(arg); };
             window.gtag('js', new Date());

             window.gtag('config', '${process.env.GA_ID}', {
               debug_mode: ${process.env.NODE_ENV === 'development'}
             }); */

            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${
              process.env.GTM_ID
            }');
          `}
          </Script>
          {linkTagList.map((linkTag, index) => (
            <link key={index + '-link'} rel={linkTag.rel} href={linkTag.href} />
          ))}
          <GlobalStyles />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
        {typeof window === 'object' ? (
          <noscript>
            <iframe
              src={
                'https://www.googletagmanager.com/ns.html?id=' +
                process.env.GTM_ID
              }
              height="0"
              width="0"
              style="display:none;visibility:hidden"
            ></iframe>
          </noscript>
        ) : null}
      </Html>
    );
  }
}
