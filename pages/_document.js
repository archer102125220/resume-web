import { Children } from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import { ServerStyleSheets } from '@mui/styles';
import pageCacheManage from '@/utils/page-cache-manage.js';

const linkTagList = [{ rel: 'icon', href: '/favicon.ico' }];

export default class NextDocument extends Document {
  static async getInitialProps(ctx) {

    // https://github.com/mui/material-ui/issues/30348
    const sheets = new ServerStyleSheets();
    ctx.originalRenderPage = ctx.renderPage;

    ctx.renderPage = async function () {
      const clearCache = this.query?.clearCache;
      if (clearCache === '') {
        pageCacheManage.clearAllPageCache();
      } else if (typeof (clearCache) === 'string') {
        pageCacheManage.clearPageCache(this.pathname);
      }

      if (clearCache !== this.pathname) {
        const pageCache = pageCacheManage.getPageCache(this.pathname);
        if (typeof (pageCache) === 'object' && pageCache !== null) return pageCache;
      }

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
          {
            linkTagList.map((linkTag, index) => <link key={index + '-link'} rel={linkTag.rel} href={linkTag.href} />)
          }
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}