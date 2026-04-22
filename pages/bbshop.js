import Head from 'next/head';
import { makeStyles } from '@mui/styles';

import useGTMTrack from '@/hooks/useGTMTrack';
import Image from '@/components/Image';

const styles = {
  // BBShop: {},
  BBShopTitle: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    marginBottom: '16px'
  },
  BBShopTitleName: {
    fontSize: '24px'
  },
  BBShopTitleRemark: {
    fontSize: '12px'
  },
  BBShopFeature: {
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'flex-start',
    margin: '8px 0px'
  },
  BBShopFeatureList: {
    // display: 'flex',
    // flexDirection: 'row',
    // flexWrap: 'wrap'
  },
  BBShopFeatureItem: {
    marginLeft: '24px'
    // '&:not(:first-child)': {
    //   marginLeft: '48px'
    // }
  },
  BBShopFeatureSubList: {
    marginLeft: '24px'
  },
  BBShopScreenshot: {
    display: 'block',
    margin: 'auto',
    marginTop: '8px'
  }
};

const useStyles = makeStyles(styles);

function BBShop() {
  const classes = useStyles();
  useGTMTrack({ event: 'scnOpen', url: '/bbshop' });

  return (
    <div>
      <Head>
        <title>Parker Chan 的上線專案介紹- BBShop</title>
      </Head>
      <div className={classes.BBShopTitle}>
        <p className={classes.BBShopTitleName}>Big Big Shop</p>
        <p className={classes.BBShopTitleRemark}>於2022/10/07確認已下線</p>
      </div>
      <p>
        本專案為香港電商平台，已上線5年以上，參予專案期間內改善SEO，並由VueJS(SPA)轉為NuxtJS(SSR)，使通訊軟體或社群軟體的爬蟲能夠正確爬取內容，也透過翻新介面，以提供簡潔流暢的使用者介面。
        翻新功能模組有：
      </p>
      <div className={classes.BBShopFeature}>
        <ul className={classes.BBShopFeatureList}>
          <li className={classes.BBShopFeatureItem}>首頁</li>
          <li className={classes.BBShopFeatureItem}>首頁輪播公告橫幅</li>
          <li className={classes.BBShopFeatureItem}>搜尋頁</li>
          <li className={classes.BBShopFeatureItem}>產品頁</li>
          <li className={classes.BBShopFeatureItem}>會員資訊頁</li>
          <li className={classes.BBShopFeatureItem}>GA/GTM埋點</li>
          <li className={classes.BBShopFeatureItem}>
            Youtube 播放器組件化(Youtube Iframe API)
          </li>
          <li className={classes.BBShopFeatureItem}>Google ADS 組件化</li>
          <li className={classes.BBShopFeatureItem}>Nuxt2 伺服端產品頁快取</li>
        </ul>
      </div>

      <Image
        className={classes.BBShopScreenshot}
        loading="lazy"
        src="/img/BBShop/BBShop.png"
        alt="BBShop"
        width={920}
        height={500}
      />
    </div>
  );
}

export default BBShop;
