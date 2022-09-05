import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import pageCacheManage from '@/middleware/page-cache-manage.js';

export default class NextDocument extends Document {
  static async getInitialProps(ctx) {
    // const initialProps = await Document.getInitialProps(ctx);
    // return { ...initialProps };

    // https://github.com/mui/material-ui/issues/30348
    const sheets = new ServerStyleSheets();
    ctx.originalRenderPage = ctx.renderPage;

    ctx.renderPage = async function () {
      const pageCache = pageCacheManage.getPageCache(this.pathname);

      if (typeof (pageCache) === 'object' && pageCache !== null) return pageCache;

      const page = await this.originalRenderPage({
        enhanceApp: (App) => (props) => sheets.collect(<App {...props} />),
      });
      pageCacheManage.addPageCache(page, this.pathname);

      return page;
    };

    const initialProps = await Document.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [...Children.toArray(initialProps.styles), sheets.getStyleElement()],
    };
  }

  render() {
    return (
      <Html lang="zh-tw">
        <Head>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}