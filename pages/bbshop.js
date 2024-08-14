import Head from 'next/head';
import Image from 'next/image';
import { makeStyles } from '@mui/styles';

import useGTMTrack from '@/hooks/useGTMTrack';

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
  BBShopScreenshot: {
    display: 'block',
    margin: 'auto'
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
        本專案為香港電商平台，已上線5年以上，參予專案期間內改善SEO，並由Vue1(SPA)轉為Nuxt2(SSR)、翻新介面，以提供簡潔流暢的使用者介面。
      </p>
      <p>
        本專案提供賣家設定youtube影片串聯，能更進一步介紹產品資訊；提供google
        ADS服務，使賣家更能在站內提升曝光度。
      </p>

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
